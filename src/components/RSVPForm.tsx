"use client";

import { useEffect, useRef, useState } from "react";
import { useSwiperSlide } from "swiper/react";
import Image from "next/image";
import { Check, Send, Pencil, PartyPopper, X } from "lucide-react";
import { ImaginativeDoodles } from "./ImaginativeDoodles";

import { saveGuestBookEntry } from "@/app/actions";

type Step = "form" | "attendance" | "submitted";

export default function RSVPForm() {
  const [parentName, setParentName] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [step, setStep] = useState<Step>("form");
  const [attendanceChosen, setAttendanceChosen] = useState<"hadir" | "tidak_hadir" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);

  const STORAGE_KEY = "rsvp_pensi_submission";

  // Restore dari localStorage saat pertama load
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as {
          id?: string;
          parentName?: string;
          studentName: string;
          studentClass?: string;
          attendance: "hadir" | "tidak_hadir";
        };
        if (parsed.studentName && parsed.attendance) {
          setParentName(parsed.parentName || "");
          setStudentName(parsed.studentName);
          setStudentClass(parsed.studentClass || "");
          setAttendanceChosen(parsed.attendance);
          if (parsed.id) {
            setSavedId(parsed.id);
          }
          setStep("submitted");
        }
      }
    } catch {
      // localStorage tidak tersedia atau data corrupt, abaikan
    }
  }, []);

  const formRef = useRef<HTMLFormElement>(null);
  const swiperSlide = useSwiperSlide();
  const isActive = swiperSlide ? swiperSlide.isActive : true;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("attendance");
  };

  const handleAttendance = async (attendance: "hadir" | "tidak_hadir") => {
    setIsSubmitting(true);

    const result = await saveGuestBookEntry({
      id: savedId || undefined,
      parentName,
      studentName,
      studentClass,
      attendance,
    });

    setIsSubmitting(false);

    if (result.success) {
      setAttendanceChosen(attendance);
      setStep("submitted");
      if (result.id) {
        setSavedId(result.id);
      }
      // Simpan ke localStorage agar tidak perlu isi ulang setelah refresh
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          id: result.id || savedId,
          parentName,
          studentName,
          studentClass,
          attendance,
        }));
      } catch {
        // abaikan jika localStorage penuh / tidak tersedia
      }
    } else {
      alert("Oops! Sepertinya ada gangguan sinyal ke markas. Coba lagi ya!");
    }
  };

  const animationClass = isActive
    ? "scale-100 opacity-100 translate-y-0 rotate-[-1deg]"
    : "scale-50 opacity-0 translate-y-24 rotate-[10deg]";

  return (
    <section
      className="w-full min-h-[100dvh] flex flex-col items-center justify-center p-3 sm:p-6 md:p-8 relative overflow-hidden"
      style={{
        backgroundColor: "#FFE66D",
        backgroundImage: "linear-gradient(#F5A623 2px, transparent 2px)",
        backgroundSize: "100% 40px",
      }}
    >
      <ImaginativeDoodles theme="happy" />

      {/* Character Mascot */}
      <div className={`absolute bottom-2 left-1 sm:left-6 md:left-12 w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 z-20 pointer-events-none transition-all duration-[1200ms] ${isActive ? 'scale-100 translate-y-0 -rotate-3 opacity-100' : 'scale-50 translate-y-12 rotate-12 opacity-0'}`}>
        <Image
          src="/chars/4.png"
          alt="Mascot 4"
          width={192}
          height={192}
          className="object-contain"
          style={{ animation: "floatUp 4.8s ease-in-out infinite" }}
        />
      </div>

      {/* Red vertical margin line for paper effect */}
      <div className="absolute left-[10%] sm:left-[15%] top-0 bottom-0 w-1 bg-[#FF6B6B]/40"></div>

      <div
        className={`w-full max-w-2xl mx-auto relative z-10 transition-all duration-[1500ms] cubic-bezier(0.34, 1.56, 0.64, 1) ${animationClass}`}
      >
        <div className="bg-[#fdfbfb] rounded-[255px_15px_225px_15px/15px_225px_15px_255px] p-4 sm:p-10 shadow-[6px_6px_0px_#1A535C] sm:shadow-[10px_10px_0px_#1A535C] border-4 sm:border-[5px] border-[#1A535C]">

          {/* Header */}
          <div className="text-center mb-4 sm:mb-8 relative">
            <div className="absolute -top-8 -right-2 sm:-top-10 sm:-right-4 bg-[#FF6B6B] w-9 h-9 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-4 border-[#1A535C] transform rotate-12 shadow-[3px_3px_0px_#1A535C] sm:shadow-[4px_4px_0px_#1A535C]">
              <Pencil className="text-white w-4 h-4 sm:w-6 sm:h-6" />
            </div>
            <h2
              className="text-3xl sm:text-6xl font-black text-[#1A535C] mb-1 sm:mb-2"
              style={{ fontFamily: "var(--font-caveat), cursive" }}
            >
              Buku Tamu Penjelajah!
            </h2>
            <p
              className="text-lg sm:text-3xl text-[#1A535C]/80 font-bold"
              style={{ fontFamily: "var(--font-caveat), cursive" }}
            >
              {step === "form"
                ? "Isi data diri di bawah ini untuk memulai petualangan."
                : step === "attendance"
                  ? "Apakah Ayah/Bunda bisa menghadiri penjelajahan ini?"
                  : attendanceChosen === "hadir"
                    ? "Sampai jumpa di lokasi petualangan! 🗺️"
                    : "Semoga kita bisa bertemu di lain waktu! 🌟"}
            </p>
          </div>

          {/* ── STEP 1: Form data diri ── */}
          {step === "form" && (
            <form ref={formRef} onSubmit={handleNextStep} className="space-y-4 sm:space-y-6">
              {[
                { label: "Nama Komandan (Wali Murid)", value: parentName, set: setParentName },
                { label: "Nama Petualang (Anak)", value: studentName, set: setStudentName },
                { label: "Markas (Kelas)", value: studentClass, set: setStudentClass },
              ].map((input, idx) => (
                <div key={idx} className="relative z-20">
                  <label
                    className="block text-[#1A535C] font-black text-lg sm:text-2xl mb-0.5 ml-2 transform -rotate-1"
                    style={{ fontFamily: "var(--font-caveat), cursive" }}
                  >
                    {input.label}
                  </label>
                  <input
                    type="text"
                    required
                    value={input.value}
                    onChange={(e) => input.set(e.target.value)}
                    className="w-full bg-[#fdfbfb] border-[3px] sm:border-[4px] border-[#1A535C] rounded-[255px_15px_225px_15px/15px_225px_15px_255px] px-3 py-2 sm:px-4 sm:py-3.5 font-bold text-lg sm:text-2xl text-[#1A535C] focus:outline-none focus:ring-0 focus:border-[#FF6B6B] transition-colors shadow-[3px_3px_0px_rgba(26,83,92,0.3)] sm:shadow-[4px_4px_0px_rgba(26,83,92,0.3)]"
                    style={{ fontFamily: "var(--font-caveat), cursive" }}
                  />
                </div>
              ))}

              <button
                type="submit"
                className={`w-full mt-3 bg-[#FF6B6B] hover:bg-[#FF8787] text-xl sm:text-3xl font-black py-3 sm:py-4 rounded-[255px_15px_225px_15px/15px_225px_15px_255px] border-4 sm:border-[5px] border-[#1A535C] shadow-[6px_6px_0px_#1A535C] sm:shadow-[8px_8px_0px_#1A535C] transition-all flex items-center justify-center gap-2 sm:gap-3 ${isActive ? "animate-[wobble_3s_ease-in-out_infinite]" : ""} hover:translate-y-1 hover:shadow-[3px_3px_0px_#1A535C] sm:hover:shadow-[4px_4px_0px_#1A535C] transform rotate-2 relative z-20`}
                style={{ fontFamily: "var(--font-caveat), cursive" }}
              >
                LANJUT <Send className="w-5 h-5 sm:w-8 sm:h-8" />
              </button>
            </form>
          )}

          {/* ── STEP 2: Pilih kehadiran ── */}
          {step === "attendance" && (
            <div className="flex flex-col items-center gap-4 sm:gap-6 py-2 sm:py-4">
              {/* Ringkasan data */}
              <div className="w-full bg-[#FFE66D]/60 border-[3px] border-[#1A535C] rounded-[30px_5px_30px_5px/5px_30px_5px_30px] px-4 py-2 sm:px-5 sm:py-3 text-center">
                <p className="text-[#1A535C] font-bold text-base sm:text-xl" style={{ fontFamily: "var(--font-caveat), cursive" }}>
                  👤 <strong>{parentName}</strong> &amp; 🧒 <strong>{studentName}</strong> ({studentClass})
                </p>
              </div>

              <p
                className="text-xl sm:text-3xl font-black text-[#1A535C] text-center"
                style={{ fontFamily: "var(--font-caveat), cursive" }}
              >
                Silakan konfirmasi kehadiran Ayah/Bunda di bawah ini:
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 w-full">
                {/* Tombol HADIR */}
                <button
                  id="btn-hadir"
                  disabled={isSubmitting}
                  onClick={() => handleAttendance("hadir")}
                  className={`flex-1 flex flex-col items-center justify-center gap-1.5 sm:gap-2 py-4 sm:py-6 bg-[#4ECDC4] hover:bg-[#3DBDB4] text-xl sm:text-3xl text-white font-black rounded-[255px_15px_225px_15px/15px_225px_15px_255px] border-4 sm:border-[5px] border-[#1A535C] shadow-[6px_6px_0px_#1A535C] sm:shadow-[8px_8px_0px_#1A535C] hover:translate-y-1 hover:shadow-[3px_3px_0px_#1A535C] sm:hover:shadow-[4px_4px_0px_#1A535C] transition-all transform -rotate-2 ${isSubmitting ? "opacity-60 cursor-not-allowed" : "animate-[wobble_3s_ease-in-out_infinite]"}`}
                  style={{ fontFamily: "var(--font-caveat), cursive" }}
                >
                  <PartyPopper className="w-8 h-8 sm:w-12 sm:h-12 drop-shadow-md" />
                  HADIR! 🎉
                </button>

                {/* Tombol TIDAK HADIR */}
                <button
                  id="btn-tidak-hadir"
                  disabled={isSubmitting}
                  onClick={() => handleAttendance("tidak_hadir")}
                  className={`flex-1 flex flex-col items-center justify-center gap-1.5 sm:gap-2 py-4 sm:py-6 bg-[#FF6B6B] hover:bg-[#FF8787] text-xl sm:text-3xl text-white font-black rounded-[255px_15px_225px_15px/15px_225px_15px_255px] border-4 sm:border-[5px] border-[#1A535C] shadow-[6px_6px_0px_#1A535C] sm:shadow-[8px_8px_0px_#1A535C] hover:translate-y-1 hover:shadow-[3px_3px_0px_#1A535C] sm:hover:shadow-[4px_4px_0px_#1A535C] transition-all transform rotate-2 ${isSubmitting ? "opacity-60 cursor-not-allowed" : ""}`}
                  style={{ fontFamily: "var(--font-caveat), cursive" }}
                >
                  <X className="w-8 h-8 sm:w-12 sm:h-12 drop-shadow-md" />
                  TIDAK HADIR 😢
                </button>
              </div>

              {isSubmitting && (
                <p className="text-[#1A535C] font-bold text-lg sm:text-xl animate-bounce" style={{ fontFamily: "var(--font-caveat), cursive" }}>
                  Mengirim misi... 🚀
                </p>
              )}

              {/* Kembali ke form */}
              <button
                onClick={() => setStep("form")}
                disabled={isSubmitting}
                className="text-[#1A535C]/60 hover:text-[#1A535C] text-base sm:text-lg font-bold underline underline-offset-4 transition-colors"
                style={{ fontFamily: "var(--font-caveat), cursive" }}
              >
                ← Edit data
              </button>
            </div>
          )}

          {/* ── STEP 3: Sukses ── */}
          {step === "submitted" && (
            <div className="flex flex-col items-center justify-center text-center py-4 sm:py-8 overflow-hidden">
              {attendanceChosen === "hadir" ? (
                // ── HADIR ──
                <>
                  {/* Icon with pop-in + pulse ring */}
                  <div className="relative mb-4 sm:mb-7">
                    {/* Pulsing ring */}
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{ animation: "shimmer 1.8s ease-out infinite", border: "4px solid #4ECDC4", borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
                    />
                    <div
                      className="w-16 h-16 sm:w-24 sm:h-24 bg-[#4ECDC4] rounded-[255px_15px_225px_15px/15px_225px_15px_255px] flex items-center justify-center border-[4px] border-[#1A535C] relative z-10"
                      style={{ animation: "fadeScaleIn 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards, shimmer 1.8s 0.7s ease-out infinite", boxShadow: "4px 4px 0px #1A535C sm:box-shadow: 6px 6px 0px #1A535C" }}
                    >
                      <PartyPopper className="w-8 h-8 sm:w-12 sm:h-12 text-white drop-shadow-md" strokeWidth={2} />
                    </div>
                    {/* Confetti particles */}
                    <span className="absolute -top-1 -left-2 text-xl sm:text-2xl pointer-events-none" style={{ animation: "confetti1 1s 0.5s ease-out forwards", opacity: 0 }}>🎊</span>
                    <span className="absolute -top-2 -right-1 text-lg sm:text-xl pointer-events-none" style={{ animation: "confetti2 1.1s 0.6s ease-out forwards", opacity: 0 }}>✨</span>
                    <span className="absolute top-0 right-[-24px] sm:right-[-28px] text-base sm:text-lg pointer-events-none" style={{ animation: "confetti3 0.9s 0.7s ease-out forwards", opacity: 0 }}>🎉</span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-2xl sm:text-5xl font-black text-[#1A535C] mb-2 sm:mb-3"
                    style={{ fontFamily: "var(--font-caveat), cursive", animation: "textReveal 0.5s 0.4s cubic-bezier(0.34,1.56,0.64,1) both" }}
                  >
                    Yeay, sampai jumpa di Arunika Adventure Fest Ayah/Bunda! 🎉
                  </h3>

                  {/* Body text */}
                  <p
                    className="text-base sm:text-2xl text-[#1A535C]/80 font-bold max-w-xs sm:max-w-sm"
                    style={{ fontFamily: "var(--font-caveat), cursive", animation: "textReveal 0.5s 0.65s ease both" }}
                  >
                    Kami tunggu kehadiran Ayah/Bunda <strong>{studentName}</strong> di lokasi petualangan!
                  </p>

                  {/* Floating emojis */}
                  <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-5 text-2xl sm:text-4xl">
                    <span style={{ animation: "floatUp 2s 0.8s ease-in-out infinite", display: "inline-block" }}>🚀</span>
                    <span style={{ animation: "floatUp 2s 1.1s ease-in-out infinite", display: "inline-block" }}>🎊</span>
                    <span style={{ animation: "floatUp 2s 1.4s ease-in-out infinite", display: "inline-block" }}>✨</span>
                  </div>
                </>
              ) : (
                // ── TIDAK HADIR ──
                <>
                  {/* Icon with sad drop-in + soft pulse */}
                  <div className="relative mb-2.5 sm:mb-5">
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{ animation: "shimmerRed 2s 0.8s ease-out infinite", border: "4px solid #FF6B6B", borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
                    />
                    <div
                      className="w-16 h-16 sm:w-24 sm:h-24 bg-[#FF6B6B] rounded-[255px_15px_225px_15px/15px_225px_15px_255px] flex items-center justify-center border-[4px] border-[#1A535C] relative z-10"
                      style={{ animation: "sadDrop 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards, shimmerRed 2s 0.8s ease-out infinite", boxShadow: "4px 4px 0px #1A535C sm:box-shadow: 6px 6px 0px #1A535C" }}
                    >
                      <Check className="w-8 h-8 sm:w-12 sm:h-12 text-white drop-shadow-md" strokeWidth={4} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-2xl sm:text-5xl font-black text-[#1A535C] mb-2 sm:mb-3"
                    style={{ fontFamily: "var(--font-caveat), cursive", animation: "textReveal 0.5s 0.4s cubic-bezier(0.34,1.56,0.64,1) both" }}
                  >
                    Sayang sekali Ayah/Bunda tidak dapat hadir di Arunika Adventure Fest ini 😢
                  </h3>

                  {/* Body text */}
                  <p
                    className="text-base sm:text-2xl text-[#1A535C]/80 font-bold max-w-xs sm:max-w-sm"
                    style={{ fontFamily: "var(--font-caveat), cursive", animation: "textReveal 0.5s 0.65s ease both" }}
                  >
                    Terima kasih Ayah/Bunda <strong>{studentName}</strong> sudah konfirmasi. Semoga kita bisa bertemu di waktu dan kesempatan seru lainnya
                  </p>

                  {/* Floating emojis */}
                  <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-5 text-2xl sm:text-4xl">
                    <span style={{ animation: "floatUp 2.5s 0.9s ease-in-out infinite", display: "inline-block" }}>🌟</span>
                    <span style={{ animation: "floatUp 2.5s 1.2s ease-in-out infinite", display: "inline-block" }}>💙</span>
                    <span style={{ animation: "floatUp 2.5s 1.5s ease-in-out infinite", display: "inline-block" }}>🌈</span>
                  </div>
                </>
              )}

              {/* Tombol Ubah Pilihan Kehadiran */}
              <button
                onClick={() => setStep("attendance")}
                className="mt-6 sm:mt-8 bg-[#1A535C] hover:bg-[#2A636C] text-[#fdfbfb] hover:text-white text-lg sm:text-2xl font-black px-4 py-2 sm:px-6 sm:py-3 rounded-[255px_15px_225px_15px/15px_225px_15px_255px] border-4 sm:border-[5px] border-[#1A535C] shadow-[3px_3px_0px_rgba(26,83,92,0.3)] sm:shadow-[4px_4px_0px_rgba(26,83,92,0.3)] hover:translate-y-0.5 hover:shadow-[2px_2px_0px_rgba(26,83,92,0.3)] transition-all transform -rotate-1 relative z-20"
                style={{ fontFamily: "var(--font-caveat), cursive" }}
              >
                Ubah Pilihan Kehadiran 🔄
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tombol isi ulang — hanya muncul di step submitted */}
      {step === "submitted" && (
        <div
          className="mt-3 sm:mt-4 text-center relative z-10"
          style={{ animation: "textReveal 0.4s 1.2s ease both" }}
        >
          <button
            onClick={() => {
              try { localStorage.removeItem(STORAGE_KEY); } catch { }
              setStep("form");
              setParentName("");
              setStudentName("");
              setStudentClass("");
              setAttendanceChosen(null);
              setSavedId(null);
            }}
            className="text-[#1A535C]/50 hover:text-[#1A535C] text-sm sm:text-base font-bold underline underline-offset-4 transition-colors"
            style={{ fontFamily: "var(--font-caveat), cursive" }}
          >
            Bukan kamu? Isi ulang →
          </button>
        </div>
      )}
    </section>
  );
}
