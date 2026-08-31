import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  /**
   * API, Next.js dahilî yolları, ve uzantılı dosyalar (robots.txt, sitemap.xml,
   * llms.txt, görseller) hariç her istek dil katmanından geçer.
   */
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
