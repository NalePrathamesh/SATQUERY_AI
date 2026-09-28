import { Eye, Scan, Layers, GitBranch, MessageSquare, MapPin, FileText, Gauge, ArrowRight, Cpu, Database, Workflow } from 'lucide-react';
import { useRouter } from '@/hooks/useRouter';

const capabilities = [
  {
    icon: MessageSquare,
    title: 'Visual Question Answering',
    desc: 'Answer natural-language questions about single satellite images using a remote-sensing-adapted VQA model.',
    benchmark: 'RSVQA',
    status: 'Mandatory',
  },
  {
    icon: FileText,
    title: 'Image Captioning',
    desc: 'Generate descriptive captions summarizing land-cover, objects, and scene context from a single image.',
    benchmark: 'VRSBench',
    status: 'Optional',
  },
  {
    icon: MapPin,
    title: 'Text-Guided Region Grounding',
    desc: 'Localize and highlight specific regions in an image referred to by a text query with bounding boxes.',
    benchmark: 'VRSBench',
    status: 'Optional',
  },
  {
    icon: Scan,
    title: 'Change Detection & Description',
    desc: 'Compare bi-temporal image pairs to identify, describe, and spatially map changes over time.',
    benchmark: 'CDVQA',
    status: 'Mandatory',
  },
  {
    icon: Layers,
    title: 'Optical–SAR Fusion Analysis',
    desc: 'Extract complementary information from co-registered optical and SAR image pairs for robust analysis.',
    benchmark: 'ISRO/SAC',
    status: 'Mandatory',
  },
  {
    icon: GitBranch,
    title: 'Agentic Model Orchestration',
    desc: 'Intelligently select, sequence, and execute specialist models based on query and input configuration.',
    benchmark: 'Internal',
    status: 'Mandatory',
  },
];

const modelRegistry = [
  { name: 'RS-CLIP-Adapter', type: 'Vision-Language', task: 'Image-text alignment', dataset: 'BigEarthNet.txt' },
  { name: 'RSVQA-Net', type: 'VQA', task: 'Visual question answering', dataset: 'RSVQA' },
  { name: 'ChangeVQA-v2', type: 'Change VQA', task: 'Bi-temporal change Q&A', dataset: 'CDVQA' },
  { name: 'ChangeMapNet', type: 'Segmentation', task: 'Spatial change mapping', dataset: 'CDVQA' },
  { name: 'OptSAR-Fusion', type: 'Fusion', task: 'Optical–SAR joint analysis', dataset: 'ISRO/SAC' },
  { name: 'GroundingRS', type: 'Grounding', task: 'Text-guided localization', dataset: 'VRSBench' },
];

const orchestrationSteps = [
  { icon: Eye, title: 'Query Interpretation', desc: 'Parse the natural-language query and classify the requested task type.' },
  { icon: Scan, title: 'Input Validation', desc: 'Check number, modality, format, metadata, and compatibility of input images.' },
  { icon: Cpu, title: 'Model Selection', desc: 'Select one or more specialist models from a predefined registry.' },
  { icon: Workflow, title: 'Execution', desc: 'Configure permitted task parameters and execute the selected workflow.' },
  { icon: Gauge, title: 'Output Integration', desc: 'Combine textual and spatial outputs, estimate confidence, return visual evidence.' },
  { icon: FileText, title: 'Execution Summary', desc: 'Provide an auditable trace with selected task, model names, and key parameters.' },
];

export function CapabilitiesPage() {
  const { navigate } = useRouter();

  return (
    <div className="relative z-10 min-h-screen pt-28 pb-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center animate-fade-in-up">
          <div className="text-xs font-mono uppercase tracking-[0.3em] text-white/40 mb-4">System Capabilities</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">What SatQuery AI Can Do</h1>
          <p className="text-white/50 max-w-2xl mx-auto">
            Six specialist capabilities orchestrated by an agentic controller. Each tool is fine-tuned
            for remote-sensing data and validated against public benchmarks.
          </p>
        </div>

        {/* Capability cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {capabilities.map((cap, i) => (
            <div
              key={cap.title}
              className="glass-card rounded-2xl p-7 group animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl border border-white/20 flex items-center justify-center group-hover:border-white/50 group-hover:bg-white/5 transition-all">
                  <cap.icon size={22} />
                </div>
                <span className={`text-[10px] font-mono px-2 py-1 rounded-full border ${
                  cap.status === 'Mandatory'
                    ? 'border-white/40 text-white/80'
                    : 'border-white/15 text-white/40'
                }`}>
                  {cap.status}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{cap.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed mb-4">{cap.desc}</p>
              <div className="flex items-center gap-2 text-xs font-mono text-white/40">
                <Database size={12} /> Benchmark: {cap.benchmark}
              </div>
            </div>
          ))}
        </div>

        {/* Orchestration pipeline */}
        <div className="mb-24">
          <div className="mb-12 text-center">
            <div className="text-xs font-mono uppercase tracking-[0.3em] text-white/40 mb-4">Agentic Pipeline</div>
            <h2 className="text-3xl md:text-5xl font-bold">Orchestration Workflow</h2>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {orchestrationSteps.map((step, i) => (
                <div key={i} className="relative animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full border border-white/30 bg-black flex items-center justify-center mb-4 group-hover:border-white transition-all relative z-10">
                      <step.icon size={20} />
                    </div>
                    <div className="text-xs font-mono text-white/30 mb-1">STEP {String(i + 1).padStart(2, '0')}</div>
                    <h3 className="text-sm font-semibold mb-2">{step.title}</h3>
                    <p className="text-xs text-white/40 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Model registry */}
        <div className="mb-24">
          <div className="mb-12 text-center">
            <div className="text-xs font-mono uppercase tracking-[0.3em] text-white/40 mb-4">Model Registry</div>
            <h2 className="text-3xl md:text-5xl font-bold">Specialist Models</h2>
          </div>

          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="grid grid-cols-4 gap-4 px-6 py-4 border-b border-white/10 text-xs font-mono uppercase tracking-wider text-white/40">
              <div>Model</div>
              <div>Type</div>
              <div>Task</div>
              <div>Training Data</div>
            </div>
            {modelRegistry.map((m, i) => (
              <div
                key={m.name}
                className="grid grid-cols-4 gap-4 px-6 py-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors animate-fade-in-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="text-sm font-mono font-medium">{m.name}</div>
                <div className="text-sm text-white/60">{m.type}</div>
                <div className="text-sm text-white/60">{m.task}</div>
                <div className="text-sm text-white/60 font-mono">{m.dataset}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Datasets */}
        <div className="mb-12">
          <div className="mb-12 text-center">
            <div className="text-xs font-mono uppercase tracking-[0.3em] text-white/40 mb-4">Training & Evaluation</div>
            <h2 className="text-3xl md:text-5xl font-bold">Datasets</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'BigEarthNet.txt', role: 'Primary training', desc: 'Multisensor remote-sensing image-text pairs for domain adaptation.' },
              { name: 'VRSBench', role: 'Evaluation', desc: 'Single-image captioning and text-guided grounding benchmarks.' },
              { name: 'RSVQA', role: 'Evaluation', desc: 'Visual question answering on remote-sensing imagery.' },
              { name: 'CDVQA', role: 'Evaluation', desc: 'Change-based visual question answering for bi-temporal pairs.' },
            ].map((d, i) => (
              <div key={d.name} className="glass-card rounded-2xl p-6 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="text-xs font-mono text-white/40 mb-2">{d.role}</div>
                <div className="font-mono font-medium mb-3">{d.name}</div>
                <p className="text-xs text-white/50 leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => navigate('/query')}
            className="btn-primary group inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black rounded-full font-medium hover:gap-4 transition-all"
          >
            Try It Now <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
