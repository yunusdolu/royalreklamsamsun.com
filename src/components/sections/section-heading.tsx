import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * Bölüm başlığı kalıbı: küçük altın etiket + başlık + açıklama.
 * Sitedeki tüm bölümlerde aynı ritmi korumak için tek bileşende toplandı.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  as = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}) {
  const Tag = as;

  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >


      <Reveal delay={0.05}>
        <Tag className="mt-4 font-display text-3xl leading-[1.12] text-royal-fg sm:text-4xl lg:text-[2.75rem]">
          {title}
        </Tag>
      </Reveal>

      {description && (
        <Reveal delay={0.1}>
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-royal-muted sm:text-base">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
