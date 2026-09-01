import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";

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

        {showCta && (
          <div className="flex justify-center pt-4">
            <Link
              href="/sss"
              className="group flex w-fit cursor-pointer items-center justify-center gap-0 rounded-full bg-transparent px-0 py-2 transition-transform duration-300 hover:scale-105"
            >
              <span className="rounded-full bg-black px-8 py-3.5 font-semibold text-white transition-colors duration-500 ease-in-out group-hover:bg-gray-900">
                {t("cta")}
              </span>
              <div className="relative flex h-fit cursor-pointer items-center overflow-hidden rounded-full bg-gold-500 p-3.5 text-black transition-colors duration-500 ease-in-out hover:bg-gold-400">
                <ArrowUpRight className="absolute h-5 w-5 -translate-x-1/2 transition-all duration-500 ease-in-out group-hover:translate-x-10" />
                <ArrowUpRight className="absolute h-5 w-5 -translate-x-10 transition-all duration-500 ease-in-out group-hover:-translate-x-1/2" />
              </div>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
