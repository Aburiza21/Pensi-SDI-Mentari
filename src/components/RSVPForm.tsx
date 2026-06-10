"use client";

import { useRef, useState } from "react";
import { useSwiperSlide } from "swiper/react";
import { Check, Send, Pencil } from "lucide-react";
import { ImaginativeDoodles } from "./ImaginativeDoodles";

import { saveGuestBookEntry } from "@/app/actions";

export default function RSVPForm() {
  const [parentName, setParentName] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const formRef = useRef<HTMLFormElement>(null);
  const swiperSlide = useSwiperSlide();
  const isActive = swiperSlide ? swiperSlide.isActive : true;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const result = await saveGuestBookEntry({
      parentName,
      studentName,
      studentClass
    });
    
    setIsSubmitting(false);
    
    if (result.success) {
      setSubmitted(true);
    } else {
      alert("Oops! Sepertinya ada gangguan sinyal ke markas. Coba lagi ya!");
    }
  };

  return (
    <section className="w-full min-h-[100dvh] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden"
      style={{
        backgroundColor: "#FFE66D",
        backgroundImage: "linear-gradient(#F5A623 2px, transparent 2px)",
        backgroundSize: "100% 40px", // Lined paper effect
      }}
    >
      <ImaginativeDoodles theme="happy" />

      {/* Red vertical margin line for paper effect */}
      <div className="absolute left-[10%] sm:left-[15%] top-0 bottom-0 w-1 bg-[#FF6B6B]/40"></div>

      <div className={`w-full max-w-2xl mx-auto relative z-10 transition-all duration-[1500ms] cubic-bezier(0.34, 1.56, 0.64, 1) ${isActive ? 'scale-100 opacity-100 translate-y-0 rotate-[-1deg]' : 'scale-50 opacity-0 translate-y-24 rotate-[10deg]'}`}>
        
        <div className="bg-[#fdfbfb] rounded-[255px_15px_225px_15px/15px_225px_15px_255px] p-6 sm:p-10 shadow-[10px_10px_0px_#1A535C] border-[5px] border-[#1A535C]">
          
          <div className="text-center mb-6 sm:mb-8 relative">
            <div className="absolute -top-10 -right-4 bg-[#FF6B6B] w-12 h-12 rounded-full flex items-center justify-center border-4 border-[#1A535C] transform rotate-12 shadow-[4px_4px_0px_#1A535C]">
              <Pencil className="text-white w-6 h-6" />
            </div>
            <h2 className="text-4xl sm:text-6xl font-black text-[#1A535C] mb-2" style={{ fontFamily: "var(--font-caveat), cursive" }}>
              Buku Tamu Penjelajah!
            </h2>
            <p className="text-xl sm:text-3xl text-[#1A535C]/80 font-bold" style={{ fontFamily: "var(--font-caveat), cursive" }}>
              Isi data diri di bawah ini untuk memulai petualangan.
            </p>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-8 sm:py-10 animate-[bounce_1s_ease-in-out]">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#4ECDC4] rounded-[255px_15px_225px_15px/15px_225px_15px_255px] flex items-center justify-center mb-4 sm:mb-6 shadow-[6px_6px_0px_#1A535C] border-[4px] border-[#1A535C] transform rotate-12">
                <Check className="w-10 h-10 text-white" strokeWidth={4} />
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-[#1A535C] mb-2" style={{ fontFamily: "var(--font-caveat), cursive" }}>Misi Diterima! 🎉</h3>
              <p className="text-lg text-[#1A535C]/80 font-bold" style={{ fontFamily: "var(--font-caveat), cursive" }}>Sampai jumpa di lokasi petualangan!</p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {[ 
                { label: "Nama Komandan (Wali Murid)", value: parentName, set: setParentName },
                { label: "Nama Petualang (Anak)", value: studentName, set: setStudentName },
                { label: "Markas (Kelas)", value: studentClass, set: setStudentClass }
              ].map((input, idx) => (
                <div key={idx} className="relative z-20">
                  <label className="block text-[#1A535C] font-black text-xl sm:text-2xl mb-1 ml-2 transform -rotate-1" style={{ fontFamily: "var(--font-caveat), cursive" }}>{input.label}</label>
                  <input 
                    type="text" 
                    required
                    value={input.value}
                    onChange={(e) => input.set(e.target.value)}
                    className="w-full bg-[#fdfbfb] border-[4px] border-[#1A535C] rounded-[255px_15px_225px_15px/15px_225px_15px_255px] px-4 py-3 sm:py-4 font-bold text-xl sm:text-2xl text-[#1A535C] focus:outline-none focus:ring-0 focus:border-[#FF6B6B] transition-colors shadow-[4px_4px_0px_rgba(26,83,92,0.3)]" 
                    style={{ fontFamily: "var(--font-caveat), cursive" }}
                  />
                </div>
              ))}

              <button disabled={isSubmitting} type="submit" className={`w-full mt-4 bg-[#FF6B6B] hover:bg-[#FF8787] text-white text-2xl sm:text-3xl font-black py-4 rounded-[255px_15px_225px_15px/15px_225px_15px_255px] border-[5px] border-[#1A535C] shadow-[8px_8px_0px_#1A535C] transition-all flex items-center justify-center gap-3 ${isActive && !isSubmitting ? 'animate-[wobble_3s_ease-in-out_infinite]' : ''} hover:translate-y-1 hover:shadow-[4px_4px_0px_#1A535C] transform rotate-2 relative z-20 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`} style={{ fontFamily: "var(--font-caveat), cursive" }}>
                {isSubmitting ? "MENGIRIM..." : "KIRIM PESAN"} <Send className={`w-6 h-6 sm:w-8 sm:h-8 ${isSubmitting ? 'animate-bounce' : ''}`} />
              </button>
            </form>
          )}

        </div>
      </div>
    </section>
  );
}
