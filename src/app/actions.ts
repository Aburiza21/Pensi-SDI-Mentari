"use server";

import { revalidatePath } from "next/cache";
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export interface GuestEntry {
  id: string;
  parentName: string;
  studentName: string;
  studentClass: string;
  createdAt: string;
}

export async function saveGuestBookEntry(data: { parentName: string; studentName: string; studentClass: string }) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    
    const { error } = await supabase
      .from('guestbook_entries')
      .insert([
        {
          parentName: data.parentName,
          studentName: data.studentName,
          studentClass: data.studentClass,
        }
      ]);
      
    if (error) {
      console.error("Supabase insert error:", error);
      return { success: false, error: "Failed to save data" };
    }
    
    return { success: true };
  } catch (error) {
    console.error("Failed to save guestbook entry:", error);
    return { success: false, error: "Failed to save data" };
  }
}

export async function getGuestBookEntries(): Promise<GuestEntry[]> {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    
    const { data, error } = await supabase
      .from('guestbook_entries')
      .select('*')
      .order('createdAt', { ascending: false });
      
    if (error) {
      console.error("Supabase select error:", error);
      return [];
    }
    
    return data as GuestEntry[];
  } catch (error) {
    console.error("Failed to load guestbook entries:", error);
    return [];
  }
}

export async function importGuestBookEntries(importedData: any[]) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    
    // Filter out invalid records
    const validNewEntries = importedData
      .filter(item => item && item.studentName && item.parentName && item.studentClass)
      .map(item => ({
        parentName: item.parentName,
        studentName: item.studentName,
        studentClass: String(item.studentClass),
        createdAt: item.createdAt || new Date().toISOString()
      }));

    if (validNewEntries.length > 0) {
      const { error } = await supabase
        .from('guestbook_entries')
        .insert(validNewEntries);
        
      if (error) {
        console.error("Supabase bulk insert error:", error);
        return { success: false, error: "Gagal mengimpor ke Supabase" };
      }
    }
    
    revalidatePath("/buku-tamu");
    
    return { success: true, count: validNewEntries.length };
  } catch (error) {
    console.error("Bulk import failed:", error);
    return { success: false, error: "Gagal mengimpor data" };
  }
}
