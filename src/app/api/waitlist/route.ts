import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Path to store local waitlist entries for local development
const DATA_FILE = path.join(process.cwd(), "waitlist.json");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, source } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const newEntry = {
      email: email.trim().toLowerCase(),
      createdAt: new Date().toISOString(),
      source: source || "landing_modal",
    };

    // 1. If running in Cloudflare Pages / Workers environment with KV bound
    // (e.g. process.env.WAITLIST_KV or env.WAITLIST_KV)
    // @ts-ignore
    if (typeof globalThis.WAITLIST_KV !== "undefined") {
      // @ts-ignore
      await globalThis.WAITLIST_KV.put(
        `waitlist:${newEntry.email}`,
        JSON.stringify(newEntry)
      );
    } else {
      // 2. Local fallback: append to local waitlist.json
      let currentList: any[] = [];
      try {
        if (fs.existsSync(DATA_FILE)) {
          const raw = fs.readFileSync(DATA_FILE, "utf-8");
          currentList = JSON.parse(raw);
        }
      } catch (e) {
        currentList = [];
      }

      // Check if already subscribed
      const exists = currentList.some((item) => item.email === newEntry.email);
      if (!exists) {
        currentList.push(newEntry);
        fs.writeFileSync(DATA_FILE, JSON.stringify(currentList, null, 2), "utf-8");
      }
    }

    console.log(`[Waitlist] Added: ${newEntry.email}`);

    return NextResponse.json(
      { success: true, message: "Added to waitlist" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Waitlist error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    let currentList: any[] = [];
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      currentList = JSON.parse(raw);
    }
    return NextResponse.json({ count: currentList.length, entries: currentList });
  } catch {
    return NextResponse.json({ count: 0, entries: [] });
  }
}
