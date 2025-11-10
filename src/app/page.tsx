"use client";
import {motion, useScroll, useTransform, cubicBezier, AnimatePresence} from "framer-motion";
import {useRef, useState} from "react";
import Gallery from "@/app/components/Gallery";
import Image from "next/image";

export default function Page() {
    const fade = {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-10%" },
        transition: { duration: 0.5, ease: cubicBezier(0.16, 1, 0.3, 1) },
    };

    // Parallax for hero
    const heroRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const yFloat = useTransform(scrollYProgress, [0, 1], [0, -30]);
    const [submitting, setSubmitting] = useState(false);
    const [expandGallery, setExpandGallery] = useState(false);
    const [openIndex, setOpenIndex] = useState<number | null>(null);
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
                            Une immersion au cœur de l&apos;innovation : visites de campus et de sièges emblématiques, mises en contexte des métiers, et rencontres selon disponibilités.
                        </motion.p>
                        <motion.ul {...fade} className="mt-6 grid grid-cols-2 gap-3 text-sm">
                            <li className="rounded-2xl border border-neutral-200/60 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur p-3 shadow-sm">✈️<span className="ml-3">Vol direct AF</span></li>
                            <li className="rounded-2xl border border-neutral-200/60 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur p-3 shadow-sm">🚌<span className="ml-3">Silicon Valley</span></li>
                            <li className="rounded-2xl border border-neutral-200/60 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur p-3 shadow-sm">🚲<span className="ml-3">Golden Gate Bridge</span></li>
                            <li className="rounded-2xl border border-neutral-200/60 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur p-3 shadow-sm">🛡️<span className="ml-3">San Francisco</span></li>
                        </motion.ul>
                    </div>
                    <motion.div style={{ y }} className="order-1 md:order-2 relative rounded-3xl overflow-hidden border shadow-xl aspect-[16/10] md:aspect-[4/3]">
                        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
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
                        <Image src="/logo-long.svg" alt="St Jo" width="175" height="100" />
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

            {/* SECTION - réunion d'information */}
            <section className="bg-amber-50 border-y border-amber-200">
                <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/70 text-amber-900 px-3 py-1 border border-amber-200">
                        <span aria-hidden>📣</span>
                        <span className="text-sm font-medium">Réunion d’information</span>
                    </div>
                    <p className="text-sm text-amber-900">
                        <strong>Lundi 10 novembre 2025</strong> à <strong>12h30</strong> — en <strong>amphi</strong>.
                        <span className="ml-2">Ouvert aux étudiants intéressés.</span>
                    </p>
                </div>
            </section>

            {/* HERO — big Apple-like typography, parallax background */}
            <section ref={heroRef} className="relative min-h-[78vh] overflow-hidden bg-neutral-950">
                <motion.div style={{ y: yHero }}
                            className="absolute inset-0">
                    <Image
                        src="/pexels-augustocarneirojr-28003377.jpg"
                        alt="San Francisco skyline"
                        fill
                        priority
                        className="object-cover opacity-70"
                    />
                </motion.div>
                <div className="relative mx-auto max-w-6xl px-4 py-24 md:py-32">
                    <motion.h1 style={{ y: yFloat }}
                               className="text-4xl md:text-7xl font-semibold leading-[1.05] tracking-tight text-white">
                        San Francisco &
                        <span className="block text-gradient">Silicon Valley</span>
                    </motion.h1>
                    {/* Badge Dates du voyage */}
                    <motion.div {...fade} className="mt-6">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/90 text-neutral-900 px-4 py-2 shadow-lg backdrop-blur">
                            <span aria-hidden>📅</span>
                            <span className="font-medium">Du <strong>8</strong> au <strong>15 avril 2026</strong></span>
                        </div>
                    </motion.div>

                    {/* Bandeau Réunion d'information */}
                    <motion.div {...fade} className="mt-4">
                        <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 text-amber-900 px-4 py-2 shadow-md">
                            <span aria-hidden>📣</span>
                            <span className="font-medium">Réunion d’information : <strong>lundi 10 novembre 2025 à 12h30</strong> — en amphi</span>
                        </div>
                    </motion.div>
                    <motion.p {...fade} className="mt-6 max-w-2xl text-neutral-300 text-lg">
                        Voyage d&apos;étude : innovation, culture tech et rencontres professionnelles.
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
                src="/IMG_0073.jpeg"
                alt="Google campus"
                caption="Rencontrer l&apos;écosystème de l&apos;innovation"
            />

            {/* PROGRAM — alternating cards, slight Material elevation */}
            <section id="program" className="bg-neutral-50 border-y">
                <div className="mx-auto max-w-6xl px-4 py-24">
                    <motion.h2 {...fade} className="text-3xl md:text-4xl font-semibold tracking-tight">Programme indicatif (7 nuits)*</motion.h2>
                    <div className="mt-8 grid md:grid-cols-2 gap-5 text-sm">
                        {[
                            "Jour 1 — Vol direct CDG → SFO, transfert et installation",
                            "Jour 2 — San Francisco à pied : Downtown, Chinatown, North Beach",
                            "Jour 3 — Autocar Silicon Valley #1 : Apple, Google, Computer History Museum",
                            "Jour 4 — Fisherman’s Wharf, Pier 39, Lombard Street",
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
                    <p className="mt-6 text-xs text-neutral-500">* Le programme est indicatif et peut être ajusté en fonction des disponibilités, des conditions locales et des opportunités de rencontres.</p>
                </div>
            </section>

            {/* IMAGE GALLERY STRIP — parallax panels */}
            <section id="gallery" className="bg-neutral-950 bg-gradient-hero">
                <div className="mx-auto max-w-6xl px-4 pt-24">
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">Galerie photos</h2>
                    <p className="mt-3 text-neutral-300">Retour en images sur nos précédents voyages et découvertes.</p>
                </div>

                {/* ✅ Replié = 8 photos ; Ouvert = toutes les photos */}
                <Gallery initialVisible={8} expanded={expandGallery} />

                <div className="mx-auto max-w-6xl px-4 pb-16">
                    <button
                        type="button"
                        onClick={() => setExpandGallery((v) => !v)}
                        className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20 transition"
                        aria-expanded={expandGallery}
                        aria-controls="gallery"
                    >
                        {expandGallery ? "Réduire la galerie" : "Afficher plus"}
                    </button>
                </div>
            </section>


            {/* FAQ — light */}
            <section id="faq" className="bg-gradient-to-b from-neutral-100 to-white">
                <div className="mx-auto max-w-3xl px-4 py-24">
                    <motion.h2 {...fade} className="text-3xl md:text-4xl font-semibold tracking-tight">FAQ</motion.h2>
                    <div className="mt-6 divide-y border rounded-3xl overflow-hidden shadow-sm">
                        {[{
                            q:"Le voyage est-il ouvert à tous ?",
                            a:"Le voyage est proposé aux étudiants post-bac et TG NSI, sous réserve de motivation et d'engagement.",
                        },{
                            q:"Où et comment serons-nous logés ?",
                            a:"Nos chambres sont réservées à l'auberge de jeunesse Samesun SF Downtown, en plein centre-ville. Chambres de 6 lits avec sanitaires partagés.",
                        },{
                            q:"Comment nous déplacerons-nous là-bas ?",
                            a:"Les transferts aéroport et les journées en Silicon Valley se font en autocar privé. Le reste du temps, nous utilisons les transports en commun, à pied ou à vélo.",
                        },{
                            q:"Les repas sont-ils inclus ?",
                            a:"Le petit-déjeuner est inclus. Mais les repas du midi et du soir sont à prévoir : comptez un budget de 25–30 $/jour pour repas et transports urbains.",
                        },{
                            q:"Quelles sont les formalités à prévoir ?",
                            a:"Passeport en cours de validité et ESTA (demande en ligne, $40 valable 2 ans). Nous vous guiderons dans les démarches.",
                        },{
                            q:"Où, comment et quand s'inscrire ?",
                            a:"Remplissez le formulaire de pré‑inscription en bas de page. Nous vous recontacterons avec les étapes suivantes.",
                        },{
                            q:"Combien de places sont-elles disponibles ?",
                            a:"Le nombre de places proposé est de 36 étudiants. Les inscriptions seront traitées par ordre de réception des pré‑inscriptions, avec priorité aux étudiants post-bac et sections informatiques.",
                        },{
                            q:"Et si j'ai besoin d'aide financière ?",
                            a:"Fonds social, aides régionales, mécénat et actions élèves : parlez-en en toute confidentialité à l'équipe.",
                        }].map((item, i) => {
                            const open = openIndex === i;
                            return (
                                <div key={i} className="bg-white">
                                    <button
                                        onClick={() => setOpenIndex(open ? null : i)}
                                        className="w-full text-left p-4 font-medium cursor-pointer flex justify-between items-center"
                                    >
                                        <span>{item.q}</span>
                                        <span
                                            className={`transition-transform duration-300 ${
                                                open ? "rotate-180" : ""
                                            }`}
                                        >
                ▾
              </span>
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {open && (
                                            <motion.div
                                                key="content"
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-4 pb-4 text-neutral-600">{item.a}</div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
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
                            <p className="mt-2 text-neutral-300">À partir de <span className="font-semibold text-white">1 890 €</span> (vol, hébergement, transferts, 2 jours d&apos;autocar, Alcatraz, vélo, assurances). Repas & transports urbains: prévoir env. 250 €.</p>
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
                            <p className="mt-2 text-neutral-300">Échéancier sur plusieurs mois. Contactez l&apos;équipe pour un plan adapté.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* APPLY — alternating with dark footer */}
            <section id="apply" className="bg-gradient-to-b from-neutral-100 to-white">
                <div className="mx-auto max-w-6xl px-4 py-24 grid md:grid-cols-2 gap-10 items-center">
                    <motion.div {...fade}>
                        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Je veux participer</h2>
                        <p className="mt-3 text-neutral-600">Remplissez le formulaire de pré‑inscription. Nous reviendrons vers vous avec les étapes et l&apos;échéancier.</p>
                    </motion.div>
                    <motion.form
                        {...fade}
                        onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
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
                                const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
                                if (res.ok && json.ok) {
                                    form.reset();
                                    pushToast("Pré-inscription envoyée ✅", "success");
                                } else {
                                    pushToast((json.error as string) || "Échec de l’envoi.", "error");
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
                            En envoyant ce formulaire, vous acceptez d&apos;être contacté au sujet du projet.
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
