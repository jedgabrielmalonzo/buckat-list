import React, { useState, useEffect, useMemo, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus,
  Search,
  Sun,
  Moon,
  ListPlus,
  X
} from 'lucide-react';
import { BucketItem } from './types';
import { DEFAULT_ITEMS } from './constants';
import QuestCard from './components/QuestCard';
import QuestStats from './components/QuestStats';

export default function App() {
  // --- Persistent States ---
  const [items, setItems] = useState<BucketItem[]>(() => {
    const saved = localStorage.getItem('bucket_list_items');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error loading bucket list items", e);
      }
    }
    return DEFAULT_ITEMS;
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('bucket_dark_mode');
    return saved ? JSON.parse(saved) : true; // Default to eye-friendly dark mode!
  });

  // --- UI Control States ---
  const [quickTitle, setQuickTitle] = useState('');

  // --- Filtering States ---
  const [search, setSearch] = useState('');

  // --- Notification Message State ---
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  // Sync Items to LocalStorage
  useEffect(() => {
    localStorage.setItem('bucket_list_items', JSON.stringify(items));
  }, [items]);

  // Sync Theme with HTML Class
  useEffect(() => {
    localStorage.setItem('bucket_dark_mode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Trigger brief alert notification
  const triggerNotification = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 2500);
  };

  // --- Core Handlers ---

  const handleAddItem = (title: string) => {
    const newItem: BucketItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      title,
      description: 'Add a description to detail this life experience or goal.',
      isCompleted: false,
      createdAt: new Date().toISOString()
    };

    setItems(prev => [newItem, ...prev]);
    triggerNotification(`Added: "${title}"`);
  };

  const handleQuickAdd = (e: FormEvent) => {
    e.preventDefault();
    if (!quickTitle.trim()) return;

    handleAddItem(quickTitle.trim());
    setQuickTitle('');
  };

  const handleToggleComplete = (id: string) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const nextCompletedState = !item.isCompleted;
        if (nextCompletedState) {
          triggerNotification(`Completed: "${item.title}"! 🎉`);
        } else {
          triggerNotification(`Reopened: "${item.title}"`, 'info');
        }
        return { ...item, isCompleted: nextCompletedState };
      }
      return item;
    }));
  };

  const handleDeleteItem = (id: string) => {
    const deletedItem = items.find(item => item.id === id);
    setItems(prev => prev.filter(item => item.id !== id));
    if (deletedItem) {
      triggerNotification(`Removed: "${deletedItem.title}"`, 'info');
    }
  };

  // --- Memoized Computations (Filtering & Sorting) ---

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());
      return matchesSearch;
    });
  }, [items, search]);

  const sortedItems = useMemo(() => {
    const copy = [...filteredItems];
    return copy.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [filteredItems]);

  const activeCount = useMemo(() => {
    return items.filter(item => !item.isCompleted).length;
  }, [items]);

  const isAnyFilterActive = !!search;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-100 transition-colors duration-300 relative bg-grid-pattern" id="app-root-container">

      {/* Decorative subtle ambient light gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-blue-500/[0.02] dark:bg-blue-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

      {/* Micro-Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 bg-slate-900/95 dark:bg-zinc-900/95 text-white dark:text-zinc-100 rounded-xl border border-slate-800 dark:border-zinc-800 shadow-xl backdrop-blur-md flex items-center gap-2.5 text-xs font-mono"
            id="toast-notification"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span>{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Single-Column Focus Wrapper */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-16 relative z-10" id="main-content-wrapper">

        {/* Minimal Header */}
        <header className="flex items-center justify-between mb-8 pb-4" id="app-header">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              BucKat List<span className="text-blue-500">.</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-zinc-500 font-sans mt-0.5">Your minimalist bucket list tracker.</p>
          </div>

          {/* Theme Toggler */}
          <div className="flex items-center gap-1.5" id="header-controls">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-xl text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-100 hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-all cursor-pointer"
              title={darkMode ? "Use Light Mode" : "Use Dark Mode"}
              aria-label="Toggle visual theme"
              id="theme-toggle-btn"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </header>

        {/* Status Progress Widget */}
        <QuestStats quests={items} />

        {/* Unified Quick Add Action Form */}
        <div className="mb-6 space-y-3" id="quick-add-area">
          <form onSubmit={handleQuickAdd} className="flex items-center bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-2xl p-1.5 focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/10 transition-all shadow-sm" id="quick-add-form">

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-mono font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 whitespace-nowrap" id="quick-add-indicator">
              <ListPlus className="w-3.5 h-3.5" />
              <span>New Goal</span>
            </div>

            {/* Clean Input Field */}
            <input
              type="text"
              placeholder="Quick add a new bucket list goal..."
              value={quickTitle}
              onChange={(e) => setQuickTitle(e.target.value)}
              className="flex-grow px-3 bg-transparent text-sm text-slate-800 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-600 focus:outline-none min-w-0 font-sans"
              id="quick-add-input"
            />

            {/* Submit Plus Button */}
            <button
              type="submit"
              disabled={!quickTitle.trim()}
              className={`p-2 rounded-xl transition-all cursor-pointer ${quickTitle.trim()
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/10'
                  : 'bg-slate-50 dark:bg-zinc-800 text-slate-400 dark:text-zinc-600 cursor-not-allowed'
                }`}
              aria-label="Submit quick goal"
              id="quick-add-submit-btn"
            >
              <Plus className="w-4 h-4" />
            </button>
          </form>

          {/* Quick instructions */}
          <div className="flex items-center justify-between text-xs px-1">
            <span className="text-slate-400 dark:text-zinc-500 font-sans">
              Press <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-zinc-900 border border-slate-200/40 dark:border-zinc-800 rounded font-mono text-[10px]">Enter</kbd> to quick-add
            </span>
          </div>
        </div>

        {/* Search Input Card */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-2xl p-4 shadow-sm mb-6" id="filters-container-card">
          <div className="relative w-full" id="search-container">
            <input
              type="text"
              placeholder="Search goals..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-slate-50 dark:bg-zinc-950 border border-slate-200/50 dark:border-zinc-800 rounded-xl text-xs text-slate-800 dark:text-zinc-200 placeholder-slate-400 dark:placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/10 transition-all font-sans"
              id="search-input"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-600 absolute left-3 top-1/2 -translate-y-1/2" />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300 transition-colors p-0.5 rounded cursor-pointer"
                title="Clear search"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Listing Header info */}
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="font-display text-xs uppercase tracking-wider font-bold text-slate-400 dark:text-zinc-500">
            {sortedItems.length} Goal{sortedItems.length === 1 ? '' : 's'} Match
          </span>
          {activeCount > 0 && (
            <span className="font-mono text-[11px] text-slate-400 dark:text-zinc-500">
              {activeCount} active in backlog
            </span>
          )}
        </div>

        {/* Items List with Pop animations */}
        <div className="space-y-3 min-h-[250px]" id="cards-rendering-group">
          <AnimatePresence mode="popLayout">
            {sortedItems.length > 0 ? (
              sortedItems.map((item) => (
                <QuestCard
                  key={item.id}
                  quest={item}
                  onToggleComplete={handleToggleComplete}
                  onDelete={handleDeleteItem}
                />
              ))
            ) : (
              // Empty State
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="border border-dashed border-slate-200 dark:border-zinc-800/80 rounded-2xl p-10 text-center flex flex-col items-center justify-center bg-white dark:bg-zinc-900/10"
                id="empty-state-card"
              >
                <ListPlus className="w-7 h-7 text-slate-300 dark:text-zinc-700 animate-pulse mb-3" />
                <h4 className="font-display font-bold text-sm text-slate-800 dark:text-zinc-300">Your list is clear</h4>
                <p className="text-xs text-slate-400 dark:text-zinc-500 max-w-xs mt-1 leading-relaxed font-light">
                  No goals found matching your search. Create a new goal above!
                </p>

                {isAnyFilterActive && (
                  <button
                    onClick={() => {
                      setSearch('');
                    }}
                    className="mt-4 px-3 py-1.5 border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-400 text-xs rounded-xl cursor-pointer"
                  >
                    Clear Search
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
