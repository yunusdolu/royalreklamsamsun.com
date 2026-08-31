import { Info } from "lucide-react";

import type { Block } from "@/content/posts";

/**
 * Rehber yazılarının blok tabanlı gövde render'ı.
 *
 * Markdown yerine tiplenmiş bloklar tercih edildi: hem tipografi
 * tutarlılığı garanti altına alınır hem de tablo/uyarı gibi özel bloklar
 * yapısal olarak işaretlenebilir. Yapılandırılmış içerik, dil modelleri
 * tarafından düz metne göre belirgin şekilde daha iyi alıntılanır.
 */
export function PostBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={index}
                className="underline-gold pt-6 font-display text-xl font-bold text-royal-fg lg:text-2xl"
              >
                {block.text}
              </h2>
            );

          case "h3":
            return (
              <h3
                key={index}
                className="pt-2 font-display text-lg font-bold text-royal-fg"
              >
                {block.text}
              </h3>
            );

          case "p":
            return (
              <p
                key={index}
                className="text-[0.9375rem] leading-[1.8] text-royal-muted lg:text-base"
              >
                {block.text}
              </p>
            );

          case "ul":
            return (
              <ul key={index} className="space-y-2.5">
                {block.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[0.9375rem] leading-relaxed text-royal-muted"
                  >
                    <span
                      className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold-500"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            );

          case "table":
            return (
              <div
                key={index}
                className="overflow-x-auto rounded-lg border border-royal-border"
              >
                <table className="w-full min-w-[34rem] border-collapse text-left text-[0.875rem]">
                  <thead>
                    <tr className="bg-royal-surface">
                      {block.head.map((cell) => (
                        <th
                          key={cell}
                          scope="col"
                          className="border-b border-royal-border px-4 py-3 font-semibold text-gold-200"
                        >
                          {cell}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, rowIndex) => (
                      <tr
                        key={row.join("|")}
                        className={
                          rowIndex % 2 === 0
                            ? "bg-royal-graphite"
                            : "bg-royal-surface/60"
                        }
                      >
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cell + cellIndex}
                            className="border-b border-royal-border px-4 py-3 text-royal-muted first:font-medium first:text-royal-fg"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case "note":
            return (
              <aside
                key={index}
                className="flex gap-3 rounded-lg border border-gold-500/25 bg-gold-500/[0.05] p-5"
              >
                <Info
                  className="mt-0.5 size-4.5 shrink-0 text-gold-400"
                  aria-hidden="true"
                />
                <p className="text-[0.875rem] leading-relaxed text-royal-muted">
                  {block.text}
                </p>
              </aside>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
