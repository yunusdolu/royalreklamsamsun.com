/**
 * JSON-LD yapısal verisini sayfaya gömer.
 *
 * `dangerouslySetInnerHTML` burada bilinçli bir tercihtir: React, `<script>`
 * içeriğini normal yolla render etmez. Veri kendi kodumuzdan geldiği ve
 * kullanıcı girdisi içermediği için güvenlidir; yine de `<` karakteri
 * kaçırılarak script kırma (XSS) ihtimali kapatılır.
 */
export function JsonLd({ id, data }: { id: string; data: unknown }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
