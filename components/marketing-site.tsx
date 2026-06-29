"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bot,
  BrainCircuit,
  Check,
  ChevronDown,
  Code2,
  Cpu,
  DatabaseZap,
  Gauge,
  Layers3,
  LineChart,
  Mail,
  Menu,
  MonitorCog,
  Palette,
  Phone,
  Play,
  Sparkles,
  WandSparkles,
  Workflow,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Creative", href: "/creative" },
  { label: "Systems", href: "/systems" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
];

const creativeServices = [
  "3D Product Visuals",
  "Motion Graphics",
  "Social Media Content",
  "Brand Identity",
  "Graphic Design",
  "AI-Assisted Content",
];

const systemServices = [
  "Internal Tools",
  "CRM Systems",
  "Automation",
  "AI Workflows",
  "Dashboards",
  "Custom Software",
];

const workItems = [
  {
    title: "Botanical Launch System",
    category: "Creative",
    tags: ["Creative", "AI"],
    image: "/1.jpg",
    problem: "A skincare brand was launching new SKUs every quarter but their content kept looking rushed — inconsistent photos, mismatched copy, no visual rhythm.",
    solution: "We built a modular AI-assisted content system covering PDPs, ad creatives, and social drops — all under one visual direction.",
    outcome: "Each launch now ships with a full content set in less time, and the brand finally looks as good as the products.",
  },
  {
    title: "Lead Flow Command Center",
    category: "Automation",
    tags: ["Systems", "Automation"],
    image: "/13.jpg",
    problem: "A service team was juggling WhatsApp, Google Forms, and four different spreadsheets to track leads. Things fell through the cracks constantly.",
    solution: "We designed a CRM workflow with lead scoring, automatic task routing, and timed follow-up reminders built around how their team actually works.",
    outcome: "No more missed follow-ups. The team spends less time tracking and more time closing.",
  },
  {
    title: "F&B Motion Content Kit",
    category: "Motion",
    tags: ["Creative", "Motion"],
    image: "/8.jpg",
    problem: "A consumer brand had great products but their social content looked homemade. They needed motion assets that matched the premium side of what they sell.",
    solution: "We created animated product scenes, looping transitions, and a set of reusable content templates they can run each campaign.",
    outcome: "Their feed now stops scrolls. The templates mean each new promo takes hours, not days.",
  },
  {
    title: "Approval Workflow Portal",
    category: "Systems",
    tags: ["Systems", "Automation"],
    image: "/10.jpg",
    problem: "Every approval lived in a different chat thread. Nobody knew what was pending, who was responsible, or whether something had actually been signed off.",
    solution: "We built a lightweight internal portal for raising requests, tracking statuses, leaving comments, and keeping an audit trail everyone can see.",
    outcome: "Approvals that used to take three days now clear in one. And when something stalls, it's obvious why.",
  },
  {
    title: "AI Content Production Desk",
    category: "AI",
    tags: ["AI", "Creative", "Systems"],
    image: "/12.jpg",
    problem: "A small content team was maxed out. More SKUs, more channels, same headcount — the math didn't work.",
    solution: "We set up an AI-assisted production pipeline with custom prompt systems, visual briefs, and a review layer that kept quality high.",
    outcome: "Output doubled without hiring. The team now focuses on creative direction rather than execution.",
  },
  {
    title: "SME Brand Refresh",
    category: "Branding",
    tags: ["Branding", "Creative"],
    image: "/14.jpg",
    problem: "The company had been around for years but their branding hadn't kept up. Online, they looked smaller and less credible than they actually were.",
    solution: "We refreshed the identity with updated logo direction, a proper colour and type system, and digital-first brand templates.",
    outcome: "They started winning pitches they were previously losing. The first impression finally matched the reality.",
  },
];

const faqs = [
  {
    q: "What exactly does Unbound Folk do?",
    a: "We help Malaysian businesses on two fronts: how they look, and how they work. That means creative content, brand visuals, and AI-assisted production on one side — and custom software, CRM systems, and workflow automation on the other. Some clients need one. Some need both.",
  },
  {
    q: "Who do you typically work with?",
    a: "Founders, growing SMEs, e-commerce brands, and operations teams who've hit the ceiling of what spreadsheets and chat threads can handle. If your business is growing but your content or internal processes can't keep up, that's usually where we come in.",
  },
  {
    q: "Can you handle both creative work and system-building for us?",
    a: "Yes, and honestly that's where we do our best work. When the brand looks sharp and the operations run clean, everything compounds. We've intentionally built both capabilities so you don't have to stitch together two different vendors.",
  },
];

const pageEase = [0.16, 1, 0.3, 1] as const;

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Section({
  eyebrow,
  title,
  copy,
  children,
  className,
}: {
  eyebrow?: string;
  title?: string;
  copy?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cx("relative px-5 py-20 sm:px-6 lg:px-8 lg:py-28", className)}>
      <div className="mx-auto max-w-7xl">
        {(eyebrow || title || copy) && (
          <Reveal className="mb-10 max-w-3xl">
            {eyebrow && <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-lime-300">{eyebrow}</p>}
            {title && <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl">{title}</h2>}
            {copy && <p className="mt-5 text-base leading-7 text-slate-300 sm:text-lg">{copy}</p>}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: pageEase, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
}) {
  return (
    <Link
      href={href}
      className={cx(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition duration-200",
        variant === "primary" && "bg-lime-300 text-slate-950 shadow-[0_18px_60px_rgba(190,242,100,0.22)] hover:bg-lime-200",
        variant === "secondary" && "border border-white/15 bg-white/8 text-white backdrop-blur hover:border-white/25 hover:bg-white/12",
        variant === "ghost" && "text-white hover:text-lime-200"
      )}
    >
      {children}
    </Link>
  );
}

function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: pageEase }}
        className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/12 bg-slate-950/75 px-4 py-3 shadow-2xl shadow-black/20 backdrop-blur-xl"
      >
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image src="/uf-logo.svg" alt="Unbound Folk logo" width={34} height={34} className="rounded-lg" priority />
          <span className="text-sm font-bold tracking-tight text-white">Unbound Folk</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cx(
                "rounded-full px-4 py-2 text-sm font-medium transition",
                pathname === item.href ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/8 hover:text-white"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <ButtonLink href="/contact">Book Call <ArrowUpRight size={15} /></ButtonLink>
        </div>
        <button
          aria-label="Toggle navigation"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-white md:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </motion.div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-3 max-w-7xl rounded-3xl border border-white/12 bg-slate-950/95 p-4 shadow-2xl backdrop-blur-xl md:hidden"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-base font-medium text-white hover:bg-white/8"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-3 flex min-h-12 items-center justify-center rounded-full bg-lime-300 px-5 text-sm font-bold text-slate-950"
            >
              Book a Discovery Call
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-12 text-slate-300 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <Image src="/uf-logo.svg" alt="Unbound Folk logo" width={36} height={36} />
            <span className="font-bold text-white">Unbound Folk</span>
          </div>
          <p className="max-w-md text-sm leading-6">
            A creative-tech studio helping growing businesses in Malaysia look sharper and run smarter.
          </p>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold text-white">Explore</p>
          <div className="grid gap-2 text-sm">
            {navItems.map((item) => <Link key={item.href} href={item.href} className="hover:text-lime-200">{item.label}</Link>)}
          </div>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold text-white">Contact</p>
          <div className="grid gap-2 text-sm">
            <a href="mailto:hello@unboundfolk.com" className="hover:text-lime-200">hello@unboundfolk.com</a>
            <a href="https://wa.me/60189865212" className="hover:text-lime-200">+60 18-986 5212</a>
            <span>Malaysia</span>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl text-xs text-slate-500">© {new Date().getFullYear()} Unbound Folk. All rights reserved.</div>
    </footer>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen overflow-hidden text-white"
      style={{
        background:
          "radial-gradient(circle at 20% 0%, rgba(190, 242, 100, 0.18), transparent 28%), radial-gradient(circle at 80% 10%, rgba(56, 189, 248, 0.14), transparent 26%), radial-gradient(circle at 50% 45%, rgba(244, 114, 182, 0.08), transparent 30%), #05070a",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[60] select-none"
        style={{
          opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />
      <SiteHeader />
      {children}
      <Footer />
      <Link
        href="/contact"
        className="fixed bottom-4 left-4 right-4 z-40 flex min-h-12 items-center justify-center rounded-full bg-lime-300 px-5 text-sm font-bold text-slate-950 shadow-2xl shadow-black/30 md:hidden"
      >
        Book a Discovery Call
      </Link>
    </div>
  );
}

function HeroVisual() {
  const labels = [
    { label: "Creative", icon: Palette, className: "left-1 top-7" },
    { label: "AI", icon: BrainCircuit, className: "right-4 top-2" },
    { label: "Automation", icon: Workflow, className: "left-8 bottom-8" },
    { label: "Systems", icon: MonitorCog, className: "right-2 bottom-16" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, rotateX: 8 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      transition={{ duration: 0.9, ease: pageEase, delay: 0.15 }}
      className="relative mx-auto aspect-square w-full max-w-[520px]"
    >
      <div className="absolute inset-8 rounded-[2rem] border border-white/10 bg-white/8 shadow-2xl shadow-black/30 backdrop-blur-xl" />
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-16 overflow-hidden rounded-[2rem] border border-white/15"
      >
        <Image src="/12.jpg" alt="Premium AI-assisted product visual by Unbound Folk" fill sizes="(max-width: 768px) 80vw, 520px" className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
        <div className="absolute bottom-5 left-5 right-5">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-lime-200">Creative-tech studio</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight">Look sharp. Run clean.</p>
        </div>
      </motion.div>
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-300/20 blur-3xl" />
      {labels.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.label}
            animate={{ y: [0, index % 2 ? 10 : -10, 0] }}
            transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut" }}
            className={cx("absolute flex items-center gap-2 rounded-2xl border border-white/15 bg-slate-950/70 px-4 py-3 text-sm font-semibold shadow-2xl backdrop-blur", item.className)}
          >
            <Icon size={17} className="text-lime-200" />
            {item.label}
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function HeroSection() {
  const reduce = useReducedMotion();
  const badges = [
    { label: "Creative", icon: Palette, pos: "top-[22%] left-[6%]" },
    { label: "AI", icon: BrainCircuit, pos: "top-[12%] right-[10%]" },
    { label: "Automation", icon: Workflow, pos: "bottom-[30%] left-[8%]" },
    { label: "Systems", icon: MonitorCog, pos: "bottom-[16%] right-[6%]" },
  ];
  return (
    <section className="relative overflow-hidden lg:flex lg:min-h-[100dvh]">
      {/* Text panel */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: pageEase }}
        className="relative z-10 flex flex-col justify-center px-5 pb-12 pt-28 sm:px-8 lg:w-[56%] lg:pb-20 lg:pl-10 lg:pr-12 lg:pt-0 xl:pl-14"
      >
        <p className="mb-6 inline-flex w-fit rounded-full border border-lime-300/25 bg-lime-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-lime-200">
          Creative studio + systems partner
        </p>
        <h1 className="text-5xl font-bold leading-[0.92] tracking-tighter text-white sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
          Look the Part.<br />Run Like One.
        </h1>
        <p className="mt-6 max-w-md text-lg leading-8 text-slate-300">
          Unbound Folk is a creative-tech studio in Malaysia. We make brands look sharp and help businesses run better — through design, AI, and custom-built systems.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact">Book a Discovery Call <ArrowRight size={16} /></ButtonLink>
          <ButtonLink href="/work" variant="secondary">View Our Work <Play size={15} /></ButtonLink>
        </div>
        {/* Mini stats */}
        <div className="mt-12 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
          {[
            { v: "Creative", l: "Visual content & brand" },
            { v: "Systems", l: "Custom software & AI" },
            { v: "Malaysia", l: "Studio based in KL" },
          ].map(({ v, l }) => (
            <div key={v}>
              <p className="text-base font-bold text-white">{v}</p>
              <p className="mt-1 text-xs leading-4 text-slate-500">{l}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Mobile image */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: pageEase, delay: 0.2 }}
        className="relative h-64 w-full overflow-hidden lg:hidden"
      >
        <Image src="/12.jpg" alt="Unbound Folk creative work" fill sizes="100vw" className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-[#05070a]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/40 to-transparent" />
      </motion.div>

      {/* Desktop right image panel */}
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: pageEase, delay: 0.05 }}
        className="absolute inset-y-0 right-0 hidden w-[46%] overflow-hidden lg:block"
      >
        <Image src="/12.jpg" alt="Unbound Folk creative work" fill sizes="46vw" className="object-cover" priority />
        {/* Left edge blend into dark background */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#05070a] to-transparent" />
        {/* Top/bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070a]/65 via-transparent to-[#05070a]/25" />
        {/* Floating category badges */}
        {badges.map((b, i) => {
          const Icon = b.icon;
          return (
            <motion.div
              key={b.label}
              animate={reduce ? undefined : { y: [0, i % 2 ? 10 : -10, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
              className={cx(
                "absolute flex items-center gap-2 rounded-2xl border border-white/15 bg-slate-950/80 px-4 py-3 text-sm font-semibold shadow-2xl backdrop-blur-md",
                b.pos
              )}
            >
              <Icon size={16} className="text-lime-300" />
              {b.label}
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

export function HomePage() {
  return (
    <SiteShell>
      <main>
        <HeroSection />
        <TrustSection />
        <ProblemSection />
        <PillarsSection />
        <WhySection />
        <ProcessSection />
        <WorkPreview />
        <FAQSection />
        <CTASection />
      </main>
    </SiteShell>
  );
}

function TrustSection() {
  const items = [
    "Founders", "SME Teams", "E-commerce Brands", "Service Companies",
    "Operations Teams", "Creative Leads", "Product Studios", "Growing Businesses",
  ];
  const doubled = [...items, ...items];
  return (
    <section className="overflow-hidden border-y border-white/10 bg-white/[0.02] py-5">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#05070a] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#05070a] to-transparent" />
        <div
          className="flex whitespace-nowrap"
          style={{ animation: "marquee 32s linear infinite" }}
        >
          {doubled.map((item, i) => (
            <span key={i} className="mx-6 shrink-0 text-sm font-semibold tracking-wide text-slate-400">
              {item}
              <span className="ml-6 text-white/20">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <Section
      title="Most Businesses Are Losing on Two Fronts at Once."
      copy="Externally, your brand isn't making the impression it should. Internally, your team is burning time on things that should be automatic. Both problems are fixable — and they're more connected than you think."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {[
          ["How you look", "First impressions happen fast. If your visuals, content, or brand feel inconsistent or dated, customers move on before you get to say anything."],
          ["How you operate", "Manual follow-ups, scattered approvals, data living in five places — these don't just slow your team down. They quietly cap how big you can grow."],
        ].map(([title, copy]) => (
          <Reveal key={title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-7 backdrop-blur">
            <p className="text-2xl font-semibold text-white">{title}</p>
            <p className="mt-3 leading-7 text-slate-300">{copy}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function PillarsSection() {
  return (
    <Section eyebrow="What we do" title="Two Things, Done Properly.">
      <div className="grid gap-5 lg:grid-cols-2">
        <ServicePillar
          icon={<WandSparkles size={22} />}
          title="Creative"
          description="Brand visuals, motion content, and AI-assisted production that make people stop and take notice."
          services={creativeServices}
          href="/creative"
          image="/14.jpg"
        />
        <ServicePillar
          icon={<Cpu size={22} />}
          title="Systems"
          description="Custom software, automation, and AI workflows that remove the friction holding your team back."
          services={systemServices}
          href="/systems"
          image="/13.jpg"
        />
      </div>
    </Section>
  );
}

function ServicePillar({ icon, title, description, services, href, image }: { icon: React.ReactNode; title: string; description: string; services: string[]; href: string; image: string }) {
  return (
    <Reveal className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.05] shadow-2xl shadow-black/20">
      <div className="relative h-72 overflow-hidden">
        <Image src={image} alt={`${title} by Unbound Folk`} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
        <div className="absolute bottom-6 left-7 flex h-11 w-11 items-center justify-center rounded-xl bg-lime-300 text-slate-950">{icon}</div>
      </div>
      <div className="p-7">
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <p className="mt-3 leading-7 text-slate-300">{description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {services.map((service) => (
            <span key={service} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-400">{service}</span>
          ))}
        </div>
        <Link href={href} className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-lime-300 transition hover:gap-3">
          Explore {title} <ArrowRight size={15} />
        </Link>
      </div>
    </Reveal>
  );
}

function WhySection() {
  const points = [
    "We think about brand and operations together, not in silos",
    "We build for the outcome, not to show off the tech",
    "We move fast without cutting corners on quality",
    "We use AI where it genuinely helps — and skip it where it doesn't",
    "We stay communicative and don't disappear mid-project",
  ];
  return (
    <section className="relative px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl">
              We're Built<br />Differently<br />on Purpose.
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-slate-300">
              A lot of studios do creative or tech. We do both — and that's not an accident. It's how we're designed to work.
            </p>
          </Reveal>
          <div>
            {points.map((point, i) => (
              <Reveal
                key={point}
                delay={i * 0.04}
                className={cx("flex items-start gap-5 py-5", i < points.length - 1 && "border-b border-white/10")}
              >
                <Check className="mt-0.5 shrink-0 text-lime-300" size={17} />
                <p className="text-base font-medium leading-7 text-white">{point}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    ["01", "Discover", "We spend real time understanding your business — your goals, your blockers, and what good would actually look like."],
    ["02", "Define", "We scope the right solution together. No guesswork, no overselling. Just clarity on what we're building and why."],
    ["03", "Build", "We design, develop, and deliver. You're kept in the loop throughout — no black boxes, no surprises."],
    ["04", "Refine", "After launch, we improve based on what we see. Good work doesn't stop at handoff."],
  ];
  return (
    <section className="relative px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-14 max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl">Simple Process. No Runaround.</h2>
        </Reveal>
        <div>
          {steps.map(([num, title, copy], i) => (
            <Reveal
              key={title}
              delay={i * 0.05}
              className="grid items-start gap-y-2 border-t border-white/10 py-8 sm:grid-cols-[64px_1fr] sm:gap-x-6 md:grid-cols-[64px_200px_1fr] md:items-center md:gap-x-10"
            >
              <span className="font-mono text-sm font-bold tabular-nums text-lime-300/60">{num}</span>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="text-slate-300 leading-7 sm:col-start-2 md:col-start-auto">{copy}</p>
            </Reveal>
          ))}
          <div className="border-t border-white/10" />
        </div>
      </div>
    </section>
  );
}

function WorkPreview() {
  const [featured, ...rest] = workItems.slice(0, 3);
  return (
    <Section eyebrow="Selected work" title="A Few Things We're Proud Of">
      <div className="grid gap-5 lg:grid-cols-3">
        <Reveal className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.05] lg:col-span-2">
          <div className="relative h-72 overflow-hidden">
            <Image src={featured.image} alt={`${featured.title} case study`} fill sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
            <span className="absolute left-4 top-4 rounded-full bg-lime-300 px-3 py-1 text-xs font-bold text-slate-950">{featured.category}</span>
          </div>
          <div className="p-7">
            <h3 className="text-2xl font-bold text-white">{featured.title}</h3>
            <p className="mt-3 leading-7 text-slate-300">{featured.outcome}</p>
            <Link href="/work" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-lime-300 transition hover:gap-3">
              View Project <ArrowUpRight size={14} />
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1">
          {rest.map((item) => <CaseCard key={item.title} item={item} />)}
        </div>
      </div>
    </Section>
  );
}

function FAQSection({ items = faqs }: { items?: typeof faqs }) {
  return (
    <Section title="Questions We Get Asked a Lot" className="py-16 lg:py-20">
      <div>
        {items.map((item) => (
          <details key={item.q} className="group border-t border-white/10 py-6 last-of-type:border-b">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-white">
              {item.q}
              <ChevronDown className="shrink-0 text-lime-300 transition-transform duration-300 group-open:rotate-180" size={18} />
            </summary>
            <p className="mt-5 max-w-3xl leading-7 text-slate-300">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}

function CTASection({ title = "Ready to Stop Leaving Growth on the Table?", copy = "Book a discovery call. We'll spend 30 minutes understanding where you're stuck — and tell you honestly whether we can help.", cta = "Book a Discovery Call" }) {
  return (
    <section className="px-5 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-lime-300/20 bg-lime-300 p-8 text-slate-950 shadow-[0_30px_120px_rgba(190,242,100,0.18)] sm:p-12">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <h2 className="max-w-3xl text-3xl font-bold tracking-tighter sm:text-5xl">{title}</h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-800">{copy}</p>
          </div>
          <Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-slate-950 px-6 text-sm font-bold text-white">
            {cta} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function CaseCard({ item }: { item: (typeof workItems)[number] }) {
  return (
    <Reveal className="group overflow-hidden rounded-[1.5rem] border border-white/10">
      <div className="relative h-52 overflow-hidden">
        <Image src={item.image} alt={`${item.title} case study`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-lime-300 px-3 py-1 text-xs font-bold text-slate-950">{item.category}</span>
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-base font-bold text-white">{item.title}</h3>
        </div>
      </div>
      <div className="border-t border-white/8 bg-white/[0.04] px-5 py-4">
        <p className="text-sm leading-5 text-slate-400">{item.outcome}</p>
        <Link href="/work" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-lime-300 transition hover:gap-2.5">
          View Project <ArrowUpRight size={12} />
        </Link>
      </div>
    </Reveal>
  );
}

export function CreativePage() {
  const creativeFaqs = [
    ...faqs,
    { q: "Do you do video shoots or photography?", a: "No. We don't do physical shoots or traditional video editing. Our work lives in the designed, animated, 3D, and AI-assisted space — which gives us more creative range with less logistical overhead for you." },
    { q: "Can you maintain brand consistency across different content types?", a: "That's actually the core of how we work. We build visual systems, not one-off posts — so whether it's a product visual, a social graphic, or a motion asset, they all feel like they come from the same place." },
  ];
  return (
    <SiteShell>
      <SubPageHero
        eyebrow="Creative"
        title="Content That Earns Attention — Not Just Fills a Feed."
        copy="We design brand visuals, motion graphics, and AI-assisted content for businesses that want to show up looking like they mean it."
        image="/8.jpg"
        cta="Start a Creative Project"
      />
      <Section eyebrow="What we make" title="Sharp Work Across Every Format">
        <FeatureGrid items={[
          ["3D product visuals", "Product scenes and visual concepts built for campaigns, PDPs, and launches — without a photoshoot.", Layers3],
          ["Social media content", "Designed posts, stories, and ad creatives that feel intentional, not templated.", Palette],
          ["Motion graphics", "Animated assets for product reveals, promos, and social content that actually moves people.", Play],
          ["Brand and graphic design", "Logo direction, design systems, and digital templates that give your team something consistent to work with.", Sparkles],
          ["AI content production", "AI-assisted visual variations and content sets — directed with taste, reviewed for quality.", Bot],
        ]} />
      </Section>
      <Section eyebrow="Honest about scope" title="What We Don't Do" copy="We don't shoot video on location, edit long-form footage, run your marketing strategy, or design physical packaging. Keeping our scope tight is how we keep our quality high." />
      <FAQSection items={creativeFaqs} />
      <CTASection title="Let's Make Your Brand Look Like It Means Business." cta="Start a Creative Project" />
    </SiteShell>
  );
}

export function SystemsPage() {
  const useCases = [
    "Lead management system",
    "Quotation & invoice workflow",
    "Task delegation system",
    "Client portal",
    "Inventory tracking",
    "Approval workflow",
    "AI document assistant",
    "Automated reporting dashboard",
  ];
  const systemsFaqs = [
    ...faqs,
    { q: "Do you build fully custom software?", a: "Yes. We build internal tools, CRM systems, dashboards, portals, and web apps tailored to your specific workflow — not off-the-shelf tools bent to fit." },
    { q: "What kinds of things can you automate?", a: "Almost anything repetitive: follow-ups, approvals, status updates, data routing, reminders, reporting. We start by mapping what your team actually does manually, then figure out what's worth automating." },
    { q: "When does AI actually make sense in a business system?", a: "When it saves real time or makes decisions better. Document parsing, smart routing, content drafting, classification, summarisation — these are areas where AI earns its keep. We won't bolt it on just to say it's there." },
  ];
  return (
    <SiteShell>
      <SubPageHero
        eyebrow="Systems"
        title="Your Team Is Too Good to Be Stuck Doing This Manually."
        copy="We build the internal tools, automation, and AI workflows that take busywork off your plate — so your people can focus on the work that actually matters."
        image="/13.jpg"
        cta="Build My System"
      />
      <Section eyebrow="What we build" title="From Messy Processes to Clean, Working Systems">
        <FeatureGrid items={[
          ["Custom internal tools", "Built around how your team actually works — not how a generic SaaS vendor assumes you do.", MonitorCog],
          ["CRM and client management", "One place to track leads, clients, tasks, and follow-ups. No more chasing threads across three apps.", DatabaseZap],
          ["AI-powered workflows", "Smart automation that handles drafting, routing, classifying, and summarising — with a human in the loop where it counts.", BrainCircuit],
          ["Process automation", "Repeatable tasks — approvals, reminders, handoffs, data entry — automated properly so they stop eating time.", Workflow],
          ["Dashboards and reporting", "The numbers your team actually needs, presented clearly, updated automatically.", BarChart3],
          ["Custom web apps", "Purpose-built portals and applications when existing tools genuinely can't do the job.", Code2],
        ]} />
      </Section>
      <Section eyebrow="Things we've built" title="Real Systems for Real Problems">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {useCases.map((item) => (
            <Reveal key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-sm font-semibold text-white">
              <Gauge className="mb-5 text-lime-200" size={20} />
              {item}
            </Reveal>
          ))}
        </div>
      </Section>
      <FAQSection items={systemsFaqs} />
      <CTASection title="Ready to Build Something Your Team Will Actually Thank You For?" cta="Build My System" />
    </SiteShell>
  );
}

function SubPageHero({ eyebrow, title, copy, image, cta }: { eyebrow: string; title: string; copy: string; image: string; cta: string }) {
  return (
    <section className="px-5 pb-16 pt-32 sm:px-6 lg:px-8 lg:pb-24 lg:pt-40">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.82fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: pageEase }}>
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-lime-200">{eyebrow}</p>
          <h1 className="text-5xl font-bold leading-[0.94] tracking-tighter sm:text-6xl">{title}</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">{copy}</p>
          <div className="mt-9"><ButtonLink href="/contact">{cta} <ArrowRight size={16} /></ButtonLink></div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: pageEase }} className="relative h-[420px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]">
          <Image src={image} alt={`${eyebrow} hero visual`} fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

function FeatureGrid({ items }: { items: Array<[string, string, React.ComponentType<{ size?: number; className?: string }>]> }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map(([title, copy, Icon], i) => (
        <Reveal
          key={title}
          delay={i * 0.04}
          className={cx(
            "rounded-3xl border border-white/10 bg-white/[0.04] p-7",
            i === 0 && "md:col-span-2 lg:col-span-1"
          )}
        >
          <Icon size={22} className="mb-8 text-lime-300" />
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">{copy}</p>
        </Reveal>
      ))}
    </div>
  );
}

export function WorkPage() {
  const filters = ["All", "Creative", "Systems", "AI", "Automation", "Branding", "Motion"];
  const [active, setActive] = useState("All");
  const filtered = useMemo(() => active === "All" ? workItems : workItems.filter((item) => item.tags.includes(active) || item.category === active), [active]);

  return (
    <SiteShell>
      <SubPageHero
        eyebrow="Work"
        title="Projects That Solved Real Problems."
        copy="A selection of creative, systems, and AI work — each one built around a specific problem a real business needed solved."
        image="/10.jpg"
        cta="Discuss a Project"
      />
      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActive(filter)}
                className={cx("rounded-full border px-4 py-2 text-sm font-semibold transition", active === filter ? "border-lime-300 bg-lime-300 text-slate-950" : "border-white/10 bg-white/[0.04] text-slate-300 hover:text-white")}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <Reveal key={item.title} className="group overflow-hidden rounded-[1.5rem] border border-white/10">
                {/* Full-bleed image with title overlay */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={item.image} alt={`${item.title}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-lime-300 px-3 py-1 text-xs font-bold text-slate-950">{item.category}</span>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h2 className="text-xl font-bold text-white">{item.title}</h2>
                  </div>
                </div>
                {/* Case study text */}
                <div className="border-t border-white/8 bg-white/[0.04] p-5">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-lime-300/70">The situation</p>
                      <p className="mt-1.5 text-sm leading-6 text-slate-300">{item.problem}</p>
                    </div>
                    <div className="border-t border-white/8 pt-3">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-lime-300/70">What we built</p>
                      <p className="mt-1.5 text-sm leading-6 text-slate-300">{item.solution}</p>
                    </div>
                    <div className="border-t border-white/8 pt-3">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-lime-300/70">The result</p>
                      <p className="mt-1.5 text-sm leading-6 text-slate-300">{item.outcome}</p>
                    </div>
                  </div>
                  <Link href="/contact" className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-lime-300 transition hover:gap-2.5">
                    Discuss a similar project <ArrowUpRight size={12} />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </SiteShell>
  );
}

export function AboutPage() {
  return (
    <SiteShell>
      <SubPageHero
        eyebrow="About"
        title="We Started Unbound Folk Because Most Businesses Needed Both."
        copy="Not just a creative agency. Not just a dev shop. A studio that understands brand and operations — and builds for both without making you manage two different vendors."
        image="/16.jpg"
        cta="Book a Discovery Call"
      />
      <Section eyebrow="How we think" title="Brand Gets You In the Door. Systems Keep You Standing.">
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            ["What we believe", "A business can look great online and still be a mess internally. It can run like a machine and still fail to make an impression. You need both sides working — and most studios only touch one."],
            ["How we work", "We listen before we propose. We ask uncomfortable questions. We'd rather scope something smaller and do it well than overpromise and underdeliver."],
            ["Why clients stay", "We're honest about timelines and limitations. We communicate during the project, not just at the start and end. And we measure success by whether the thing we built actually works for you."],
          ].map(([title, copy]) => (
            <Reveal key={title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
              <h2 className="text-2xl font-bold text-white">{title}</h2>
              <p className="mt-4 leading-7 text-slate-300">{copy}</p>
            </Reveal>
          ))}
        </div>
      </Section>
      <CTASection />
    </SiteShell>
  );
}

const contactSchema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email"),
  company: z.string().min(2, "Enter your company"),
  interest: z.enum(["Creative Solutions", "Intelligent Systems", "Both", "Not Sure Yet"]),
  budget: z.string().min(1, "Select a budget range"),
  timeline: z.string().min(1, "Select a timeline"),
  description: z.string().min(20, "Tell us a little more about the project"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactPage() {
  const [sent, setSent] = useState(false);
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      interest: "Both",
      budget: "",
      timeline: "",
      description: "",
    },
  });

  function onSubmit() {
    setSent(true);
    form.reset();
  }

  return (
    <SiteShell>
      <section className="px-5 pb-20 pt-32 sm:px-6 lg:px-8 lg:pt-40">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: pageEase }}>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-lime-200">Contact / Booking</p>
            <h1 className="text-5xl font-bold leading-[0.94] tracking-tighter sm:text-6xl">Tell Us What's Not Working.</h1>
            <p className="mt-7 text-lg leading-8 text-slate-300">
              Whether it's how your brand looks, how your team operates, or both — fill in the form and we'll set up a call to talk it through properly.
            </p>
            <div className="mt-8 grid gap-3 text-sm text-slate-300">
              <a href="mailto:hello@unboundfolk.com" className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 hover:text-white"><Mail size={18} className="text-lime-200" /> hello@unboundfolk.com</a>
              <a href="https://wa.me/60189865212" className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 hover:text-white"><Phone size={18} className="text-lime-200" /> +60 18-986 5212</a>
            </div>
            <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-sm font-semibold text-white">Prefer to pick a time directly?</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">A booking calendar is coming soon. For now, the form below gets to us fastest — we usually respond within one business day.</p>
            </div>
          </motion.div>

          <motion.form
            onSubmit={form.handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: pageEase, delay: 0.08 }}
            className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/20 backdrop-blur sm:p-8"
          >
            {sent && (
              <div className="mb-5 rounded-2xl border border-lime-300/30 bg-lime-300/10 p-4 text-sm font-semibold text-lime-100">
                Got it — we'll be in touch within one business day.
              </div>
            )}
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Name" error={form.formState.errors.name?.message}><input {...form.register("name")} className="field" /></Field>
              <Field label="Email" error={form.formState.errors.email?.message}><input {...form.register("email")} className="field" type="email" /></Field>
              <Field label="Company" error={form.formState.errors.company?.message}><input {...form.register("company")} className="field" /></Field>
              <Field label="Service interest" error={form.formState.errors.interest?.message}>
                <select {...form.register("interest")} className="field">
                  <option>Creative Solutions</option>
                  <option>Intelligent Systems</option>
                  <option>Both</option>
                  <option>Not Sure Yet</option>
                </select>
              </Field>
              <Field label="Budget range" error={form.formState.errors.budget?.message}>
                <select {...form.register("budget")} className="field">
                  <option value="">Select range</option>
                  <option>Below RM5,000</option>
                  <option>RM5,000 - RM15,000</option>
                  <option>RM15,000 - RM40,000</option>
                  <option>RM40,000+</option>
                </select>
              </Field>
              <Field label="Preferred timeline" error={form.formState.errors.timeline?.message}>
                <select {...form.register("timeline")} className="field">
                  <option value="">Select timeline</option>
                  <option>As soon as possible</option>
                  <option>Within 1 month</option>
                  <option>1 - 3 months</option>
                  <option>Still exploring</option>
                </select>
              </Field>
              <div className="md:col-span-2">
                <Field label="Project description" error={form.formState.errors.description?.message}>
                  <textarea {...form.register("description")} className="field min-h-36 resize-none" />
                </Field>
              </div>
            </div>
            <button type="submit" className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-lime-300 px-6 text-sm font-bold text-slate-950 hover:bg-lime-200 sm:w-auto">
              Book a Discovery Call <ArrowRight size={16} />
            </button>
          </motion.form>
        </div>
      </section>
    </SiteShell>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-white">
      {label}
      {children}
      {error && <span className="text-xs font-medium text-red-300">{error}</span>}
    </label>
  );
}
