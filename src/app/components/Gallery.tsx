"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import "react-photo-album/masonry.css"; // layout CSS for masonry
import "yet-another-react-lightbox/styles.css";
import {
    RenderImageContext,
    RenderImageProps,
    MasonryPhotoAlbum,
} from "react-photo-album"; // masonry layout
import Image from "next/image";

const Lightbox = dynamic(() => import("yet-another-react-lightbox"), { ssr: false });

interface Photo {
    src: string;
    width: number;
    height: number;
    alt?: string;
    // optionnel si tu ajoutes un flou
    blurDataURL?: string;
}

// Rendu optimisé avec next/image
function renderNextImage(
    { alt = "", title, sizes }: RenderImageProps,
    { photo, width, height }: RenderImageContext
) {
    const p = photo as Photo;
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
                src={p.src} // ✅ bien utiliser la source de la photo
                alt={alt}
                title={title}
                sizes={sizes}
                // Si tu fournis blurDataURL côté API, le placeholder s’activera
                placeholder={p.blurDataURL ? "blur" : undefined}
                blurDataURL={p.blurDataURL}
                className="rounded-3xl border border-neutral-200 bg-white shadow-sm object-cover"
            />
        </div>
    );
}

type GalleryProps = {
    /** Nombre de photos visibles quand la galerie est repliée */
    initialVisible?: number;
    /** true = galerie ouverte (toutes les photos), false = repliée */
    expanded?: boolean;
};

export default function Gallery({ initialVisible = 24, expanded = false }: GalleryProps) {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [visible, setVisible] = useState(initialVisible);
    const [index, setIndex] = useState(-1); // lightbox index
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    // Mount gate pour éviter le mismatch d’hydratation de la lightbox
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    // Charger la liste des photos
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

    // Adapter le nombre visible selon expanded
    useEffect(() => {
        if (expanded) {
            // montre tout (et laissera l’infinite scroll lisser l’apparition si la liste est énorme)
            setVisible((v) => Math.max(v, photos.length));
        } else {
            // replié → nombre fixe
            setVisible(Math.min(initialVisible, photos.length));
        }
    }, [expanded, initialVisible, photos.length]);

    // Infinite scroll uniquement quand expanded = true
    useEffect(() => {
        if (!expanded || !sentinelRef.current) return;
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        setVisible((v) => Math.min(v + 24, photos.length));
                    }
                });
            },
            { rootMargin: "600px" }
        );
        io.observe(sentinelRef.current);
        return () => io.disconnect();
    }, [expanded, photos.length]);

    const slice = photos.slice(0, visible);

    return (
        <div className="mx-auto max-w-6xl px-4 py-16">
            {slice.length > 0 && (
                <MasonryPhotoAlbum
                    photos={slice}
                    spacing={16}
                    // ✅ Responsive columns (mobile → 1 col, tablet → 2, desktop → 3–4)
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

            {/* Sentinelle uniquement utile quand expanded = true */}
            {expanded && <div ref={sentinelRef} />}

            {/* Lightbox — rendue uniquement après montage pour éviter tout mismatch SSR/CSR */}
            {mounted && (
                <Lightbox
                    open={index >= 0}
                    index={index}
                    close={() => setIndex(-1)}
                    slides={photos.map((p) => ({
                        src: p.src,
                        width: p.width,
                        height: p.height,
                        alt: p.alt,
                    }))}
                />
            )}
        </div>
    );
}