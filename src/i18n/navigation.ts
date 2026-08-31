import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Dil farkında gezinme araçları.
 * Uygulama içinde `next/link` YERİNE buradaki `Link` kullanılmalıdır —
 * aksi halde dil ön eki ve yerelleştirilmiş URL'ler bozulur.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
