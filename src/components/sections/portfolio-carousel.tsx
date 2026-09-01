"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";

export function PortfolioCarousel({ projects, locale }: { projects: any[]; locale: any }) {
  const t = useTranslations("common");
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [pageCount, setPageCount] = React.useState(projects.length);
  const [snapEnabled, setSnapEnabled] = React.useState(true);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const snapTimer = React.useRef<number | null>(null);

  // Kart genişliği (boşluk dahil), kaydırma sınırı ve kaç durak olduğu
  const getMetrics = React.useCallback(() => {
    const container = scrollRef.current;
    const child = container?.firstElementChild as HTMLElement | undefined;
    if (!container || !child) return null;

    let itemWidth = child.offsetWidth;
    if (container.children.length > 1) {
      const secondChild = container.children[1] as HTMLElement;
      itemWidth = secondChild.offsetLeft - child.offsetLeft;
    }
    if (itemWidth <= 0) return null;

    const gap = itemWidth - child.offsetWidth;
    const maxScroll = Math.max(0, container.scrollWidth - container.clientWidth);
    // Aynı anda kaç kart görünüyorsa o kadar az durak vardır
    const visible = Math.max(1, Math.round((container.clientWidth + gap) / itemWidth));
    const pages = Math.max(1, projects.length - visible + 1);

    return { container, itemWidth, maxScroll, pages };
  }, [projects.length]);

  // Durak sayısını ölç, ekran boyutu değiştikçe güncelle
  React.useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const measure = () => {
      const m = getMetrics();
      if (!m) return;
      setPageCount(m.pages);
      setCurrentSlide((prev) => Math.min(prev, m.pages - 1));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, [getMetrics]);

  React.useEffect(() => {
    return () => {
      if (snapTimer.current) window.clearTimeout(snapTimer.current);
    };
  }, []);

  const indexFromScroll = (m: NonNullable<ReturnType<typeof getMetrics>>) => {
    // Sona gelindiyse her zaman son durak aktif olsun
    if (m.container.scrollLeft >= m.maxScroll - 1) return m.pages - 1;
    return Math.min(m.pages - 1, Math.max(0, Math.round(m.container.scrollLeft / m.itemWidth)));
  };

  const handleScroll = () => {
    const m = getMetrics();
    if (!m) return;
    const index = indexFromScroll(m);
    setCurrentSlide((prev) => (prev === index ? prev : index));
  };

  const scrollTo = (index: number) => {
    const m = getMetrics();
    if (!m) return;
    m.container.scrollTo({ left: Math.min(m.itemWidth * index, m.maxScroll), behavior: "smooth" });
  };

  const [isDragging, setIsDragging] = React.useState(false);
  const startX = React.useRef(0);
  const initialScrollLeft = React.useRef(0);
  const dragStartPos = React.useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    if (snapTimer.current) window.clearTimeout(snapTimer.current);
    setIsDragging(true);
    setSnapEnabled(false); // sürükleme boyunca snap kapalı, yoksa parmağı takip etmez
    dragStartPos.current = e.pageX;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    initialScrollLeft.current = scrollRef.current.scrollLeft;
  };

  // Bırakıldığında en yakın karta yumuşak geçiş yap, sonra snap'i geri aç
  const settle = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const m = getMetrics();
    if (!m) {
      setSnapEnabled(true);
      return;
    }

    const index = indexFromScroll(m);
    m.container.scrollTo({ left: Math.min(m.itemWidth * index, m.maxScroll), behavior: "smooth" });
    setCurrentSlide(index);

    if (snapTimer.current) window.clearTimeout(snapTimer.current);
    snapTimer.current = window.setTimeout(() => setSnapEnabled(true), 500);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX.current; // 1:1 takip
    scrollRef.current.scrollLeft = initialScrollLeft.current - walk;
  };

  const handleClick = (e: React.MouseEvent) => {
    if (Math.abs(e.pageX - dragStartPos.current) > 5) {
      e.preventDefault(); // Sürükleme yapılmışsa tıklamayı (yönlendirmeyi) iptal et
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* Scroll Snap Container (3 items on desktop, 1 on mobile) */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseLeave={settle}
        onMouseUp={settle}
        onMouseMove={handleMouseMove}
        className={`w-full overflow-x-auto flex gap-4 md:gap-6 hide-scrollbar py-4 ${
          snapEnabled ? "snap-x snap-mandatory" : "snap-none"
        } ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {projects.map((project) => {
          const copy = project.copy[locale];
          return (
            <Link
              key={project.id}
              href={{ pathname: "/referanslar/[slug]", params: { slug: project.slug[locale] } }}
              onClick={handleClick}
              onDragStart={(e) => e.preventDefault()}
              className="relative shrink-0 w-[85vw] md:w-[calc(33.333%-16px)] aspect-[4/3] snap-center md:snap-start group block rounded-3xl overflow-hidden border border-black/5 dark:border-white/5 bg-royal-graphite"
            >
              <Image
                src={project.cover}
                alt={copy.title}
                fill
                sizes="(min-width:768px) 33vw, 100vw"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110 pointer-events-none"
              />
            </Link>
          );
        })}
      </div>

      {/* Pagination Dots */}
      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: pageCount }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-8 bg-gold-500"
                : "w-2 bg-black/20 hover:bg-black/40"
            }`}
            aria-label={t("slide", { number: index + 1 })}
          />
        ))}
      </div>

      {/* Single Hero-style Button for Instagram */}
      <div className="mt-10 flex justify-center w-full">
        <a
          href={siteConfig.contact.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex w-fit cursor-pointer items-center justify-center gap-0 rounded-full bg-transparent px-0 py-2 transition-transform duration-300 hover:scale-105"
        >
          <span className="rounded-full bg-black px-8 py-3.5 font-semibold text-white transition-colors duration-500 ease-in-out group-hover:bg-gray-900">
            {t("instagramMore")}
          </span>
          <div className="relative flex h-fit cursor-pointer items-center overflow-hidden rounded-full bg-gold-500 p-3.5 text-black transition-colors duration-500 ease-in-out hover:bg-gold-400">
            <ArrowUpRight className="absolute h-5 w-5 -translate-x-1/2 transition-all duration-500 ease-in-out group-hover:translate-x-10" />
            <ArrowUpRight className="absolute h-5 w-5 -translate-x-10 transition-all duration-500 ease-in-out group-hover:-translate-x-1/2" />
          </div>
        </a>
      </div>
    </div>
  );
}
