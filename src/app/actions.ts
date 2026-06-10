"use server";

import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { revalidatePath } from "next/cache";
import { Redis } from '@upstash/redis';

const DATA_DIR = path.join(process.cwd(), "data");
const FILE_PATH = path.join(DATA_DIR, "guestbook.json");

// Check for either Vercel KV or Upstash environment variables
const redisUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

const isRedisConfigured = redisUrl && redisToken;
const redis = isRedisConfigured ? new Redis({
  url: redisUrl!,
  token: redisToken!,
}) : null;

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
    const newEntry: GuestEntry = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    
    if (redis) {
      // Vercel Serverless environment (using KV Database)
      const currentData = await redis.get<GuestEntry[]>('guestbook_entries') || [];
      currentData.unshift(newEntry);
      await redis.set('guestbook_entries', currentData);
    } else {
      // Local development environment (using File System)
      await ensureDataFile();
      const content = await fs.readFile(FILE_PATH, "utf-8");
      const entries: GuestEntry[] = JSON.parse(content || "[]");
      entries.unshift(newEntry);
      await fs.writeFile(FILE_PATH, JSON.stringify(entries, null, 2));
    }
    
    return { success: true };
  } catch (error) {
    console.error("Failed to save guestbook entry:", error);
    return { success: false, error: "Failed to save data" };
  }
}

export async function getGuestBookEntries(): Promise<GuestEntry[]> {
  try {
    if (redis) {
      // Vercel Serverless environment (using KV Database)
      const data = await redis.get<GuestEntry[]>('guestbook_entries');
      return data || [];
    } else {
      // Local development environment (using File System)
      await ensureDataFile();
      const content = await fs.readFile(FILE_PATH, "utf-8");
      return JSON.parse(content || "[]");
    }
  } catch (error) {
    console.error("Failed to load guestbook entries:", error);
    return [];
  }
}


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
