import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const commands = [
    { text: '~/project $ ai-ship commit --new-branch', delay: 1000, type: 'input' },
    { text: '🚀 AI-SHIP Commit Generator', delay: 1500, type: 'title' },
    { text: '===================================', delay: 1600, type: 'title' },
    { text: '✔ Staged all changes.', delay: 2500, type: 'success' },
    { text: '🚀 AI-SHIP Commit Generator', delay: 3000, type: 'title' },
    { text: '===================================', delay: 3100, type: 'title' },
    { text: '✔ Found 3 staged file(s).', delay: 3500, type: 'success' },
    { text: 'Files changed:', delay: 4000, type: 'info' },
    { text: '+ E:\\personal projects\\ai-ship\\src\\commands\\git\\startCommit.ts', delay: 4200, type: 'added' },
    { text: '+ E:\\personal projects\\ai-ship\\src\\commands\\git\\startPR.ts', delay: 4400, type: 'added' },
    { text: '+ E:\\personal projects\\ai-ship\\src\\commands\\git\\startPush.ts', delay: 4600, type: 'added' },
    { text: '✔ Analysis complete.', delay: 6000, type: 'success' },
    { text: '✔ Commit message generated:', delay: 6500, type: 'success' },
    { text: '  feat(cli): Enhance git command feedback with spinners and PR link', delay: 7000, type: 'message' },
    { text: '? What would you like to do with this commit message? Continue', delay: 8500, type: 'prompt' },
    { text: '✔ Changes successfully committed!', delay: 9500, type: 'success' },
    { text: '✔ Analysis complete.', delay: 10500, type: 'success' },
    { text: '✔ Branch name generated:', delay: 11000, type: 'success' },
    { text: '  feature/addclispinnersprlink', delay: 11500, type: 'message' },
    { text: '? What would you like to do with this branch name? Continue', delay: 13000, type: 'prompt' },
    { text: '✔ Checked out to feature/addclispinnersprlink!', delay: 14000, type: 'success' },
    { text: '? Do you want to push your committed changes to the remote repository? Yes', delay: 15500, type: 'prompt' },
    { text: '✔ Changes pushed to remote repository.', delay: 17000, type: 'success' },
    { text: '? Do you want to create a pull request? Yes', delay: 18500, type: 'prompt' },
    { text: '? Which branch do you want to target? main', delay: 20000, type: 'prompt' },
    { text: '✔ PR content generated.', delay: 22000, type: 'success' },
    { text: '✔ PR created successfully!', delay: 23000, type: 'success' },
    { text: '🔗 PR Link: https://github.com/developer-diganta/ai-ship/pull/4', delay: 24000, type: 'link' }
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

    const getColorClass = (type?: string) => {
        switch (type) {
            case 'success': return 'text-green-400';
            case 'info': return 'text-vercel-gray-400';
            case 'input': return 'text-white font-semibold';
            case 'title': return 'text-accent-blue font-bold';
            case 'added': return 'text-green-300';
            case 'message': return 'text-accent-purple font-semibold';
            case 'prompt': return 'text-yellow-400';
            case 'link': return 'text-blue-400 underline';
            default: return 'text-vercel-fg';
        }
    };

    return (
        <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.02, boxShadow: "0px 20px 40px rgba(0,0,0,0.5)" }}
            className="w-full max-w-3xl mx-auto rounded-xl overflow-hidden border border-vercel-gray-200 bg-[#0a0a0a] shadow-[0_0_50px_rgba(0,0,0,0.2)] hover:border-vercel-gray-400/50 transition-colors"
        >
            {/* Mac-like header bar */}
            <div className="flex items-center px-4 py-3 border-b border-vercel-gray-200 bg-[#111]">
                <div className="flex space-x-2">
                    <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-red-500"></motion.div>
                    <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-yellow-500"></motion.div>
                    <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-green-500"></motion.div>
                </div>
                <div className="mx-auto text-xs font-mono text-vercel-gray-500">bash - ai-ship</div>
            </div>

            <div className="p-4 font-mono text-sm sm:text-base h-[400px] overflow-y-auto custom-scrollbar flex flex-col items-start text-left">
                <AnimatePresence>
                    {commands.slice(0, visibleLines).map((cmd, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`mb-2 font-mono whitespace-pre-wrap text-left w-full ${getColorClass(cmd.type)}`}
                        >
                            {cmd.text}
                        </motion.div>
                    ))}
                    {visibleLines < commands.length && visibleLines > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="w-2 h-4 bg-vercel-fg mt-2 inline-block"
                        />
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
