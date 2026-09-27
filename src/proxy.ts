import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  /**
   * Yönetim paneli (/admin), Supabase dönüş adresi (/auth), API, Next.js
   * dahilî yolları ve uzantılı dosyalar (robots.txt, sitemap.xml, llms.txt,
   * görseller) hariç her istek dil katmanından geçer. /auth listede olmazsa
   * dil katmanı onu /tr/auth altına yeniden yazıyor ve e-postadaki sıfırlama
   * bağlantısı 404 veriyordu.
   */
  matcher: ["/((?!api|admin|auth|_next|_vercel|.*\\..*).*)"],
};
