import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Check,
  Trash2,
  Calendar,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { BucketItem } from '../types';

interface QuestCardProps {
  key?: string;
  quest: BucketItem;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function QuestCard({ quest, onToggleComplete, onDelete }: QuestCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Formatting date nicely
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      className={`group relative overflow-hidden bg-white dark:bg-zinc-900 border rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300 ${quest.isCompleted
          ? 'border-slate-100 dark:border-zinc-800/40 bg-slate-50/50 dark:bg-zinc-900/40'
          : 'border-slate-100 dark:border-zinc-800/80 hover:border-slate-200 dark:hover:border-zinc-700/80'
        }`}
      id={`bucket-item-${quest.id}`}
    >
      <div className="flex items-start gap-4">

        {/* Checkbox Container */}
        <div className="flex-shrink-0 mt-0.5">
          <button
            onClick={() => onToggleComplete(quest.id)}
            className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all cursor-pointer ${quest.isCompleted
                ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm'
                : 'border-slate-200 dark:border-zinc-700 hover:border-blue-500 dark:hover:border-blue-400 bg-transparent'
              }`}
            aria-label={quest.isCompleted ? "Mark incomplete" : "Mark complete"}
            id={`checkbox-${quest.id}`}
          >
            <AnimatePresence>
              {quest.isCompleted && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Text Details Area */}
        <div className="flex-grow min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            {quest.targetDate && (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-400 dark:text-zinc-500 font-medium">
                <Calendar className="w-3 h-3 text-slate-300 dark:text-zinc-600" />
                <span>By {formatDate(quest.targetDate)}</span>
              </span>
            )}
          </div>

          {/* Title */}
          <h3
            onClick={() => setIsExpanded(!isExpanded)}
            className={`font-display text-sm sm:text-base font-bold tracking-tight cursor-pointer select-none transition-all ${quest.isCompleted
                ? 'text-slate-400 dark:text-zinc-500 line-through font-medium'
                : 'text-slate-800 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            id={`title-${quest.id}`}
          >
            {quest.title}
          </h3>

          {/* Description Snippet/Expanded block */}
          <div className="mt-1.5" id={`desc-container-${quest.id}`}>
            {quest.description && (
              <>
                <p
                  onClick={() => setIsExpanded(!isExpanded)}
                  className={`text-xs font-sans leading-relaxed cursor-pointer ${quest.isCompleted
                      ? 'text-slate-400/80 dark:text-zinc-600'
                      : 'text-slate-500 dark:text-zinc-400'
                    } ${isExpanded ? '' : 'line-clamp-1'}`}
                >
                  {quest.description}
                </p>

                {/* Expand toggler hint */}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-1 flex items-center gap-0.5 text-[10px] text-slate-400 hover:text-blue-600 dark:text-zinc-600 dark:hover:text-zinc-400 font-mono font-medium tracking-tight uppercase cursor-pointer"
                  id={`expand-toggle-${quest.id}`}
                >
                  <span>{isExpanded ? 'Collapse' : 'Expand Details'}</span>
                  {isExpanded ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
                </button>
              </>
            )}
          </div>

          {/* Creation date */}
          <div className="mt-2.5 flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-300 dark:text-zinc-600">
              Added {formatDate(quest.createdAt)}
            </span>
          </div>
        </div>

        {/* Delete button (displays on hover) */}
        <div className="flex-shrink-0 flex items-center self-center sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onDelete(quest.id)}
            className="p-1.5 text-slate-300 hover:text-red-500 dark:text-zinc-700 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-all cursor-pointer"
            title="Delete item"
            aria-label="Delete item"
            id={`delete-btn-${quest.id}`}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </motion.div>
  );
}
