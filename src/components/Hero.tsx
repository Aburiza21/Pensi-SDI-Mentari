"use client";

import Image from "next/image";
import { useSwiperSlide, useSwiper } from "swiper/react";
import { Star, Palette, Music, Camera, Rocket, Smile, Sun } from "lucide-react";
import { ImaginativeDoodles } from "./ImaginativeDoodles";

export default function Hero() {
  const swiperSlide = useSwiperSlide();
  const swiper = useSwiper();
  const isActive = swiperSlide ? swiperSlide.isActive : true;

  return (
    <section className="w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden relative"
      style={{
        backgroundColor: "#FDF9E6",
        backgroundImage: "radial-gradient(#E8D5B5 2px, transparent 2px)",
        backgroundSize: "30px 30px"
      }}
    >
      <ImaginativeDoodles theme="petualangan" />

      {/* Animated Top Date Badge */}
      <div className={`absolute top-[12%] sm:top-[8%] md:top-[6%] w-full flex flex-col items-center z-30 transition-all duration-1000 delay-300 ${isActive ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
        <div className="bg-[#FFD166] border-[3px] sm:border-[4px] border-[#1A535C] px-6 py-2 sm:px-8 sm:py-3 md:px-12 md:py-4 rounded-[255px_15px_225px_15px/15px_225px_15px_255px] shadow-[4px_4px_0px_#1A535C] sm:shadow-[6px_6px_0px_#1A535C] transform rotate-[-2deg] transition-transform mb-2">
          <span className="text-[#1A535C] text-xl sm:text-3xl md:text-5xl font-black uppercase tracking-wider flex items-center gap-2 sm:gap-4" style={{ fontFamily: "var(--font-caveat), cursive" }}>
            <Star className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#FF6B6B] animate-[spin_4s_linear_infinite]" fill="#FF6B6B" /> 23 Juni 2026
          </span>
        </div>
      </div>

      {/* Wild Scribble Background Elements */}
      <svg className="absolute top-[10%] left-[5%] w-[300px] h-[300px] text-[#4ECDC4] opacity-40 pointer-events-none" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 20 100 Q 100 20 180 100 T 20 100" className={`transition-all duration-[3000ms] ${isActive ? 'stroke-dasharray-1000 stroke-dashoffset-0' : 'stroke-dasharray-1000 stroke-dashoffset-1000'}`} style={{ strokeDasharray: 1000, strokeDashoffset: isActive ? 0 : 1000 }} />
      </svg>
      <svg className="absolute bottom-[5%] right-[5%] w-[250px] h-[250px] text-[#FF6B6B] opacity-30 pointer-events-none animate-[spin_15s_linear_infinite]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round">
        <path d="M 50 5 L 50 95 M 5 50 L 95 50 M 18 18 L 82 82 M 18 82 L 82 18" />
      </svg>

      {/* Scattered Floating Icons for Kids Adventure */}
      <Star className={`absolute top-[15%] left-[10%] sm:left-[15%] w-10 h-10 sm:w-14 sm:h-14 text-[#FFD166] z-10 transition-all duration-[2000ms] delay-300 ${isActive ? 'scale-100 rotate-[360deg] opacity-90 animate-pulse' : 'scale-0 rotate-0 opacity-0'}`} fill="#FFD166" stroke="#1A535C" strokeWidth={1.5} />
      <Music className={`absolute top-[20%] right-[10%] sm:right-[15%] w-10 h-10 sm:w-14 sm:h-14 text-[#4ECDC4] z-10 transition-all duration-[2000ms] delay-500 ${isActive ? 'scale-100 -rotate-[15deg] opacity-90 animate-bounce' : 'scale-0 rotate-0 opacity-0'}`} strokeWidth={2} />
      <Palette className={`absolute bottom-[25%] left-[8%] sm:left-[12%] w-12 h-12 sm:w-16 sm:h-16 text-[#FF6B6B] z-10 transition-all duration-[2500ms] delay-700 ${isActive ? 'scale-100 rotate-[20deg] opacity-90' : 'scale-0 rotate-0 opacity-0'}`} strokeWidth={2} />
      <Camera className={`absolute bottom-[35%] right-[8%] sm:right-[12%] w-10 h-10 sm:w-14 sm:h-14 text-[#F5A623] z-10 transition-all duration-[2200ms] delay-600 ${isActive ? 'scale-100 -rotate-[25deg] opacity-90 animate-pulse' : 'scale-0 rotate-0 opacity-0'}`} strokeWidth={2} />
      <Rocket className={`absolute top-[8%] right-[35%] w-12 h-12 sm:w-16 sm:h-16 text-[#1A535C] z-10 transition-all duration-[3000ms] delay-1000 ${isActive ? 'translate-x-[25vw] -translate-y-[25vh] opacity-0' : 'translate-x-0 translate-y-0 opacity-100'}`} strokeWidth={2} />
      <Sun className={`absolute top-[10%] left-[35%] w-12 h-12 sm:w-16 sm:h-16 text-[#FFD166] z-10 transition-all duration-[4000ms] ${isActive ? 'rotate-[180deg] opacity-80' : 'rotate-0 opacity-0'}`} fill="#FFD166" stroke="#1A535C" strokeWidth={1.5} />

      {/* Karakter Perempuan - Kiri (Muncul dari bawah) */}
      <div className={`absolute bottom-[8%] left-[-2%] sm:left-[2%] md:left-[8%] w-[150px] h-[220px] sm:w-[200px] sm:h-[280px] md:w-[250px] md:h-[350px] z-20 transition-all duration-[1500ms] delay-500 cubic-bezier(0.34, 1.56, 0.64, 1) ${isActive ? 'translate-y-0 opacity-100 rotate-[5deg] scale-100' : 'translate-y-32 opacity-0 -rotate-12 scale-50'}`}>
        <Image
          src="/perempuan.png"
          alt="Karakter Perempuan"
          fill
          sizes="(max-width: 768px) 200px, 300px"
          className="object-contain drop-shadow-[6px_6px_0px_rgba(26,83,92,0.4)] hover:scale-105 hover:-rotate-2 transition-transform duration-300"
        />
      </div>

      {/* Karakter Pria - Kanan (Muncul dari bawah) */}
      <div className={`absolute bottom-[8%] right-[-2%] sm:right-[2%] md:right-[8%] w-[150px] h-[220px] sm:w-[200px] sm:h-[280px] md:w-[250px] md:h-[350px] z-20 transition-all duration-[1500ms] delay-700 cubic-bezier(0.34, 1.56, 0.64, 1) ${isActive ? 'translate-y-0 opacity-100 rotate-[-5deg] scale-100' : 'translate-y-32 opacity-0 rotate-12 scale-50'}`}>
        <Image
          src="/pria.png"
          alt="Karakter Pria"
          fill
          sizes="(max-width: 768px) 200px, 300px"
          className="object-contain drop-shadow-[6px_6px_0px_rgba(26,83,92,0.4)] hover:scale-105 hover:rotate-2 transition-transform duration-300"
        />
      </div>

      {/* Desain Utama (Tengah) - Tanpa Card */}
      <div className={`relative w-[110vw] h-[90vh] sm:w-[95vw] sm:h-[85vh] md:w-[90vw] md:h-[88vh] z-10 transition-all duration-[1500ms] cubic-bezier(0.34, 1.56, 0.64, 1) ${isActive ? 'scale-100 opacity-100' : 'scale-50 opacity-0 rotate-12'}`}>
        <Image
          src="/desain.png"
          alt="Desain Utama"
          fill
          className="object-contain drop-shadow-[8px_8px_0px_rgba(26,83,92,0.3)] transition-transform duration-700 hover:scale-[1.03] hover:rotate-1"
          priority
        />
      </div>

      {/* Scroll indicator / Buka Undangan Button */}
      <button 
        onClick={() => swiper.slideNext()}
        className={`z-[999] absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 transition-all duration-1000 delay-1000 cursor-pointer group ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
      >
        <span className="text-white bg-[#FF6B6B] px-4 py-2 rounded-full border-[3px] border-[#1A535C] shadow-[4px_4px_0px_#1A535C] font-black text-sm sm:text-base animate-pulse group-hover:animate-none group-hover:scale-105 group-hover:-rotate-2 transition-all tracking-widest uppercase" style={{ fontFamily: "var(--font-caveat), cursive" }}>
          Buka Undangan
        </span>
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#FF6B6B] drop-shadow-[2px_2px_0px_#1A535C] animate-bounce mt-1 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
    </section>
  );
}
