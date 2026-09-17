import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-[#00F5D4]'; // sesuaikan import animasi jika memakai framer-motion biasa
import { Sparkles, Terminal, User, Code, GraduationCap, Mail, Github, Linkedin, ExternalLink } from 'lucide-react';

// ==========================================
// 1. GANTI LINK/BASE64 FOTO PROFESIONAL DI SINI
// ==========================================
const PROFILE_IMG = "https://via.placeholder.com/400x500/1e293b/00F5D4?text=Foto+Studio+Profesional";

/* Custom Hook untuk efek ketik */
function useTyping(text, speed = 50, delay = 0) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let timeoutId;
    let currentIndex = 0;

    const startTyping = () => {
      const intervalId = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(intervalId);
        }
      }, speed);
    };

    timeoutId = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(timeoutId);
    };
  }, [text, speed, delay]);

  return displayedText;
}

/* Komponen TerminalCard dengan layout baru (Grid 2 Kolom) */
function TerminalCard() {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -8, y: px * 8 });
  };
  const onLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      className="relative transition-transform duration-200 ease-out"
    >
      {/* Visual Glow Effect */}
      <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#00F5D4]/20 via-transparent to-[#7B2CBF]/20 blur-2xl pointer-events-none" />

      <div className="relative rounded-2xl border border-white/10 bg-[#0D1117] overflow-hidden shadow-2xl">
        {/* Header Bar Terminal */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.03]">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-3 text-xs text-slate-400 font-mono">khaidar.dev — profile.js</span>
        </div>

        {/* Isi Terminal (Grid Side-by-Side di Layar Desktop) */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          
          {/* Kolom Kiri: Kode JS */}
          <pre className="font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto text-slate-300">
            <code>
              <span className="text-[#7B2CBF] font-semibold">const</span>
              <span> developer </span>
              <span className="text-[#00F5D4]">=</span>
              <span> {"{"}</span>
              {"\n"}
              <span className="text-slate-500">  name:</span>
              <span className="text-amber-300"> "Khaidar Sinaan"</span>
              <span>,</span>
              {"\n"}
              <span className="text-slate-500">  role:</span>
              <span className="text-amber-300"> "Software Engineer"</span>
              <span>,</span>
              {"\n"}
              <span className="text-slate-500">  school:</span>
              <span className="text-amber-300"> "SMKN 1 Wonosobo"</span>
              <span>,</span>
              {"\n"}
              <span className="text-slate-500">  age:</span>
              <span className="text-[#00F5D4]"> 17</span>
              <span>,</span>
              {"\n"}
              <span className="text-slate-500">  status:</span>
              <span className="text-emerald-400"> "Ready to Build"</span>
              {"\n"}
              <span>{"}"}</span>
              <span className="inline-block w-2 h-4 bg-[#00F5D4] ml-1 align-middle animate-pulse" />
            </code>
          </pre>

          {/* Kolom Kanan: Foto Profil */}
          <div className="relative rounded-xl overflow-hidden border border-white/10 bg-slate-900 group">
            <img
              src={PROFILE_IMG}
              alt="Khaidar Sinaan As-Shidqii"
              className="w-full aspect-[4/5] object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-transparent to-transparent opacity-60" />
          </div>

        </div>
      </div>
    </div>
  );
}

/* Komponen Utama Hero */
export default function Hero() {
  const typedText = useTyping("Student at SMKN 1 Wonosobo — Age 17", 40, 500);

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 px-6 flex items-center bg-[#080B10] text-white overflow-hidden">
      
      {/* Background Decorator */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00F5D4]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Sisi Kiri: Teks & Informasi Utama */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00F5D4]/30 bg-[#00F5D4]/10 px-4 py-1.5 text-xs text-[#00F5D4] mb-6 font-mono">
            <Sparkles size={14} /> Aspiring Software Engineer
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-4">
            Hi, I'm <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-[#00F5D4]">
              Khaidar Sinaan
            </span>
          </h1>

          <p className="font-mono text-slate-400 text-sm sm:text-base h-6 mb-8">
            {typedText}
          </p>

          <p className="text-slate-400 text-base leading-relaxed mb-8 max-w-xl">
            Fokus pada pengembangan web modern dan arsitektur sistem yang bersih. Suka mempelajari teknologi baru serta membangun solusi digital yang fungsional dan estetis.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00F5D4] text-slate-950 font-semibold hover:bg-[#00F5D4]/90 transition-colors"
            >
              <Mail size={18} /> Contact Me
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-slate-200"
            >
              <Github size={18} /> GitHub
            </a>
          </div>
        </div>

        {/* Sisi Kanan: Kartu Terminal Interaktif */}
        <div>
          <TerminalCard />
        </div>

      </div>
    </section>
  );
}