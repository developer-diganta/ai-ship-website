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
  { id: 'review', label: 'ai-ship review', group: 'Core Commands' },
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
                Review your code before your PR. Ship with confidence.
              </p>
              <p className="text-[#cccccc] leading-relaxed max-w-3xl mb-4">
                AI-Ship is a <strong>Git Intelligence CLI</strong> that helps you:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[#cccccc] mb-6 marker:text-[#888]">
                <li>Generate smart commits that reflect the actual intent of your changes.</li>
                <li>Create automated PRs / MRs on GitHub & GitLab.</li>
                <li>Review your code locally using AI, before your code ever leaves your machine.</li>
                <li>Enforce consistent, semantic branch naming.</li>
              </ul>
              <p className="text-[#cccccc] leading-relaxed max-w-3xl">
                Let AI-Ship handle all the git workflows and pre-checks while you focus entirely on what goes into the code!
              </p>
            </section>
          )}

          {(searchQuery === '' || isMatch('installation')) && (
            <section id="installation" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-semibold mb-6 py-2 border-b border-[#333] text-white">Installation</h2>
              <p className="text-[#cccccc] mb-4">
                You can install AI-Ship from source. Ensure your machine has Node.js (v18+) and Git installed.
              </p>
              <CodeBlock code={`git clone https://github.com/developer-diganta/ai-ship.git\ncd ai-ship\nnpm install\nnpm run build\nnpm link`} />
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

              <h3 className="text-lg font-medium text-white mt-8 mb-2">Setup GitLab Support</h3>
              <p className="text-[#cccccc] text-sm mb-2">If you use GitLab, you can configure your token for MR creation.</p>
              <CodeBlock code="ai-ship config set gitlab.token <your-token>" />
            </section>
          )}

          {(searchQuery === '' || isMatch('commit')) && (
            <section id="commit" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-semibold mb-6 py-2 border-b border-[#333] text-white">Command: `commit`</h2>
              <p className="text-[#cccccc] mb-4 leading-relaxed">
                The <code className="bg-[#222] px-1.5 py-0.5 rounded text-sm text-[#eee] font-mono">commit</code> command analyzes your staged changes (or automatically stages them if needed) and generates a semantic commit message.
                It filters out noise files to provide accurate summaries.
              </p>
              <h3 className="text-lg font-medium text-white mt-6 mb-2">Basic Interactive Commit</h3>
              <CodeBlock code="ai-ship commit" />

              <h3 className="text-lg font-medium text-white mt-6 mb-2">Selective Staging</h3>
              <p className="text-[#cccccc] text-sm mb-2">Pass specific files to specify what to analyze and commit:</p>
              <CodeBlock code="ai-ship commit src/index.ts src/utils/helper.ts" />

              <h3 className="text-lg font-medium text-white mt-6 mb-2">Bypass Confirmation</h3>
              <p className="text-[#cccccc] text-sm mb-2">Auto-approve the generated commit message without interactive prompts:</p>
              <CodeBlock code="ai-ship commit --yes" />

              <h3 className="text-lg font-medium text-white mt-6 mb-2">Preview Without Altering State</h3>
              <p className="text-[#cccccc] text-sm mb-2">Display generated commit safely:</p>
              <CodeBlock code="ai-ship commit --dry-run" />

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
                      <td className="p-4 leading-relaxed">Generates a semantic branch name based on your changes and checks it out.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-mono text-accent-blue whitespace-nowrap">--push</td>
                      <td className="p-4 leading-relaxed">Pushes the commits to your remote repository automatically.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-mono text-accent-blue whitespace-nowrap">--pr</td>
                      <td className="p-4 leading-relaxed">Automatically creates a Pull/Merge Request to the remote repository. Supports GitHub & GitLab.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-mono text-accent-blue whitespace-nowrap">--target-branch &lt;branch&gt;</td>
                      <td className="p-4 leading-relaxed">Defines the target branch for the Pull/Merge Request (defaults to main).</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-mono text-accent-blue whitespace-nowrap">--yes</td>
                      <td className="p-4 leading-relaxed">Automatically accepts the generated commit message and skips all prompts.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-mono text-accent-blue whitespace-nowrap">--dry-run</td>
                      <td className="p-4 leading-relaxed">Only outputs the generated commit message without running Git commits.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {(searchQuery === '' || isMatch('review')) && (
            <section id="review" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-semibold mb-6 py-2 border-b border-[#333] text-white">Command: `review`</h2>
              <p className="text-[#cccccc] mb-4 leading-relaxed">
                Generate a comprehensive pre-PR code review using AI to catch bugs before they are ever pushed to a remote CI pipeline. 
              </p>
              <h3 className="text-lg font-medium text-white mt-6 mb-2">Review against main branch</h3>
              <CodeBlock code="ai-ship review main" />
              <h3 className="text-lg font-medium text-white mt-6 mb-2">Review against any branch</h3>
              <CodeBlock code="ai-ship review develop" />
              <div className="bg-[#111] border border-accent-blue/30 p-4 rounded-xl mt-6">
                <p className="text-sm text-accent-blue">
                  👉 <strong>Output:</strong> Generates an <code>ai-ship-review.html</code> file highlighting <span className="text-red-400">🔴 Critical issues</span>, <span className="text-yellow-400">🟡 Warnings</span>, and <span className="text-green-400">🟢 Improvements</span>.
                </p>
              </div>
            </section>
          )}

          {(searchQuery === '' || isMatch('config-cmd')) && (
            <section id="config-cmd" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-semibold mb-6 py-2 border-b border-[#333] text-white">Command: `config`</h2>
              <p className="text-[#cccccc] mb-4 leading-relaxed">
                Manage your AI providers, API keys, and environment settings.
              </p>
              <div className="space-y-4">
                <div className="bg-[#111] border border-[#333] p-4 rounded-xl">
                  <div className="font-mono text-accent-blue mb-1">ai-ship config --add-key</div>
                  <div className="text-sm text-[#cccccc]">Securely prompt and add your Gemini API Key.</div>
                </div>
                <div className="bg-[#111] border border-[#333] p-4 rounded-xl">
                  <div className="font-mono text-accent-blue mb-1">ai-ship config set provider local</div>
                  <div className="text-sm text-[#cccccc]">Set global provider (e.g., local for Ollama, gemini for Google GenAI).</div>
                </div>
                <div className="bg-[#111] border border-[#333] p-4 rounded-xl">
                  <div className="font-mono text-accent-blue mb-1">ai-ship config set gitlab.token &lt;your-token&gt;</div>
                  <div className="text-sm text-[#cccccc]">Manage GitLab remote configurations for Merge Requests.</div>
                </div>
                <div className="bg-[#111] border border-[#333] p-4 rounded-xl">
                  <div className="font-mono text-accent-blue mb-1">ai-ship config show</div>
                  <div className="text-sm text-[#cccccc]">Display your current active configuration block.</div>
                </div>
                <div className="bg-[#111] border border-[#333] p-4 rounded-xl">
                  <div className="font-mono text-accent-blue mb-1">ai-ship config show --verbose</div>
                  <div className="text-sm text-[#cccccc]">Display configuration in verbose / JSON format.</div>
                </div>
              </div>
            </section>
          )}

          {(searchQuery === '' || isMatch('workflows')) && (
            <section id="workflows" className="mb-32 scroll-mt-24">
              <h2 className="text-2xl font-semibold mb-6 py-2 border-b border-[#333] text-white">Workflows & Pipelines</h2>
              
              <h3 className="text-xl font-medium text-white mb-3">🔥 The Ultimate CLI Combo</h3>
              <p className="text-[#cccccc] mb-4 leading-relaxed">
                Commit changes, create an AI-generated branch, push, and create a PR in <strong>one single instruction</strong>:
              </p>
              <CodeBlock code="ai-ship commit --new-branch --push --pr --yes" />
              
              <h3 className="text-xl font-medium text-white mb-3 mt-8">🎯 Target Specific Branches</h3>
              <p className="text-[#cccccc] mb-4 leading-relaxed">
                Commit and create a PR against a specific target branch (e.g., develop):
              </p>
              <CodeBlock code="ai-ship commit --pr --target-branch develop" />
            </section>
          )}

        </motion.div>
      </main>
    </div>
  );
}
