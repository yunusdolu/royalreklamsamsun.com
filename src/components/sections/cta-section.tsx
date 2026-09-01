import { ArrowUpRight, MessageCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { whatsappLink } from "@/config/site";
import { Link } from "@/i18n/navigation";

export async function CtaSection() {
  const t = await getTranslations("home.cta");

  const message = t("whatsappPrefill");

  return (
    <>
      <section className="relative w-full overflow-hidden bg-white text-black font-sans selection:bg-gold-500 selection:text-white flex flex-col py-24 lg:py-32 border-t border-black/5">
        
        {/* Subtle Grid Background */}
        <div 
          className="absolute inset-0 z-0 opacity-40 pointer-events-none" 
          style={{ 
            backgroundImage: `linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)`, 
            backgroundSize: '40px 40px' 
          }} 
        />

        {/* Main Content */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-12 p-6">
          
          {/* Typography Section */}
          <div className="text-center space-y-4">
            <h2 className="text-6xl md:text-8xl font-medium tracking-tighter leading-[0.9]">
              {t("headingTop")} <br />
              <span className="text-gold-500 font-bold">{t("headingAccent")}</span>
            </h2>
          </div>

          {/*
            Birincil eylem teklif sayfasına gider — orada iş detayları
            toplanıp WhatsApp mesajına dönüşüyor. Doğrudan WhatsApp'a
            atlamak isteyenler için altta ikincil bağlantı duruyor.
          */}
          <div className="flex w-full max-w-sm flex-col items-center gap-4">
            <Link
              href="/teklif-al"
              className="group relative flex h-32 w-full items-center justify-between overflow-hidden rounded-2xl bg-gold-500 px-8 text-black shadow-2xl transition-transform hover:scale-[1.02]"
            >
              <div className="flex flex-col gap-1 text-left">
                <span className="text-xs font-semibold uppercase tracking-widest opacity-80">
                  {t("eyebrow")}
                </span>
                <span className="text-2xl font-black tracking-tight">
                  {t("primary")}
                </span>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-gold-500 transition-transform group-hover:scale-110">
                <ArrowUpRight className="h-5 w-5 pointer-events-none" />
              </div>
            </Link>

            <a
              href={whatsappLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 transition-colors hover:text-black"
            >
              <MessageCircle className="size-4 text-[#25d366]" aria-hidden="true" />
              {t("secondary")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
