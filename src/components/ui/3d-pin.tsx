"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";

/**
 * Dahili yol tipi `Link`ten türetiliyor; `routing.ts` içindeki yollar
 * değişirse burası da derlemede uyarır.
 */
type LocalizedHref = React.ComponentProps<typeof Link>["href"];

export const PinContainer = ({
  children,
  title,
  href,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  title?: string;
  href: LocalizedHref;
  className?: string;
  containerClassName?: string;
}) => {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 1024 || window.matchMedia("(hover: none)").matches,
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const isInView = useInView(containerRef, {
    margin: isMobile ? "-45% 0px -45% 0px" : "-48% 0px -48% 0px", // Sadece tam ortadan geçen tek bir kart tetiklensin
  });

  const isActive = isMobile ? isInView : isHovered;

  const transform = isActive
    ? "translate(-50%,-50%) rotateX(40deg) scale(0.8)"
    : "translate(-50%,-50%) rotateX(0deg) scale(1)";

  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  return (
    <Link
      ref={containerRef}
      className={cn(
        "relative group/pin z-50 cursor-pointer",
        containerClassName,
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      href={href}
    >
      <div
        style={{
          perspective: "1000px",
          transform: "rotateX(70deg) translateZ(0deg)",
          transformStyle: "preserve-3d",
          WebkitTransformStyle: "preserve-3d",
        }}
        className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
      >
        <div
          style={{
            transform: transform,
          }}
          /*
            Karti saran kalin serit. Duruyorken beyaz ve sakin; kart yatinca
            altin bir isiga donuyor — hem kenar rengi hem disa vuran parilti
            ayni anda degisiyor.
          */
          className={cn(
            "absolute left-1/2 p-1.5 top-1/2 flex justify-start items-start rounded-3xl border transition-all duration-700",
            isActive
              ? "border-gold-500/70 bg-gold-200/90 shadow-[0_0_0_1px_rgba(212,175,55,0.35),0_10px_40px_-6px_rgba(212,175,55,0.55)]"
              : "border-black/5 bg-white shadow-xl group-hover/pin:border-gold-500/70 group-hover/pin:bg-gold-200/90 group-hover/pin:shadow-[0_0_0_1px_rgba(212,175,55,0.35),0_10px_40px_-6px_rgba(212,175,55,0.55)]",
          )}
        >
          <div className={cn(" relative z-50 ", className)}>{children}</div>
        </div>
      </div>
      <PinPerspective title={title} isActive={isActive} />
    </Link>
  );
};

export const PinPerspective = ({
  title,
  isActive,
}: {
  title?: string;
  isActive?: boolean;
}) => {
  const needleHeight = isActive
    ? "h-[11.25rem]"
    : "h-[5.625rem] group-hover/pin:h-[11.25rem]";

  return (
    <motion.div
      className={cn(
        "pointer-events-none w-96 h-80 flex items-center justify-center z-[60] transition duration-500",
        isActive ? "opacity-100" : "opacity-0 group-hover/pin:opacity-100",
      )}
    >
      <div className=" w-full h-full -mt-7 flex-none  inset-0">
        {/* Etiket yalnızca başlık verilirse çizilir. Kartın kendisi çağrıyı
            taşıyorsa (anasayfadaki hizmet kartları gibi) aynı yazının iki
            kez görünmemesi için başlık geçilmez. */}
        {title && (
          <div className="absolute top-8 inset-x-0 flex justify-center">
            <div className="relative flex space-x-2 items-center z-10 py-0.5 px-4">
              <span className="relative z-20 inline-block whitespace-nowrap py-0.5 text-[0.8125rem] font-semibold text-royal-fg">
                {title}
              </span>
            </div>
          </div>
        )}

        <div
          style={{
            perspective: "1000px",
            transform: "rotateX(70deg) translateZ(0)",
          }}
          className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
        >
          <>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,

                z: 0,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 0,
              }}
              className="absolute left-1/2 top-1/2  h-[11.25rem] w-[11.25rem] rounded-[50%] bg-gold-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
            ></motion.div>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,

                z: 0,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 2,
              }}
              className="absolute left-1/2 top-1/2  h-[11.25rem] w-[11.25rem] rounded-[50%] bg-gold-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
            ></motion.div>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,

                z: 0,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 4,
              }}
              className="absolute left-1/2 top-1/2  h-[11.25rem] w-[11.25rem] rounded-[50%] bg-gold-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
            ></motion.div>
          </>
        </div>

        {/*
          İğne çizgisi: kartın tepesindeki etiketi karta bağlar. Alt ucu kart
          kutusunun dikey ortasına sabitli (`bottom-1/2` + 14px), yüksekliği
          yukarı doğru uzuyor; 11.25rem üst ucu etiketin hemen altına
          ulaştırıyor (etiket `top-8`; biri değişirse öteki de değişmeli).
          Kart yatıkken çizginin kart dışında kalan kısmı uzun olsun diye
          etiket yukarıda: kısa kaldığında çizgi fotoğrafın içinde
          kayboluyordu.
          İnce bir iğne: tabanı dar (2px), etikete bakan üst %22'si tek
          noktaya daralarak sivri biter. Renk uca kadar koyu altın: açık
          altına dönen uç beyaz zeminde kayboluyordu. Çevresinde yumuşak altın parıltı var
          ve çizgi boyunca aşağıdan yukarı bir ışık süzülüp uçta söner
          (globals.css `pin-spark`). Işık da aynı kama biçimine kırpıldığı
          için ucu kalınlaştırmaz.
        */}
        <>
          {/* Dış parıltı: yukarı doğru söner */}
          <div
            className={cn(
              "absolute right-1/2 bottom-1/2 w-[6px] translate-x-[3px] translate-y-[14px] bg-gold-400/60 blur-[4px] transition-[height] duration-500 [mask-image:linear-gradient(to_top,black_55%,transparent_98%)]",
              needleHeight,
            )}
          />
          {/* Çekirdek iğne + süzülen ışık */}
          <div
            className={cn(
              "absolute right-1/2 bottom-1/2 w-[2px] translate-x-[1px] translate-y-[14px] overflow-hidden transition-[height] duration-500 [clip-path:polygon(50%_0,100%_22%,100%_100%,0_100%,0_22%)]",
              needleHeight,
            )}
          >
            <span className="absolute inset-0 bg-gradient-to-t from-gold-600 via-gold-500 to-gold-500" />
            <span className="absolute inset-x-0 h-10 animate-pin-spark bg-gradient-to-t from-transparent via-white to-transparent motion-reduce:hidden" />
          </div>
          {/* Süzülen ışığın parıltısı: iğnenin yanında yumuşak hale */}
          <div
            className={cn(
              "absolute right-1/2 bottom-1/2 w-[8px] translate-x-[4px] translate-y-[14px] overflow-hidden transition-[height] duration-500 [mask-image:linear-gradient(to_top,black_60%,transparent_100%)]",
              needleHeight,
            )}
          >
            <span className="absolute inset-x-0 h-12 animate-pin-spark bg-gradient-to-t from-transparent via-gold-200/80 to-transparent blur-[3px] motion-reduce:hidden" />
          </div>
          <motion.div className="absolute right-1/2 translate-x-[1.5px] bottom-1/2 bg-gold-600 translate-y-[14px] w-[4px] h-[4px] rounded-full z-40 blur-[3px]" />
          <motion.div className="absolute right-1/2 translate-x-[0.5px] bottom-1/2 bg-gold-300 translate-y-[14px] w-[2px] h-[2px] rounded-full z-40" />
        </>
      </div>
    </motion.div>
  );
};
