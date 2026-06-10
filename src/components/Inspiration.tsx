"use client";

import { useSwiperSlide } from "swiper/react";
import { Sparkles } from "lucide-react";
import { ImaginativeDoodles } from "./ImaginativeDoodles";

export default function Inspiration() {
  const swiperSlide = useSwiperSlide();
  const isActive = swiperSlide ? swiperSlide.isActive : true;

  return (
    <section className="w-full min-h-[100dvh] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden"
      style={{
        backgroundColor: "#1A535C", // Chalkboard green
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.05) 39px, rgba(255,255,255,0.05) 40px)",
      }}
    >
      <ImaginativeDoodles theme="percaya_diri" />
      
      {/* Chalk scribbles */}
      <svg className="absolute top-[20%] left-[10%] w-[100px] h-[100px] text-white opacity-20 pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4">
        <path d="M10,50 Q50,10 90,50 T10,50" />
      </svg>
      <svg className="absolute bottom-[20%] right-[10%] w-[120px] h-[120px] text-[#FFE66D] opacity-30 pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4">
        <path d="M50,10 L60,40 L90,50 L60,60 L50,90 L40,60 L10,50 L40,40 Z" />
      </svg>

      <div className={`w-full max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center transition-all duration-[2000ms] ${isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-75'}`}>
        
        <div className="relative border-[4px] border-dashed border-white/50 p-6 sm:p-12 md:p-16 rounded-[255px_15px_225px_15px/15px_225px_15px_255px] bg-[#1A535C]/80 transform rotate-1">
          <Sparkles className={`absolute -top-6 -left-6 w-12 h-12 text-[#FFE66D] transition-transform duration-1000 delay-500 ${isActive ? 'rotate-0 scale-100' : '-rotate-45 scale-0'}`} fill="#FFE66D" />

          <blockquote className="relative">
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight sm:leading-tight md:leading-tight mb-8" style={{ fontFamily: "var(--font-caveat), cursive" }}>
              "Kami percaya setiap anak memiliki{" "}
              <span className="font-black text-[#FFE66D] inline-block transition-transform transform rotate-2 animate-pulse">cahaya</span>{" "}
              dan keunikan yang patut dirayakan."
            </p>
            
            <svg className="w-48 h-6 mx-auto mb-8" viewBox="0 0 100 20" fill="none" stroke="#FF6B6B" strokeWidth="4" strokeLinecap="round">
              <path d="M 0 10 Q 25 0, 50 10 T 100 10" />
            </svg>

            <p className="text-xl sm:text-2xl md:text-3xl text-[#FDF9E6] leading-relaxed font-bold mb-4" style={{ fontFamily: "var(--font-caveat), cursive" }}>
              Melalui Pentas Seni{" "}
              <span className="text-[#FF6B6B] font-black bg-white/10 px-2 rounded-lg inline-block transform -rotate-1 animate-[wobble_3s_ease-in-out_infinite]">ARUNIKA ADVENTURE FEST</span>, mari bersama menyaksikan berbagai karya dan pengalaman seru yang dipersiapkan oleh anak-anak!
            </p>

          </blockquote>
        </div>

      </div>
    </section>
  );
}
