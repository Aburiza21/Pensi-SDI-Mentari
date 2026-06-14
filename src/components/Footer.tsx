"use client";

import { useSwiperSlide } from "swiper/react";
import { Sparkles, Star } from "lucide-react";
import Image from "next/image";
import { ImaginativeDoodles } from "./ImaginativeDoodles";

export default function Footer() {
  const swiperSlide = useSwiperSlide();
  const isActive = swiperSlide ? swiperSlide.isActive : true;

  return (
    <footer className="w-full min-h-[100dvh] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 text-center relative overflow-hidden bg-[#4ECDC4]">
      <ImaginativeDoodles theme="happy" />

      {/* Floating Background Decorations */}
      <div data-swiper-parallax="-300" className="absolute top-[8%] left-[4%] sm:left-[2%] w-16 h-16 sm:w-26 sm:h-26 z-40 pointer-events-none opacity-95 drop-shadow-[6px_6px_0px_rgba(26,83,92,0.35)] animate-[wobble_6s_ease-in-out_infinite]">
        <Image src="/icons/compass-background-design.png" alt="Compass Decor" width={100} height={100} className="object-contain rounded-full" />
      </div>
      <div data-swiper-parallax="-250" className="absolute top-[20%] right-[4%] sm:right-[2%] w-16 h-16 sm:w-26 sm:h-26 z-40 pointer-events-none opacity-95 drop-shadow-[6px_6px_0px_rgba(26,83,92,0.35)] animate-[floatUp_6s_ease-in-out_infinite]">
        <Image src="/icons/cartoon-binocular-flat-vector-illustration-binocular-white-background.png" alt="Binoculars Decor" width={100} height={100} className="object-contain rounded-full" />
      </div>
      <div data-swiper-parallax="-200" className="absolute top-[45%] left-[4%] sm:left-[2%] w-16 h-16 sm:w-26 sm:h-26 z-40 pointer-events-none opacity-95 drop-shadow-[6px_6px_0px_rgba(26,83,92,0.35)] animate-smooth-bounce">
        <Image src="/icons/game-kids-pirate-treasure-chest-vector-illustration.png" alt="Treasure Chest Decor" width={100} height={100} className="object-contain" />
      </div>

      {/* Crayon scribbles */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" preserveAspectRatio="none">
        <path d="M-100,500 C200,100 400,800 1200,200" stroke="#fdfbfb" strokeWidth="15" strokeLinecap="round" fill="none" />
      </svg>

      <div data-swiper-parallax="-180" className={`absolute top-[10%] right-[10%] sm:right-[20%] transition-transform duration-[2000ms] ${isActive ? 'rotate-12 scale-100' : '-rotate-45 scale-0'}`}>
        <Star className="w-12 h-12 sm:w-16 sm:h-16 text-[#FFD166]" fill="#FFD166" strokeWidth={3} stroke="#1A535C" />
      </div>

      <div data-swiper-parallax="-100" className={`w-full max-w-xl mx-auto relative z-10 transition-all duration-1000 delay-300 ${isActive ? 'scale-100 opacity-100 rotate-1' : 'scale-50 opacity-0 -rotate-12'}`}>
        <div className="bg-[#fdfbfb] rounded-[255px_15px_225px_15px/15px_225px_15px_255px] p-4 sm:p-10 shadow-[8px_8px_0px_#1A535C] sm:shadow-[10px_10px_0px_#1A535C] border-[4px] sm:border-[5px] border-[#1A535C] relative z-20">
          <div className="absolute -top-4 -left-3 sm:-top-6 sm:-left-4 bg-[#FF6B6B] text-white border-[3px] sm:border-4 border-[#1A535C] rounded-full p-2 transform -rotate-12 shadow-[4px_4px_0px_#1A535C]">
            <Sparkles className="w-5 h-5 sm:w-8 sm:h-8" />
          </div>

          <h3 className="text-3xl sm:text-6xl font-black text-[#FF6B6B] mb-2 sm:mb-4 mt-2" style={{ fontFamily: "var(--font-caveat), cursive", textShadow: "2px 2px 0px #1A535C" }}>
            Terima Kasih!
          </h3>

          <p className="text-lg sm:text-2xl font-bold text-[#1A535C] leading-snug sm:leading-relaxed mb-4 sm:mb-6" style={{ fontFamily: "var(--font-caveat), cursive" }}>
            Merupakan kebahagiaan bagi kami bila Ayah dan Bunda turut hadir dalam momen istimewa ini.
          </p>

          <svg className="w-24 sm:w-32 h-4 sm:h-6 mx-auto mb-4 sm:mb-6" viewBox="0 0 100 20" fill="none" stroke="#F5A623" strokeWidth="5" strokeLinecap="round">
            <path d="M 0 10 Q 25 0, 50 10 T 100 10" />
          </svg>

          <p className="font-bold text-base sm:text-xl text-[#1A535C] uppercase tracking-wider mb-2 sm:mb-4" style={{ fontFamily: "var(--font-caveat), cursive" }}>
            Sampai Jumpa Di
          </p>

          <div className="relative w-[240px] h-[140px] sm:w-[450px] sm:h-[250px] mx-auto transform -rotate-2 hover:rotate-2 transition-transform drop-shadow-[4px_4px_0px_rgba(26,83,92,0.3)]">
            <Image src="/desain.png" alt="Arunika Adventure Fest" fill className="object-contain" sizes="(max-width: 768px) 240px, 450px" />
          </div>

          <p className="text-lg sm:text-2xl font-black text-[#1A535C]" style={{ fontFamily: "var(--font-caveat), cursive" }}>
            SDIT Mentari Indonesia 03
          </p>
        </div>
      </div>

      {/* Karakter Perempuan - Kiri (Muncul dari bawah) */}
      <div data-swiper-parallax="150" className={`absolute bottom-2 sm:bottom-4 left-[-2%] sm:left-[2%] md:left-[5%] w-[130px] h-[190px] sm:w-[240px] sm:h-[340px] md:w-[300px] md:h-[400px] z-[100] pointer-events-none transition-all duration-[1500ms] delay-500 cubic-bezier(0.34, 1.56, 0.64, 1) ${isActive ? 'translate-y-0 opacity-100 rotate-[5deg] scale-100' : 'translate-y-32 opacity-0 -rotate-12 scale-50'}`}>
        <div className="w-full h-full animate-smooth-bounce" style={{ animationDelay: "0s", animationDuration: "3.5s" }}>
          <Image
            src="/perempuan.png"
            alt="Karakter Perempuan"
            fill
            sizes="(max-width: 768px) 130px, 300px"
            className="object-contain drop-shadow-[6px_6px_0px_rgba(26,83,92,0.5)]"
          />
        </div>
      </div>

      {/* Karakter Pria - Kanan (Muncul dari bawah) */}
      <div data-swiper-parallax="150" className={`absolute bottom-2 sm:bottom-4 right-[-2%] sm:right-[2%] md:right-[5%] w-[130px] h-[190px] sm:w-[240px] sm:h-[340px] md:w-[300px] md:h-[400px] z-[100] pointer-events-none transition-all duration-[1500ms] delay-700 cubic-bezier(0.34, 1.56, 0.64, 1) ${isActive ? 'translate-y-0 opacity-100 rotate-[-5deg] scale-100' : 'translate-y-32 opacity-0 rotate-12 scale-50'}`}>
        <div className="w-full h-full animate-smooth-bounce" style={{ animationDelay: "0.5s", animationDuration: "3.5s" }}>
          <Image
            src="/pria.png"
            alt="Karakter Pria"
            fill
            sizes="(max-width: 768px) 130px, 300px"
            className="object-contain drop-shadow-[6px_6px_0px_rgba(26,83,92,0.5)]"
          />
        </div>
      </div>
    </footer>
  );
}
