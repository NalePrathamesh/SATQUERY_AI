import { GlobeBackground } from '@/components/GlobeBackground';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useRouter } from '@/hooks/useRouter';
import { HomePage } from '@/pages/HomePage';
import { QueryPage } from '@/pages/QueryPage';
import { AnalysisPage } from '@/pages/AnalysisPage';
import { CapabilitiesPage } from '@/pages/CapabilitiesPage';
import { AboutPage } from '@/pages/AboutPage';

function App() {
  const { route } = useRouter();

  const renderPage = () => {
    switch (route) {
      case '/':
        return <HomePage />;
      case '/query':
        return <QueryPage />;
      case '/analysis':
        return <AnalysisPage />;
      case '/capabilities':
        return <CapabilitiesPage />;
      case '/about':
        return <AboutPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white noise-overlay">
      <GlobeBackground />
      <Navbar />
      <main className="relative z-10">{renderPage()}</main>
      <Footer />
    </div>
  );
}

export default App;
