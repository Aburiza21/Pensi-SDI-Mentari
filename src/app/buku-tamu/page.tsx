import { getGuestBookEntries } from "@/app/actions";
import { Star, School, User, CalendarDays } from "lucide-react";
import Link from "next/link";
import GuestBookClient from "@/components/GuestBookClient";

// Set to dynamic so it fetches fresh data on every request instead of caching statically
export const dynamic = 'force-dynamic';

export default async function GuestBookPage() {
  const entries = await getGuestBookEntries();

  return (
    <div className="min-h-screen p-6 sm:p-10" style={{
      backgroundColor: "#6EC1E4",
      backgroundImage: "radial-gradient(rgba(255,255,255,0.3) 2px, transparent 2px)",
      backgroundSize: "30px 30px"
    }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-6">
          <Link href="/" className="bg-[#FFD166] text-[#1A535C] px-6 py-2 rounded-[255px_15px_225px_15px/15px_225px_15px_255px] font-black border-[4px] border-[#1A535C] shadow-[4px_4px_0px_#1A535C] hover:translate-y-1 hover:shadow-[2px_2px_0px_#1A535C] transition-all transform -rotate-2" style={{ fontFamily: "var(--font-caveat), cursive", fontSize: "1.5rem" }}>
            ⬅ Kembali
          </Link>
          <h1 className="text-4xl sm:text-6xl font-black text-white drop-shadow-[4px_4px_0px_#1A535C] transform rotate-1 text-center" style={{ fontFamily: "var(--font-caveat), cursive" }}>
            Daftar Petualang 🚀
          </h1>
          <div className="hidden sm:block w-32"></div> {/* Spacer to keep title centered */}
        </div>

        {entries.length === 0 ? (
          <div className="text-center py-20 bg-[#fdfbfb]/80 rounded-[255px_15px_225px_15px/15px_225px_15px_255px] border-[5px] border-dashed border-[#1A535C] shadow-[8px_8px_0px_rgba(26,83,92,0.3)]">
            <h2 className="text-3xl sm:text-4xl text-[#1A535C] font-bold transform -rotate-1" style={{ fontFamily: "var(--font-caveat), cursive" }}>Belum ada petualang yang mendaftar.</h2>
          </div>
        ) : (
          <GuestBookClient initialEntries={entries} />
        )}
      </div>
    </div>
  );
}
