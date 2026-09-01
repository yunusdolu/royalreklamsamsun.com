"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";

export function PortfolioCarousel({ projects, locale }: { projects: any[]; locale: any }) {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const child = container.firstElementChild as HTMLElement;
    if (!child) return;

    // Calculate item width including gap
    // We use child.offsetWidth. The gap is 16px (gap-4) on mobile, 24px (gap-6) on desktop.
    // An easy way is to measure distance between first and second child, if available.
    let itemWidth = child.offsetWidth;
    if (container.children.length > 1) {
      const secondChild = container.children[1] as HTMLElement;
      itemWidth = secondChild.offsetLeft - child.offsetLeft;
    }

    const index = Math.round(container.scrollLeft / itemWidth);
    if (index !== currentSlide && index >= 0 && index < projects.length) {
      setCurrentSlide(index);
    }
  };

  const scrollTo = (index: number) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const child = container.firstElementChild as HTMLElement;
      if (!child) return;
      
      let itemWidth = child.offsetWidth;
      if (container.children.length > 1) {
        const secondChild = container.children[1] as HTMLElement;
        itemWidth = secondChild.offsetLeft - child.offsetLeft;
      }
      container.scrollTo({ left: itemWidth * index, behavior: "smooth" });
    }
  };

  const [isDragging, setIsDragging] = React.useState(false);
  const startX = React.useRef(0);
  const initialScrollLeft = React.useRef(0);
  const dragStartPos = React.useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    dragStartPos.current = e.pageX;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    initialScrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
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
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`w-full overflow-x-auto snap-x snap-mandatory flex gap-4 md:gap-6 hide-scrollbar py-4 ${isDragging ? 'cursor-grabbing snap-none' : 'cursor-grab'}`}
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
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-8 bg-gold-500"
                : "w-2 bg-black/20 hover:bg-black/40"
            }`}
            aria-label={`Slayt ${index + 1}`}
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
            Instagram'da Daha Fazlası
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
