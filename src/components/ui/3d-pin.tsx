"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const PinContainer = ({
  children,
  title,
  href,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  title?: string;
  href?: string;
  className?: string;
  containerClassName?: string;
}) => {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024 || window.matchMedia("(hover: none)").matches);
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
        containerClassName
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      href={href || "/"}
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
          className={cn(
            "absolute left-1/2 p-1.5 top-1/2 flex justify-start items-start rounded-3xl shadow-xl bg-white border transition duration-700",
            isActive ? "border-black/10" : "border-black/5 group-hover/pin:border-black/10"
          )}
        >
          <div className={cn(" relative z-50 ", className)}>{children}</div>
        </div>
      </div>
      <PinPerspective title={title} href={href} isActive={isActive} />
    </Link>
  );
};

export const PinPerspective = ({
  title,
  href,
  isActive,
}: {
  title?: string;
  href?: string;
  isActive?: boolean;
}) => {
  return (
    <motion.div 
      className={cn(
        "pointer-events-none w-96 h-80 flex items-center justify-center z-[60] transition duration-500",
        isActive ? "opacity-100" : "opacity-0 group-hover/pin:opacity-100"
      )}
    >
      <div className=" w-full h-full -mt-7 flex-none  inset-0">
        <div className="absolute top-0 inset-x-0  flex justify-center">
          <div
            className="relative flex space-x-2 items-center z-10 py-0.5 px-4"
          >
            <span className="relative z-20 text-black text-sm font-bold inline-block py-0.5 underline decoration-black decoration-2 underline-offset-4">
              {title}
            </span>
          </div>
        </div>

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

        <>
          <motion.div className={cn("absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-gold-500 translate-y-[14px] w-px blur-[2px] transition-all duration-500", isActive ? "h-40" : "h-20 group-hover/pin:h-40")} />
          <motion.div className={cn("absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-gold-500 translate-y-[14px] w-px transition-all duration-500", isActive ? "h-40" : "h-20 group-hover/pin:h-40")} />
          <motion.div className="absolute right-1/2 translate-x-[1.5px] bottom-1/2 bg-gold-600 translate-y-[14px] w-[4px] h-[4px] rounded-full z-40 blur-[3px]" />
          <motion.div className="absolute right-1/2 translate-x-[0.5px] bottom-1/2 bg-gold-300 translate-y-[14px] w-[2px] h-[2px] rounded-full z-40 " />
        </>
      </div>
    </motion.div>
  );
};
