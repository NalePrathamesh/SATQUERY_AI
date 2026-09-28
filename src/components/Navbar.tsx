import { useState } from 'react';
import { Menu, X, Satellite } from 'lucide-react';
import { useRouter } from '@/hooks/useRouter';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Query', path: '/query' },
  { label: 'Analysis', path: '/analysis' },
  { label: 'Capabilities', path: '/capabilities' },
  { label: 'About', path: '/about' },
];

export function Navbar() {
  const { route, navigate } = useRouter();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return route === '/' || route === '';
    return route.startsWith(path);
  };

  const handleNav = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => handleNav('/')} className="flex items-center gap-3 group">
            <div className="relative">
              <Satellite size={28} className="text-white group-hover:rotate-12 transition-transform duration-500" />
              <div className="absolute inset-0 animate-ping rounded-full opacity-20">
                <Satellite size={28} className="text-white" />
              </div>
            </div>
            <div className="text-left">
              <div className="text-lg font-bold tracking-tight leading-none">SatQuery</div>
              <div className="text-[10px] font-mono tracking-[0.3em] text-white/50 leading-none mt-1">AI</div>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  isActive(item.path) ? 'text-white' : 'text-white/50 hover:text-white'
                }`}
              >
                {item.label}
                {isActive(item.path) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white" />
                )}
                <span className="absolute bottom-0 left-0 right-0 h-px bg-white/0 group-hover:bg-white/20 transition-all" />
              </button>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => handleNav('/query')}
            className="hidden md:inline-flex btn-primary items-center gap-2 px-5 py-2 text-sm font-medium border border-white/30 hover:border-white hover:bg-white hover:text-black transition-all duration-300 rounded-full"
          >
            Launch Query
          </button>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden text-white">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/95 md:hidden flex flex-col items-center justify-center gap-6 animate-fade-in">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNav(item.path)}
              className={`text-2xl font-medium transition-colors ${
                isActive(item.path) ? 'text-white' : 'text-white/50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
