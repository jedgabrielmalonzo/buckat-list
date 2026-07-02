import { CATEGORIES } from '../constants';
import { QuestItem } from '../types';
import CategoryIcon from './CategoryIcon';

interface CategoryFilterProps {
  selectedCategory: string | 'all';
  onChangeCategory: (category: string | 'all') => void;
  quests: QuestItem[];
}

export default function CategoryFilter({ selectedCategory, onChangeCategory, quests }: CategoryFilterProps) {
  const getCategoryCount = (catValue: string | 'all') => {
    if (catValue === 'all') return quests.length;
    return quests.filter(q => q.category === catValue).length;
  };

  return (
    <div className="space-y-2 mb-4" id="category-filter-section">
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 flex-nowrap" id="category-pills-list">
        {/* All Sphere Pill */}
        <button
          onClick={() => onChangeCategory('all')}
          className={`px-3 py-1.5 rounded-full text-[11px] font-medium border transition-all duration-250 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
            selectedCategory === 'all'
              ? 'bg-blue-600 dark:bg-blue-500 text-white border-blue-600 dark:border-blue-500 shadow-sm'
              : 'bg-white dark:bg-zinc-900 text-slate-500 dark:text-zinc-400 border-slate-100 dark:border-zinc-900 hover:text-slate-800 dark:hover:text-zinc-200'
          }`}
          id="filter-cat-all"
        >
          <span>All Spheres</span>
          <span className={`px-1 rounded font-mono text-[9px] leading-none ${
            selectedCategory === 'all'
              ? 'bg-blue-700/60 text-blue-100'
              : 'bg-slate-100 dark:bg-zinc-950 text-slate-400 dark:text-zinc-500'
          }`}>
            {getCategoryCount('all')}
          </span>
        </button>

        {/* Dynamic Spheres */}
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.value;
          const count = getCategoryCount(cat.value);
          
          return (
            <button
              key={cat.value}
              onClick={() => onChangeCategory(cat.value)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-medium border transition-all duration-250 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                isSelected
                  ? 'bg-blue-600 dark:bg-blue-500 text-white border-blue-600 dark:border-blue-500 shadow-sm'
                  : 'bg-white dark:bg-zinc-900 text-slate-500 dark:text-zinc-400 border-slate-100 dark:border-zinc-900 hover:text-slate-800 dark:hover:text-zinc-200'
              }`}
              id={`filter-cat-${cat.value}`}
            >
              <CategoryIcon name={cat.icon} className="w-3 h-3 opacity-85" />
              <span>{cat.label}</span>
              <span className={`px-1 rounded font-mono text-[9px] leading-none ${
                isSelected
                  ? 'bg-blue-700/60 text-blue-100'
                  : 'bg-slate-100 dark:bg-zinc-950 text-slate-400 dark:text-zinc-500'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
