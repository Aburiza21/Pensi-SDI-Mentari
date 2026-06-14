"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination, Keyboard, Navigation, EffectCreative, Parallax } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-creative";

interface PageSwiperProps {
  children: ReactNode;
}

export default function PageSwiper({ children }: PageSwiperProps) {
  const slides = React.Children.toArray(children);

  return (
    <div className="h-screen w-full relative">
      <style>{`
        /* Number Bullets Pagination - Crayon Style */
        .custom-pagination-container {
          position: fixed !important;
          left: 16px !important;
          top: 16px !important;
          transform: none !important;
          display: flex;
          flex-direction: row;
          gap: 8px;
          z-index: 50;
        }
        
        .custom-pagination-container .swiper-pagination-bullet {
          width: 24px !important;
          height: 24px !important;
          background: #fdfbfb !important;
          border-radius: 255px 15px 225px 15px/15px 225px 15px 255px !important;
          border: 2px solid #1A535C !important;
          box-shadow: 1.5px 1.5px 0px #F5A623 !important;
          color: #1A535C !important;
          font-family: var(--font-caveat), 'Comic Sans MS', 'Chalkboard SE', cursive !important;
          font-size: 0.85rem !important;
          font-weight: 900 !important;
          display: flex !important;
          align-items: center;
          justify-content: center;
          opacity: 0.6 !important;
          cursor: pointer;
          transition: all 0.3s ease !important;
          transform: rotate(-3deg) !important;
        }

        .custom-pagination-container .swiper-pagination-bullet:hover {
          opacity: 0.8 !important;
          transform: rotate(2deg) scale(1.1) !important;
        }

        .custom-pagination-container .swiper-pagination-bullet.swiper-pagination-bullet-active {
          opacity: 1 !important;
          background: var(--active-bg, #FF6B6B) !important;
          color: white !important;
          border-color: #1A535C !important;
          box-shadow: 2px 2px 0px #1A535C !important;
          transform: rotate(6deg) scale(1.2) !important;
        }
        
        /* Custom navigation button disabled state */
        .swiper-button-disabled {
          opacity: 0.3 !important;
          cursor: not-allowed !important;
          pointer-events: none !important;
          box-shadow: 0px 0px 0px transparent !important;
          transform: translateY(2px) !important;
        }

        /* Responsive scaling for larger screens */
        @media (min-width: 640px) {
          .custom-pagination-container {
            gap: 12px;
            left: 24px !important;
            top: 24px !important;
          }
          .custom-pagination-container .swiper-pagination-bullet {
            width: 32px !important;
            height: 32px !important;
            font-size: 1.1rem !important;
          }
        }

        @media (min-width: 1024px) {
          .custom-pagination-container {
            gap: 16px;
            left: 32px !important;
            top: 32px !important;
          }
          .custom-pagination-container .swiper-pagination-bullet {
            width: 40px !important;
            height: 40px !important;
            font-size: 1.4rem !important;
          }
        }
      `}</style>
      
      {/* Custom Pagination Container */}
      <div className="custom-pagination-container"></div>
      
      <Swiper
        direction="vertical"
        slidesPerView={1}
        spaceBetween={0}
        parallax={true}
        mousewheel={{
          forceToAxis: true,
          sensitivity: 1,
        }}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          el: '.custom-pagination-container',
          clickable: true,
          renderBullet: function (index, className) {
            const colors = ['#FF6B6B', '#4ECDC4', '#FFD166', '#F5A623', '#95D5B2', '#A87BDE'];
            const activeColor = colors[index % colors.length];
            return '<span class="' + className + '" style="--active-bg: ' + activeColor + ';">' + (index + 1) + '</span>';
          }
        }}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        effect={"creative"}
        speed={1200}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, "-120%", -500],
            rotate: [85, 0, -15],
            scale: 0.8,
            opacity: 0,
          },
          next: {
            shadow: true,
            translate: [0, "120%", -500],
            rotate: [-85, 0, 15],
            scale: 0.8,
            opacity: 0,
          },
        }}
        modules={[Mousewheel, Pagination, Keyboard, Navigation, EffectCreative, Parallax]}
        className="h-full w-full"
      >
        {slides.map((child, index) => (
          <SwiperSlide key={index} className="h-full w-full overflow-y-auto flex flex-col justify-center items-center">
            <div className="w-full max-w-[100vw]">
              {child}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Scribble Navigation Buttons (Shrunk) */}
      <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-2">
        <button 
          className="swiper-button-prev-custom group bg-[#F5A623] hover:bg-[#FF6B6B] p-2 text-white transition-all border-2 border-[#1A535C] shadow-[3px_3px_0px_#1A535C] hover:shadow-[1px_1px_0px_#1A535C] hover:translate-y-[2px] flex items-center justify-center transform rotate-2" 
          style={{ borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px' }}
        >
          {/* Hand-drawn UP arrow SVG */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-y-1 transition-transform">
            <path d="M 12 20 C 11 15, 13 8, 12 4 M 5 11 C 8 8, 10 5, 12 3 C 14 5, 16 8, 19 11" />
          </svg>
        </button>

        <button 
          className="swiper-button-next-custom group bg-[#4ECDC4] hover:bg-[#FF6B6B] p-2 text-white transition-all border-2 border-[#1A535C] shadow-[3px_3px_0px_#1A535C] hover:shadow-[1px_1px_0px_#1A535C] hover:translate-y-[2px] flex items-center justify-center transform -rotate-2" 
          style={{ borderRadius: '15px 255px 15px 225px/225px 15px 255px 15px' }}
        >
          {/* Hand-drawn DOWN arrow SVG */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-y-1 transition-transform">
            <path d="M 12 4 C 13 9, 11 16, 12 20 M 5 13 C 8 16, 10 19, 12 21 C 14 19, 16 16, 19 13" />
          </svg>
        </button>
      </div>

      {/* Guest Book Link Button */}
      <Link 
        href="/buku-tamu"
        className="fixed top-4 right-[72px] sm:right-24 z-[900] bg-[#FF6B6B] p-3 rounded-full border-[3px] border-[#1A535C] shadow-[3px_3px_0px_#1A535C] hover:-translate-y-1 hover:shadow-[5px_5px_0px_#1A535C] transition-all transform rotate-[3deg] group flex items-center justify-center"
        title="Lihat Daftar Petualang (Buku Tamu)"
      >
        <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:animate-[wobble_1s_ease-in-out_infinite]" />
      </Link>
    </div>
  );
}
