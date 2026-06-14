"use client";

import { useSwiperSlide } from "swiper/react";
import Image from "next/image";
import { Calendar, Clock, MapPin, Shirt, Leaf } from "lucide-react";
import { ImaginativeDoodles } from "./ImaginativeDoodles";

const items = [
  { icon: Calendar, label: "Hari/Tanggal", value: "Selasa, 23 Juni 2026", sub: "", color: "#FF6B6B", rotate: "-rotate-2" },
  { icon: Clock, label: "Waktu", value: "08.00 – 11.00 WIB", sub: "", color: "#4ECDC4", rotate: "rotate-2" },
  { icon: MapPin, label: "Lokasi", value: "Hall Sekolah Islam Mentari", sub: "Indonesia Zona 3", color: "#F5A623", rotate: "-rotate-1" },
  { icon: Shirt, label: "Dresscode", value: "Earth Tone", sub: "", color: "#95D5B2", rotate: "rotate-3" },
];

export default function InfoGrid() {
  const swiperSlide = useSwiperSlide();
  const isActive = swiperSlide ? swiperSlide.isActive : true;

  return (
    <section className="w-full min-h-[100dvh] flex flex-col items-center justify-center py-10 px-4 sm:px-6 relative overflow-hidden"
      style={{
        backgroundColor: "#E8F5E9",
        backgroundImage: "radial-gradient(#95D5B2 3px, transparent 3px)",
        backgroundSize: "40px 40px"
      }}
    >
      <ImaginativeDoodles theme="berkembang" />

      {/* Character Mascot */}
      <div className={`absolute bottom-2 left-1 sm:left-6 md:left-12 w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 z-20 pointer-events-none transition-all duration-[1200ms] ${isActive ? 'scale-100 translate-y-0 -rotate-3 opacity-100' : 'scale-50 translate-y-12 rotate-12 opacity-0'}`}>
        <Image
          src="/chars/2.png"
          alt="Mascot 2"
          width={192}
          height={192}
          className="object-contain"
          style={{ animation: "floatUp 5s ease-in-out infinite" }}
        />
      </div>

      {/* Scribble Path */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" preserveAspectRatio="none">
        <path d="M0,100 Q400,300 800,100 T1600,300" fill="none" stroke="#1A535C" strokeWidth="8" strokeDasharray="20 20" />
      </svg>

      <div className="w-full max-w-4xl mx-auto relative z-10 flex flex-col">

        {/* Heading */}
        <div className={`text-center mb-6 sm:mb-12 transition-all duration-1000 ${isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-10 scale-50'}`}>
          <div className="inline-block bg-[#FDF9E6] border-[3px] sm:border-[4px] border-[#1A535C] rounded-[255px_15px_225px_15px/15px_225px_15px_255px] shadow-[4px_4px_0px_#1A535C] sm:shadow-[6px_6px_0px_#1A535C] p-2 px-4 sm:p-6 transform -rotate-2 hover:rotate-1 transition-transform">
            <span className="text-[#F5A623] block mb-1 font-black uppercase text-xs sm:text-base flex items-center justify-center gap-1 sm:gap-2" style={{ fontFamily: "var(--font-caveat), cursive" }}>
              <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-[#4ECDC4]" fill="#4ECDC4" /> Peta Penjelajahan
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#FF6B6B]" style={{ fontFamily: "var(--font-caveat), cursive", textShadow: "1.5px 1.5px 0px #1A535C", WebkitTextStroke: "1px #1A535C" }}>
              Detail Acara
            </h2>
          </div>
        </div>

        {/* Item Grid - 2x2 on mobile to save vertical space */}
        <div className="grid grid-cols-2 gap-3 sm:gap-8">
          {items.map((item, i) => {
            return (
              <div
                key={i}
                className={`relative bg-[#fdfbfb] p-3 sm:p-6 rounded-[255px_25px_225px_25px/25px_225px_25px_255px] flex flex-col sm:flex-row items-center text-center sm:text-left gap-2 sm:gap-4 border-[3px] sm:border-[4px] border-[#1A535C] shadow-[4px_4px_0px_#1A535C] sm:shadow-[6px_6px_0px_#1A535C] transition-all duration-1000 hover:-translate-y-1 hover:shadow-[2px_2px_0px_#1A535C] transform ${item.rotate} ${isActive ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-16'}`}
                style={{ transitionDelay: `${300 + i * 150}ms` }}
              >
                {/* Pin/Tape Effect */}
                <div className="absolute -top-2 sm:-top-3 left-1/2 -translate-x-1/2 w-8 sm:w-12 h-3 sm:h-4 bg-[#FFD166]/80 border-2 border-[#1A535C] transform rotate-[-5deg]"></div>

                <div className={`flex-shrink-0 w-10 h-10 sm:w-16 sm:h-16 rounded-[255px_15px_225px_15px/15px_225px_15px_255px] flex items-center justify-center border-[2px] sm:border-[3px] border-[#1A535C] text-[#1A535C] shadow-[2px_2px_0px_#1A535C] sm:shadow-[3px_3px_0px_#1A535C] transform rotate-[10deg]`} style={{ backgroundColor: item.color }}>
                  <item.icon className="w-5 h-5 sm:w-8 sm:h-8 text-white" strokeWidth={2.5} />
                </div>

                <div className="flex-1 font-sans flex flex-col justify-center">
                  <p className="text-sm sm:text-lg tracking-wider text-[#FF6B6B] uppercase font-black mb-0 sm:mb-0.5 leading-tight" style={{ fontFamily: "var(--font-caveat), cursive" }}>
                    {item.label}
                  </p>
                  <p className="text-xl sm:text-3xl font-black text-[#1A535C] leading-tight mt-0.5" style={{ fontFamily: "var(--font-caveat), cursive" }}>
                    {item.value}
                  </p>
                  {item.sub && (
                    <p className="text-xl sm:text-3xl font-black text-[#1A535C] leading-tight mt-0.5" style={{ fontFamily: "var(--font-caveat), cursive" }}>
                      {item.sub}
                    </p>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
