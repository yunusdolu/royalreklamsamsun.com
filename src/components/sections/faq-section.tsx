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
    <section className="bg-white py-20 lg:py-28" id="sss">
      <div className="container-royal space-y-7">
        
        <div className="space-y-2">
          <h2 className="text-3xl font-bold md:text-4xl text-black">
            {t("title")}
          </h2>
        </div>

        <Accordion
          type="single"
          collapsible
          className="w-full -space-y-px rounded-xl bg-white shadow-sm border border-black/5"
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
      </div>
    </section>
  );
}
