"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight, ArrowRight, Sparkles, Zap, Shield, Star,
  ChevronLeft, ChevronRight, Menu, X, Check, Quote, Play,
  Camera, Image as ImageIcon, Layers, BarChart2, MessageCircle
} from "lucide-react";

/* ─── constants ─── */
const NAV = ["About", "How it Works", "Gallery", "Testimonials", "Contact"];

const CLIENTS = [
  "Shopify", "WooCommerce", "Amazon Sellers", "Etsy Pro", "BigCommerce",
  "Squarespace", "Wix Stores", "Magento", "PrestaShop", "Faire"
];

const HERO_IMAGES = {
  main: "/12.jpg",
  topRight: "/14.jpg",
  bottomRight: "/10.jpg",
};

const GALLERY_IMAGES = [
  {
    src: "/1.jpg",
    label: "Botanical Studio",
    tag: "Beauty",
  },
  {
    src: "/8.jpg",
    label: "Outdoor Lifestyle",
    tag: "Consumer",
  },
  {
    src: "/13.jpg",
    label: "Bold Product Shot",
    tag: "Electronics",
  },
  {
    src: "/2.jpg",
    label: "Minimalist Studio",
    tag: "Skincare",
  },
];

const STEPS = [
  {
    num: "01",
    icon: <Camera size={20} />,
    title: "Upload your product",
    desc: "Drag & drop any product photo — even a simple smartphone shot works perfectly.",
  },
  {
    num: "02",
    icon: <Sparkles size={20} />,
    title: "AI generates scenes",
    desc: "Our model renders dozens of photorealistic backdrops, lighting rigs, and lifestyle contexts.",
  },
  {
    num: "03",
    icon: <ImageIcon size={20} />,
    title: "Download & publish",
    desc: "Export studio-quality images in any resolution. Ready for ads, listings, and lookbooks.",
  },
];

const FEATURES = [
  {
    icon: <Zap size={18} />,
    title: "Ready in minutes",
    desc: "Not hours. Not days. Get a full gallery of product images in under 5 minutes.",
  },
  {
    icon: <Layers size={18} />,
    title: "Unlimited scenes",
    desc: "White backgrounds, lifestyle sets, outdoor shots — every context, one upload.",
  },
  {
    icon: <Shield size={18} />,
    title: "Reliable quality",
    desc: "Every image is sharpness-checked and brand-safe. No surprises, no bad crops.",
  },
  {
    icon: <BarChart2 size={18} />,
    title: "Proven ROI",
    desc: "Businesses using Unbound Folk report stronger engagement and higher conversion on their listings.",
  },
];

const TESTIMONIALS = [
  {
    name: "Amirah Zulkifli",
    role: "Founder, Purê Skincare — Petaling Jaya",
    avatar: "AZ",
    rating: 5,
    text: "Dulu setiap shoot habis dalam RM3,000 lebih, belum kira editing. Dengan Unbound Folk, I upload gambar produk, dalam 5 minit dah dapat gallery yang cantik. Sales kat Shopee naik dalam masa 2 minggu. Memang berbaloi.",
  },
  {
    name: "Darren Lim",
    role: "E-commerce Manager, Halo Coffee — Kuala Lumpur",
    avatar: "DL",
    rating: 5,
    text: "We sell on Lazada and our own site. Before this, getting good product photos was a whole production — booking studio, waiting weeks. Now we just upload and it's done. The quality honestly surprised me, customers keep asking which photographer we use.",
  },
  {
    name: "Nurul Ain Hashim",
    role: "Co-founder, Bumi Botanics — Shah Alam",
    avatar: "NA",
    rating: 5,
    text: "As a small brand baru nak grow, budget memang terhad. Unbound Folk bagi kita imej yang nampak professional without the crazy cost. Sekarang our TikTok and Instagram content pun improve sebab gambar dah lawa. Highly recommend untuk brand Malaysia!",
  },
];

const STATS = [
  { num: 180, suffix: "K+", label: "Images generated" },
  { num: 96, suffix: "%", label: "Satisfaction rate" },
  { num: 5, suffix: "min", label: "Avg. turnaround" },
  { num: 240, suffix: "+", label: "Businesses served", format: false },
];

/* ─── helpers ─── */
const expo = [0.16, 1, 0.3, 1] as const;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

function FadeUp({
  children,
  delay = 0,
  className = "",
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const inView = useInView(ref, { once: true, margin: "-60px" });
  // On mobile skip y-transform, just fade — cheaper
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: isMobile ? 0 : 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: isMobile ? 0.4 : 0.72, ease: expo, delay: isMobile ? 0 : delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function CountUp({
  to,
  suffix = "",
  format = false,
  duration = 1.8,
}: {
  to: number;
  suffix?: string;
  format?: boolean;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * to);
      setDisplayed(current);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to, duration]);

  const display = format ? displayed.toLocaleString() : displayed;
  return <span ref={ref}>{display}{suffix}</span>;
}

function Pill({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest rounded-full px-3 py-1 border"
      style={
        light
          ? {
              color: "var(--ink)",
              background: "oklch(0.82 0.22 128 / 20%)",
              borderColor: "oklch(0.82 0.22 128 / 40%)",
            }
          : {
              color: "var(--ink)",
              background: "oklch(0.82 0.22 128 / 15%)",
              borderColor: "oklch(0.82 0.22 128 / 35%)",
            }
      }
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: "var(--brand)" }}
      />
      {children}
    </span>
  );
}

/* ═══════════════════════════════════════
   PAGE
═══════════════════════════════════════ */
export default function Page() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTest, setActiveTest] = useState(0);
  const [hoveredGallery, setHoveredGallery] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", topic: "General inquiry", message: "" });
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [activeModal, setActiveModal] = useState<"Privacy" | "Terms" | "Status" | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "fe3a2c0a-9e86-4ef9-a609-8af9660800a4",
          subject: `New enquiry: ${formData.topic} — from ${formData.firstName} ${formData.lastName}`,
          from_name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          topic: formData.topic,
          message: formData.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setFormState("sent");
        setFormData({ firstName: "", lastName: "", email: "", topic: "General inquiry", message: "" });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };
  const isMobile = useIsMobile();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroYRaw = useTransform(scrollYProgress, [0, 1], [0, 60]);
  // Disable parallax on mobile — scroll listeners + transforms are expensive on low-end devices
  const heroY = isMobile ? 0 : heroYRaw;

  useEffect(() => {
    const id = setInterval(
      () => setActiveTest((p) => (p + 1) % TESTIMONIALS.length),
      5000
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden">

      {/* ── NAV ── */}
      <header className="fixed top-0 inset-x-0 z-50 flex justify-center pt-5 px-4">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: expo }}
          className="w-full max-w-6xl flex items-center justify-between bg-card/95 backdrop-blur-md border border-border rounded-2xl px-6 py-3 shadow-sm"
        >
          <a href="#" className="flex items-center gap-2.5">
            <img src="/uf-logo.svg" alt="Unbound Folk" className="w-8 h-8 rounded-md" />
            <span className="font-bold text-base tracking-tight text-foreground">
              Unbound <span className="text-brand">Folk</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-7">
            {NAV.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase().replace(/ /g, "-")}`}
                className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
              >
                {l}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-brand transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <motion.a
            href="https://unboundfolk.store/"
            className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold"
            whileHover={{ scale: 1.04, opacity: 0.88 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.16 }}
          >
            Get Started <ArrowUpRight size={13} />
          </motion.a>

          <button
            className="md:hidden text-muted-foreground"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </motion.div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="absolute top-[76px] inset-x-4 bg-card border border-border rounded-2xl p-5 space-y-3 shadow-lg"
            >
              {NAV.map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase().replace(/ /g, "-")}`}
                  className="block text-sm font-medium text-foreground py-1"
                  onClick={() => setMobileOpen(false)}
                >
                  {l}
                </a>
              ))}
              <a
                href="https://unboundfolk.store/"
                className="block text-center px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold mt-2"
              >
                Get Started
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section
        ref={heroRef}
        id="about"
        className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-20 px-4 overflow-hidden"
      >
        {/* Ambient blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[140px] opacity-40"
            style={{ background: "oklch(0.82 0.22 128 / 20%)" }}
          />
          <div
            className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[110px] opacity-20"
            style={{ background: "oklch(0.55 0.18 240 / 20%)" }}
          />
        </div>

        <motion.div
          style={{ y: heroY }}
          className="relative z-10 max-w-5xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: expo }}
            className="mb-7"
          >
            <Pill>AI Product Photography Platform</Pill>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: expo, delay: 0.08 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6"
          >
            Product images,{" "}
            <em className="font-serif not-italic text-brand">fast</em>
            <br />& reliable.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: expo, delay: 0.18 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Unbound Folk uses AI to turn any product photo into a complete gallery
            of studio-quality images — white-bg, lifestyle, and ad-ready — in
            under 5 minutes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: expo, delay: 0.28 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
          >
            <motion.a
              href="https://unboundfolk.store/"
              className="group flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm"
              style={{
                background: "linear-gradient(270deg, #01171e, #0a3a2a, #143d14, #01171e)",
                backgroundSize: "300% 300%",
                animation: isMobile ? "none" : "gradient-shift 4s ease infinite",
                color: "#f2f2f2",
                boxShadow: "0 0 0 1px rgba(167,234,21,0.3), 0 4px 24px -4px rgba(167,234,21,0.35)",
              }}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 0 1px rgba(167,234,21,0.6), 0 8px 32px -4px rgba(167,234,21,0.55)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
            >
              <Sparkles size={14} style={{ color: "#a7ea15" }} />
              Try It Free — See Results in 5 min
              <motion.span
                className="inline-flex"
                initial={{ x: 0 }}
                whileHover={{ x: 3 }}
                transition={{ duration: 0.18 }}
              >
                <ArrowRight size={15} />
              </motion.span>
            </motion.a>
            <motion.a
              href="#gallery"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-border text-foreground font-semibold text-sm"
              whileHover={{ scale: 1.03, backgroundColor: "var(--secondary)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
            >
              <Play size={13} />
              See Gallery
            </motion.a>
          </motion.div>

          {/* Hero bento */}
          <motion.div
            initial={{ opacity: 0, y: 44 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: expo, delay: 0.38 }}
            className="grid grid-cols-12 gap-3 max-w-4xl mx-auto"
            style={{ gridTemplateRows: "200px 200px" }}
          >
            {/* Big left — spans both rows */}
            <div className="col-span-7 relative rounded-2xl overflow-hidden border border-border group"
              style={{ gridRow: "span 2" }}>
              <img
                src={HERO_IMAGES.main}
                alt="AI-generated studio product photo — Unbound Folk"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: "center top" }}
                width={700} height={420}
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">Studio AI</span>
                  <p className="text-white font-semibold text-base leading-tight">
                    Professional lighting<br />in minutes
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                  <ArrowUpRight size={14} className="text-white" />
                </div>
              </div>
            </div>

            {/* Top right */}
            <div className="col-span-5 relative rounded-2xl overflow-hidden border border-border group">
              <img
                src={HERO_IMAGES.topRight}
                alt="Lifestyle product photography generated by AI"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: "center 25%" }}
                width={500} height={200}
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <span className="absolute bottom-3 left-3 text-xs font-semibold text-white bg-black/40 backdrop-blur-sm rounded-lg px-2.5 py-1">
                Lifestyle Scene
              </span>
            </div>

            {/* Bottom right — two cells */}
            <div className="col-span-5 grid grid-cols-2 gap-3">
              <div className="relative rounded-2xl overflow-hidden border border-border group">
                <img
                  src={HERO_IMAGES.bottomRight}
                  alt="Product detail shot — AI photography"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ objectPosition: "center top" }}
                  width={240} height={200}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="rounded-2xl bg-primary text-primary-foreground flex flex-col items-center justify-center p-4 text-center">
                <span className="text-3xl font-bold">5x</span>
                <span className="text-xs font-medium opacity-70 leading-tight mt-1">
                  Faster than traditional shoots
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          CLIENTS MARQUEE
      ══════════════════════════════════════ */}
      <section className="py-14 border-y border-border overflow-hidden bg-surface">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8">
          Trusted by sellers on every platform
        </p>
        <div className="relative">
          <div
            className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, var(--surface), transparent)" }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, var(--surface), transparent)" }}
          />
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="flex gap-10 items-center"
            style={{ width: "max-content" }}
          >
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <span
                key={i}
                className="text-sm font-semibold text-muted-foreground whitespace-nowrap px-4"
              >
                {c}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS
      ══════════════════════════════════════ */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <FadeUp key={s.label} delay={i * 0.08}>
              <motion.div
                className="rounded-2xl border border-border bg-card p-6 text-center cursor-default"
                whileHover={{
                  y: -4,
                  boxShadow: "0 12px 32px -8px oklch(0.82 0.22 128 / 20%)",
                  borderColor: "oklch(0.82 0.22 128 / 50%)",
                }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="text-4xl font-bold text-foreground">
                  <CountUp to={s.num} suffix={s.suffix} format={s.format} />
                </div>
                <div className="text-sm text-muted-foreground mt-1 font-medium">{s.label}</div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════ */}
      <section id="how-it-works" className="py-28 px-4 border-t border-border bg-surface">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-20">
            <Pill>How It Works</Pill>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mt-4 mb-4 leading-tight">
              From photo to gallery<br />
              in three{" "}
              <em className="font-serif not-italic text-brand">steps.</em>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              No design skills. No studio. Just upload, let AI do the work,
              and download your images.
            </p>
          </FadeUp>

          {/* Steps */}
          <div className="relative">
            {/* Desktop: vertical timeline line */}
            <div className="hidden md:block absolute left-[27px] top-14 bottom-14 w-px bg-border z-0" />

            <div className="flex flex-col gap-6">
              {STEPS.map((step, i) => (
                <FadeUp key={step.num} delay={i * 0.14} className="relative z-10">
                  <motion.div
                    className="flex gap-6 md:gap-8 items-start bg-card rounded-2xl border border-border p-6 md:p-8 cursor-default"
                    whileHover={{
                      x: 6,
                      boxShadow: "0 8px 32px -8px oklch(0.82 0.22 128 / 22%)",
                      borderColor: "oklch(0.82 0.22 128 / 55%)",
                    }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Step circle — sits on the timeline line */}
                    <div
                      className="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center text-base font-bold z-10"
                      style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
                    >
                      {step.num}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-foreground text-xl">{step.title}</h3>
                        <motion.div
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: "oklch(0.82 0.22 128 / 20%)", color: "var(--ink)" }}
                          whileHover={{ scale: 1.1, background: "var(--brand)" }}
                          transition={{ duration: 0.2 }}
                        >
                          {step.icon}
                        </motion.div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          WHY UNBOUND FOLK (USP)
      ══════════════════════════════════════ */}
      <section className="pt-24 border-t border-border" style={{ background: "var(--primary)" }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-[1fr_1.6fr] gap-16 items-start pb-20">
            {/* Left — headline */}
            <FadeUp>
              <span
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest rounded-full px-3 py-1 border mb-5"
                style={{
                  color: "var(--brand)",
                  background: "oklch(0.82 0.22 128 / 12%)",
                  borderColor: "oklch(0.82 0.22 128 / 25%)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--brand)" }} />
                Why Unbound Folk
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight" style={{ color: "var(--primary-foreground)" }}>
                Everything you need.{" "}
                <em className="font-serif not-italic text-brand">Nothing you don&apos;t.</em>
              </h2>
              <p className="mt-5 leading-relaxed" style={{ color: "oklch(0.975 0 0 / 55%)" }}>
                We built Unbound Folk for product teams who need to move fast
                without sacrificing quality or blowing the budget.
              </p>
            </FadeUp>

            {/* Right — feature list */}
            <div className="flex flex-col gap-4">
              {FEATURES.map((f, i) => (
                <FadeUp key={f.title} delay={i * 0.09}>
                  <motion.div
                    className="flex gap-4 items-start rounded-2xl p-5 cursor-default"
                    style={{
                      background: "oklch(1 0 0 / 5%)",
                      border: "1px solid oklch(1 0 0 / 10%)",
                    }}
                    whileHover={{
                      background: "oklch(1 0 0 / 8%)",
                      borderColor: "oklch(0.82 0.22 128 / 40%)",
                      x: 4,
                    }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <motion.div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "var(--brand)", color: "var(--brand-foreground)" }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {f.icon}
                    </motion.div>
                    <div>
                      <p className="font-bold text-base mb-1" style={{ color: "var(--primary-foreground)" }}>{f.title}</p>
                      <p className="text-sm leading-relaxed" style={{ color: "oklch(0.975 0 0 / 60%)" }}>{f.desc}</p>
                    </div>
                  </motion.div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>

        {/* Full-width CTA banner — bottom of dark section */}
        <FadeUp delay={0.3}>
          <div
            className="w-full px-4 py-8"
            style={{ background: "var(--brand)" }}
          >
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <p className="text-2xl font-bold tracking-tight" style={{ color: "var(--brand-foreground)" }}>
                  Start generating images today.
                </p>
                <p className="mt-1 text-sm" style={{ color: "oklch(0.13 0.025 220 / 60%)" }}>
                  Your first 10 images are completely free — no credit card required.
                </p>
              </div>
              <motion.a
                href="https://unboundfolk.store/"
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm whitespace-nowrap flex-shrink-0"
                style={{
                  background: "linear-gradient(270deg, #01171e, #0a3a2a, #143d14, #01171e)",
                  backgroundSize: "300% 300%",
                  animation: isMobile ? "none" : "gradient-shift 4s ease infinite",
                  color: "#f2f2f2",
                  boxShadow: "0 0 0 1px rgba(167,234,21,0.3), 0 8px 32px -4px rgba(167,234,21,0.5)",
                }}
                animate={isMobile ? {} : { y: [0, -6, 0] }}
                transition={{
                  y: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
                }}
                whileHover={{
                  scale: 1.06,
                  boxShadow: "0 0 0 1px rgba(167,234,21,0.7), 0 12px 40px -4px rgba(167,234,21,0.65)",
                  y: 0,
                }}
                whileTap={{ scale: 0.96 }}
              >
                <Sparkles size={13} style={{ color: "#a7ea15" }} />
                Get Started Free <ArrowRight size={15} />
              </motion.a>
            </div>
          </div>
        </FadeUp>
      </section>


      {/* ══════════════════════════════════════
          GALLERY
      ══════════════════════════════════════ */}
      <section id="gallery" className="py-28 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <Pill>Portfolio Gallery</Pill>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 leading-tight">
                  Real results from<br />
                  real{" "}
                  <em className="font-serif not-italic text-brand">products.</em>
                </h2>
              </div>
              <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
                Every image below was generated with Unbound Folk from a single
                product photo. No studio. No photographer.
              </p>
            </div>
          </FadeUp>

          {/* Interactive grid */}
          <div className="grid grid-cols-12 gap-4">
            {/* Large left — row span 2 */}
            <FadeUp delay={0} className="col-span-12 md:col-span-7" style={{ gridRow: "span 2" } as React.CSSProperties}>
              <motion.div
                className="relative w-full rounded-3xl overflow-hidden border border-border cursor-zoom-in group"
                style={{ height: "460px" }}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredGallery(0)}
                onMouseLeave={() => setHoveredGallery(null)}
                onClick={() => setLightbox(0)}
              >
                <img
                  src={GALLERY_IMAGES[0].src}
                  alt={GALLERY_IMAGES[0].label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  width={700} height={460} loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <div>
                    <span className="text-xs text-white/60 font-semibold uppercase tracking-wider">{GALLERY_IMAGES[0].tag}</span>
                    <p className="text-white font-semibold text-lg leading-snug">{GALLERY_IMAGES[0].label}</p>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={hoveredGallery === 0 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    className="w-9 h-9 rounded-full bg-white/20 backdrop-blur flex items-center justify-center"
                  >
                    <ArrowUpRight size={14} className="text-white" />
                  </motion.div>
                </div>
              </motion.div>
            </FadeUp>

            {/* Top right */}
            <FadeUp delay={0.1} className="col-span-12 md:col-span-5">
              <motion.div
                className="relative w-full rounded-3xl overflow-hidden border border-border cursor-zoom-in group"
                style={{ height: "220px" }}
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredGallery(1)}
                onMouseLeave={() => setHoveredGallery(null)}
                onClick={() => setLightbox(1)}
              >
                <img
                  src={GALLERY_IMAGES[1].src}
                  alt={GALLERY_IMAGES[1].label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  width={500} height={220} loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="text-xs text-white/60 font-semibold uppercase tracking-wider">{GALLERY_IMAGES[1].tag}</span>
                    <p className="text-white font-semibold text-sm">{GALLERY_IMAGES[1].label}</p>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={hoveredGallery === 1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center"
                  >
                    <ArrowUpRight size={12} className="text-white" />
                  </motion.div>
                </div>
              </motion.div>
            </FadeUp>

            {/* Bottom right */}
            <FadeUp delay={0.15} className="col-span-12 md:col-span-5">
              <motion.div
                className="relative w-full rounded-3xl overflow-hidden border border-border cursor-zoom-in group"
                style={{ height: "220px" }}
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredGallery(2)}
                onMouseLeave={() => setHoveredGallery(null)}
                onClick={() => setLightbox(2)}
              >
                <img
                  src={GALLERY_IMAGES[2].src}
                  alt={GALLERY_IMAGES[2].label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  width={500} height={220} loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="text-xs text-white/60 font-semibold uppercase tracking-wider">{GALLERY_IMAGES[2].tag}</span>
                    <p className="text-white font-semibold text-sm">{GALLERY_IMAGES[2].label}</p>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={hoveredGallery === 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center"
                  >
                    <ArrowUpRight size={12} className="text-white" />
                  </motion.div>
                </div>
              </motion.div>
            </FadeUp>

            {/* Full-width bottom */}
            <FadeUp delay={0.2} className="col-span-12">
              <motion.div
                className="relative w-full rounded-3xl overflow-hidden border border-border cursor-zoom-in group"
                style={{ height: "240px" }}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredGallery(3)}
                onMouseLeave={() => setHoveredGallery(null)}
                onClick={() => setLightbox(3)}
              >
                <img
                  src={GALLERY_IMAGES[3].src}
                  alt={GALLERY_IMAGES[3].label}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  width={1200} height={240} loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <div>
                    <span className="text-xs text-white/60 font-semibold uppercase tracking-wider">{GALLERY_IMAGES[3].tag}</span>
                    <p className="text-white font-semibold text-base">{GALLERY_IMAGES[3].label}</p>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={hoveredGallery === 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    className="w-9 h-9 rounded-full bg-white/20 backdrop-blur flex items-center justify-center"
                  >
                    <ArrowUpRight size={14} className="text-white" />
                  </motion.div>
                </div>
              </motion.div>
            </FadeUp>
          </div>

          <FadeUp className="mt-8 text-center">
            <motion.a
              href="https://unboundfolk.store/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
              style={{
                background: "linear-gradient(270deg, #01171e, #0a3a2a, #143d14, #01171e)",
                backgroundSize: "300% 300%",
                animation: isMobile ? "none" : "gradient-shift 4s ease infinite",
                color: "#f2f2f2",
                boxShadow: "0 0 0 1px rgba(167,234,21,0.3), 0 4px 24px -4px rgba(167,234,21,0.35)",
              }}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 0 1px rgba(167,234,21,0.6), 0 8px 32px -4px rgba(167,234,21,0.55)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
            >
              <Sparkles size={13} style={{ color: "#a7ea15" }} />
              Generate your own images <ArrowUpRight size={13} />
            </motion.a>
          </FadeUp>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: expo }}
              className="relative max-w-4xl w-full rounded-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={GALLERY_IMAGES[lightbox].src}
                alt={GALLERY_IMAGES[lightbox].label}
                className="w-full object-contain max-h-[80vh]"
              />
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <X size={16} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-between">
                <div>
                  <p className="text-white/60 text-xs font-semibold uppercase tracking-wider">{GALLERY_IMAGES[lightbox].tag}</p>
                  <p className="text-white font-semibold">{GALLERY_IMAGES[lightbox].label}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setLightbox((p) => p !== null ? (p - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : null)}
                    className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    onClick={() => setLightbox((p) => p !== null ? (p + 1) % GALLERY_IMAGES.length : null)}
                    className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════ */}
      <section id="testimonials" className="py-28 px-4 border-t border-border bg-surface">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-14">
            <Pill>Testimonials</Pill>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 leading-tight">
              What our customers{" "}
              <em className="font-serif not-italic text-brand">say.</em>
            </h2>
          </FadeUp>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTest}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="rounded-3xl border border-border bg-card p-10 md:p-14"
              >
                <Quote size={28} className="text-brand mb-6" />
                <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed mb-10 max-w-3xl">
                  {TESTIMONIALS[activeTest].text}
                </p>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-sm font-bold text-foreground">
                      {TESTIMONIALS[activeTest].avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">{TESTIMONIALS[activeTest].name}</p>
                      <p className="text-xs text-muted-foreground">{TESTIMONIALS[activeTest].role}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: TESTIMONIALS[activeTest].rating }).map((_, i) => (
                      <Star key={i} size={14} className="fill-brand text-brand" />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                onClick={() => setActiveTest((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-all"
              >
                <ChevronLeft size={15} />
              </button>
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTest(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === activeTest ? "bg-foreground w-6" : "bg-border w-1.5"}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setActiveTest((p) => (p + 1) % TESTIMONIALS.length)}
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-all"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA
      ══════════════════════════════════════ */}
      <section className="py-28 px-4 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <div className="relative rounded-3xl overflow-hidden bg-primary text-primary-foreground p-12 md:p-20 text-center">
              <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, white 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
              {/* Brand badge */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span
                  className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest rounded-full px-3 py-1 border"
                  style={{
                    color: "var(--brand)",
                    background: "oklch(0.82 0.22 128 / 15%)",
                    borderColor: "oklch(0.82 0.22 128 / 30%)",
                  }}
                >
                  <span className="w-1 h-1 rounded-full" style={{ background: "var(--brand)" }} />
                  Free to start · No credit card
                </span>
              </div>

              <div className="relative z-10 mt-6">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-5">
                  Your first 10 images<br />are on us.
                </h2>
                <p className="text-primary-foreground/70 text-lg max-w-lg mx-auto mb-10">
                  Sign up in 30 seconds and start generating professional product
                  images right away. No design skills required.
                </p>

                {/* CTA button — centred, full-width on mobile, auto on desktop */}
                <div className="flex justify-center mb-5">
                  <motion.a
                    href="https://unboundfolk.store/"
                    className="flex items-center gap-2.5 px-10 py-4 rounded-2xl font-semibold text-base"
                    style={{
                      background: "linear-gradient(270deg, #01171e, #0a3a2a, #143d14, #01171e)",
                      backgroundSize: "300% 300%",
                      animation: isMobile ? "none" : "gradient-shift 4s ease infinite",
                      color: "#f2f2f2",
                      boxShadow: "0 0 0 1px rgba(167,234,21,0.3), 0 4px 24px -4px rgba(167,234,21,0.35)",
                    }}
                    whileHover={{ scale: 1.04, boxShadow: "0 0 0 1px rgba(167,234,21,0.6), 0 8px 32px -4px rgba(167,234,21,0.55)" }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Sparkles size={15} style={{ color: "#a7ea15" }} />
                    Get Started Free
                    <ArrowRight size={15} />
                  </motion.a>
                </div>

                {/* Trust line */}
                <p className="text-sm text-primary-foreground/40 mb-10">
                  No credit card required · Cancel anytime
                </p>

                {/* Feature pills */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {["White-background images", "Lifestyle scenes", "Ad-ready exports", "Unlimited revisions"].map((f) => (
                    <span
                      key={f}
                      className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
                      style={{ background: "oklch(1 0 0 / 8%)", color: "oklch(1 0 0 / 60%)", border: "1px solid oklch(1 0 0 / 12%)" }}
                    >
                      <Check size={11} style={{ color: "#a7ea15" }} /> {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CONTACT
      ══════════════════════════════════════ */}
      <section id="contact" className="py-28 px-4 border-t border-border bg-surface">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <FadeUp>
              <Pill>Contact</Pill>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 mb-5 leading-tight">
                Have a question?<br />
                <em className="font-serif not-italic text-brand">Let&apos;s talk.</em>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                We&apos;re a small team that moves fast. Send us a message and
                we&apos;ll get back to you within one business day.
              </p>
              <div className="space-y-4">
                {[
                  { label: "Email", value: "hello@unboundfolk.com" },
                  { label: "Phone", value: "+60 18-986 5212" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "oklch(0.82 0.22 128 / 20%)" }}
                    >
                      <span className="text-brand text-xs font-bold">{item.label[0]}</span>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">{item.label}</p>
                      <p className="text-sm font-semibold text-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <form
                className="rounded-3xl border border-border bg-card p-8 space-y-4"
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">First Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Ahmad"
                      value={formData.firstName}
                      onChange={e => setFormData(p => ({ ...p, firstName: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-secondary text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/30 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Last Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Razali"
                      value={formData.lastName}
                      onChange={e => setFormData(p => ({ ...p, lastName: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-secondary text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/30 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="ahmad@company.com"
                    value={formData.email}
                    onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-secondary text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/30 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Topic</label>
                  <select
                    value={formData.topic}
                    onChange={e => setFormData(p => ({ ...p, topic: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-secondary text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-all appearance-none"
                  >
                    <option>General inquiry</option>
                    <option>Pricing &amp; plans</option>
                    <option>Enterprise / volume</option>
                    <option>Technical support</option>
                    <option>Partnership</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us what you're working on…"
                    value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-secondary text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/30 transition-all resize-none"
                  />
                </div>

                {formState === "sent" && (
                  <div className="rounded-xl px-4 py-3 text-sm font-medium flex items-center gap-2" style={{ background: "oklch(0.82 0.22 128 / 15%)", color: "var(--ink)" }}>
                    <Check size={15} style={{ color: "var(--brand)" }} /> Message sent! We&apos;ll get back to you within one business day.
                  </div>
                )}
                {formState === "error" && (
                  <div className="rounded-xl px-4 py-3 text-sm font-medium" style={{ background: "oklch(0.60 0.22 27 / 10%)", color: "oklch(0.50 0.20 27)" }}>
                    Something went wrong. Please try again or email us directly at hello@unboundfolk.com
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={formState === "sending" || formState === "sent"}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm disabled:opacity-60"
                  whileHover={{ scale: 1.02, opacity: 0.88 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.16 }}
                >
                  {formState === "sending" ? "Sending…" : formState === "sent" ? "Sent!" : <><span>Send Message</span> <ArrowRight size={14} /></>}
                </motion.button>
              </form>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border py-10 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <img src="/uf-logo.svg" alt="Unbound Folk" className="w-6 h-6 rounded-sm" />
            <span className="font-bold text-sm tracking-tight text-foreground">
              Unbound <span className="text-brand">Folk</span>
            </span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            © 2026 Unbound Folk. All rights reserved. Built for businesses that move fast.
          </p>
          <div className="flex gap-5">
            {(["Privacy", "Terms", "Status"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setActiveModal(l)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </footer>

      {/* ── MODAL ── */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-3xl border border-border p-8"
              style={{ background: "var(--background)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-border transition-all"
              >
                <X size={15} />
              </button>

              {activeModal === "Privacy" && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold tracking-tight">Privacy Policy</h2>
                  <p className="text-xs text-muted-foreground">Last updated: April 2026</p>
                  <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                    <p><strong className="text-foreground">1. Information We Collect</strong><br />We collect information you provide directly — such as your name, email address, and any messages sent through our contact form. We also collect usage data automatically, including device type, browser, and pages visited.</p>
                    <p><strong className="text-foreground">2. How We Use Your Information</strong><br />Your data is used solely to provide and improve our services, respond to enquiries, and send relevant product updates. We never sell your personal information to third parties.</p>
                    <p><strong className="text-foreground">3. Data Storage</strong><br />Your data is stored securely on servers located in Singapore and is protected with industry-standard encryption. We retain your data only as long as necessary to deliver our services.</p>
                    <p><strong className="text-foreground">4. Cookies</strong><br />We use essential cookies to keep our platform running smoothly and analytics cookies (anonymous) to understand how users interact with the site. You may disable cookies in your browser settings at any time.</p>
                    <p><strong className="text-foreground">5. Your Rights</strong><br />You have the right to access, correct, or delete your personal data at any time. To submit a request, email us at <span className="text-foreground font-medium">hello@unboundfolk.com</span>.</p>
                    <p><strong className="text-foreground">6. Contact</strong><br />For privacy-related enquiries, reach us at hello@unboundfolk.com or +60 18-986 5212.</p>
                  </div>
                </div>
              )}

              {activeModal === "Terms" && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold tracking-tight">Terms of Service</h2>
                  <p className="text-xs text-muted-foreground">Last updated: April 2026</p>
                  <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                    <p><strong className="text-foreground">1. Acceptance</strong><br />By using Unbound Folk, you agree to these terms. If you do not agree, please do not use our platform.</p>
                    <p><strong className="text-foreground">2. Use of Service</strong><br />Unbound Folk provides AI-powered product photography tools for commercial use. You may use the platform only for lawful purposes and in accordance with these terms.</p>
                    <p><strong className="text-foreground">3. Account Responsibility</strong><br />You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account.</p>
                    <p><strong className="text-foreground">4. Intellectual Property</strong><br />Images generated using your product photos remain your property. Unbound Folk retains rights to the underlying AI models and platform technology.</p>
                    <p><strong className="text-foreground">5. Free Trial</strong><br />New users receive 10 complimentary image generations. After the free trial, continued use requires a paid subscription plan.</p>
                    <p><strong className="text-foreground">6. Limitation of Liability</strong><br />Unbound Folk is provided "as is." We are not liable for any indirect, incidental, or consequential damages arising from your use of the platform.</p>
                    <p><strong className="text-foreground">7. Changes to Terms</strong><br />We may update these terms from time to time. Continued use of the platform after changes constitutes acceptance of the new terms.</p>
                  </div>
                </div>
              )}

              {activeModal === "Status" && (
                <div className="space-y-5">
                  <h2 className="text-xl font-bold tracking-tight">System Status</h2>
                  <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl" style={{ background: "oklch(0.82 0.22 128 / 10%)", border: "1px solid oklch(0.82 0.22 128 / 20%)" }}>
                    <span className="w-2 h-2 rounded-full bg-[#a7ea15] animate-pulse" />
                    <span className="text-sm font-semibold text-foreground">All systems operational</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { name: "AI Image Generation", status: "Operational", ok: true },
                      { name: "Web Platform", status: "Operational", ok: true },
                      { name: "Image Export & Download", status: "Operational", ok: true },
                      { name: "User Authentication", status: "Operational", ok: true },
                      { name: "Payment Processing", status: "Operational", ok: true },
                      { name: "Email Notifications", status: "Operational", ok: true },
                    ].map((s) => (
                      <div key={s.name} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
                        <span className="text-sm text-foreground font-medium">{s.name}</span>
                        <span className={`text-xs font-semibold flex items-center gap-1.5 ${s.ok ? "text-[#a7ea15]" : "text-red-400"}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${s.ok ? "bg-[#a7ea15]" : "bg-red-400"}`} />
                          {s.status}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">Last checked: {new Date().toLocaleDateString("en-MY", { day: "numeric", month: "long", year: "numeric" })} · For real-time updates, contact hello@unboundfolk.com</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FLOATING WHATSAPP BUTTON ── */}
      <motion.a
        href="https://wa.me/60189865212"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[90] flex items-center justify-center w-14 h-14 rounded-full shadow-2xl"
        style={{ background: "#25D366" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        animate={isMobile ? {} : { y: [0, -5, 0] }}
        transition={{ y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" } }}
        aria-label="Chat on WhatsApp"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </motion.a>
    </div>
  );
}
