'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface HeroSlide {
  src: string;
  alt: string;
}

interface HeroSlideshowProps {
  slides: HeroSlide[];
}

export function HeroSlideshow({ slides }: HeroSlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  if (slides.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-slate-400">
        Chưa có hình ảnh sản phẩm
      </div>
    );
  }

  return (
    <>
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className="absolute inset-0 transition-all duration-1000 ease-in-out"
          style={{
            opacity: index === currentSlide ? 1 : 0,
            transform: index === currentSlide ? 'scale(1)' : 'scale(1.08)',
          }}
        >
          <Image 
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={index === 0}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      ))}
      
      {/* Slide Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 bg-white shadow-lg'
                  : 'w-2 bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </>
  );
}
