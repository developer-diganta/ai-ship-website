import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Copy, Terminal, Search } from 'lucide-react';

function CodeBlock({ code, language = 'bash' }: { code: string, language?: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-xl overflow-hidden border border-vercel-gray-200/50 bg-[#111] my-5">
      <div className="flex justify-between items-center px-4 py-2 bg-[#0a0a0a] border-b border-vercel-gray-200/30">
        <span className="text-xs font-mono text-gray-500">{language}</span>
        <button 
          onClick={copyToClipboard}
          className="text-gray-400 hover:text-white transition-colors"
          title="Copy code"
        >
          {copied ? <CheckCircle2 size={16} className="text-green-500" /> : <Copy size={16} />}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto font-mono text-sm text-[#e5e5e5]">
        <code>{code}</code>
      </pre>
    </div>
  );
}

const TABS = [
  { id: 'introduction', label: 'Introduction', group: 'Getting Started' },
  { id: 'installation', label: 'Installation', group: 'Getting Started' },
  { id: 'config', label: 'Configuration', group: 'Getting Started' },
  { id: 'commit', label: 'ai-ship commit', group: 'Core Commands' },
  { id: 'config-cmd', label: 'ai-ship config', group: 'Core Commands' },
  { id: 'workflows', label: 'Workflows', group: 'Advanced' },
];

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState('introduction');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (searchQuery) return; // Disable scroll spy while searching to prevent glitching
      const sections = TABS.map(tab => document.getElementById(tab.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveTab(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [searchQuery]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const filteredTabs = TABS.filter(t => t.label.toLowerCase().includes(searchQuery.toLowerCase()));

  // Hide sections on main page that do not match search (basic search filtering)
  const isMatch = (id: string) => filteredTabs.some(t => t.id === id);

  return (
    <div className="max-w-7xl mx-auto w-full px-6 flex flex-col md:flex-row relative">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 shrink-0 md:sticky md:top-[80px] h-auto md:h-[calc(100vh-80px)] overflow-y-auto py-8 pr-6 border-r border-[#333] custom-scrollbar hidden md:block">
        <div className="flex items-center space-x-2 text-accent-blue font-semibold mb-6">
          <Terminal size={18} />
          <span>Documentation</span>
        </div>

        <div className="mb-6 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search docs..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#111] border border-[#333] rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-accent-blue/50 transition-colors"
          />
        </div>

        <nav className="flex flex-col space-y-1 text-sm">
          {['Getting Started', 'Core Commands', 'Advanced'].map(group => {
            const groupTabs = filteredTabs.filter(t => t.group === group);
            if (groupTabs.length === 0) return null;
            return (
              <div key={group} className="mb-4">
                <div className="font-semibold text-white/90 mt-2 mb-2">{group}</div>
                {groupTabs.map(tab => (
                  <button 
                    key={tab.id}
                    onClick={() => scrollTo(tab.id)} 
                    className={`block w-full text-left px-3 py-1.5 rounded-lg transition-colors ${
                      activeTab === tab.id && !searchQuery
                        ? 'bg-accent-blue/10 text-accent-blue font-medium' 
                        : 'text-gray-400 hover:text-white hover:bg-[#222]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            );
          })}
          {filteredTabs.length === 0 && (
            <div className="text-gray-500 text-sm mt-4">No matching docs found.</div>
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 py-8 md:pl-10 lg:pl-16 text-[#e0e0e0]">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          
          {(searchQuery === '' || isMatch('introduction')) && (
            <section id="introduction" className="mb-16 scroll-mt-24">
              <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">AI Ship Documentation</h1>
              <p className="text-xl text-white/90 font-light mb-6">
                Your ultimate AI-powered terminal assistant for seamless Git workflows.
              </p>
              <p className="text-[#cccccc] leading-relaxed max-w-3xl">
                AI-Ship dynamically analyzes your code diffs to automatically write robust and contextual commit messages, generate meaningful branch names, push your changes, and spin up intelligent GitHub Pull Requests—all without ever leaving your terminal.
              </p>
            </section>
          )}

          {(searchQuery === '' || isMatch('installation')) && (
            <section id="installation" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-semibold mb-6 py-2 border-b border-[#333] text-white">Installation</h2>
              <p className="text-[#cccccc] mb-4">
                Before deploying AI-Ship, ensure your machine meets the following structural requirements:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[#cccccc] mb-6 marker:text-[#888]">
                <li><strong>Node.js</strong> (v18 or higher recommended)</li>
                <li><strong>Git</strong> installed and initialized in your working repository.</li>
                <li><strong>GitHub CLI (gh)</strong> installed and authenticated (required exclusively if you use `--pr` flows).</li>
                <li><strong>An API Access key</strong> for Google Gemini, OR a local instance of <strong>Ollama</strong> running locally.</li>
              </ul>
              <p className="text-[#cccccc] mb-2">To install the CLI tool globally, run:</p>
              <CodeBlock code="npm install -g ai-ship-cli" />
            </section>
          )}

          {(searchQuery === '' || isMatch('config')) && (
            <section id="config" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-semibold mb-6 py-2 border-b border-[#333] text-white">Initial Configuration</h2>
              <p className="text-[#cccccc] mb-4">
                AI Ship requires an LLM provider to function. You can use Cloud AI (Google Gemini) or run it entirely privately via Local AI (Ollama).
              </p>
              <h3 className="text-lg font-medium text-white mb-2">Setup Cloud AI (Gemini)</h3>
              <p className="text-[#cccccc] text-sm mb-2">Configure your API key. It will securely prompt for your API key and store it locally.</p>
              <CodeBlock code="ai-ship config --add-key" />

              <h3 className="text-lg font-medium text-white mt-8 mb-2">Setup Local AI (Ollama)</h3>
              <p className="text-[#cccccc] text-sm mb-2">Prefer running locally without making network calls? Ensure Ollama is running, then switch providers:</p>
              <CodeBlock code="ai-ship config set provider local" />
            </section>
          )}

          {(searchQuery === '' || isMatch('commit')) && (
            <section id="commit" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-semibold mb-6 py-2 border-b border-[#333] text-white">Command: `commit`</h2>
              <p className="text-[#cccccc] mb-4 leading-relaxed">
                At its core, <code className="bg-[#222] px-1.5 py-0.5 rounded text-sm text-[#eee] font-mono">ai-ship commit</code> hooks into your uncommitted, staged files.
                If you run it without staging, AI-Ship will automatically run <code className="bg-[#222] px-1.5 py-0.5 rounded text-sm font-mono text-[#eee]">git add -A</code> for you!
              </p>
              <h3 className="text-lg font-medium text-white mt-6 mb-2">Basic Commit</h3>
              <CodeBlock code="ai-ship commit" />

              <h3 className="text-lg font-medium text-white mt-6 mb-2">Selective Staging</h3>
              <p className="text-[#cccccc] text-sm mb-2">Pass specific files to be explicitly staged and committed:</p>
              <CodeBlock code="ai-ship commit src/index.ts src/utils/helper.ts" />

              <h3 className="text-xl font-medium text-white mt-8 mb-4">Commit Flags</h3>
              <div className="overflow-x-auto rounded-xl border border-[#333] bg-[#0a0a0a] mt-4 backdrop-blur-sm">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-[#333] bg-black/50">
                      <th className="p-4 font-semibold text-white whitespace-nowrap">Flag</th>
                      <th className="p-4 font-semibold text-white">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#333] text-[#cccccc] text-sm">
                    <tr>
                      <td className="p-4 font-mono text-accent-blue whitespace-nowrap">--new-branch</td>
                      <td className="p-4 leading-relaxed">Analyzes commit context, drafts a semantic branch name, & securely checks it out.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-mono text-accent-blue whitespace-nowrap">--push</td>
                      <td className="p-4 leading-relaxed">Triggers a <code className="bg-[#222] px-1 py-0.5 rounded text-[#eee] border border-[#444]">git push</code>. If there isn't an upstream anchor configured, securely configures tracking mappings for you.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-mono text-accent-blue whitespace-nowrap">--pr</td>
                      <td className="p-4 leading-relaxed">Utilizes the GitHub CLI to publish an intelligent PR onto default target branches. Prompts interactions manually if omitted.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-mono text-accent-blue whitespace-nowrap">--target-branch &lt;branch&gt;</td>
                      <td className="p-4 leading-relaxed">Manually overrides the base branch point targeting your <code className="bg-[#222] px-1 py-0.5 rounded text-[#eee] border border-[#444]">--pr</code>.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-mono text-accent-blue whitespace-nowrap">--yes</td>
                      <td className="p-4 leading-relaxed">Headless execution. Skips interactive "Edit/Continue/Cancel" refinements and accepts the AI's first guess automatically.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-mono text-accent-blue whitespace-nowrap">--dry-run</td>
                      <td className="p-4 leading-relaxed">Reads files, interfaces with the AI layer, and outputs responses without actually performing Git mutations. Great for observing syntax.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-mono text-accent-blue whitespace-nowrap">--model &lt;provider&gt;</td>
                      <td className="p-4 leading-relaxed">Inline injection overriding the globally chosen logic model (e.g <code className="bg-[#222] px-1 py-0.5 rounded text-[#eee] border border-[#444]">--model local</code>).</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {(searchQuery === '' || isMatch('config-cmd')) && (
            <section id="config-cmd" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-semibold mb-6 py-2 border-b border-[#333] text-white">Command: `config`</h2>
              <p className="text-[#cccccc] mb-4 leading-relaxed">
                Control how AI-Ship operates directly from the CLI via the <code className="bg-[#222] px-1.5 py-0.5 rounded text-sm text-[#eee] font-mono">config</code> command.
              </p>
              <div className="space-y-4">
                <div className="bg-[#111] border border-[#333] p-4 rounded-xl">
                  <div className="font-mono text-accent-blue mb-1">ai-ship config --add-key</div>
                  <div className="text-sm text-[#cccccc]">Securely set your Google Gemini API key.</div>
                </div>
                <div className="bg-[#111] border border-[#333] p-4 rounded-xl">
                  <div className="font-mono text-accent-blue mb-1">ai-ship config --delete-key</div>
                  <div className="text-sm text-[#cccccc]">Remove your stored API key.</div>
                </div>
                <div className="bg-[#111] border border-[#333] p-4 rounded-xl">
                  <div className="font-mono text-accent-blue mb-1">ai-ship config set provider &lt;local|cloud&gt;</div>
                  <div className="text-sm text-[#cccccc]">Switch between execution environments.</div>
                </div>
                <div className="bg-[#111] border border-[#333] p-4 rounded-xl">
                  <div className="font-mono text-accent-blue mb-1">ai-ship config show --verbose</div>
                  <div className="text-sm text-[#cccccc]">Print the current configuration state to the terminal.</div>
                </div>
              </div>
            </section>
          )}

          {(searchQuery === '' || isMatch('workflows')) && (
            <section id="workflows" className="mb-32 scroll-mt-24">
              <h2 className="text-2xl font-semibold mb-6 py-2 border-b border-[#333] text-white">Workflows & Pipelines</h2>
              
              <h3 className="text-xl font-medium text-white mb-3">🔥 The Ultimate CLI Combo</h3>
              <p className="text-[#cccccc] mb-4 leading-relaxed">
                AI-Ship can condense 5 basic Git commands down into <strong>one single instruction</strong>. Run this to execute your entire workflow at once:
              </p>
              <CodeBlock code="ai-ship commit --new-branch --push --pr --yes" />
              
              <div className="bg-[#111] border border-[#333] rounded-xl p-6 mt-6 shadow-inner">
                <h4 className="font-semibold text-white mb-3 text-lg">What this single command achieves:</h4>
                <ol className="list-decimal pl-5 space-y-2 text-[#cccccc] text-sm marker:text-accent-blue">
                  <li>Auto-stages all tracked changes.</li>
                  <li>Reads the unified diff and generates a beautifully descriptive Commit Message.</li>
                  <li>Examines context to automatically make a new branch (e.g., <code className="bg-[#222] px-1 py-0.5 rounded text-[#eee] border border-[#444]">feature/add-payment-gate</code>).</li>
                  <li>Directly pushes the new upstream branch to origin.</li>
                  <li>Invokes the <code className="bg-[#222] px-1 py-0.5 rounded text-[#eee] border border-[#444]">gh</code> CLI to summarize the commit history into a PR Description.</li>
                  <li>Auto-publishes the PR on GitHub without asking for manual confirmation (<code className="bg-[#222] px-1 py-0.5 rounded text-[#eee] border border-[#444]">--yes</code>).</li>
                </ol>
              </div>
            </section>
          )}

        </motion.div>
      </main>
    </div>
  );
}
