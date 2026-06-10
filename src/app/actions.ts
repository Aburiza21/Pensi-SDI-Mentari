"use server";

import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const DATA_DIR = path.join(process.cwd(), "data");
const FILE_PATH = path.join(DATA_DIR, "guestbook.json");

export interface GuestEntry {
  id: string;
  parentName: string;
  studentName: string;
  studentClass: string;
  createdAt: string;
}

async function ensureDataFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (err) {
    // Directory exists
  }

  try {
    await fs.access(FILE_PATH);
  } catch {
    await fs.writeFile(FILE_PATH, JSON.stringify([]));
  }
}

export async function saveGuestBookEntry(data: { parentName: string; studentName: string; studentClass: string }) {
  try {
    await ensureDataFile();
    
    const content = await fs.readFile(FILE_PATH, "utf-8");
    const entries: GuestEntry[] = JSON.parse(content || "[]");
    
    const newEntry: GuestEntry = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    
    // Add to beginning of array so newest is first
    entries.unshift(newEntry);
    
    await fs.writeFile(FILE_PATH, JSON.stringify(entries, null, 2));
    
    return { success: true };
  } catch (error) {
    console.error("Failed to save guestbook entry:", error);
    return { success: false, error: "Failed to save data" };
  }
}

export async function getGuestBookEntries(): Promise<GuestEntry[]> {
  try {
    await ensureDataFile();
    const content = await fs.readFile(FILE_PATH, "utf-8");
    return JSON.parse(content || "[]");
  } catch (error) {
    console.error("Failed to load guestbook entries:", error);
    return [];
  }
}

import { revalidatePath } from "next/cache";

export async function importGuestBookEntries(importedData: any[]) {
  try {
    await ensureDataFile();
    
    const content = await fs.readFile(FILE_PATH, "utf-8");
    const existingEntries: GuestEntry[] = JSON.parse(content || "[]");
    
    // Filter out invalid records and create clean entries
    const validNewEntries: GuestEntry[] = importedData
      .filter(item => item && item.studentName && item.parentName && item.studentClass)
      .map(item => ({
        parentName: item.parentName,
        studentName: item.studentName,
        studentClass: String(item.studentClass),
        id: item.id || crypto.randomUUID(),
        createdAt: item.createdAt || new Date().toISOString()
      }));

    // Simple deduplication based on ID or exact name matches
    const existingIds = new Set(existingEntries.map(e => e.id));
    const newUniqueEntries = validNewEntries.filter(e => !existingIds.has(e.id));
    
    // Combine arrays
    const finalEntries = [...newUniqueEntries, ...existingEntries];
    
    // Sort by descending date
    finalEntries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    await fs.writeFile(FILE_PATH, JSON.stringify(finalEntries, null, 2));
    
    revalidatePath("/buku-tamu");
    
    return { success: true, count: newUniqueEntries.length };
  } catch (error) {
    console.error("Failed to import guestbook entries:", error);
    return { success: false, error: "Failed to import data" };
  }
}
