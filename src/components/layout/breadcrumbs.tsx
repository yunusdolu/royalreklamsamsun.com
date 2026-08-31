import { ChevronRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import type { AppHref } from "@/lib/seo";

export interface Crumb {
  name: string;
  href?: AppHref;
}

/**
 * Kırıntı navigasyonu.
 * Görsel karşılığı `BreadcrumbList` JSON-LD ile eşleşmelidir — Google
 * arama sonuçlarında yol gösterimini bu ikilinin tutarlılığına göre üretir.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[0.75rem] text-royal-faint">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.name} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-gold-300"
                >
                  {item.name}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className="text-royal-muted">
                  {item.name}
                </span>
              )}
              {!isLast && (
                <ChevronRight className="size-3 text-royal-border" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
