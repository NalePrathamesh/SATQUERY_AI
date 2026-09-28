import { useState, useRef } from 'react';
import { Upload, X, Send, Image as ImageIcon, Radar, Layers, Clock, Zap, CheckCircle, AlertCircle } from 'lucide-react';

type InputMode = 'single' | 'bitemporal' | 'optical-sar';

const sampleQueries = [
  'Describe the land-cover and major objects visible in this image.',
  'Highlight the water body referred to in the query.',
  'What changed between these two dates, and where did the change occur?',
  'Use the optical and SAR images together to identify built-up and water-covered regions.',
  'Has the built-up area increased, decreased, or remained unchanged?',
];

export function QueryPage() {
  const [mode, setMode] = useState<InputMode>('single');
  const [query, setQuery] = useState('');
  const [files, setFiles] = useState<{ name: string; slot: string }[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const modeConfig = {
    'single': { icon: ImageIcon, label: 'Single Image', desc: 'One optical/multispectral or SAR image', slots: 1 },
    'bitemporal': { icon: Clock, label: 'Bi-temporal Pair', desc: 'Two images of the same area at different times', slots: 2 },
    'optical-sar': { icon: Layers, label: 'Optical–SAR Pair', desc: 'Co-registered optical and SAR images', slots: 2 },
  };

  const handleFile = (file: File) => {
    const slot = mode === 'single' ? 'Image' : mode === 'bitemporal' ? `T${files.length + 1}` : files.length === 0 ? 'Optical' : 'SAR';
    setFiles([...files, { name: file.name, slot }]);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files);
    dropped.forEach((f) => handleFile(f));
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      Array.from(e.target.files).forEach((f) => handleFile(f));
    }
  };

  const handleSubmit = () => {
    if (!query || files.length === 0) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      window.location.hash = '/analysis';
    }, 2500);
  };

  const canSubmit = query.trim().length > 0 && files.length >= modeConfig[mode].slots;

  return (
    <div className="relative z-10 min-h-screen pt-28 pb-20 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12 animate-fade-in-up">
          <div className="text-xs font-mono uppercase tracking-[0.3em] text-white/40 mb-3">Query Interface</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Analyze Satellite Imagery</h1>
          <p className="text-white/50 max-w-2xl">
            Select your input configuration, upload imagery, and ask a natural-language question.
            The agentic controller will route your query to the appropriate specialist models.
          </p>
        </div>

        {/* Step 1: Input Mode */}
        <div className="mb-10 animate-fade-in-up delay-100">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center text-xs font-mono">1</span>
            <h2 className="text-lg font-semibold">Select Input Configuration</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(Object.keys(modeConfig) as InputMode[]).map((key) => {
              const cfg = modeConfig[key];
              const active = mode === key;
              return (
                <button
                  key={key}
                  onClick={() => { setMode(key); setFiles([]); }}
                  className={`text-left p-5 rounded-2xl border transition-all duration-300 ${
                    active
                      ? 'border-white bg-white/5 shadow-lg'
                      : 'border-white/10 hover:border-white/30 hover:bg-white/5'
                  }`}
                >
                  <cfg.icon size={22} className={active ? '' : 'text-white/60'} />
                  <div className="mt-3 font-medium">{cfg.label}</div>
                  <div className="text-xs text-white/40 mt-1">{cfg.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Upload */}
        <div className="mb-10 animate-fade-in-up delay-200">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center text-xs font-mono">2</span>
            <h2 className="text-lg font-semibold">Upload Imagery</h2>
            <span className="text-xs font-mono text-white/40">GeoTIFF / TIFF</span>
          </div>

          <div
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileInputRef.current?.click()}
            className="scan-container relative border-2 border-dashed border-white/15 hover:border-white/40 rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 group"
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".tif,.tiff,.geotiff,.png,.jpg,.jpeg"
              className="hidden"
              onChange={onFileSelect}
            />
            <Upload size={32} className="mx-auto text-white/40 group-hover:text-white/70 transition-colors mb-3" />
            <p className="text-sm text-white/50">
              Drag & drop or <span className="text-white underline">browse</span> to upload
            </p>
            <p className="text-xs text-white/30 mt-1 font-mono">
              {modeConfig[mode].slots} image(s) required
            </p>
          </div>

          {/* Uploaded files */}
          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              {files.map((f, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 animate-fade-in-up">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    {mode === 'optical-sar' && f.slot === 'SAR' ? <Radar size={18} /> : <ImageIcon size={18} />}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{f.name}</div>
                    <div className="text-xs font-mono text-white/40">{f.slot} · Ready</div>
                  </div>
                  <CheckCircle size={18} className="text-white/60" />
                  <button
                    onClick={() => setFiles(files.filter((_, idx) => idx !== i))}
                    className="text-white/40 hover:text-white"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Step 3: Query */}
        <div className="mb-10 animate-fade-in-up delay-300">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center text-xs font-mono">3</span>
            <h2 className="text-lg font-semibold">Ask a Question</h2>
          </div>

          {/* Sample queries */}
          <div className="flex flex-wrap gap-2 mb-4">
            {sampleQueries.map((q, i) => (
              <button
                key={i}
                onClick={() => setQuery(q)}
                className="text-xs px-3 py-1.5 rounded-full border border-white/15 hover:border-white/40 hover:bg-white/5 transition-all text-white/60 hover:text-white text-left max-w-xs truncate"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Query input */}
          <div className="relative">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type your natural-language query..."
              rows={3}
              className="w-full p-4 pr-14 rounded-2xl bg-white/5 border border-white/15 focus:border-white/40 focus:bg-white/8 outline-none resize-none text-sm transition-all font-mono"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-4 animate-fade-in-up delay-500">
          <button
            onClick={handleSubmit}
            disabled={!canSubmit || submitting}
            className={`btn-primary flex items-center gap-2 px-8 py-3.5 rounded-full font-medium transition-all ${
              canSubmit && !submitting
                ? 'bg-white text-black hover:gap-4'
                : 'bg-white/10 text-white/30 cursor-not-allowed'
            }`}
          >
            {submitting ? (
              <>
                <Zap size={18} className="animate-spin" />
                Routing to specialist models...
              </>
            ) : (
              <>
                <Send size={18} />
                Execute Query
              </>
            )}
          </button>
          {!canSubmit && (
            <div className="flex items-center gap-2 text-xs text-white/40">
              <AlertCircle size={14} />
              {files.length < modeConfig[mode].slots ? 'Upload required images' : 'Enter a query'}
            </div>
          )}
        </div>

        {/* Execution preview */}
        {submitting && (
          <div className="mt-8 glass-card rounded-2xl p-6 animate-fade-in">
            <div className="text-xs font-mono text-white/40 mb-3">EXECUTION TRACE</div>
            {[
              'Validating input images and metadata...',
              'Classifying query task type...',
              'Selecting specialist models from registry...',
              'Executing workflow...',
              'Combining outputs and estimating confidence...',
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3 py-1.5 animate-fade-in-up" style={{ animationDelay: `${i * 0.3}s` }}>
                <div className="w-4 h-4 rounded-full border border-white/30 border-t-white animate-spin-slow" style={{ animationDuration: '1s' }} />
                <span className="text-sm font-mono text-white/60">{step}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
