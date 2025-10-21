"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import "react-photo-album/masonry.css"; // layout CSS for masonry
import "yet-another-react-lightbox/styles.css";
import {RenderImageContext, RenderImageProps, MasonryPhotoAlbum} from "react-photo-album"; // lightbox base styles
import Image from "next/image";

const Lightbox = dynamic(() => import("yet-another-react-lightbox"), { ssr: false });

interface Photo {
    src: string;
    width: number;
    height: number;
    alt?: string;
}

function renderNextImage({ alt = "", title, sizes }: RenderImageProps, { photo, width, height }: RenderImageContext) {
    return (
        <div
            style={{
                width: "100%",
                position: "relative",
                aspectRatio: `${width} / ${height}`,
            }}
        >
            <Image
                fill
                src={photo}
                alt={alt}
                title={title}
                sizes={sizes}
                placeholder={"blurDataURL" in photo ? "blur" : undefined}
                className="rounded-3xl border border-neutral-200 bg-white shadow-sm"
            />
        </div>
    );
}

export default function Gallery() {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [visible, setVisible] = useState(24); // progressive reveal
    const [index, setIndex] = useState(-1); // lightbox index
    const sentinelRef = useRef<HTMLDivElement | null>(null);
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        let cancelled = false;
        fetch("/api/gallery")
            .then((r) => r.json())
            .then((data) => {
                if (!cancelled) setPhotos(Array.isArray(data.photos) ? data.photos : []);
            })
            .catch(() => setPhotos([]));
        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        if (!sentinelRef.current) return;
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting)
                        setVisible((v) => Math.min(v + 24, photos.length || v));
                });
            },
            { rootMargin: "600px" }
        );
        io.observe(sentinelRef.current);
        return () => io.disconnect();
    }, [photos.length]);

    const slice = photos.slice(0, visible);

    return (
        <div className="mx-auto max-w-6xl px-4 py-16">
            {slice.length > 0 && (
                <MasonryPhotoAlbum
                    photos={slice}
                    spacing={16}
                    // Responsive columns (mobile → 1 col, tablet → 2, desktop → 3–4)
                    columns={(containerWidth) => {
                        if (containerWidth < 480) return 1; // phones
                        if (containerWidth < 900) return 2; // tablets / small laptops
                        if (containerWidth < 1200) return 3; // desktops
                        return 4; // very wide screens
                    }}
                    onClick={({ index }) => setIndex(index)}
                    render={{ image: renderNextImage }}
                />
            )}
            <div ref={sentinelRef} />

            {/* Lightbox — ne s'affiche qu'après le montage pour éviter le mismatch */}
            {mounted && (
                <Lightbox
                    open={index >= 0}
                    index={index}
                    close={() => setIndex(-1)}
                    slides={photos.map((p) => ({ src: p.src, width: p.width, height: p.height, alt: p.alt }))}
                />
            )}
        </div>
    );
}