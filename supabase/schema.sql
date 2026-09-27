-- Royal Reklam — yönetim paneli veritabanı şeması
--
-- Supabase panelinde SQL Editor'e yapıştırıp bir kez çalıştır.
-- Tekrar çalıştırmak güvenlidir: her şey "if not exists" ile korunuyor.
--
-- Tasarım kararı: hizmetlerin uzun metinleri (101 çeşit, SSS, schema.org
-- alanları) kodda kalıyor. Burada yalnızca panelden değişecek alanlar var ve
-- bunlar koddaki değerin ÜSTÜNE biniyor. Satır yoksa site bugünkü haliyle
-- çalışır; bu yüzden panel boşken bile hiçbir şey bozulmaz.

-- ---------------------------------------------------------------------------
-- 1) Hizmet düzenlemeleri
-- ---------------------------------------------------------------------------
create table if not exists public.service_overrides (
  -- src/content/services/index.ts içindeki service.id (örn. "isikli-tabela").
  -- Adres parçası (slug) bilerek burada yok: URL değişirse Google'daki
  -- sıralama sıfırlanır, o yüzden panelden değiştirilemez.
  id            text primary key,

  name_tr       text,
  name_en       text,
  short_name_tr text,
  short_name_en text,
  summary_tr    text,
  summary_en    text,

  card_image    text,  -- kart görseli (tam URL ya da /images/... yolu)
  hero_image    text,  -- hizmet sayfası banner'ı
  hero_focus    text,  -- banner odak noktası, örn. "70% center"

  lead_time_min int,
  lead_time_max int,

  updated_at    timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 2) Kampanyalar
-- ---------------------------------------------------------------------------
create table if not exists public.campaigns (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,

  title_tr    text not null,
  title_en    text,
  excerpt_tr  text,
  excerpt_en  text,
  body_tr     text,
  body_en     text,
  -- Kart üstündeki kısa etiket: "%20 indirim", "Montaj bizden" gibi
  badge_tr    text,
  badge_en    text,

  image       text,

  -- Hangi hizmet sayfalarında görünsün. Boş bırakılırsa hiçbir hizmet
  -- sayfasında çıkmaz, yalnızca anasayfa şeridinde ve kampanya sayfasında.
  service_ids text[] not null default '{}',

  starts_at   timestamptz,
  ends_at     timestamptz,
  is_active   boolean not null default true,
  sort        int not null default 0,

  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Yayındaki kampanyaları çeken sorgu bu üç alana bakıyor.
create index if not exists campaigns_live_idx
  on public.campaigns (is_active, starts_at, ends_at);

-- ---------------------------------------------------------------------------
-- 3) Referans işler
-- ---------------------------------------------------------------------------
-- Hizmetlerin aksine burada kodda duran içerik yer tutucu ("Referans Proje 1")
-- olduğu için tablo doğrudan kaynak oluyor; koddaki liste yalnızca tablo
-- boşken devreye giren yedek.
create table if not exists public.projects (
  id           uuid primary key default gen_random_uuid(),
  slug_tr      text unique not null,
  slug_en      text unique not null,

  service_id   text,          -- hangi hizmete ait (filtreleme için)
  region_id    text,
  year         int,

  title_tr     text not null,
  title_en     text,
  client       text,
  summary_tr   text,
  summary_en   text,
  -- Paragraflar ve kapsam maddeleri: her satır ayrı bir dizi elemanı
  body_tr      text[] not null default '{}',
  body_en      text[] not null default '{}',
  scope_tr     text[] not null default '{}',
  scope_en     text[] not null default '{}',

  cover        text,
  gallery      text[] not null default '{}',

  is_published boolean not null default true,
  sort         int not null default 0,

  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists projects_published_idx
  on public.projects (is_published, sort);

-- ---------------------------------------------------------------------------
-- 4) updated_at'i kendiliğinden güncelle
-- ---------------------------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists service_overrides_touch on public.service_overrides;
create trigger service_overrides_touch
  before update on public.service_overrides
  for each row execute function public.touch_updated_at();

drop trigger if exists campaigns_touch on public.campaigns;
create trigger campaigns_touch
  before update on public.campaigns
  for each row execute function public.touch_updated_at();

drop trigger if exists projects_touch on public.projects;
create trigger projects_touch
  before update on public.projects
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- 5) Satır güvenliği
-- ---------------------------------------------------------------------------
-- Site herkese açık olduğu için okuma serbest. Yazma hiçbir politikayla
-- açılmıyor: panel, sunucu tarafında service_role anahtarıyla yazıyor ve o
-- anahtar RLS'i atlıyor. Yani tarayıcıya sızan anon anahtarıyla kimse veri
-- değiştiremez.
alter table public.service_overrides enable row level security;
alter table public.campaigns         enable row level security;
alter table public.projects          enable row level security;

drop policy if exists "herkes okuyabilir" on public.service_overrides;
create policy "herkes okuyabilir" on public.service_overrides
  for select using (true);

drop policy if exists "herkes okuyabilir" on public.campaigns;
create policy "herkes okuyabilir" on public.campaigns
  for select using (true);

drop policy if exists "herkes okuyabilir" on public.projects;
create policy "herkes okuyabilir" on public.projects
  for select using (true);

-- ---------------------------------------------------------------------------
-- 6) Görsel deposu
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "medya herkese acik" on storage.objects;
create policy "medya herkese acik" on storage.objects
  for select using (bucket_id = 'media');
