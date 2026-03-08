import { Github, Terminal, Puzzle, ArrowRight, Code2, Sparkles, GitPullRequest, GitBranch, Heart, Zap, CheckCircle2, Cpu, Rocket, Server } from 'lucide-react';
import { CliDemo } from './CliDemo';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

function App() {
  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-vercel-bg text-vercel-fg font-sans selection:bg-accent-blue-dim selection:text-white relative overflow-hidden">
      {/* Background ambient light */}
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

      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-vercel-gray-200/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-white font-bold shadow-lg shadow-accent-blue/20">
            <GitPullRequest size={18} />
          </div>
          <span className="text-xl font-bold tracking-tight">AI Ship</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-vercel-gray-500 font-medium hidden sm:inline-block">Command line tool & extension</span>
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

      <main className="max-w-5xl mx-auto px-6 pt-24 pb-32">
        {/* Header Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          className="flex flex-col items-center text-center space-y-8 mb-20 relative"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-vercel-gray-100 border border-accent-blue/30 text-sm font-medium text-accent-blue shadow-[0_0_15px_rgba(0,112,243,0.15)]"
          >
            <Sparkles size={14} />
            <span>Launching Soon</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight max-w-4xl">
            Ship code <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">faster</span> with AI.
          </h1>

          <p className="text-lg md:text-xl text-vercel-gray-400 max-w-2xl font-light">
            AI Ship manages your Git workflow. Stop writing commit messages manually. Seamlessly analyze differences, generate commits, branch out, and push changes on auto-pilot.
          </p>

          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-8">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 40px rgba(255,255,255,0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="h-12 px-6 rounded-lg bg-white text-black font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              Notify Me
              <ArrowRight size={18} className="ml-2" />
            </motion.button>
            <motion.a
              href="https://github.com/developer-diganta/ai-ship"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(51,51,51,0.8)" }}
              whileTap={{ scale: 0.95 }}
              className="h-12 px-6 rounded-lg bg-vercel-gray-100 border border-vercel-gray-200 text-white font-semibold text-lg transition-colors flex items-center overflow-hidden relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center">
                View GitHub
                <Github size={18} className="ml-2" />
              </span>
            </motion.a>
          </div>
        </motion.section>

        {/* CLI Demo Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="mb-32 relative z-10 w-full flex justify-center"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-blue/5 to-transparent blur-3xl -z-10" />
          <CliDemo />
        </motion.section>

        {/* Features Grid */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-32 group"
        >
          <FeatureCard
            icon={<Code2 size={24} />}
            title="Smart Analysis"
            description="Analyzes the differences in your code and dynamically crafts the perfect commit message with context."
          />
          <FeatureCard
            icon={<GitBranch size={24} />}
            title="Auto-Branching"
            description="Smartly creates branches matching your task or issue, enforcing best practices effortlessly."
          />
          <FeatureCard
            icon={<GitPullRequest size={24} />}
            title="Pull Requests"
            description="Generates rich descriptions and makes PRs/MRs on your behalf. Focus on coding, not admin work."
          />
          <FeatureCard
            icon={<Server size={24} />}
            title="Bring Your Own LLM"
            description="Connect to your own self-hosted models or securely use ours. You maintain full control over your data."
          />
        </motion.section>

        {/* How It Works Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mb-32 relative"
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-accent-purple/10 border border-accent-purple/30 text-sm font-medium text-accent-purple shadow-[0_0_15px_rgba(121,40,202,0.15)] mb-6"
            >
              <Zap size={14} />
              <span>Streamlined Workflow</span>
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">How AI Ship works</h2>
            <p className="text-vercel-gray-400 max-w-2xl mx-auto text-lg">Three simple steps to automate your git workflow and regain hours of your week.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative max-w-4xl mx-auto">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-accent-blue/50 via-accent-purple/50 to-accent-blue/50 -z-10" />

            <StepCard
              number="01"
              icon={<Cpu size={28} />}
              title="Write Code"
              description="You focus purely on writing the logic and solving problems. Don't worry about keeping track of the files."
              delay={0.1}
            />
            <StepCard
              number="02"
              icon={<Sparkles size={28} />}
              title="Analyze & Commit"
              description="Run the CLI tool. AI Ship reads your untracked changes, understands the context, and generates perfect commits."
              delay={0.3}
            />
            <StepCard
              number="03"
              icon={<CheckCircle2 size={28} />}
              title="Push & Merge"
              description="AI Ship seamlessly creates a matching branch, pushes the code, and opens a richly detailed Pull Request."
              delay={0.5}
            />
          </div>
        </motion.section>

        {/* Ecosystem */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="border-t border-vercel-gray-200/50 pt-24 pb-12 relative"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[1px] bg-gradient-to-r from-transparent via-accent-purple to-transparent" />
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Available everywhere you work</h2>
            <p className="text-vercel-gray-400">Tailored natively for modern developer setups.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <EcosystemCard
              icon={<Terminal size={32} />}
              title="CLI Tool"
              description="Simply type 'ai-ship' in your terminal and let the magic happen without leaving your workflow."
            />
            <EcosystemCard
              icon={<Puzzle size={32} />}
              title="VS Code Extension"
              description="A seamless graphical experience baked right into your favorite editor."
            />
          </div>
        </motion.section>

        {/* Bottom CTA */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mt-32 max-w-4xl mx-auto relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/10 to-accent-purple/10 blur-xl rounded-3xl -z-10 group-hover:blur-2xl transition-all duration-500" />
          <div className="p-12 md:p-16 rounded-3xl bg-vercel-gray-100/50 border border-vercel-gray-200/50 backdrop-blur-md text-center overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-blue/10 blur-[100px] rounded-full pointer-events-none -z-10 translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent-purple/10 blur-[100px] rounded-full pointer-events-none -z-10 -translate-x-1/2 translate-y-1/2" />

            <Rocket size={48} className="mx-auto mb-6 text-accent-blue drop-shadow-[0_0_15px_rgba(0,112,243,0.5)]" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white leading-tight">
              Ready to automate your workflow?
            </h2>
            <p className="text-vercel-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Join thousands of developers shipping code faster. AI Ship is entirely open source, fast, and secure.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 40px rgba(0,112,243,0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="h-14 px-8 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple text-white font-bold text-lg transition-all flex items-center mx-auto"
            >
              Launching Soon
              <ArrowRight size={20} className="ml-2" />
            </motion.button>
          </div>
        </motion.section>
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
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="p-6 rounded-2xl border border-vercel-gray-200 bg-vercel-gray-100/30 hover:bg-vercel-gray-100 transition-colors hover:border-accent-blue/50 group/card relative overflow-hidden backdrop-blur-sm hover:shadow-[0_10px_40px_-10px_rgba(0,112,243,0.3)]"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent-blue/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
      <motion.div
        initial={{ rotate: 0 }}
        whileHover={{ rotate: [-5, 5, -5, 0], scale: 1.1 }}
        transition={{ duration: 0.5 }}
        className="w-12 h-12 rounded-xl border border-vercel-gray-200 bg-gradient-to-br from-vercel-gray-100 to-[#000] flex items-center justify-center mb-6 text-white group-hover/card:text-accent-blue transition-colors relative z-10 shadow-lg group-hover/card:shadow-[0_0_15px_rgba(0,112,243,0.5)]"
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-semibold mb-2 relative z-10">{title}</h3>
      <p className="text-vercel-gray-400 text-sm leading-relaxed relative z-10">{description}</p>
    </motion.div>
  )
}

function EcosystemCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="flex flex-col items-center text-center p-8 rounded-2xl bg-gradient-to-b from-vercel-gray-100/40 to-transparent border border-vercel-gray-200/50 hover:border-accent-purple/50 transition-colors group hover:shadow-[0_10px_40px_-10px_rgba(121,40,202,0.3)] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <motion.div
        initial={{ rotate: 0 }}
        whileHover={{ rotate: [-5, 5, -5, 0], scale: 1.1 }}
        transition={{ duration: 0.5 }}
        className="text-vercel-gray-300 mb-6 group-hover:text-accent-purple transition-colors drop-shadow-[0_0_15px_rgba(121,40,202,0)] group-hover:drop-shadow-[0_0_15px_rgba(121,40,202,0.5)] relative z-10"
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-semibold mb-3 relative z-10">{title}</h3>
      <p className="text-vercel-gray-400 text-sm relative z-10">{description}</p>
    </motion.div>
  )
}

function StepCard({ number, icon, title, description, delay }: { number: string, icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: delay, type: "spring" }}
      viewport={{ once: true, margin: "-50px" }}
      className="flex flex-col items-center text-center relative z-10 group"
    >
      <div className="w-24 h-24 rounded-full bg-vercel-gray-100/80 border border-accent-blue/20 flex items-center justify-center mb-6 relative backdrop-blur-sm group-hover:border-accent-blue/50 transition-all group-hover:shadow-[0_0_30px_rgba(0,112,243,0.3)] group-hover:scale-110">
        <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-vercel-bg border border-vercel-gray-200 flex items-center justify-center text-xs font-bold text-accent-blue transform translate-x-1/4 -translate-y-1/4 shadow-lg">
          {number}
        </div>
        <div className="text-white group-hover:text-accent-purple transition-colors">
          {icon}
        </div>
      </div>
      <h3 className="text-2xl font-semibold mb-3">{title}</h3>
      <p className="text-vercel-gray-400 leading-relaxed max-w-sm">{description}</p>
    </motion.div>
  )
}

export default App
