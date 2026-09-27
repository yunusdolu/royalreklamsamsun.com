import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/**
 * Panelden yüklenen görseller Supabase Storage'ta duruyor. `next/image` uzak
 * kaynakları ancak burada izin verilirse işler. Adres .env içindeki proje
 * adresinden türetiliyor; böylece Supabase projesi değişirse burası da
 * kendiliğinden doğru kalır.
 */
const supabaseHost = process.env.SUPABASE_URL
  ? new URL(process.env.SUPABASE_URL).hostname
  : undefined;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: supabaseHost
      ? [
          {
            protocol: "https",
            hostname: supabaseHost,
            pathname: "/storage/v1/object/public/**",
          },
        ]
      : [],

    // Modern formatlar — LCP ve toplam ağırlık için kritik
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75, 78, 85],
    deviceSizes: [360, 420, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [64, 96, 128, 200, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  // Ağır kütüphanelerden yalnızca kullanılan modüller paketlensin
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "gsap"],
    /*
      Panel formları görselleri server action ile gönderiyor. Varsayılan
      1 MB sınırında 1 MB'tan büyük her fotoğraf "Failed to fetch" ile
      düşüyordu. 4 MB: Vercel'in 4,5 MB'lık sabit istek sınırının altında.
      Görseller zaten tarayıcıda küçültülüp öyle gönderiliyor
      (src/app/admin/shrink-image.ts); bu pay yalnızca güvenlik payı.
    */
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },

  /**
   * "Işıklı Tabela" hizmeti, ışıksız tipleri de kapsayacak şekilde "Tabela"ya
   * genişletildi ve adresi değişti. Eski adres Google'a bildirilmişti; kalıcı
   * yönlendirme olmadan arama sonucundan gelen ziyaretçi 404 görürdü.
   */
  async redirects() {
    return [
      {
        source: "/hizmetler/isikli-tabela",
        destination: "/hizmetler/tabela",
        permanent: true,
      },
      {
        source: "/en/services/illuminated-signage",
        destination: "/en/services/signage",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/brand/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
