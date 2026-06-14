"use client";

import { useSwiperSlide } from "swiper/react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { ImaginativeDoodles } from "./ImaginativeDoodles";

export default function Welcome() {
  const swiperSlide = useSwiperSlide();
  const isActive = swiperSlide ? swiperSlide.isActive : true;

  return (
    <section id="welcome" className="w-full min-h-[100dvh] flex flex-col items-center justify-center p-3 sm:p-6 md:p-8 relative overflow-hidden"
      style={{
        backgroundColor: "#6EC1E4",
        backgroundImage: "radial-gradient(rgba(255,255,255,0.3) 2px, transparent 2px)",
        backgroundSize: "30px 30px"
      }}
    >
      <ImaginativeDoodles theme="petualangan" />

      {/* Floating Background Decorations */}
      <div data-swiper-parallax="-300" className="absolute top-[6%] left-[4%] sm:left-[2%] w-16 h-16 sm:w-26 sm:h-26 z-40 pointer-events-none opacity-95 drop-shadow-[6px_6px_0px_rgba(26,83,92,0.35)] animate-[wobble_6s_ease-in-out_infinite]">
        <Image src="/icons/compass-background-design.png" alt="Compass Decor" width={100} height={100} className="object-contain rounded-full" />
      </div>
      <div data-swiper-parallax="-200" className="absolute bottom-[7%] left-[4%] sm:left-[2%] w-16 h-16 sm:w-26 sm:h-26 z-40 pointer-events-none opacity-95 drop-shadow-[6px_6px_0px_rgba(26,83,92,0.35)] animate-smooth-bounce">
        <Image src="/icons/isolated-camping-tent-nature.png" alt="Tent Decor" width={100} height={100} className="object-contain" />
      </div>

      {/* Character Mascot */}
      <div data-swiper-parallax="200" className={`absolute bottom-0 right-14 sm:bottom-0 sm:right-6 md:right-12 w-28 h-28 sm:w-40 sm:h-40 md:w-52 md:h-52 z-20 pointer-events-none transition-all duration-[1200ms] ${isActive ? 'scale-100 translate-y-0 rotate-3 opacity-100' : 'scale-50 translate-y-12 rotate-12 opacity-0'}`}>
        <Image
          src="/chars/1.png"
          alt="Mascot 1"
          width={208}
          height={208}
          className="object-contain"
          style={{ animation: "floatUp 4.5s ease-in-out infinite" }}
        />
      </div>

      {/* Crayon scribbles in the background */}
      <svg className="absolute top-10 left-[-10%] w-[250px] h-[250px] text-[#F5A623] opacity-30 pointer-events-none" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 10 100 C 30 180, 80 20, 100 100 C 120 180, 170 20, 190 100" className={`transition-all duration-[4000ms] ${isActive ? 'stroke-dasharray-1000 stroke-dashoffset-0' : 'stroke-dasharray-1000 stroke-dashoffset-1000'}`} style={{ strokeDasharray: 1000, strokeDashoffset: isActive ? 0 : 1000 }} />
      </svg>
      <svg className="absolute bottom-10 right-[-10%] w-[200px] h-[200px] text-[#4ECDC4] opacity-40 pointer-events-none" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 50 50 Q 150 20 100 100 T 150 150 T 50 150 T 50 50" className={`transition-all duration-[5000ms] ${isActive ? 'stroke-dasharray-1000 stroke-dashoffset-0' : 'stroke-dasharray-1000 stroke-dashoffset-1000'}`} style={{ strokeDasharray: 1000, strokeDashoffset: isActive ? 0 : 1000 }} />
      </svg>

      <div data-swiper-parallax="-100" className="w-full max-w-2xl mx-auto relative z-10 flex flex-col items-center justify-center text-center">

        {/* Wild Scribble Box Effect */}
        <div className="relative w-full">
          {/* Messy background box shadow/stroke */}
          <div className={`absolute inset-0 bg-[#FF6B6B]/20 border-[4px] border-[#8D5A3A] rounded-[255px_15px_225px_15px/15px_225px_15px_255px] transform transition-all duration-[1500ms] ${isActive ? 'rotate-[-2deg] scale-100 opacity-100' : 'rotate-0 scale-90 opacity-0'}`}></div>

          {/* Main Card */}
          <div className={`relative bg-[#fdfbfb] border-[4px] border-[#1A535C] p-5 sm:p-8 rounded-[255px_25px_225px_25px/25px_225px_25px_255px] flex flex-col items-center w-full transform transition-all duration-[1200ms] cubic-bezier(0.34, 1.56, 0.64, 1) ${isActive ? 'scale-100 opacity-100 translate-y-0 rotate-1' : 'scale-75 opacity-0 translate-y-10 -rotate-6'}`}
            style={{ fontFamily: 'var(--font-caveat), "Comic Sans MS", cursive' }}>

            {/* Top Scribble Badge */}
            <div className="absolute -top-4 sm:-top-5 left-1/2 -translate-x-1/2 bg-[#F5A623] text-white px-4 py-1 sm:px-6 sm:py-2 rounded-[255px_15px_225px_15px/15px_225px_15px_255px] font-black uppercase tracking-wider text-xs sm:text-sm shadow-[3px_3px_0px_#D08A1B] border-[2px] border-[#1A535C] flex items-center gap-1 transform transition-transform animate-[wobble_3s_ease-in-out_infinite]">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" /> PENTAS SENI
            </div>

            {/* Scribble Greeting */}
            <h2
              className={`mt-2 sm:mt-0 w-full transition-all duration-1000 delay-300 transform text-[#1B3E1F] font-bold leading-tight
                text-2xl sm:text-3xl md:text-4xl mb-4
                ${isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-90'}`}
            >
              Assalamu&apos;alaikum Warahmatullahi Wabarakatuh
            </h2>

            {/* Crayon Squiggle Divider */}
            <svg className={`w-24 sm:w-32 h-4 mb-4 sm:mb-6 transition-all duration-1000 delay-500 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} viewBox="0 0 100 20" fill="none" stroke="#FF6B6B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 0 10 Q 10 0, 20 10 T 40 10 T 60 10 T 80 10 T 100 10" />
            </svg>

            {/* Body Text */}
            <div
              className="w-full text-[#3E362E] font-medium flex flex-col gap-3 sm:gap-6 leading-tight sm:leading-relaxed text-lg sm:text-xl md:text-2xl"
            >
              <p className={`transition-all duration-1000 delay-700 transform ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                Dengan penuh rasa syukur dan kebahagiaan, kami mengundang Ayah dan Bunda untuk hadir dalam{" "}
                <span className="block mt-1 sm:mt-2 font-bold text-xl sm:text-3xl text-[#F5A623] leading-none py-1 transform rotate-2 hover:-rotate-1 transition-transform" style={{ WebkitTextStroke: "1px #1A535C", textShadow: "2px 2px 0px #1A535C" }}>
                  ARUNIKA ADVENTURE FEST
                </span>
              </p>

              <div className={`bg-[#E8F5E9] p-2 sm:p-4 rounded-[255px_15px_225px_15px/15px_225px_15px_255px] border-[3px] border-dashed border-[#1B3E1F] transition-all duration-1000 delay-900 transform ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-50'} rotate-[-1deg]`}>
                <p>
                  Sebuah momen spesial yang menampilkan kreativitas, keberanian, serta semangat belajar siswa dan siswi{" "}
                  <strong className="text-white font-bold tracking-wide bg-[#FF6B6B] px-2 py-1 rounded-[15px_255px_15px_225px/225px_15px_255px_15px] inline-block mt-1 sm:mt-2 border-[2px] border-[#1A535C] shadow-[2px_2px_0px_#1A535C] transform rotate-2 text-[11px] sm:text-sm">
                    SDIT MENTARI INDONESIA 03
                  </strong>
                </p>
              </div>

              <p className={`transition-all duration-1000 delay-1000 transform ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                Kehadiran Ayah dan Bunda akan menjadi dukungan dan apresiasi terbaik bagi putra-putri tercinta.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
