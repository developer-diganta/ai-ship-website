import { Outlet, Link, useLocation } from 'react-router-dom';
import { GitPullRequest, Github, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export function Layout() {
  const location = useLocation();
  const isDocs = location.pathname.startsWith('/docs');

  return (
    <div className="min-h-screen bg-vercel-bg text-vercel-fg font-sans selection:bg-accent-blue-dim selection:text-white relative overflow-hidden flex flex-col">
      {/* Background ambient light */}
      {!isDocs && (
        <>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent-blue/20 blur-[120px] rounded-[100%] pointer-events-none -z-10"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, -50, 0],
              y: [0, 50, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[500px] bg-accent-purple/20 blur-[120px] rounded-[100%] pointer-events-none -z-10"
          />
        </>
      )}

      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-vercel-gray-200/50 backdrop-blur-xl sticky top-0 z-50 bg-black/50">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="AI Ship Logo" className="w-8 h-8 rounded-md" />
          <span className="text-xl font-bold tracking-tight">AI Ship</span>
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/docs" className={`${isDocs ? 'text-white' : 'text-vercel-gray-400'} text-sm font-medium hover:text-white transition-colors`}>
            Documentation
          </Link>
          <a
            href="https://github.com/developer-diganta/ai-ship"
            target="_blank"
            rel="noreferrer"
            className="text-vercel-gray-500 hover:text-white transition-colors"
          >
            <Github size={20} />
          </a>
        </div>
      </nav>

      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-vercel-gray-200/50 py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col items-center justify-center text-vercel-gray-500 text-sm space-y-6">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-sm bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-white font-bold text-[10px]">
              <GitPullRequest size={14} />
            </div>
            <span className="text-base font-semibold text-vercel-gray-300 tracking-wide">AI Ship</span>
          </div>

          <div className="flex items-center space-x-2 text-vercel-gray-400">
            <span>Built with</span>
            <Heart size={14} className="text-red-500 fill-red-500/20" />
            <span>by</span>
            <a href="https://diganta.codes" target="_blank" rel="noreferrer" className="text-white hover:text-accent-blue transition-colors font-medium relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[1px] after:bg-accent-blue/50 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">
              Diganta
            </a>
          </div>

          <div className="flex space-x-4">
            <a href="https://github.com/developer-diganta/ai-ship" target="_blank" rel="noreferrer" className="flex items-center hover:text-white transition-colors">
              <Github size={16} className="mr-2" />
              Open Source (GitHub)
            </a>
          </div>

          <p className="text-vercel-gray-600 text-xs">© {new Date().getFullYear()} AI Ship. Designed for the builders.</p>
        </div>
      </footer>
    </div>
  );
}
