"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { siteConfig, telLink, whatsappLink } from "@/config/site";
import { Link } from "@/i18n/navigation";

/**
 * Sabit hızlı iletişim çubuğu.
 *
 * Karar gerekçesi: iletişim formu yerine doğrudan WhatsApp / telefon tercih
 * edildi. Yerel hizmet işlerinde dönüşüm oranı en yüksek kanal budur ve
 * sunucu tarafında form altyapısı, spam koruması, KVKK metni gerektirmez.
 *
 * Mobilde ekranın altında tam genişlikte bir eylem çubuğu, masaüstünde sağ
 * altta yüzen bir WhatsApp düğmesi olarak görünür.
 */
export function QuickContactBar() {
  const t = useTranslations("quickBar");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const message = `Merhaba, ${siteConfig.name} — web sitenizden yazıyorum. Tabela hakkında bilgi almak istiyorum.`;

  return (
    <>
      {/* Mobil eylem çubuğu */}
      <nav
        aria-label={t("label")}
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-gold-500/20 bg-royal-carbon/95 backdrop-blur-lg md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <a
          href={telLink}
          className="flex h-14 flex-col items-center justify-center gap-1 border-r border-white/5 text-[0.6875rem] font-semibold text-royal-fg transition-colors active:bg-white/5"
        >
          <Phone className="size-4 text-gold-400" aria-hidden="true" />
          {t("call")}
        </a>
        <a
          href={whatsappLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-14 flex-col items-center justify-center gap-1 border-r border-white/5 text-[0.6875rem] font-semibold text-royal-fg transition-colors active:bg-white/5"
        >
          <MessageCircle className="size-4 text-[#25d366]" aria-hidden="true" />
          {t("whatsapp")}
        </a>
        <Link
          href="/teklif-al"
          className="flex h-14 flex-col items-center justify-center gap-1 bg-gradient-to-b from-gold-400 to-gold-600 text-[0.6875rem] font-bold text-royal-ink"
        >
          {t("quote")}
        </Link>
      </nav>

      {/* Masaüstü yüzen düğme */}
      <AnimatePresence>
        {visible && (
          <motion.a
            initial={{ opacity: 0, scale: 0.85, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            href={whatsappLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("whatsapp")}
            className="group fixed bottom-7 right-7 z-40 hidden h-14 items-center gap-3 rounded-full bg-[#1f8f4e] pl-4 pr-5 text-sm font-semibold text-white shadow-[0_18px_50px_-16px_rgba(37,167,92,0.85)] transition-colors hover:bg-[#25a75c] md:inline-flex"
          >
            <MessageCircle className="size-5" aria-hidden="true" />
            <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-[9rem] group-hover:opacity-100">
              {t("whatsapp")}
            </span>
          </motion.a>
        )}
      </AnimatePresence>
    </>
  );
}
