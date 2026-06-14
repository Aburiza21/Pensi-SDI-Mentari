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
