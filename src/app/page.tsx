"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import {useRef, useState} from "react";
import Gallery from "@/app/components/Gallery";

export default function Page() {
    const fade = {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-10%" },
        transition: { duration: 0.5, ease: "easeOut" },
    };

    // Parallax for hero
    const heroRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const yFloat = useTransform(scrollYProgress, [0, 1], [0, -30]);
    const [submitting, setSubmitting] = useState(false);
    const [toasts, setToasts] = useState<{ id: number; msg: string; kind: "success" | "error" }[]>([]);
    const pushToast = (msg: string, kind: "success" | "error" = "success") => {
        const id = Date.now();
        setToasts((t) => [...t, { id, msg, kind }]);
        setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3800);
    };
    // Parallax for image strips
    const Strip: React.FC<{ src: string; alt: string; dark?: boolean; caption?: string }>
        = ({ src, alt, dark, caption }) => {
        const ref = useRef<HTMLDivElement | null>(null);
        const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
        const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
        return (
            <section ref={ref} className={`${dark ? "bg-neutral-950 text-white bg-gradient-hero" : "bg-white"} relative` }>
                <div className="mx-auto max-w-6xl px-4 py-24 grid md:grid-cols-2 gap-10 items-center">
                    <div className="order-2 md:order-1">
                        <motion.h2 {...fade} className={`text-3xl md:text-5xl font-semibold tracking-tight ${dark ? "text-white" : "text-neutral-900"}`}>
                            {caption ?? ""}
                        </motion.h2>
                        <motion.p {...fade} className="mt-4 text-neutral-300 dark:text-neutral-300">
                            Une immersion au cœur de l'innovation : visites de campus et de sièges emblématiques, mises en contexte des métiers, et rencontres selon disponibilités.
                        </motion.p>
                        <motion.ul {...fade} className="mt-6 grid grid-cols-2 gap-3 text-sm">
                            <li className="rounded-2xl border border-neutral-200/60 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur p-3 shadow-sm">✈️<span className="ml-3">Vol direct AF</span></li>
                            <li className="rounded-2xl border border-neutral-200/60 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur p-3 shadow-sm">🚌<span className="ml-3">Silicon Valley</span></li>
                            <li className="rounded-2xl border border-neutral-200/60 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur p-3 shadow-sm">🚲<span className="ml-3">Golden Gate Bridge</span></li>
                            <li className="rounded-2xl border border-neutral-200/60 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur p-3 shadow-sm">🛡️<span className="ml-3">Assurances incluses</span></li>
                        </motion.ul>
                    </div>
                    <motion.div style={{ y }} className="order-1 md:order-2 relative rounded-3xl overflow-hidden border shadow-xl">
                        <img src={src} alt={alt} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </motion.div>
                </div>
            </section>
        );
    };

    return (
        <main className="min-h-screen bg-white text-neutral-900">
            {/* NAV — minimal, glassy, Material3 tones */}
            <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/85 border-b">
                <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
                    <a href="#" className="font-semibold tracking-tight grid gap-1 text-center w-45">
                        <img src="logo-long.svg" alt="St Jo" width="100%" />
                        <div>Silicon Valley Study Trip</div>
                    </a>
                    <nav className="hidden sm:flex gap-6 text-sm">
                        <a href="#why" className="hover:opacity-80">Pourquoi</a>
                        <a href="#program" className="hover:opacity-80">Programme</a>
                        <a href="#gallery" className="hover:opacity-80">Images</a>
                        <a href="#budget" className="hover:opacity-80">Budget</a>
                        <a href="#faq" className="hover:opacity-80">FAQ</a>
                    </nav>
                    <a href="#apply" className="rounded-full bg-neutral-900 text-white px-4 py-2 text-sm shadow-md hover:shadow-lg transition-shadow">Je participe</a>
                </div>
            </header>

            {/* HERO — big Apple-like typography, parallax background */}
            <section ref={heroRef} className="relative min-h-[78vh] overflow-hidden bg-neutral-950">
                <motion.div style={{ y: yHero }}
                            className="absolute inset-0">
                    <img
                        src="pexels-augustocarneirojr-28003377.jpg"
                        alt="San Francisco skyline"
                        className="w-full h-full object-cover opacity-70"
                    />
                </motion.div>
                <div className="relative mx-auto max-w-6xl px-4 py-24 md:py-32">
                    <motion.h1 style={{ y: yFloat }}
                               className="text-4xl md:text-7xl font-semibold leading-[1.05] tracking-tight text-white">
                        San Francisco &
                        <span className="block text-gradient">Silicon Valley</span>
                    </motion.h1>
                    <motion.p {...fade} className="mt-6 max-w-2xl text-neutral-300 text-lg">
                        Voyage d'étude : innovation, culture tech et rencontres professionnelles.
                    </motion.p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <a href="#apply" className="btn btn-primary">Pré‑inscription</a>
                        <a href="#program" className="btn btn-secondary bg-neutral-300">Voir le programme</a>
                    </div>
                </div>
            </section>

            {/* WHY — large copy blocks, Apple-style spacing */}
            <section id="why" className="bg-neutral-50 border-y">
                <div className="mx-auto max-w-6xl px-4 py-24 grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Explorer, comprendre, se projeter",
                            text: "Découvrir sur place les géants de la tech et ceux qui inventent le futur.\n" +
                                "Un voyage qui relie théorie et pratique, curiosité et ambition : comprendre les métiers du numérique en rencontrant celles et ceux qui les font évoluer chaque jour.",
                        },
                        {
                            title: "L’innovation, grandeur nature",
                            text: "Apple, Google, Stanford, Intel… des noms mythiques, mais surtout des lieux d’inspiration.\n" +
                                "Observer leurs méthodes, ressentir leur culture, découvrir qu’innover, c’est avant tout travailler, échanger et rêver grand.",
                        },
                        {
                            title: "Une aventure humaine avant tout",
                            text: "Partir, c’est aussi vivre une expérience collective :\n" +
                                "préparer ensemble, découvrir ensemble, revenir transformés.\n" +
                                "Un voyage qui crée des souvenirs, de la confiance, et parfois même des vocations.",
                        },
                    ].map((b, i) => (
                        <motion.div key={i} {...fade} className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
                            <h3 className="text-xl font-semibold tracking-tight">{b.title}</h3>
                            <p className="mt-3 text-neutral-600">{b.text}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Parallax image + copy (dark) */}
            <Strip
                dark
                src="IMG_0073.jpeg"
                alt="Google campus"
                caption="Rencontrer l'écosystème de l'innovation"
            />

            {/* PROGRAM — alternating cards, slight Material elevation */}
            <section id="program" className="bg-neutral-50 border-y">
                <div className="mx-auto max-w-6xl px-4 py-24">
                    <motion.h2 {...fade} className="text-3xl md:text-4xl font-semibold tracking-tight">Programme indicatif (7 nuits)</motion.h2>
                    <div className="mt-8 grid md:grid-cols-2 gap-5 text-sm">
                        {[
                            "Jour 1 — Vol direct CDG → SFO, transfert et installation",
                            "Jour 2 — San Francisco à pied : Downtown, Chinatown, North Beach",
                            "Jour 3 — Autocar Silicon Valley #1 : Apple Park Visitor Center, Googleplex",
                            "Jour 4 — Fisherman’s Wharf, Pier 39, Lombard Street, match de baseball",
                            "Jour 5 — Vélo Golden Gate → Sausalito, retour en ferry",
                            "Jour 6 — Autocar Silicon Valley #2 : Stanford University, Intel Museum",
                            "Jour 7 — Alcatraz + quartiers : Mission, Castro — bilan",
                            "Jour 8 — Transfert aéroport, vol retour",
                        ].map((line, i) => (
                            <motion.div key={i} {...fade} className="rounded-2xl border bg-white p-5 shadow-sm">
                                {line}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* IMAGE GALLERY STRIP — parallax panels */}
            <section id="gallery" className="bg-neutral-950 bg-gradient-hero">
              <div className="mx-auto max-w-6xl px-4 pt-24">
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">Galerie photos</h2>
              </div>
              <Gallery />
            </section>

            {/* FAQ — light */}
            <section id="faq" className="bg-gradient-to-b from-neutral-100 to-white">
                <div className="mx-auto max-w-3xl px-4 py-24">
                    <motion.h2 {...fade} className="text-3xl md:text-4xl font-semibold tracking-tight">FAQ</motion.h2>
                    <div className="mt-6 divide-y border rounded-3xl overflow-hidden shadow-sm">
                        {[{
                            q:"Le voyage est-il ouvert à tous ?",
                            a:"Oui, sous réserve de motivation et d'engagement. Des aides financières existent pour les familles.",
                        },{
                            q:"Les repas sont-ils inclus ?",
                            a:"Le petit-déjeuner est inclus. Prévoyez 25–30 $/jour pour repas et transports urbains.",
                        },{
                            q:"Et si j'ai besoin d'aide financière ?",
                            a:"Fonds social, aides régionales, mécénat et actions élèves : parlez-en en toute confidentialité à l'équipe.",
                        }].map((item, i) => (
                            <details key={i} className="p-4 bg-white">
                                <summary className="cursor-pointer font-medium">{item.q}</summary>
                                <p className="mt-2 text-neutral-600">{item.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* BUDGET — dark contrast */}
            <section id="budget" className="bg-neutral-950 text-white bg-gradient-hero">
                <div className="mx-auto max-w-6xl px-4 py-24">
                    <motion.h2 {...fade} className="text-3xl md:text-4xl font-semibold tracking-tight">Budget & aides</motion.h2>
                    <div className="mt-8 grid md:grid-cols-3 gap-6 text-sm">
                        <motion.div {...fade} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_1px_1px_rgba(0,0,0,0.2)]">
                            <h3 className="font-semibold">Participation estimative</h3>
                            <p className="mt-2 text-neutral-300">À partir de <span className="font-semibold text-white">1 750 €</span> (vol, hébergement, transferts, 2 jours d'autocar, Alcatraz, vélo, assurances). Repas & transports urbains: env. 250 €.</p>
                        </motion.div>
                        <motion.div {...fade} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_1px_1px_rgba(0,0,0,0.2)]">
                            <h3 className="font-semibold">Aides possibles</h3>
                            <ul className="mt-2 list-disc pl-5 text-neutral-300">
                                <li>Fonds social (dossier confidentiel)</li>
                                <li>Région / DRAREIC (mobilité internationale)</li>
                                <li>Mécénat local, actions élèves, fonds solidaire</li>
                            </ul>
                        </motion.div>
                        <motion.div {...fade} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_1px_1px_rgba(0,0,0,0.2)]">
                            <h3 className="font-semibold">Paiement échelonné</h3>
                            <p className="mt-2 text-neutral-300">Échéancier sur 6–8 mois possible. Contactez l'équipe pour un plan adapté.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* APPLY — alternating with dark footer */}
            <section id="apply" className="bg-gradient-to-b from-neutral-100 to-white">
                <div className="mx-auto max-w-6xl px-4 py-24 grid md:grid-cols-2 gap-10 items-center">
                    <motion.div {...fade}>
                        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Je veux participer</h2>
                        <p className="mt-3 text-neutral-600">Remplissez le formulaire de pré‑inscription. Nous reviendrons vers vous avec les étapes et l'échéancier.</p>
                    </motion.div>
                    <motion.form
                        {...fade}
                        onSubmit={async (e: any) => {
                            e.preventDefault();
                            if (submitting) return;
                            const form = e.currentTarget as HTMLFormElement;
                            const data = Object.fromEntries(new FormData(form).entries());
                            try {
                                setSubmitting(true);
                                const res = await fetch("/api/contact", {
                                    method: "POST",
                                    headers: { "content-type": "application/json" },
                                    body: JSON.stringify(data),
                                });
                                const json = await res.json().catch(() => ({}));
                                if (res.ok && (json as any).ok) {
                                    form.reset();
                                    pushToast("Pré-inscription envoyée ✅", "success");
                                } else {
                                    pushToast(((json as any).error as string) || "Échec de l’envoi.", "error");
                                }
                            } catch {
                                pushToast("Erreur réseau.", "error");
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                        className="bg-white text-neutral-900 rounded-3xl p-6 border shadow-md"
                    >
                        {/* honeypot anti-bot */}
                        <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

                        <label className="block text-sm font-medium">Nom</label>
                        <input required name="lastName" className="mt-1 w-full rounded-xl border px-3 py-2 shadow-sm" />

                        <label className="block text-sm font-medium">Prénom</label>
                        <input required name="firstName" className="mt-1 w-full rounded-xl border px-3 py-2 shadow-sm" />

                        <label className="block text-sm font-medium">Classe</label>
                        <input required name="section" className="mt-1 w-full rounded-xl border px-3 py-2 shadow-sm" />

                        <label className="block mt-4 text-sm font-medium">Email</label>
                        <input required type="email" name="email" className="mt-1 w-full rounded-xl border px-3 py-2 shadow-sm" />

                        <label className="block mt-4 text-sm font-medium">Motivation (2–3 lignes)</label>
                        <textarea name="motivation" rows={3} className="mt-1 w-full rounded-xl border px-3 py-2 shadow-sm" />

                        <button
                            disabled={submitting}
                            className="mt-4 w-full rounded-xl bg-neutral-900 text-white px-4 py-3 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {submitting ? "Envoi…" : "Envoyer"}
                        </button>
                        <p className="mt-2 text-xs text-neutral-500">
                            En envoyant ce formulaire, vous acceptez d'être contacté au sujet du projet.
                        </p>
                    </motion.form>
                </div>
            </section>

            <footer className="bg-neutral-950 text-white border-t border-white/10">
                <div className="mx-auto max-w-6xl px-4 py-10 text-sm flex flex-col md:flex-row items-center justify-between gap-3">
                    <p>© {new Date().getFullYear()} Lycée Campus St Joseph — Projet Silicon Valley</p>
                    <div className="flex gap-4 text-neutral-400">
                        <a href="/legal" className="hover:text-white">Mentions légales</a>
                    </div>
                </div>
            </footer>
            {/* Toasts */}
            <div aria-live="polite" className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
                {toasts.map((t) => (
                    <motion.div
                        key={t.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="rounded-2xl px-4 py-3 text-sm shadow-lg border bg-white"
                        style={{ borderColor: t.kind === "success" ? "#22c55e33" : "#ef444433" }}
                    >
                        <span className={t.kind === "success" ? "text-emerald-700" : "text-red-700"}>{t.msg}</span>
                    </motion.div>
                ))}
            </div>
        </main>
    );
}
