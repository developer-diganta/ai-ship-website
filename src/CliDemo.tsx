import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const commands = [
    { text: '$ npx ai-ship default', delay: 1000 },
    { text: 'Analyzing context...', delay: 2000, type: 'info' },
    { text: 'Reading 14 modified files...', delay: 3000, type: 'info' },
    { text: 'Generating commit message via LLM...', delay: 4500, type: 'info' },
    { text: 'Generated: "feat(core): implement robust async caching mechanism"', delay: 6000, type: 'success' },
    { text: 'Creating branch "feat-async-caching"...', delay: 7000, type: 'info' },
    { text: 'Pushing branch to origin...', delay: 8500, type: 'info' },
    { text: '✓ Branch pushed successfully.', delay: 9500, type: 'success' },
    { text: 'Creating Pull Request...', delay: 10500, type: 'info' },
    { text: '✓ PR #42 Created: https://github.com/developer-diganta/ai-code-committer/pull/42', delay: 11500, type: 'success' }
];

export function CliDemo() {
    const [visibleLines, setVisibleLines] = useState<number>(0);

    useEffect(() => {
        let timeouts: number[] = [];

        // Auto-play the sequence
        const runSequence = () => {
            setVisibleLines(0);
            timeouts = commands.map((cmd, index) => {
                return window.setTimeout(() => {
                    setVisibleLines(index + 1);
                }, cmd.delay);
            });

            // Loop
            timeouts.push(window.setTimeout(runSequence, commands[commands.length - 1].delay + 5000));
        };

        runSequence();

        return () => timeouts.forEach(clearTimeout);
    }, []);

    return (
        <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.02, boxShadow: "0px 20px 40px rgba(0,0,0,0.5)" }}
            className="w-full max-w-2xl mx-auto rounded-xl overflow-hidden border border-vercel-gray-200 bg-[#0a0a0a] shadow-[0_0_50px_rgba(0,0,0,0.2)] hover:border-vercel-gray-400/50 transition-colors"
        >
            {/* Mac-like header bar */}
            <div className="flex items-center px-4 py-3 border-b border-vercel-gray-200 bg-[#111]">
                <div className="flex space-x-2">
                    <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-red-500"></motion.div>
                    <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-yellow-500"></motion.div>
                    <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-green-500"></motion.div>
                </div>
                <div className="mx-auto text-xs font-mono text-vercel-gray-500">zsh - ai-ship</div>
            </div>

            <div className="p-4 font-mono text-sm sm:text-base h-[320px] overflow-y-auto">
                <AnimatePresence>
                    {commands.slice(0, visibleLines).map((cmd, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`mb-2 font-mono ${cmd.type === 'success'
                                ? 'text-green-400'
                                : cmd.type === 'info'
                                    ? 'text-vercel-gray-500'
                                    : 'text-vercel-fg'
                                }`}
                        >
                            {cmd.type !== 'info' && cmd.type !== 'success' ? '' : ''}
                            <span className={cmd.type === 'success' ? 'text-green-400' : ''}>
                                {cmd.text}
                            </span>
                        </motion.div>
                    ))}
                    {visibleLines < commands.length && visibleLines > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="w-2 h-4 bg-vercel-fg mt-2 inline-block ml-1"
                        />
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
