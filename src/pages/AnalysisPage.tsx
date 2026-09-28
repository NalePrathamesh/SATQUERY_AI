import { useState, useEffect } from 'react';
import { FileText, Download, Eye, Radar, Layers, Clock, CheckCircle, ArrowRight, Activity, MapPin } from 'lucide-react';
import { useRouter } from '@/hooks/useRouter';

export function AnalysisPage() {
  const { navigate } = useRouter();
  const [activeStep, setActiveStep] = useState(0);

  const traceSteps = [
    { label: 'Input Validation', detail: '2 images validated · GeoTIFF · co-registered', icon: CheckCircle },
    { label: 'Query Classification', detail: 'Task type: change_detection · bi-temporal', icon: Activity },
    { label: 'Model Selection', detail: 'ChangeVQA-v2 · ChangeMapNet', icon: Layers },
    { label: 'Execution', detail: 'Processing bi-temporal pair...', icon: Radar },
    { label: 'Output Integration', detail: 'Text + spatial map + confidence', icon: FileText },
  ];

  useEffect(() => {
    if (activeStep < traceSteps.length - 1) {
      const t = setTimeout(() => setActiveStep(activeStep + 1), 800);
      return () => clearTimeout(t);
    }
  }, [activeStep]);

  return (
    <div className="relative z-10 min-h-screen pt-28 pb-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono">QUERY COMPLETED</span>
            <span className="text-xs font-mono text-white/40">Execution ID: SQ-2026-0928-001</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Analysis Results</h1>
          <p className="text-white/50">What changed between these two dates, and where did the change occur?</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Image comparison */}
          <div className="lg:col-span-2 space-y-6">
            {/* Before/After images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in-up">
              <ImagePanel label="T1 — Before" date="2024-03-15" type="Optical" />
              <ImagePanel label="T2 — After" date="2024-09-22" type="Optical" />
            </div>

            {/* Change map */}
            <div className="glass-card rounded-2xl p-6 animate-fade-in-up delay-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  <h3 className="font-semibold">Spatial Change Map</h3>
                </div>
                <span className="text-xs font-mono text-white/40">ChangeMapNet</span>
              </div>
              <ChangeMapViz />
              <div className="mt-4 flex items-center gap-6 text-xs font-mono text-white/50">
                <div className="flex items-center gap-2"><div className="w-3 h-3 border border-white" /> No Change</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-white" /> Changed Region</div>
              </div>
            </div>

            {/* Textual answer */}
            <div className="glass-card rounded-2xl p-6 animate-fade-in-up delay-300">
              <div className="flex items-center gap-2 mb-4">
                <FileText size={18} />
                <h3 className="font-semibold">Evidence-Grounded Response</h3>
              </div>
              <div className="space-y-3 text-sm leading-relaxed text-white/70">
                <p>
                  <span className="text-white font-medium">Summary: </span>
                  Between March 15 and September 22, 2024, significant urban expansion was detected
                  in the northeastern sector of the imaged region.
                </p>
                <p>
                  <span className="text-white font-medium">Changes Detected: </span>
                  Built-up area increased by approximately <span className="font-mono text-white">12.4%</span>,
                  primarily concentrated in 3 clusters. A new road network is visible connecting
                  previously isolated structures. Vegetation cover decreased by <span className="font-mono text-white">8.7%</span>
                  in the expansion zone.
                </p>
                <p>
                  <span className="text-white font-medium">Confidence: </span>
                  <span className="font-mono text-white">87.3%</span> — High confidence based on
                  clear spectral signatures and consistent change patterns across both acquisitions.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Execution trace */}
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6 animate-fade-in-up delay-100">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Activity size={18} /> Execution Trace
              </h3>
              <div className="space-y-4">
                {traceSteps.map((step, i) => {
                  const done = i <= activeStep;
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all ${done ? 'border-white bg-white/10' : 'border-white/20'}`}>
                        <step.icon size={14} className={done ? 'text-white' : 'text-white/30'} />
                      </div>
                      <div>
                        <div className={`text-sm font-medium transition-colors ${done ? 'text-white' : 'text-white/30'}`}>{step.label}</div>
                        <div className={`text-xs font-mono transition-colors ${done ? 'text-white/50' : 'text-white/20'}`}>{step.detail}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Models used */}
            <div className="glass-card rounded-2xl p-6 animate-fade-in-up delay-300">
              <h3 className="font-semibold mb-4">Models & Tools</h3>
              <div className="space-y-3">
                {[
                  { name: 'ChangeVQA-v2', task: 'Change-based VQA', acc: '82.1%' },
                  { name: 'ChangeMapNet', task: 'Spatial change map', acc: '78.4%' },
                  { name: 'RS-CLIP-Adapter', task: 'Image-text alignment', acc: '91.0%' },
                ].map((m) => (
                  <div key={m.name} className="flex items-center justify-between pb-3 border-b border-white/10 last:border-0">
                    <div>
                      <div className="text-sm font-medium font-mono">{m.name}</div>
                      <div className="text-xs text-white/40">{m.task}</div>
                    </div>
                    <div className="text-sm font-mono text-white/60">{m.acc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Download */}
            <div className="space-y-3 animate-fade-in-up delay-500">
              <button className="w-full flex items-center justify-between p-4 rounded-2xl border border-white/15 hover:border-white/40 hover:bg-white/5 transition-all group">
                <span className="flex items-center gap-3 text-sm font-medium">
                  <Download size={18} /> Full Report (PDF)
                </span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-2xl border border-white/15 hover:border-white/40 hover:bg-white/5 transition-all group">
                <span className="flex items-center gap-3 text-sm font-medium">
                  <Download size={18} /> Change Map (GeoTIFF)
                </span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/query')}
                className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-white text-black font-medium hover:gap-4 transition-all"
              >
                New Query <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ImagePanel({ label, date, type }: { label: string; date: string; type: string }) {
  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <div>
          <div className="text-sm font-medium">{label}</div>
          <div className="text-xs font-mono text-white/40">{date}</div>
        </div>
        <span className="text-xs font-mono px-2 py-1 rounded border border-white/20">{type}</span>
      </div>
      <div className="aspect-square relative scan-container bg-black/40 flex items-center justify-center">
        {/* Simulated satellite imagery — wireframe style */}
        <svg viewBox="0 0 200 200" className="w-full h-full p-4">
          {/* Grid */}
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 25} x2="200" y2={i * 25} stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
          ))}
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 25} y1="0" x2={i * 25} y2="200" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
          ))}
          {/* Abstract terrain features */}
          <path d="M20,80 Q50,60 80,70 T140,65 L180,60" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          <path d="M10,120 Q40,110 70,115 T130,110 L170,105" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <path d="M30,40 L60,45 L55,70 L25,65 Z" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
          <circle cx="120" cy="100" r="25" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
          <rect x="140" y="130" width="30" height="20" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
          {/* Roads */}
          <line x1="0" y1="150" x2="200" y2="140" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" strokeDasharray="4 2" />
          <line x1="100" y1="0" x2="110" y2="200" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" strokeDasharray="4 2" />
        </svg>
        <div className="absolute bottom-2 right-2 text-[10px] font-mono text-white/30">SIMULATED</div>
      </div>
    </div>
  );
}

function ChangeMapViz() {
  return (
    <div className="aspect-video relative bg-black/40 rounded-xl overflow-hidden scan-container">
      <svg viewBox="0 0 400 200" className="w-full h-full">
        {/* Grid */}
        {Array.from({ length: 16 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 12.5} x2="400" y2={i * 12.5} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 32 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 12.5} y1="0" x2={i * 12.5} y2="200" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
        ))}
        {/* Changed regions */}
        <rect x="220" y="40" width="50" height="35" fill="rgba(255,255,255,0.8)" stroke="white" strokeWidth="1" className="animate-fade-in" />
        <rect x="280" y="80" width="40" height="30" fill="rgba(255,255,255,0.6)" stroke="white" strokeWidth="1" className="animate-fade-in delay-200" />
        <rect x="180" y="100" width="60" height="40" fill="rgba(255,255,255,0.7)" stroke="white" strokeWidth="1" className="animate-fade-in delay-300" />
        {/* Labels */}
        <text x="225" y="60" fontSize="8" fill="black" fontFamily="monospace" className="font-mono">+14.2%</text>
        <text x="285" y="98" fontSize="8" fill="black" fontFamily="monospace" className="font-mono">+9.8%</text>
        <text x="185" y="122" fontSize="8" fill="black" fontFamily="monospace" className="font-mono">+13.1%</text>
        {/* Bounding boxes */}
        <rect x="215" y="35" width="60" height="45" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="3 3" />
        <rect x="275" y="75" width="50" height="40" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="3 3" />
        <rect x="175" y="95" width="70" height="50" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="3 3" />
      </svg>
    </div>
  );
}
