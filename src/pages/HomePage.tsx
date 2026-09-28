import { useEffect, useState } from 'react';
import { ArrowRight, Satellite, Scan, Eye, Layers, GitBranch, Activity, ChevronRight } from 'lucide-react';
import { useRouter } from '@/hooks/useRouter';

const rotatingWords = ['satellite imagery', 'remote sensing', 'earth observation', 'geospatial data'];

export function HomePage() {
  const { navigate } = useRouter();
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  // Typewriter effect
  useEffect(() => {
    const word = rotatingWords[wordIndex];
    if (typing) {
      if (displayed.length < word.length) {
        const t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 2000);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(word.slice(0, displayed.length - 1)), 40);
        return () => clearTimeout(t);
      } else {
        setTyping(true);
        setWordIndex((i) => (i + 1) % rotatingWords.length);
      }
    }
  }, [displayed, typing, wordIndex]);

  const features = [
    { icon: Eye, title: 'Visual Question Answering', desc: 'Ask natural-language questions about single satellite images and get evidence-grounded answers.' },
    { icon: Scan, title: 'Change Detection', desc: 'Compare bi-temporal image pairs to identify, describe, and localize changes over time.' },
    { icon: Layers, title: 'Optical–SAR Fusion', desc: 'Combine co-registered optical and SAR imagery for richer, cloud-penetrating analysis.' },
    { icon: GitBranch, title: 'Agentic Orchestration', desc: 'An intelligent controller selects, sequences, and executes specialist models per query.' },
  ];

  const stats = [
    { value: '4', label: 'Specialist Models' },
    { value: '3', label: 'Input Modalities' },
    { value: '5', label: 'Supported Tasks' },
    { value: '24/7', label: 'Orbital Coverage' },
  ];

  return (
    <div className="relative z-10">
      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <div className="animate-fade-in-up mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 text-xs font-mono tracking-wider text-white/70">
            <Satellite size={14} /> ISRO SIH 2026 · PS ID 26167
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight glow-text animate-fade-in-up delay-100">
          SatQuery <span className="text-white/40">AI</span>
        </h1>

        <p className="mt-6 text-lg md:text-2xl text-white/60 max-w-3xl animate-fade-in-up delay-200 leading-relaxed">
          An interactive vision-language assistant for multimodal remote sensing analysis through text queries.
        </p>

        {/* Typewriter line */}
        <div className="mt-8 h-8 text-base md:text-lg font-mono text-white/80 animate-fade-in-up delay-300">
          <span className="text-white/40">Querying </span>
          <span>{displayed}</span>
          <span className="animate-blink">_</span>
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-500">
          <button
            onClick={() => navigate('/query')}
            className="btn-primary group flex items-center gap-2 px-8 py-3.5 bg-white text-black rounded-full font-medium hover:gap-4 transition-all"
          >
            Start Querying
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => navigate('/capabilities')}
            className="px-8 py-3.5 border border-white/20 rounded-full font-medium hover:border-white hover:bg-white/5 transition-all"
          >
            Explore Capabilities
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-fade-in delay-1000">
          <div className="flex flex-col items-center gap-2 text-white/30">
            <span className="text-xs font-mono">SCROLL</span>
            <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="px-6 md:px-12 py-16 border-y border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={s.label} className="text-center animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="text-4xl md:text-5xl font-bold glow-text">{s.value}</div>
              <div className="mt-2 text-xs font-mono uppercase tracking-wider text-white/40">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-6 md:px-12 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <div className="text-xs font-mono uppercase tracking-[0.3em] text-white/40 mb-4">Core Capabilities</div>
            <h2 className="text-3xl md:text-5xl font-bold">What SatQuery AI Does</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="glass-card rounded-2xl p-8 group cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${i * 0.15}s` }}
                onClick={() => navigate('/capabilities')}
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl border border-white/20 flex items-center justify-center group-hover:border-white/50 group-hover:bg-white/5 transition-all">
                    <f.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                    <p className="text-white/50 leading-relaxed">{f.desc}</p>
                  </div>
                  <ChevronRight size={20} className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all mt-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 md:px-12 py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <div className="text-xs font-mono uppercase tracking-[0.3em] text-white/40 mb-4">Workflow</div>
            <h2 className="text-3xl md:text-5xl font-bold">How It Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Upload Imagery', desc: 'Submit single, bi-temporal, or optical–SAR image pairs in GeoTIFF/TIFF format.' },
              { step: '02', title: 'Ask a Question', desc: 'Type a natural-language query describing what you want to know about the imagery.' },
              { step: '03', title: 'Agentic Routing', desc: 'The controller classifies the task, validates inputs, and selects the right specialist models.' },
              { step: '04', title: 'Get Results', desc: 'Receive evidence-grounded text, visual annotations, confidence scores, and execution traces.' },
            ].map((s, i) => (
              <div key={s.step} className="relative animate-fade-in-up" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="text-5xl font-bold text-white/10 font-mono mb-4">{s.step}</div>
                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{s.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 -right-4 text-white/20">
                    <ArrowRight size={20} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card rounded-3xl p-12 md:p-16">
            <Activity size={40} className="mx-auto mb-6 text-white/60" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to query the Earth?</h2>
            <p className="text-white/50 mb-8 max-w-xl mx-auto">
              Upload satellite imagery and ask natural-language questions. The agentic controller handles the rest.
            </p>
            <button
              onClick={() => navigate('/query')}
              className="btn-primary group inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black rounded-full font-medium hover:gap-4 transition-all"
            >
              Launch Query Interface
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
