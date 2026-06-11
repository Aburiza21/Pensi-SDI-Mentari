import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import * as XLSX from "xlsx";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from("guestbook_entries")
      .select("*")
      .order("createdAt", { ascending: false });

    if (error) {
      console.error("Supabase export error:", error);
      return new Response("Gagal mengambil data dari database.", { status: 500 });
    }

    // Format data for Excel
    const formattedData = (data ?? []).map((entry, idx) => ({
      No: idx + 1,
      "Nama Siswa": entry.studentName,
      Kelas: entry.studentClass,
      "Wali Murid": entry.parentName,
      Kehadiran:
        entry.attendance === "hadir"
          ? "Hadir"
          : entry.attendance === "tidak_hadir"
          ? "Tidak Hadir"
          : "-",
      "Tanggal RSVP": new Date(entry.createdAt).toLocaleString("id-ID", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    }));

    // Build workbook
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(formattedData);

    ws["!cols"] = [
      { wch: 5 },  // No
      { wch: 30 }, // Nama Siswa
      { wch: 12 }, // Kelas
      { wch: 30 }, // Wali Murid
      { wch: 15 }, // Kehadiran
      { wch: 25 }, // Tanggal RSVP
    ];

    XLSX.utils.book_append_sheet(wb, ws, "Daftar Petualang");

    // Generate buffer
    const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

    const filename = `Data_Petualang_Pensi_${new Date().toISOString().split("T")[0]}.xlsx`;

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    console.error("Export failed:", err);
    return new Response("Terjadi kesalahan saat mengekspor data.", { status: 500 });
  }
}
