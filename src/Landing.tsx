import { Terminal, Package, ArrowRight, ArrowUpRight, Github, Code2, Sparkles, GitPullRequest, GitBranch, Zap, CheckCircle2, Cpu, Rocket, Server } from 'lucide-react';
import { CliDemo } from './CliDemo';
import { motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';

export function Landing() {
  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="max-w-5xl mx-auto w-full px-6 pt-24 pb-32 relative">
        {/* Header Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          className="flex flex-col items-center text-center space-y-8 mb-20 relative z-10"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-vercel-gray-100 border border-accent-blue/30 text-sm font-medium text-accent-blue shadow-[0_0_15px_rgba(0,112,243,0.15)]"
          >
            <Sparkles size={14} />
            <span>Beta Launch!</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight max-w-4xl">
            Ship code <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-purple to-accent-blue animate-gradient-xy">faster</span> with AI.
          </h1>

          <p className="text-lg md:text-xl text-vercel-gray-400 max-w-2xl font-light">
            AI Ship manages your Git workflow. Stop writing commit messages manually. Seamlessly analyze differences, generate commits, branch out, and push changes on auto-pilot.
          </p>

          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group rounded-lg"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-blue to-accent-purple rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-500 animate-gradient-xy"></div>
              <Link
                to="/docs"
                className="relative h-12 px-6 rounded-lg bg-white text-black font-bold text-lg hover:bg-gray-200 transition-all flex items-center shadow-2xl"
              >
                Get Started
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
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
                <Github size={18} className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
                View GitHub
                <ArrowUpRight size={18} className="ml-2 opacity-70 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
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
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-blue/10 to-transparent blur-3xl -z-10 animate-pulse-glow" />
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
            title="Pre-PR AI Code Review"
            description="Run a thorough signal-based code review locally before creating a PR. Catch bugs before they reach CI pipelines."
          />
          <FeatureCard
            icon={<GitBranch size={24} />}
            title="Context-Aware Commits"
            description="Generate meaningful commit messages that reflect actual intent, filtering out noise like lockfiles."
          />
          <FeatureCard
            icon={<GitPullRequest size={24} />}
            title="GitHub & GitLab Ready"
            description="Automatically detects your remote host and creates the appropriate PR or MR using respective APIs seamlessly."
          />
          <FeatureCard
            icon={<Server size={24} />}
            title="Cloud & Local AI"
            description="Use cloud scale AI (like Google Gemini) or keep diffs completely private offline with local models like Ollama."
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
              title="Pre-PR Code Review"
              description="Run `ai-ship review main` to get an HTML report mapping out critical bugs, warnings and improvements locally."
              delay={0.3}
            />
            <StepCard
              number="03"
              icon={<CheckCircle2 size={28} />}
              title="Commit & Push"
              description="Run `ai-ship commit --new-branch --push --pr --yes` to generate smart commits, branches, and auto-open PRs/MRs."
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
              icon={<Package size={32} />}
              title="NPM Package"
              description="Readily available on NPM. Install globally and spin up zero-configuration AI reviews instantly."
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
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex justify-center relative group w-fit mx-auto"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-blue rounded-full blur opacity-60 group-hover:opacity-100 transition duration-500 animate-gradient-xy"></div>
              <Link
                to="/docs"
                className="relative h-14 px-8 w-fit rounded-full bg-black text-white font-bold text-lg border border-accent-purple/30 group-hover:border-accent-purple/80 transition-all flex items-center mx-auto overflow-hidden shadow-2xl"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-accent-blue/10 via-accent-purple/10 to-accent-blue/10 animate-gradient-xy opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
                </span>
              </Link>
            </motion.div>
          </div>
        </motion.section>
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
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="p-8 rounded-3xl border border-white/5 bg-black/40 hover:bg-[#111] transition-all hover:border-white/10 group relative overflow-hidden backdrop-blur-md hover:shadow-[0_0_40px_-10px_rgba(0,112,243,0.2)]"
    >
      {/* Glossy top highlight line */}
      <div className="absolute top-0 inset-x-0 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Ambient background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-transparent to-accent-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <motion.div
        initial={{ rotate: 0 }}
        whileHover={{ rotate: [-5, 5, -5, 0], scale: 1.1 }}
        transition={{ duration: 0.5 }}
        className="w-12 h-12 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center mb-6 text-white group-hover:text-accent-blue transition-colors relative z-10 shadow-lg group-hover:shadow-[0_0_20px_rgba(0,112,243,0.4)] animate-float"
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-semibold mb-2 relative z-10 text-white group-hover:text-accent-blue transition-colors duration-300">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed relative z-10 group-hover:text-gray-300 transition-colors duration-300">{description}</p>
    </motion.div>
  )
}

function EcosystemCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="flex flex-col items-center text-center p-8 rounded-3xl border border-white/5 bg-black/40 hover:bg-black/80 transition-all hover:border-accent-purple/30 group relative overflow-hidden backdrop-blur-md"
    >
      <div className="absolute top-0 inset-x-0 h-px w-full bg-gradient-to-r from-transparent via-accent-purple/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 bg-gradient-to-b from-accent-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <motion.div
        initial={{ rotate: 0 }}
        whileHover={{ rotate: [-5, 5, -5, 0], scale: 1.1 }}
        transition={{ duration: 0.5 }}
        className="text-gray-400 mb-6 group-hover:text-accent-purple transition-colors drop-shadow-[0_0_15px_rgba(121,40,202,0)] group-hover:drop-shadow-[0_0_20px_rgba(121,40,202,0.6)] relative z-10 animate-float"
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-semibold mb-3 relative z-10 text-white group-hover:text-accent-purple transition-colors duration-300">{title}</h3>
      <p className="text-gray-400 text-sm relative z-10 group-hover:text-gray-300 transition-colors duration-300">{description}</p>
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

// End of component
