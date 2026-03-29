import { Outlet, Link, useLocation } from 'react-router-dom';
import { GitPullRequest, Github, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export function Layout() {
  const location = useLocation();
  const isDocs = location.pathname.startsWith('/docs');

  return (
    <div className="min-h-screen bg-[#030014] text-vercel-fg font-sans selection:bg-accent-blue/30 selection:text-white relative overflow-hidden flex flex-col">
      {/* Universal Deep Animated Background */}
      <div className="fixed inset-0 z-[-3]">
        <div className="absolute inset-0 bg-[#030014]" />
        {/* Soft top-glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,#1a103c,transparent)]" />
        {/* Modern Dot/Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />
      </div>

      {/* Global Roaming Ambient Light Orbs */}
      <div className="fixed inset-0 overflow-hidden z-[-2] pointer-events-none">
        <motion.div
           animate={{ x: ['-20vw', '100vw'], y: ['-10vh', '20vh'] }}
           transition={{ duration: 25, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
           className="absolute top-[10%] w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] bg-accent-purple/10 blur-[120px] rounded-full mix-blend-screen"
        />
        <motion.div
           animate={{ x: ['100vw', '-20vw'], y: ['50vh', '-10vh'] }}
           transition={{ duration: 30, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
           className="absolute top-[30%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-accent-blue/10 blur-[120px] rounded-full mix-blend-screen"
        />
      </div>

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
