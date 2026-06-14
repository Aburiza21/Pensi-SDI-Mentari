import Image from "next/image";
import Hero from "@/components/Hero";
import Welcome from "@/components/Welcome";
import InfoGrid from "@/components/InfoGrid";
import Inspiration from "@/components/Inspiration";
import RSVPForm from "@/components/RSVPForm";
import Footer from "@/components/Footer";
import PageSwiper from "@/components/PageSwiper";

export default function Home() {
  return (
    <main className="h-screen w-full overflow-hidden relative bg-[#FAF9F6]">
      {/* Global Floating Background / Overlay Decoration (Pointer events disabled) */}
      <div className="absolute top-[8%] left-[-16px] sm:left-[2%] w-12 h-12 sm:w-20 sm:h-20 z-40 pointer-events-none opacity-25 sm:opacity-80 animate-[wobble_6s_ease-in-out_infinite]">
        <Image src="/icons/compass-background-design.png" alt="Compass Decor" width={80} height={80} className="object-contain rounded-full shadow-lg" />
      </div>
      <div className="absolute top-[25%] right-[-16px] sm:right-[2%] w-14 h-14 sm:w-24 sm:h-24 z-40 pointer-events-none opacity-25 sm:opacity-80 animate-[floatUp_6s_ease-in-out_infinite]">
        <Image src="/icons/cartoon-binocular-flat-vector-illustration-binocular-white-background.png" alt="Binoculars Decor" width={96} height={96} className="object-contain rounded-full shadow-lg" />
      </div>
      <div className="absolute bottom-[20%] left-[-16px] sm:left-[2%] w-14 h-14 sm:w-24 sm:h-24 z-40 pointer-events-none opacity-20 sm:opacity-75 animate-bounce">
        <Image src="/icons/isolated-camping-tent-nature.png" alt="Tent Decor" width={96} height={96} className="object-contain" />
      </div>
      <div className="absolute bottom-[8%] right-[-16px] sm:right-[2%] w-14 h-14 sm:w-24 sm:h-24 z-40 pointer-events-none opacity-25 sm:opacity-80 animate-[wobble_5s_ease-in-out_infinite]">
        <Image src="/icons/opening-treasures-chest-closing-crate-wooden-safe-mobile-interface-vector-illustration.png" alt="Chest Decor" width={96} height={96} className="object-contain" />
      </div>

      <PageSwiper>
        <Hero />
        <Welcome />
        <InfoGrid />
        <Inspiration />
        <RSVPForm />
        <Footer />
      </PageSwiper>
    </main>
  );
}
