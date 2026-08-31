"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const STEP_KEYS = [
  "discovery",
  "design",
  "production",
  "installation",
  "delivery",
] as const;

export function ProcessSection() {
  const t = useTranslations("home.process");

  return (
    <section className="relative overflow-hidden bg-zinc-950 py-24 lg:py-32 border-t border-white/5">
      {/* Hafif Altın Parlama Efekti */}
      <div className="pointer-events-none absolute -left-[20%] top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-gold-500/5 blur-[120px]" />

      <div className="container-royal relative z-10 mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-12 items-center">
          
          {/* Sol Sütun: Başlık */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col max-w-lg lg:sticky lg:top-32"
          >
            <h2 className="font-display text-5xl md:text-6xl font-bold leading-tight text-white mb-6">
              Neden Bizi <br/>
              <span className="text-gold-500 italic">Seçmelisiniz?</span>
            </h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              {t("description")}
            </p>
          </motion.div>

          {/* Sağ Sütun: 5 Adım */}
          <div className="flex flex-col gap-10 md:gap-12">
            {STEP_KEYS.map((key, index) => (
              <motion.div 
                key={key} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                className="flex items-start gap-6 md:gap-8 group"
              >
                {/* Numara */}
                <div className="font-display text-5xl md:text-6xl font-black italic text-gold-500/80 leading-none transition-colors duration-300 group-hover:text-gold-400">
                  {String(index + 1).padStart(2, "0")}
                </div>
                
                {/* İçerik */}
                <div className="flex flex-col pt-2">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 tracking-wide">
                    {t(`steps.${key}.title`)}
                  </h3>
                  <p className="text-sm md:text-[15px] text-zinc-400 leading-relaxed max-w-md">
                    {t(`steps.${key}.description`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
