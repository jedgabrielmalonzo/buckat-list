import { motion } from 'motion/react';
import { Award, Target, CheckCircle2 } from 'lucide-react';
import { QuestItem } from '../types';

interface QuestStatsProps {
  quests: QuestItem[];
}

export default function QuestStats({ quests }: QuestStatsProps) {
  const total = quests.length;
  const completed = quests.filter(q => q.isCompleted).length;
  
  const totalXp = quests.reduce((sum, q) => {
    return q.isCompleted ? sum + q.xp : sum;
  }, 0);

  // Level formula: Level 1 starts at 0 XP. Every 100 XP is a level.
  const level = Math.floor(totalXp / 100) + 1;
  const xpInCurrentLevel = totalXp % 100;
  const nextLevelXp = 100;
  const progressToNextLevel = (xpInCurrentLevel / nextLevelXp) * 100;

  return (
    <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-2xl p-4 sm:p-5 shadow-sm mb-6" id="stats-dashboard">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Left: Level & Progress */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="font-display text-base font-bold text-slate-950 dark:text-zinc-100">Lv.{level}</span>
              <span className="text-[11px] font-mono text-slate-400 dark:text-zinc-500">•</span>
              <span className="text-[11px] font-mono text-slate-400 dark:text-zinc-500 uppercase tracking-wider font-semibold">Adventurer</span>
            </div>
            <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400">{xpInCurrentLevel} / {nextLevelXp} XP</span>
          </div>
          
          {/* Level Progress Bar */}
          <div className="w-full bg-slate-100 dark:bg-zinc-950 rounded-full h-1.5 overflow-hidden border border-slate-200/20 dark:border-zinc-800/20">
            <motion.div 
              className="bg-blue-600 dark:bg-blue-500 h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressToNextLevel}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Right: Counters */}
        <div className="flex items-center gap-6 sm:pl-6 sm:border-l border-slate-100 dark:border-zinc-800/60 flex-shrink-0">
          
          <div className="text-left">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-zinc-500 font-semibold mb-0.5 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              <span>Completed</span>
            </div>
            <p className="font-display text-lg font-bold text-slate-900 dark:text-zinc-100 leading-none">
              {completed} <span className="text-xs text-slate-400 dark:text-zinc-500 font-normal">/ {total}</span>
            </p>
          </div>

          <div className="text-left">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-zinc-500 font-semibold mb-0.5 flex items-center gap-1">
              <Target className="w-3 h-3 text-blue-500" />
              <span>Total XP</span>
            </div>
            <p className="font-display text-lg font-bold text-blue-600 dark:text-blue-400 leading-none">
              {totalXp} <span className="text-xs text-slate-400 dark:text-zinc-500 font-normal">XP</span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
