  "use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github, ExternalLink, Instagram, MessageCircle, Send, CheckCircle2,
  Menu, X, Code2, Server, Wrench, Sparkles, GraduationCap, Cpu, Heart,
  ChevronRight
} from "lucide-react";

const PROFILE_IMG = "/profile.jpg";

/* ---------------- Typing effect ---------------- */
function useTyping(text, speed = 45, startDelay = 400) {
  const [out, setOut] = useState("");
  useEffect(() => {
    let i = 0;
    let raf;
    const start = setTimeout(() => {
      const tick = () => {
        i++;
        setOut(text.slice(0, i));
        if (i < text.length) raf = setTimeout(tick, speed);
      };
      tick();
    }, startDelay);
    return () => { clearTimeout(start); clearTimeout(raf); };
  }, [text, speed, startDelay]);
  return out;
}

/* ---------------- Section wrapper (single scroll reveal) ---------------- */
function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- Nav ---------------- */
const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "stack", label: "Tech Stack" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const go = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="w-full max-w-5xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-5 py-3 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
        <button
          onClick={() => go("home")}
          className="font-[Space_Grotesk] text-lg tracking-tight text-white"
        >
          <span className="text-white">Khaidar</span>
          <span className="text-[#00F5D4]" style={{ textShadow: "0 0 18px rgba(0,245,212,0.6)" }}>.dev</span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`px-3.5 py-1.5 rounded-lg text-sm transition-colors ${
                active === l.id ? "text-white bg-white/10" : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="hidden sm:flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span className="text-xs text-emerald-300">Available for Projects</span>
        </div>

        <button className="md:hidden text-white" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-[72px] w-[calc(100%-2rem)] max-w-5xl rounded-2xl border border-white/10 bg-[#0D1117]/95 backdrop-blur-xl p-3 flex flex-col gap-1"
          >
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="text-left px-4 py-2.5 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/5"
              >
                {l.label}
              </button>
            ))}
            <div className="flex items-center gap-2 px-4 py-2 mt-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span className="text-xs text-emerald-300">Available for Projects</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- Hero ---------------- */
function TerminalCard() {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -6, y: px * 6 });
  };
  const onLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      className="relative mx-auto w-full max-w-[380px] transition-transform duration-200 ease-out"
    >
      {/* background glow */}
      <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-[#00F5D4]/30 via-transparent to-[#7B2CBF]/30 blur-3xl" />

      {/* gradient frame */}
      <div className="relative rounded-[32px] p-[2px] bg-gradient-to-br from-[#00F5D4] via-[#7B2CBF]/60 to-[#00F5D4]/40 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        <div className="relative rounded-[30px] overflow-hidden bg-[#0D1117]">
          <img
            src={PROFILE_IMG}
            alt="Khaidar Sinaan As-Shidqii"
            className="w-full aspect-[4/5] object-cover object-[50%_18%]"
          />

          {/* dark fade so the name card stays readable */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#090D16] via-[#090D16]/60 to-transparent pointer-events-none" />

          {/* name card */}
          <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/10 bg-white/10 backdrop-blur-xl px-4 py-3">
            <div className="font-[Space_Grotesk] text-white text-base leading-tight">
              Khaidar Sinaan As-Shidqii
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F5D4]" />
              <span className="text-xs text-slate-300 font-mono">Aspiring Software Engineer</span>
            </div>
          </div>
        </div>
      </div>

      {/* floating chips */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-2 top-10 flex items-center gap-2 rounded-full border border-white/15 bg-[#0D1117]/80 backdrop-blur-xl px-3 py-1.5 shadow-lg"
      >
        <Code2 size={14} className="text-[#00F5D4]" />
        <span className="text-xs text-slate-200 font-mono">React · Next.js</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-2 top-1/3 flex items-center gap-2 rounded-full border border-white/15 bg-[#0D1117]/80 backdrop-blur-xl px-3 py-1.5 shadow-lg"
      >
        <Sparkles size={14} className="text-[#7B2CBF]" />
        <span className="text-xs text-slate-200 font-mono">Always learning</span>
      </motion.div>
    </div>
  );
}

function Hero() {
  const typed = useTyping("Student at SMK N 1 Wonosobo", 40, 600);

  return (
    <section id="home" className="relative pt-40 pb-24 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#00F5D4]/30 bg-[#00F5D4]/10 px-4 py-1.5 text-xs text-[#00F5D4] mb-6">
            <Sparkles size={14} /> Aspiring Software Engineer
          </span>

          <h1 className="font-[Space_Grotesk] text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] text-white mb-4">
            Hi, I'm Khaidar
            <br />
            Sinaan As-Shidqii
          </h1>

          <p className="font-mono text-sm sm:text-base text-slate-400 mb-8 h-6">
            {typed}
            <span className="inline-block w-[2px] h-4 bg-slate-400 ml-0.5 -mb-0.5 animate-pulse" />
          </p>

          <div className="relative rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-5 mb-9 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00F5D4] to-[#7B2CBF]" />
            <p className="text-slate-300 text-[15px] leading-relaxed pl-3 italic">
              "Step out of your comfort zone, keep learning, and treat failure as part of the process."
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="group inline-flex items-center gap-2 rounded-xl bg-[#00F5D4] text-[#06121A] font-medium px-6 py-3 transition-all hover:shadow-[0_0_28px_rgba(0,245,212,0.55)]"
            >
              Explore My Projects
              <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 backdrop-blur-md text-white font-medium px-6 py-3 transition-all hover:bg-white/10 hover:border-white/25"
            >
              Contact Me
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <TerminalCard />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Stats ---------------- */
const STATS = [
  { icon: Cpu, value: "18", label: "Age" },
  { icon: GraduationCap, value: "SMK N 1 Wonosobo", label: "Education" },
  { icon: Code2, value: "Software Engineering", label: "Primary Focus" },
  { icon: Heart, value: "100%", label: "Passion & Curiosity" },
];

function StatsBar() {
  return (
    <section className="px-6 -mt-2 mb-4">
      <Reveal>
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md px-5 py-6 text-center hover:border-[#00F5D4]/30 transition-colors"
            >
              <s.icon className="mx-auto mb-3 text-[#00F5D4]" size={20} />
              <div className="font-[Space_Grotesk] text-lg text-white leading-tight break-words">{s.value}</div>
              <div className="text-xs text-slate-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------- About ---------------- */
function About() {
  return (
    <section id="about" className="px-6 py-28">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-start">
        <Reveal>
          <span className="text-[#7B2CBF] text-sm font-mono">01 About</span>
          <h2 className="font-[Space_Grotesk] text-3xl sm:text-4xl text-white mt-3 mb-6 leading-tight">
            Turning curiosity into working code
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="space-y-5 text-slate-400 leading-relaxed text-[15px]">
            <p>
              I'm a Software Engineering student at SMK N 1 Wonosobo, drawn to programming because it
              rewards patience and structured thinking. Every bug is a small puzzle, and every fix
              teaches me something I didn't know an hour before.
            </p>
            <p>
              I enjoy breaking problems down before writing a single line, mapping the logic first,
              then building it out with React, Next.js, and Node.js. What keeps me going is the loop
              of trying, failing, and trying again with a better idea each time.
            </p>
            <p>
              My goal is to grow into a professional software engineer who builds reliable products
              and keeps learning long after graduation: one project, one framework, one late night
              at a time.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Tech Stack ---------------- */
const STACK = [
  { name: "React.js", cat: "Frontend" },
  { name: "Next.js", cat: "Frontend" },
  { name: "Tailwind CSS", cat: "Frontend" },
  { name: "JavaScript", cat: "Frontend" },
  { name: "HTML5 / CSS3", cat: "Frontend" },
  { name: "Node.js", cat: "Backend" },
  { name: "PHP", cat: "Backend" },
  { name: "Laravel", cat: "Backend" },
  { name: "MySQL", cat: "Backend" },
  { name: "Git / GitHub", cat: "Backend" },
  { name: "VS Code", cat: "Tools" },
  { name: "Figma", cat: "Tools" },
];

const CAT_ICON = { Frontend: Code2, Backend: Server, Tools: Wrench };
const FILTERS = ["All", "Frontend", "Backend", "Tools"];

function TechStack() {
  const [filter, setFilter] = useState("All");
  const items = filter === "All" ? STACK : STACK.filter((s) => s.cat === filter);

  return (
    <section id="stack" className="px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <span className="text-[#7B2CBF] text-sm font-mono">02 Skills</span>
          <h2 className="font-[Space_Grotesk] text-3xl sm:text-4xl text-white mt-3 mb-8 leading-tight">
            Tech stack &amp; tools
          </h2>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="flex flex-wrap gap-2 mb-8">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
                  filter === f
                    ? "bg-[#00F5D4]/10 border-[#00F5D4]/40 text-[#00F5D4]"
                    : "border-white/10 text-slate-400 hover:text-white hover:border-white/25"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {items.map((item) => {
              const Icon = CAT_ICON[item.cat];
              return (
                <motion.div
                  key={item.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  className="group rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-5 hover:scale-[1.04] hover:border-[#00F5D4]/40 hover:shadow-[0_0_24px_rgba(0,245,212,0.18)] transition-all cursor-default"
                >
                  <Icon size={20} className="text-[#7B2CBF] group-hover:text-[#00F5D4] transition-colors mb-3" />
                  <div className="text-sm text-slate-200">{item.name}</div>
                  <div className="text-[11px] text-slate-500 mt-1">{item.cat}</div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Projects ---------------- */
const PROJECTS = [
  {
    title: "Dare Coffee — Cafe Website",
    badge: "First Project",
    desc: "My first web project: a cafe website built with Laravel. It has a landing page, a promo banner, and a menu of coffee and non-coffee drinks with price and stock info, plus login and register pages for customers.",
    tags: ["Laravel", "PHP", "MySQL", "Blade"],
    images: ["/projects/dare-coffee-home.jpeg", "/projects/dare-coffee-menu.jpeg"],
    repo: "", // e.g. "https://github.com/khaidarganteng/dare-coffee"
  },
  {
    title: "Creative Fest — Design Competition Platform",
    badge: "Second Project",
    desc: "A design-competition platform built for SMKN 1 Wonosobo's Creative Fest. It has a public landing page with categories and a work gallery, a registration/login system for participants, an admin dashboard to manage events and participants, and a separate judge dashboard for scoring submitted work.",
    tags: ["Laravel", "PHP", "MySQL", "Blade"],
    images: [
      "/projects/creative-fest-hero.jpeg",
      "/projects/creative-fest-features.jpeg",
      "/projects/creative-fest-steps.jpeg",
      "/projects/creative-fest-register.jpeg",
      "/projects/creative-fest-participant.jpeg",
      "/projects/creative-fest-admin.jpeg",
      "/projects/creative-fest-judge.jpeg",
    ],
    repo: "", // e.g. "https://github.com/khaidarganteng/dare-coffee"
  },
];
function ProjectCard({ p, i }) {
  const [active, setActive] = useState(0);

  return (
    <Reveal delay={i * 0.08}>
      <div className="group grid lg:grid-cols-[1.25fr_1fr] rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md overflow-hidden hover:border-[#00F5D4]/30 transition-colors">
        {/* Screenshot */}
        <div className="bg-[#0D1117]/60 p-4 sm:p-6">
          <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={p.images[active]}
                alt={`${p.title} screenshot ${active + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="w-full aspect-[2/1] object-cover object-top"
              />
            </AnimatePresence>
          </div>

          {p.images.length > 1 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {p.images.map((src, idx) => (
                <button
                  key={src}
                  onClick={() => setActive(idx)}
                  aria-label={`Show screenshot ${idx + 1}`}
                  className={`w-20 rounded-lg overflow-hidden border transition-all ${
                    active === idx
                      ? "border-[#00F5D4] shadow-[0_0_14px_rgba(0,245,212,0.35)]"
                      : "border-white/10 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={src} alt="" className="w-full aspect-[2/1] object-cover object-top" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-6 sm:p-8 flex flex-col justify-center">
          <span className="self-start inline-flex items-center gap-1.5 rounded-full border border-[#7B2CBF]/40 bg-[#7B2CBF]/15 text-[#c9a0f0] text-[11px] px-2.5 py-1 mb-4">
            <Sparkles size={12} /> {p.badge}
          </span>
          <h3 className="font-[Space_Grotesk] text-xl sm:text-2xl text-white mb-3">{p.title}</h3>
          <p className="text-sm text-slate-400 leading-relaxed mb-5">{p.desc}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {p.tags.map((t) => (
              <span
                key={t}
                className="text-[11px] rounded-full border border-[#00F5D4]/30 bg-[#00F5D4]/10 text-[#00F5D4] px-2.5 py-1"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            {p.repo && (
              <a href={p.repo} target="_blank" rel="noreferrer"
                 className="inline-flex items-center gap-1.5 text-sm text-white/90 hover:text-[#00F5D4] transition-colors">
                <Github size={14} /> View on GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function Projects() {
  return (
    <section id="projects" className="px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <span className="text-[#7B2CBF] text-sm font-mono">03 — Work</span>
          <h2 className="font-[Space_Grotesk] text-3xl sm:text-4xl text-white mt-3 mb-10 leading-tight">
            Featured projects
          </h2>
        </Reveal>
        <div className="space-y-6">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = useCallback(() => {
    if (!form.name || !form.email || !form.message) return;
    const text = `Hi Khaidar, I'm ${form.name} (${form.email}).\n\n${form.message}`;
    window.open(`https://wa.me/6285166458392?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", message: "" });
    }, 2400);
  }, [form]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 sm:p-8 relative overflow-hidden">
      <AnimatePresence>
        {sent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#0D1117]/95 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              <CheckCircle2 size={44} className="text-[#00F5D4]" />
            </motion.div>
            <p className="text-white font-[Space_Grotesk]">Opening WhatsApp…</p>
            <p className="text-slate-500 text-sm">Your message is ready. Just press send there.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <h3 className="font-[Space_Grotesk] text-xl text-white mb-6">Send a quick message</h3>

      <div className="space-y-4">
        <div>
          <label className="text-xs text-slate-500 mb-1.5 block">Name</label>
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Your name"
            className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none focus:border-[#00F5D4]/50 transition-colors"
          />
        </div>
        <div>
          <label className="text-xs text-slate-500 mb-1.5 block">Email</label>
          <input
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none focus:border-[#00F5D4]/50 transition-colors"
          />
        </div>
        <div>
          <label className="text-xs text-slate-500 mb-1.5 block">Message</label>
          <textarea
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            placeholder="What's on your mind?"
            rows={4}
            className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none focus:border-[#00F5D4]/50 transition-colors resize-none"
          />
        </div>
        <button
          onClick={submit}
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#00F5D4] text-[#06121A] font-medium py-3 hover:shadow-[0_0_24px_rgba(0,245,212,0.5)] transition-all"
        >
          <Send size={15} /> Send via WhatsApp
        </button>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <section id="contact" className="px-6 py-24">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
        <Reveal>
          <span className="text-[#7B2CBF] text-sm font-mono">04 — Contact</span>
          <h2 className="font-[Space_Grotesk] text-3xl sm:text-4xl text-white mt-3 mb-4 leading-tight">
            Let's talk
          </h2>
          <p className="text-slate-400 mb-8 max-w-md leading-relaxed">
            Have a project in mind or just want to say hi? Reach out directly through
            Instagram, WhatsApp, or GitHub, or send a message on the right.
          </p>

          <div className="space-y-4">
            <a
              href="https://instagram.com/kkhhaaiiddaarrr_"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-4 hover:border-[#7B2CBF]/40 hover:bg-white/[0.06] transition-all"
            >
              <div className="w-11 h-11 rounded-lg bg-[#7B2CBF]/15 flex items-center justify-center text-[#7B2CBF]">
                <Instagram size={19} />
              </div>
              <div>
                <div className="text-sm text-white">Instagram</div>
                <div className="text-xs text-slate-500">@kkhhaaiiddaarrr_</div>
              </div>
            </a>

            <a
              href="https://wa.me/6285166458392"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-4 hover:border-[#00F5D4]/40 hover:bg-white/[0.06] transition-all"
            >
              <div className="w-11 h-11 rounded-lg bg-[#00F5D4]/15 flex items-center justify-center text-[#00F5D4]">
                <MessageCircle size={19} />
              </div>
              <div>
                <div className="text-sm text-white">WhatsApp</div>
                <div className="text-xs text-slate-500">085166458392</div>
              </div>
            </a>

            <a
              href="https://github.com/khaidarganteng/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Khaidar's GitHub profile"
              className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-4 hover:border-white/25 hover:bg-white/[0.06] transition-all group"
            >
              <div className="w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center text-white group-hover:bg-white/15 transition-colors">
                <Github size={19} />
              </div>
              <div>
                <div className="text-sm text-white">GitHub</div>
                <div className="text-xs text-slate-500">github.com/khaidarganteng</div>
              </div>
              <ExternalLink size={15} className="ml-auto text-slate-500 group-hover:text-white transition-colors" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="px-6 py-8 border-t border-white/10">
      <div className="max-w-6xl mx-auto text-center text-xs text-slate-500">
        © 2026 Khaidar Sinaan As-Shidqii. Built with Next.js &amp; Tailwind CSS.
      </div>
    </footer>
  );
}

/* ---------------- Background ---------------- */
function Backdrop() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#090D16]">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#00F5D4]/10 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[55%] h-[55%] rounded-full bg-[#7B2CBF]/15 blur-[130px]" />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
}

/* ---------------- App ---------------- */
export default function Portfolio() {
  return (
    <div className="min-h-screen text-slate-200 font-[Inter]">
      <Backdrop />
      <Navbar />
      <Hero />
      <StatsBar />
      <About />
      <TechStack />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
