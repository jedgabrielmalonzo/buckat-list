import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trash2, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Swords, 
  Compass,
  AlertCircle
} from 'lucide-react';
import { QuestItem } from '../types';
import { DIFFICULTY_CONFIGS, CATEGORIES } from '../constants';
import CategoryIcon from './CategoryIcon';

interface QuestCardProps {
  key?: string;
  quest: QuestItem;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function QuestCard({ quest, onToggleComplete, onDelete }: QuestCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const difficulty = DIFFICULTY_CONFIGS[quest.difficulty];
  const category = CATEGORIES.find(c => c.value === quest.category);

  // Formatting date nicely
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={`group relative bg-white dark:bg-zinc-900/80 border rounded-2xl transition-all duration-300 overflow-hidden ${
        quest.isCompleted 
          ? 'border-slate-100 dark:border-zinc-900/60 shadow-none' 
          : 'border-slate-200/80 dark:border-zinc-800/80 hover:border-blue-500/30 dark:hover:border-blue-500/30 shadow-sm hover:shadow-md'
      }`}
      id={`quest-card-${quest.id}`}
    >
      <div className="p-4 sm:p-5 flex items-start gap-4">
        {/* Satisfying custom checkbox */}
        <button
          onClick={() => onToggleComplete(quest.id)}
          className={`flex-shrink-0 mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 cursor-pointer ${
            quest.isCompleted
              ? 'bg-blue-500 border-blue-500 text-white shadow-sm shadow-blue-500/20'
              : 'border-slate-300 dark:border-zinc-700 hover:border-blue-500 dark:hover:border-blue-500/80 bg-transparent'
          }`}
          aria-label={quest.isCompleted ? "Mark as incomplete" : "Mark as completed"}
          id={`toggle-${quest.id}`}
        >
          <AnimatePresence>
            {quest.isCompleted && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Check className="w-4 h-4 stroke-[3]" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {/* Core Quest Content */}
        <div className="flex-grow min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {/* Quest Type Badge */}
            <span className="inline-flex items-center gap-1 text-[10px] uppercase font-mono tracking-wider font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/10">
              <Swords className="w-2.5 h-2.5" />
              <span>Sidequest</span>
            </span>

            {/* Difficulty Badge */}
            <span className={`inline-flex items-center text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border ${difficulty.bgColor} ${difficulty.textColor} ${difficulty.borderColor}`}>
              {difficulty.label} ({quest.xp} XP)
            </span>

            {/* Category Badge */}
            {category && (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-500 dark:text-zinc-400">
                <CategoryIcon name={category.icon} className="w-3 h-3 text-slate-400 dark:text-zinc-500" />
                <span>{category.label}</span>
              </span>
            )}
          </div>

          {/* Title */}
          <h4 
            onClick={() => setIsExpanded(!isExpanded)}
            className={`font-display text-base font-semibold leading-snug cursor-pointer transition-all duration-200 select-none ${
              quest.isCompleted 
                ? 'text-slate-400 dark:text-zinc-500 line-through font-normal' 
                : 'text-slate-800 dark:text-zinc-100 hover:text-blue-500 dark:hover:text-blue-400'
            }`}
          >
            {quest.title}
          </h4>

          {/* Quick Date or Compact Info */}
          {quest.targetDate && !isExpanded && (
            <span className="inline-flex items-center gap-1 mt-1 text-[11px] font-mono text-slate-400 dark:text-zinc-500">
              <Calendar className="w-3 h-3" />
              <span>Target: {formatDate(quest.targetDate)}</span>
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1 flex-shrink-0 self-center">
          {/* Collapse/Expand Toggle */}
          {quest.description && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle details"
              id={`expand-${quest.id}`}
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          )}

          {/* Delete Button */}
          <button
            onClick={() => onDelete(quest.id)}
            className="p-1.5 text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
            aria-label="Delete quest"
            id={`delete-${quest.id}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Expandable Details Area */}
      <AnimatePresence initial={false}>
        {isExpanded && quest.description && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="px-5 pb-5 pt-0 border-t border-slate-100 dark:border-zinc-800/40 bg-slate-50/50 dark:bg-zinc-900/30 text-sm">
              <div className="pt-4 space-y-3">
                {/* Description */}
                <div className="text-slate-600 dark:text-zinc-300 leading-relaxed font-sans font-light">
                  {quest.description}
                </div>

                {/* Additional metadata */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs font-mono text-slate-400 dark:text-zinc-500">
                  <div className="flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
                    <span>Created {formatDate(quest.createdAt)}</span>
                  </div>
                  {quest.targetDate && (
                    <div className="flex items-center gap-1 text-slate-500 dark:text-zinc-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Target Achievement: {formatDate(quest.targetDate)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
