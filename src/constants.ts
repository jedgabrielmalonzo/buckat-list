import { QuestItem, Difficulty } from './types';

export interface CategoryInfo {
  value: string;
  label: string;
  icon: string;
  color: string;
}

export const CATEGORIES: CategoryInfo[] = [
  { value: 'adventure', label: 'Adventure', icon: 'Compass', color: 'from-cyan-500 to-blue-500' },
  { value: 'creative', label: 'Creative', icon: 'Paintbrush', color: 'from-pink-500 to-rose-500' },
  { value: 'fitness', label: 'Fitness & Health', icon: 'Dumbbell', color: 'from-emerald-500 to-teal-500' },
  { value: 'skills', label: 'Skills & Learning', icon: 'BookOpen', color: 'from-indigo-500 to-purple-500' },
  { value: 'social', label: 'Social & Connection', icon: 'Users', color: 'from-violet-500 to-fuchsia-500' },
  { value: 'finance', label: 'Career & Finance', icon: 'Briefcase', color: 'from-amber-500 to-orange-500' },
  { value: 'mindfulness', label: 'Mind & Spirit', icon: 'Sparkles', color: 'from-blue-500 to-indigo-500' }
];

export interface DifficultyInfo {
  label: string;
  xp: number;
  textColor: string;
  bgColor: string;
  borderColor: string;
}

export const DIFFICULTY_CONFIGS: Record<Difficulty, DifficultyInfo> = {
  trivial: {
    label: 'Trivial',
    xp: 10,
    textColor: 'text-emerald-500 dark:text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20 dark:border-emerald-400/20'
  },
  minor: {
    label: 'Minor',
    xp: 25,
    textColor: 'text-blue-500 dark:text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20 dark:border-blue-400/20'
  },
  major: {
    label: 'Major',
    xp: 50,
    textColor: 'text-violet-500 dark:text-violet-400',
    bgColor: 'bg-violet-500/10',
    borderColor: 'border-violet-500/20 dark:border-violet-400/20'
  },
  epic: {
    label: 'Epic',
    xp: 100,
    textColor: 'text-amber-500 dark:text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30 dark:border-amber-400/30'
  }
};

export const DEFAULT_QUESTS: QuestItem[] = [
  {
    id: 'demo-1',
    title: 'Watch the sunrise from the highest local peak',
    type: 'sidequest',
    description: 'Set an early alarm, pack a hot thermos of coffee or tea, and witness the world waking up from high ground. Best shared or enjoyed in quiet solitude.',
    difficulty: 'major',
    category: 'adventure',
    isCompleted: false,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    xp: 50
  },
  {
    id: 'demo-2',
    title: 'Buy a hot beverage for the person behind you in line',
    type: 'sidequest',
    description: 'A simple, spontaneous act of kindness. Do it anonymously if possible, pay and leave with a smile. Spreads silent goodwill.',
    difficulty: 'trivial',
    category: 'social',
    isCompleted: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    xp: 10
  },
  {
    id: 'demo-3',
    title: 'Learn the basic structure of a completely new language',
    type: 'sidequest',
    description: 'Spend an afternoon understanding how Japanese, Arabic, or Esperanto constructs sentences. Learn at least 20 key phrases and basic phonetics.',
    difficulty: 'minor',
    category: 'skills',
    isCompleted: false,
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    xp: 25
  },
  {
    id: 'demo-4',
    title: 'Go an entire Sunday without checking any screens',
    type: 'sidequest',
    description: 'No phone, no computer, no TV. Read paper books, write by hand, take walks, talk face-to-face, let your mind re-sensitize to physical speed.',
    difficulty: 'major',
    category: 'mindfulness',
    isCompleted: false,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    xp: 50
  },
  {
    id: 'demo-5',
    title: 'Create a piece of art or music and share it online',
    type: 'sidequest',
    description: 'Bypass your inner perfectionist. Paint a small abstract canvas, code a generative visual, or record an acoustic loop. Post it somewhere raw and unedited.',
    difficulty: 'minor',
    category: 'creative',
    isCompleted: false,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    xp: 25
  },
  {
    id: 'demo-6',
    title: 'Touch the bottom of a 4-meter-deep pool/sea',
    type: 'sidequest',
    description: 'Test your lung capacity and diving comfort. Equalize your ears, touch the floor, and look back up at the surface ripple. Safely, of course.',
    difficulty: 'minor',
    category: 'fitness',
    isCompleted: false,
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    xp: 25
  },
  {
    id: 'demo-7',
    title: 'Master baking a sourdough bread loaf from scratch',
    type: 'sidequest',
    description: 'Nurture a wild yeast starter, understand hydration ratios, master fold techniques, and bake a golden, blistered, open-crumb masterpiece.',
    difficulty: 'epic',
    category: 'creative',
    isCompleted: false,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    xp: 100
  }
];
