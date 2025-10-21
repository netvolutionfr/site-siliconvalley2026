// Robust version (Node.js runtime) — scans /public/gallery and returns JSON.
// Fixes: ensure Node runtime, pass Buffer to image-size, try/catch per file.

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { imageSize } from "image-size";

export const runtime = "nodejs"; // image-size needs Node APIs (no Edge runtime)
export const revalidate = 86400;  // cache 24h

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

export async function GET() {
    try {
        const dir = path.join(process.cwd(), "public", "gallery");
        if (!fs.existsSync(dir)) {
            return NextResponse.json({ photos: [] }, { status: 200 });
        }

        const files = fs
            .readdirSync(dir)
            .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f));
        shuffleArray(files);

        const photos = files.map((f) => {
            const filePath = path.join(dir, f);
            let width = 1200, height = 800;
            try {
                const buf = fs.readFileSync(filePath);
                const dim = imageSize(buf);
                width = dim.width ?? width;
                height = dim.height ?? height;
            } catch {}
            return {
                src: `/gallery/${f}`,
                width,
                height,
                alt: f.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
            };
        });

        return NextResponse.json(
            { photos },
            { headers: { "Cache-Control": "s-maxage=86400, stale-while-revalidate=604800" } }
        );
    } catch (e) {
        console.error("Gallery API error:", e);
        return NextResponse.json({ photos: [], error: "failed" }, { status: 200 });
    }
}