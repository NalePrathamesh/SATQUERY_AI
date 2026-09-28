import { Satellite, Target, Rocket, Users, ArrowRight, CheckCircle, Building2, Globe2 } from 'lucide-react';
import { useRouter } from '@/hooks/useRouter';

export function AboutPage() {
  const { navigate } = useRouter();

  return (
    <div className="relative z-10 min-h-screen pt-28 pb-20 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center animate-fade-in-up">
          <div className="text-xs font-mono uppercase tracking-[0.3em] text-white/40 mb-4">About</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">SatQuery AI</h1>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            An interactive vision-language assistant for multimodal remote sensing image analysis
            through text queries. Built for ISRO's Smart India Hackathon 2026.
          </p>
        </div>

        {/* Problem statement card */}
        <div className="glass-card rounded-3xl p-8 md:p-12 mb-16 animate-fade-in-up delay-100">
          <div className="flex items-center gap-3 mb-6">
            <Target size={22} />
            <h2 className="text-2xl font-bold">Problem Statement</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'PS ID', value: '26167' },
              { label: 'Organization', value: 'ISRO' },
              { label: 'Department', value: 'Dept. of Space' },
              { label: 'Theme', value: 'Space Tech' },
            ].map((item) => (
              <div key={item.label} className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-xs font-mono uppercase text-white/40 mb-1">{item.label}</div>
                <div className="text-sm font-medium">{item.value}</div>
              </div>
            ))}
          </div>
          <p className="text-white/60 leading-relaxed mb-4">
            Most existing remote-sensing AI solutions are isolated applications for a single predefined task.
            Non-expert users find it difficult to obtain meaningful information from satellite imagery through
            simple natural-language queries. Many operational questions require paired or multiple observations
            from different sensors or time periods.
          </p>
          <p className="text-white/60 leading-relaxed">
            SatQuery AI solves this with an agentic, query-driven framework. Instead of applying a single generic
            VLM, the system selects and executes suitable remote-sensing specialist models, validates inputs,
            combines outputs, and returns evidence-grounded responses.
          </p>
        </div>

        {/* Objectives */}
        <div className="mb-16 animate-fade-in-up delay-200">
          <h2 className="text-2xl font-bold mb-8">Key Objectives</h2>
          <div className="space-y-4">
            {[
              'Remote-sensing adaptation using BigEarthNet.txt for domain-specific image-text representations.',
              'Single-image visual question answering as a mandatory baseline capability.',
              'Multi-image change analysis from bi-temporal pairs — change description and change-based VQA.',
              'Cross-modal pair analysis extracting complementary information from optical and SAR imagery.',
              'Agentic orchestration that automatically selects, sequences, and executes specialist models.',
              'Auditable execution summaries with selected task, model names, and key parameters.',
            ].map((obj, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
                <CheckCircle size={20} className="flex-shrink-0 mt-0.5 text-white/60" />
                <p className="text-white/70 leading-relaxed">{obj}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Input scope */}
        <div className="mb-16 animate-fade-in-up delay-300">
          <h2 className="text-2xl font-bold mb-8">Input Scope</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: Satellite, title: 'Single Image', desc: 'One optical/multispectral or SAR image for captioning, VQA, and grounding.' },
              { icon: Globe2, title: 'Cross-modal Pair', desc: 'Co-registered optical and SAR images of the same area for joint analysis.' },
              { icon: Rocket, title: 'Bi-temporal Pair', desc: 'Two images of the same area at different times for change detection.' },
              { icon: Building2, title: 'Supported Formats', desc: 'GeoTIFF/TIFF for geospatial imagery. PNG/JPEG for benchmark datasets.' },
            ].map((item) => (
              <div key={item.title} className="glass-card rounded-2xl p-6">
                <item.icon size={24} className="mb-3 text-white/70" />
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Evaluation */}
        <div className="mb-16 animate-fade-in-up delay-500">
          <h2 className="text-2xl font-bold mb-8">Evaluation</h2>
          <div className="glass-card rounded-2xl p-8">
            <p className="text-white/60 leading-relaxed mb-6">
              Final evaluation uses prescribed public benchmark test subsets and an ISRO/SAC evaluation dataset.
              The ISRO/SAC set contains pre-georeferenced and co-registered Cartosat-2S optical and RISAT SAR
              image pairs with task-specific reference answers, labels, bounding boxes, or masks.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Public Benchmarks', value: 'VRSBench · RSVQA · CDVQA' },
                { label: 'ISRO/SAC Dataset', value: 'Cartosat-2S + RISAT pairs' },
                { label: 'Metrics', value: 'Normalised across tasks' },
                { label: 'Annotations', value: 'Not disclosed to teams' },
              ].map((e) => (
                <div key={e.label} className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xs font-mono uppercase text-white/40 mb-1">{e.label}</div>
                  <div className="text-sm font-medium font-mono">{e.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Deliverables */}
        <div className="mb-16 animate-fade-in-up delay-700">
          <h2 className="text-2xl font-bold mb-8">Deliverables</h2>
          <div className="space-y-3">
            {[
              'Interactive GUI / web application with agentic remote-sensing AI backend',
              'Input upload and compatibility checking',
              'Remote-sensing-adapted vision-language component',
              'Specialist tools for VQA, captioning/grounding, change understanding, and optical–SAR analysis',
              'Agentic controller for task routing, tool execution, and output integration',
              'Visual evidence, confidence information, execution summaries, and downloadable reports',
            ].map((d, i) => (
              <div key={i} className="flex items-center gap-3 text-white/60">
                <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <span className="text-sm">{d}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center animate-fade-in-up delay-1000">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/query')}
              className="btn-primary group inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black rounded-full font-medium hover:gap-4 transition-all"
            >
              Launch Query <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate('/capabilities')}
              className="px-8 py-3.5 border border-white/20 rounded-full font-medium hover:border-white hover:bg-white/5 transition-all"
            >
              View Capabilities
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
