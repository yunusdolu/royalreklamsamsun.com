import { getTranslations } from "next-intl/server";
import { Award, Briefcase, MapPin, ShieldCheck } from "lucide-react";

import { Counter } from "@/components/motion/counter";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { stats } from "@/content/stats";

export async function StatsBar() {
  const t = await getTranslations("home.stats");

  const items = [
    { 
      value: stats.projects, 
      suffix: "+", 
      label: t("projects"), 
      description: "Mutlu Müşteri",
      icon: <Briefcase className="size-11 text-gold-500 drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
    },
    { 
      value: stats.years, 
      suffix: "", 
      label: t("years"),
      description: "Sektör Deneyimi",
      icon: <Award className="size-11 text-gold-500 drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
    },
    { 
      value: stats.districts, 
      suffix: "", 
      label: t("districts"),
      description: "Hizmet Noktası",
      icon: <MapPin className="size-11 text-gold-500 drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
    },
    { 
      value: stats.warrantyYears, 
      suffix: "", 
      label: t("warranty"),
      description: "Kalite Güvencesi",
      icon: <ShieldCheck className="size-11 text-gold-500 drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
    },
  ];

  return (
    <section
      aria-label={t("title")}
      className="relative z-30 mt-8 w-full px-4 sm:px-6 mb-16"
    >
      <div className="mx-auto max-w-[1400px] rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 shadow-2xl md:p-12 relative overflow-hidden">
        {/* Zarif altın ışıltı efekti (Üst kısımda) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[30px] bg-gold-500/10 blur-[30px]" />

        <RevealGroup
          as="ul"
          className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4 md:gap-8 relative z-10"
        >
          {items.map((item, i) => (
            <RevealItem
              as="li"
              key={item.label}
              className="group flex flex-col items-center justify-center text-center relative"
            >
              <div className="mb-4 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]">
                {item.icon}
              </div>
              <p className="font-display text-4xl font-bold md:text-5xl tracking-tight text-white group-hover:text-gold-100 transition-colors">
                <Counter value={item.value} suffix={item.suffix} />
              </p>
              <h3 className="mt-4 text-[13px] font-bold uppercase tracking-widest text-gold-400">
                {item.label}
              </h3>
              
              {/* Divider (Son item hariç) */}
              {i !== items.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 h-1/2 w-[1px] -translate-y-1/2 bg-white/10" />
              )}
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
