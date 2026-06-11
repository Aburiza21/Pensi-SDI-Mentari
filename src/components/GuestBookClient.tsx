"use client";

import { useState } from "react";
import { Star, School, User, CalendarDays, Search, LayoutGrid, List as ListIcon, ChevronLeft, ChevronRight, X, Users, PartyPopper, XCircle, FilterX } from "lucide-react";
import { GuestEntry } from "@/app/actions";

interface GuestBookClientProps {
  initialEntries: GuestEntry[];
}

export default function GuestBookClient({ initialEntries }: GuestBookClientProps) {
  const [entries, setEntries] = useState<GuestEntry[]>(initialEntries);
  const [viewMode, setViewMode] = useState<'card' | 'row'>('card');
  const [searchQuery, setSearchQuery] = useState('');
  const [classFilter, setClassFilter] = useState('All');
  const [attendanceFilter, setAttendanceFilter] = useState<'All' | 'hadir' | 'tidak_hadir'>('All');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 12;

  // Derive filtered data
  const filteredEntries = entries.filter(entry => {
    const matchesSearch =
      entry.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.parentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = classFilter === 'All' || entry.studentClass === classFilter;
    const matchesAttendance =
      attendanceFilter === 'All' ||
      (attendanceFilter === 'hadir' && entry.attendance === 'hadir') ||
      (attendanceFilter === 'tidak_hadir' && entry.attendance === 'tidak_hadir');
    const entryDate = new Date(entry.createdAt);
    const matchesFrom = !dateFrom || entryDate >= new Date(dateFrom);
    const matchesTo = !dateTo || entryDate <= new Date(dateTo + 'T23:59:59');
    return matchesSearch && matchesClass && matchesAttendance && matchesFrom && matchesTo;
  });

  const hasActiveFilters = searchQuery || classFilter !== 'All' || attendanceFilter !== 'All' || dateFrom || dateTo;

  const resetAllFilters = () => {
    setSearchQuery('');
    setClassFilter('All');
    setAttendanceFilter('All');
    setDateFrom('');
    setDateTo('');
    setCurrentPage(1);
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredEntries.length / itemsPerPage);
  const paginatedEntries = filteredEntries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const allClasses = ["All", ...Array.from(new Set(entries.map(e => e.studentClass))).sort()];

  // Attendance summary (always from full entries, not filtered)
  const totalHadir = entries.filter(e => e.attendance === "hadir").length;
  const totalTidakHadir = entries.filter(e => e.attendance === "tidak_hadir").length;
  const hadirPct = entries.length > 0 ? Math.round((totalHadir / entries.length) * 100) : 0;

  return (
    <div className="w-full">

      {/* ── Summary Banner ── */}
      <div className="bg-[#fdfbfb] border-[5px] border-[#1A535C] rounded-[30px] shadow-[8px_8px_0px_#1A535C] p-5 sm:p-7 mb-8">
        {/* Stats row */}
        <div className="flex flex-col sm:flex-row items-center justify-around gap-6 sm:gap-4 mb-5">
          {/* Total */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#1A535C] rounded-2xl flex items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,0.15)] flex-shrink-0">
              <Users className="w-7 h-7 text-[#FFD166]" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-5xl font-black text-[#1A535C] leading-none" style={{ fontFamily: "var(--font-caveat), cursive" }}>{entries.length}</p>
              <p className="text-base font-bold text-[#1A535C]/60 mt-0.5" style={{ fontFamily: "var(--font-caveat), cursive" }}>Total Tamu</p>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-16 bg-[#1A535C]/20 rounded-full" />

          {/* Hadir */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#4ECDC4] rounded-2xl flex items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,0.15)] flex-shrink-0">
              <PartyPopper className="w-7 h-7 text-white" strokeWidth={2} />
            </div>
            <div>
              <p className="text-5xl font-black text-[#4ECDC4] leading-none" style={{ fontFamily: "var(--font-caveat), cursive" }}>{totalHadir}</p>
              <p className="text-base font-bold text-[#1A535C]/60 mt-0.5" style={{ fontFamily: "var(--font-caveat), cursive" }}>Hadir ✅</p>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-16 bg-[#1A535C]/20 rounded-full" />

          {/* Tidak Hadir */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#FF6B6B] rounded-2xl flex items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,0.15)] flex-shrink-0">
              <XCircle className="w-7 h-7 text-white" strokeWidth={2} />
            </div>
            <div>
              <p className="text-5xl font-black text-[#FF6B6B] leading-none" style={{ fontFamily: "var(--font-caveat), cursive" }}>{totalTidakHadir}</p>
              <p className="text-base font-bold text-[#1A535C]/60 mt-0.5" style={{ fontFamily: "var(--font-caveat), cursive" }}>Tidak Hadir ❌</p>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        {entries.length > 0 && (
          <div>
            <div className="flex justify-between text-sm font-bold text-[#1A535C]/60 mb-1.5" style={{ fontFamily: "var(--font-caveat), cursive", fontSize: "1rem" }}>
              <span>Hadir {hadirPct}%</span>
              <span>Tidak Hadir {100 - hadirPct}%</span>
            </div>
            <div className="w-full h-4 bg-[#FF6B6B]/30 rounded-full overflow-hidden border-2 border-[#1A535C]/20">
              <div
                className="h-full bg-[#4ECDC4] rounded-full transition-all duration-700"
                style={{ width: `${hadirPct}%` }}
              />
            </div>
          </div>
        )}
      </div>
      {/* Controls Bar */}
      <div className="bg-[#fdfbfb] p-4 sm:p-6 rounded-[255px_15px_225px_15px/15px_225px_15px_255px] border-[4px] border-[#1A535C] shadow-[6px_6px_0px_#1A535C] mb-4 flex flex-col gap-4 z-20 relative">

        {/* Row 1: Search + View toggle */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          {/* Search */}
          <div className="relative w-full flex-1 min-w-[200px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-[#1A535C]" />
            </div>
            <input
              type="text"
              placeholder="Cari nama siswa atau orang tua..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="block w-full pl-10 pr-10 py-2 border-2 border-[#1A535C] rounded-xl focus:ring-4 focus:ring-[#4ECDC4] focus:border-[#1A535C] bg-white text-[#1A535C] font-bold outline-none transition-all"
              style={{ fontFamily: "var(--font-caveat), cursive", fontSize: "1.2rem" }}
            />
            {searchQuery && (
              <button onClick={() => { setSearchQuery(''); setCurrentPage(1); }} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#FF6B6B]">
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* View toggle */}
          <div className="flex bg-[#1A535C] p-1 rounded-xl flex-shrink-0">
            <button
              onClick={() => setViewMode('card')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'card' ? 'bg-[#FFD166] text-[#1A535C]' : 'text-white hover:bg-white/20'}`}
              title="Card View"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('row')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'row' ? 'bg-[#FFD166] text-[#1A535C]' : 'text-white hover:bg-white/20'}`}
              title="List View"
            >
              <ListIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Row 2: Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          {/* Filter Kelas */}
          <select
            value={classFilter}
            onChange={(e) => { setClassFilter(e.target.value); setCurrentPage(1); }}
            className="px-4 py-2 border-2 border-[#1A535C] rounded-xl font-bold text-[#1A535C] bg-white cursor-pointer outline-none focus:ring-4 focus:ring-[#4ECDC4]"
            style={{ fontFamily: "var(--font-caveat), cursive", fontSize: "1.1rem" }}
          >
            {allClasses.map(cls => (
              <option key={cls} value={cls}>{cls === 'All' ? 'Semua Kelas' : `Kelas ${cls}`}</option>
            ))}
          </select>

          {/* Filter Kehadiran */}
          <select
            value={attendanceFilter}
            onChange={(e) => { setAttendanceFilter(e.target.value as 'All' | 'hadir' | 'tidak_hadir'); setCurrentPage(1); }}
            className="px-4 py-2 border-2 border-[#1A535C] rounded-xl font-bold text-[#1A535C] bg-white cursor-pointer outline-none focus:ring-4 focus:ring-[#4ECDC4]"
            style={{ fontFamily: "var(--font-caveat), cursive", fontSize: "1.1rem" }}
          >
            <option value="All">Semua Kehadiran</option>
            <option value="hadir">✅ Hadir</option>
            <option value="tidak_hadir">❌ Tidak Hadir</option>
          </select>

          {/* Filter Tanggal Dari */}
          <div className="flex items-center gap-2">
            <label className="text-[#1A535C] font-bold text-sm flex-shrink-0" style={{ fontFamily: "var(--font-caveat), cursive", fontSize: "1.1rem" }}>Dari:</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => { setDateFrom(e.target.value); setCurrentPage(1); }}
              className="px-3 py-2 border-2 border-[#1A535C] rounded-xl font-bold text-[#1A535C] bg-white outline-none focus:ring-4 focus:ring-[#4ECDC4] cursor-pointer"
              style={{ fontFamily: "var(--font-caveat), cursive", fontSize: "1rem" }}
            />
          </div>

          {/* Filter Tanggal Sampai */}
          <div className="flex items-center gap-2">
            <label className="text-[#1A535C] font-bold text-sm flex-shrink-0" style={{ fontFamily: "var(--font-caveat), cursive", fontSize: "1.1rem" }}>Sampai:</label>
            <input
              type="date"
              value={dateTo}
              min={dateFrom || undefined}
              onChange={(e) => { setDateTo(e.target.value); setCurrentPage(1); }}
              className="px-3 py-2 border-2 border-[#1A535C] rounded-xl font-bold text-[#1A535C] bg-white outline-none focus:ring-4 focus:ring-[#4ECDC4] cursor-pointer"
              style={{ fontFamily: "var(--font-caveat), cursive", fontSize: "1rem" }}
            />
          </div>

          {/* Reset all filters */}
          {hasActiveFilters && (
            <button
              onClick={resetAllFilters}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#FF6B6B] text-white font-bold rounded-xl border-2 border-[#1A535C] hover:bg-[#FF8787] transition-colors shadow-[3px_3px_0px_#1A535C]"
              style={{ fontFamily: "var(--font-caveat), cursive", fontSize: "1.1rem" }}
            >
              <FilterX className="w-4 h-4" /> Reset Filter
            </button>
          )}
        </div>

        {/* Active filter badge */}
        {hasActiveFilters && (
          <p className="text-sm font-bold text-[#1A535C]/60" style={{ fontFamily: "var(--font-caveat), cursive", fontSize: "1rem" }}>
            Menampilkan <strong className="text-[#1A535C]">{filteredEntries.length}</strong> dari <strong className="text-[#1A535C]">{entries.length}</strong> tamu
          </p>
        )}
      </div>

      {/* Main Content */}
      {filteredEntries.length === 0 ? (
        <div className="text-center py-20 bg-[#fdfbfb]/80 rounded-[255px_15px_225px_15px/15px_225px_15px_255px] border-[5px] border-dashed border-[#1A535C] shadow-[8px_8px_0px_rgba(26,83,92,0.3)]">
          <h2 className="text-3xl sm:text-4xl text-[#1A535C] font-bold transform -rotate-1" style={{ fontFamily: "var(--font-caveat), cursive" }}>
            Tidak ada data yang cocok dengan pencarian Anda.
          </h2>
        </div>
      ) : (
        <>
          {viewMode === 'card' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {paginatedEntries.map((entry, idx) => (
                <div key={entry.id} className={`bg-[#fdfbfb] p-5 sm:p-6 rounded-[255px_15px_225px_15px/15px_225px_15px_255px] border-[4px] border-[#1A535C] shadow-[6px_6px_0px_#1A535C] flex flex-col transform transition-transform hover:scale-[1.05] hover:z-10 ${idx % 2 === 0 ? 'rotate-1' : '-rotate-2'} ${idx % 3 === 0 ? 'bg-orange-50' : ''}`}>
                  <div className="flex items-center gap-3 mb-4 border-b-2 border-dashed border-[#FF6B6B] pb-3">
                    <div className="bg-[#FFD166] p-2 rounded-full border-2 border-[#1A535C]">
                      <Star className="text-[#1A535C] w-5 h-5 fill-[#1A535C]" />
                    </div>
                    <h3 className="font-black text-2xl sm:text-3xl text-[#1A535C] leading-none" style={{ fontFamily: "var(--font-caveat), cursive" }}>{entry.studentName}</h3>
                  </div>
                  
                  <div className="flex flex-col gap-3 text-[#1A535C] font-bold" style={{ fontFamily: "var(--font-caveat), cursive", fontSize: "1.25rem" }}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 flex justify-center"><School className="w-5 h-5 text-[#4ECDC4]" strokeWidth={3} /></div>
                      <span>Kelas: {entry.studentClass}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 flex justify-center"><User className="w-5 h-5 text-[#FF6B6B]" strokeWidth={3} /></div>
                      <span>Wali: {entry.parentName}</span>
                    </div>
                    {entry.attendance && (
                      <div className="mt-1">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-black border-2 ${
                          entry.attendance === "hadir"
                            ? "bg-[#4ECDC4]/20 border-[#4ECDC4] text-[#1A535C]"
                            : "bg-[#FF6B6B]/20 border-[#FF6B6B] text-[#FF6B6B]"
                        }`}>
                          {entry.attendance === "hadir" ? "✅ Hadir" : "❌ Tidak Hadir"}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 mt-1 text-[#1A535C]/60" style={{ fontSize: "1.1rem" }}>
                      <div className="w-8 flex justify-center"><CalendarDays className="w-4 h-4" /></div>
                      <span>{new Date(entry.createdAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#fdfbfb] rounded-[20px] border-[4px] border-[#1A535C] shadow-[8px_8px_0px_#1A535C] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#1A535C] text-white">
                      <th className="p-4 border-b-4 border-white/20 font-bold uppercase tracking-wider">Nama Siswa</th>
                      <th className="p-4 border-b-4 border-white/20 font-bold uppercase tracking-wider">Wali Murid</th>
                      <th className="p-4 border-b-4 border-white/20 font-bold uppercase tracking-wider text-center">Kelas</th>
                      <th className="p-4 border-b-4 border-white/20 font-bold uppercase tracking-wider text-center">Kehadiran</th>
                      <th className="p-4 border-b-4 border-white/20 font-bold uppercase tracking-wider text-right">Tanggal RSVP</th>
                    </tr>
                  </thead>
                  <tbody className="font-bold text-[#1A535C]" style={{ fontFamily: "var(--font-caveat), cursive", fontSize: "1.3rem" }}>
                    {paginatedEntries.map((entry, idx) => (
                      <tr key={entry.id} className={`border-b-2 border-[#1A535C]/10 transition-colors hover:bg-[#FFD166]/30 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                        <td className="p-4 flex items-center gap-2">
                          <Star className="text-[#FFD166] w-4 h-4 fill-[#FFD166] hidden sm:block" />
                          {entry.studentName}
                        </td>
                        <td className="p-4">{entry.parentName}</td>
                        <td className="p-4 text-center">
                          <span className="inline-block bg-[#4ECDC4]/20 px-3 py-1 rounded-full border border-[#4ECDC4]">
                            {entry.studentClass}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          {entry.attendance ? (
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-black border-2 ${
                              entry.attendance === "hadir"
                                ? "bg-[#4ECDC4]/20 border-[#4ECDC4] text-[#1A535C]"
                                : "bg-[#FF6B6B]/20 border-[#FF6B6B] text-[#FF6B6B]"
                            }`}>
                              {entry.attendance === "hadir" ? "✅ Hadir" : "❌ Tidak Hadir"}
                            </span>
                          ) : (
                            <span className="text-[#1A535C]/40 text-sm">-</span>
                          )}
                        </td>
                        <td className="p-4 text-right text-sm text-[#1A535C]/70 font-sans font-medium">
                          {new Date(entry.createdAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex justify-center items-center gap-4">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-3 bg-[#fdfbfb] border-2 border-[#1A535C] rounded-full text-[#1A535C] disabled:opacity-50 hover:bg-[#FFD166] hover:scale-110 transition-all shadow-[3px_3px_0px_#1A535C]"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <span className="font-bold text-xl text-[#1A535C] bg-[#fdfbfb] px-6 py-2 rounded-xl border-2 border-[#1A535C] shadow-[3px_3px_0px_#1A535C]" style={{ fontFamily: "var(--font-caveat), cursive" }}>
                Halaman {currentPage} dari {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-3 bg-[#fdfbfb] border-2 border-[#1A535C] rounded-full text-[#1A535C] disabled:opacity-50 hover:bg-[#FFD166] hover:scale-110 transition-all shadow-[3px_3px_0px_#1A535C]"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
