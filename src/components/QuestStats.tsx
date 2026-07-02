import { motion } from 'motion/react';
import { CheckCircle2, ListTodo, Percent } from 'lucide-react';
import { BucketItem } from '../types';

interface QuestStatsProps {
  quests: BucketItem[];
}

export default function QuestStats({ quests }: QuestStatsProps) {
  const total = quests.length;
  const completed = quests.filter(q => q.isCompleted).length;
  const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-2xl p-4 sm:p-5 shadow-sm mb-6" id="stats-dashboard">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

        {/* Left: Progress Meter */}
        <div className="flex-grow min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500 font-mono">My Progress</span>
              <span className="text-[11px] font-mono text-slate-300 dark:text-zinc-700">•</span>
              <span className="text-xs font-sans font-medium text-slate-600 dark:text-zinc-400">Achieving life goals</span>
            </div>
            <span className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400">{progressPercent}%</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 dark:bg-zinc-950 rounded-full h-1.5 overflow-hidden border border-slate-200/20 dark:border-zinc-800/20">
            <motion.div
              className="bg-blue-600 dark:bg-blue-500 h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Right: Quick Numbers */}
        <div className="flex items-center gap-6 sm:pl-6 sm:border-l border-slate-100 dark:border-zinc-800/60 flex-shrink-0">

          <div className="text-left">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-zinc-500 font-semibold mb-0.5 flex items-center gap-1">
              <ListTodo className="w-3 h-3 text-blue-500" />
              <span>Total Items</span>
            </div>
            <p className="font-display text-lg font-bold text-slate-900 dark:text-zinc-100 leading-none">
              {total}
            </p>
          </div>

          <div className="text-left">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-zinc-500 font-semibold mb-0.5 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              <span>Completed</span>
            </div>
            <p className="font-display text-lg font-bold text-slate-900 dark:text-zinc-100 leading-none">
              {completed} <span className="text-xs text-slate-400 dark:text-zinc-500 font-normal">/ {total}</span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
