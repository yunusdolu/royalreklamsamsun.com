import React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import {
  siteConfig,
  whatsappLink,
  mailLink,
  mapsDirectionsLink,
} from "@/config/site";
import { Link } from "@/i18n/navigation";

type FooterProps = React.ComponentProps<"footer"> & {
  children?: React.ReactNode;
};

export async function Footer({
  className,
  ...props
}: Omit<FooterProps, "children">) {
  const tNav = await getTranslations("nav");
  const t = await getTranslations("footer");
  const tCommon = await getTranslations("common");
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "border-t border-black/5 bg-white pt-8 text-black",
        className,
      )}
      {...props}
    >
      <div className="relative mx-auto max-w-[1400px] px-6">
        <div className="relative grid grid-cols-2 border-x border-black/10 md:grid-cols-4 md:divide-x md:divide-black/10 [&>*:nth-child(odd)]:border-r [&>*:nth-child(odd)]:border-black/10 md:[&>*:nth-child(odd)]:border-r-0">
          <div>
            <SocialCard title="Instagram" href={siteConfig.contact.instagram} />
            <LinksGroup
              title={t("corporate")}
              links={[
                { title: tNav("about"), href: "/hakkimizda" },
                { title: tNav("services"), href: "/hizmetler" },
                { title: tNav("regions"), href: "/bolgeler" },
                { title: tNav("contact"), href: "/iletisim" },
              ]}
            />
          </div>
          <div>
            <SocialCard title={tCommon("email")} href={mailLink} />
            <LinksGroup
              title={t("servicesGroup")}
              links={[
                { title: t("signSystems"), href: "/hizmetler" },
                { title: t("printing"), href: "/hizmetler" },
                { title: t("vehicleWrap"), href: "/hizmetler" },
                { title: t("facade"), href: "/hizmetler" },
              ]}
            />
          </div>

          <div>
            <SocialCard
              title="WhatsApp"
              href={whatsappLink(t("whatsappPrefill"))}
            />
            <LinksGroup
              title={t("support")}
              links={[
                { title: tNav("faq"), href: "/sss" },
                { title: t("warranty"), href: "/garanti" },
                { title: tNav("contact"), href: "/iletisim" },
              ]}
            />
          </div>
          <div>
            <SocialCard title={t("directions")} href={mapsDirectionsLink} />
            <LinksGroup
              title={t("legal")}
              links={[
                { title: t("privacy"), href: "/gizlilik" },
                { title: t("cookies"), href: "/cerez" },
                { title: t("kvkk"), href: "/kvkk" },
              ]}
            />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-[1400px] flex flex-col sm:flex-row items-center justify-between border-t border-black/10 p-4 mt-6 gap-4 px-6">
        <p className="text-zinc-500 text-xs font-medium">
          © {year} {siteConfig.legalName}. {t("rights")}
        </p>
        <p className="text-zinc-500 text-xs font-medium">
          Designed by{" "}
          <a
            href="https://instagram.com/creasivcom"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-gold-500 transition-colors font-bold"
          >
            creasiv
          </a>
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
              href={link.href as any}
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
  // mailto: / tel: linkleri yeni sekmede açılmamalı, yoksa boş sekme açılıp mail istemcisi tetiklenmiyor
  const isExternal = !href.startsWith("mailto:") && !href.startsWith("tel:");

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className="group flex items-center justify-between border-t border-b border-black/10 p-4 text-[13px] md:border-t-0 hover:bg-black/5 transition-colors"
    >
      <span className="font-semibold text-black group-hover:text-gold-500 transition-colors">
        {title}
      </span>
      <ArrowRight className="h-3.5 w-3.5 text-zinc-500 group-hover:text-gold-500 group-hover:translate-x-1 transition-all" />
    </a>
  );
}
