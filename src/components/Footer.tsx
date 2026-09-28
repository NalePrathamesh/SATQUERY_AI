import { Satellite, Github, Mail } from 'lucide-react';
import { useRouter } from '@/hooks/useRouter';

export function Footer() {
  const { navigate } = useRouter();

  return (
    <footer className="relative z-10 border-t border-white/10 mt-20">
      <div className="px-6 md:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Satellite size={24} className="text-white" />
                <div>
                  <div className="text-lg font-bold">SatQuery AI</div>
                  <div className="text-[10px] font-mono tracking-[0.3em] text-white/40">VISION-LANGUAGE ASSISTANT</div>
                </div>
              </div>
              <p className="text-sm text-white/50 max-w-md leading-relaxed">
                An agentic, query-driven framework for multimodal remote sensing image analysis.
                Built for ISRO SIH 2026 — Space Technology.
              </p>
            </div>

            {/* Links */}
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-white/40 mb-4">Navigate</div>
              <div className="flex flex-col gap-2">
                {[
                  { label: 'Home', path: '/' },
                  { label: 'Query Interface', path: '/query' },
                  { label: 'Analysis Results', path: '/analysis' },
                  { label: 'Capabilities', path: '/capabilities' },
                  { label: 'About', path: '/about' },
                ].map((l) => (
                  <button
                    key={l.path}
                    onClick={() => navigate(l.path)}
                    className="text-sm text-white/60 hover:text-white text-left transition-colors"
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-white/40 mb-4">Resources</div>
              <div className="flex flex-col gap-2">
                {['BigEarthNet.txt', 'VRSBench', 'RSVQA', 'CDVQA', 'Documentation'].map((r) => (
                  <span key={r} className="text-sm text-white/60 hover:text-white cursor-pointer transition-colors">
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
            <div className="text-xs font-mono text-white/40">
              PS ID: 26167 · ISRO · Department of Space
            </div>
            <div className="flex items-center gap-4">
              <Github size={18} className="text-white/40 hover:text-white cursor-pointer transition-colors" />
              <Mail size={18} className="text-white/40 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
