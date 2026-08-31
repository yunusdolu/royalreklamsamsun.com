import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Faq } from "@/content/faq";

export async function FaqSection({
  faqs,
  showCta = true,
}: {
  faqs: Faq[];
  showCta?: boolean;
}) {
  const t = await getTranslations("home.faq");

  return (
    <section className="bg-white py-20 lg:py-28 border-t border-black/5" id="sss">
      <div className="mx-auto w-full max-w-3xl space-y-7 px-4">
        
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-3xl font-bold md:text-4xl text-black">
            {t("title")}
          </h2>
          <p className="text-zinc-600 max-w-2xl font-medium">
            {t("description")}
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="w-full -space-y-px rounded-xl bg-zinc-50"
          defaultValue="faq-0"
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="relative border-x border-black/10 first:rounded-t-xl first:border-t last:rounded-b-xl last:border-b"
            >
              <AccordionTrigger className="px-6 py-5 text-[15px] font-semibold leading-6 text-black hover:text-gold-500 hover:no-underline [&[data-state=open]]:text-gold-500">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 px-6 text-zinc-600 leading-relaxed font-medium">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        {showCta && (
          <p className="text-zinc-600 text-sm text-center md:text-left font-medium">
            {t("cta")}{' '}
            <Link href="/iletisim" className="text-gold-500 hover:underline font-semibold">
              İletişime Geçin
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
