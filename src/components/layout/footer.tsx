import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";

type FooterProps = React.ComponentProps<'footer'> & {
  children?: React.ReactNode;
};

export async function Footer({ className, ...props }: Omit<FooterProps, 'children'>) {
  const tNav = await getTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        'border-t border-black/5 bg-white pt-8 text-black',
        className,
      )}
      {...props}
    >
      <div className="relative mx-auto max-w-[1400px] px-6">
        <div className="relative grid grid-cols-1 border-x border-black/10 md:grid-cols-4 md:divide-x md:divide-black/10">
          <div>
            <SocialCard title="Instagram" href={siteConfig.contact.instagram} />
            <LinksGroup
              title="Kurumsal"
              links={[
                { title: tNav("about"), href: '/hakkimizda' },
                { title: tNav("services"), href: '/hizmetler' },
                { title: tNav("regions"), href: '/bolgeler' },
                { title: tNav("contact"), href: '/iletisim' },
              ]}
            />
          </div>
          <div>
            <SocialCard title="Facebook" href="#" />
            <LinksGroup
              title="Hizmetlerimiz"
              links={[
                { title: 'Tabela Sistemleri', href: '/hizmetler' },
                { title: 'Dijital Baskı', href: '/hizmetler' },
                { title: 'Araç Giydirme', href: '/hizmetler' },
                { title: 'Cephe Sistemleri', href: '/hizmetler' },
              ]}
            />
          </div>

          <div>
            <SocialCard title="WhatsApp" href={siteConfig.contact.whatsapp} />
            <LinksGroup
              title="Destek"
              links={[
                { title: 'S.S.S', href: '#' },
                { title: 'Garanti Şartları', href: '#' },
                { title: 'İletişim', href: '/iletisim' },
              ]}
            />
          </div>
          <div>
            <SocialCard title="LinkedIn" href="#" />
            <LinksGroup
              title="Yasal"
              links={[
                { title: 'Gizlilik', href: '#' },
                { title: 'Çerez', href: '#' },
                { title: 'KVKK', href: '#' },
              ]}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center border-t border-black/10 p-4 mt-6">
        <p className="text-zinc-500 text-xs font-medium">
          © {year} {siteConfig.legalName}. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}

interface LinksGroupProps {
  title: string;
  links: { title: string; href: string }[];
}
function LinksGroup({ title, links }: LinksGroupProps) {
  return (
    <div className="p-4">
      <h3 className="text-black mt-1 mb-4 text-xs font-bold tracking-wider uppercase">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.title}>
            <Link
              href={link.href}
              className="text-zinc-600 hover:text-gold-500 transition-colors text-[13px] font-semibold"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialCard({ title, href }: { title: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center justify-between border-t border-b border-black/10 p-4 text-[13px] md:border-t-0 hover:bg-black/5 transition-colors"
    >
      <span className="font-semibold text-black group-hover:text-gold-500 transition-colors">{title}</span>
      <ArrowRight className="h-3.5 w-3.5 text-zinc-500 group-hover:text-gold-500 group-hover:translate-x-1 transition-all" />
    </a>
  );
}
