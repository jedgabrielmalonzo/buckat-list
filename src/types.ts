export type QuestType = 'sidequest' | 'bucket';

export type Difficulty = 'trivial' | 'minor' | 'major' | 'epic';

export interface QuestItem {
  id: string;
  title: string;
  type: QuestType;
  description: string;
  difficulty: Difficulty;
  category: string;
  isCompleted: boolean;
  createdAt: string;
  targetDate?: string;
  xp: number;
}

export interface QuestStats {
  total: number;
  completed: number;
  sidequestsCount: number;
  sidequestsCompleted: number;
  bucketCount: number;
  bucketCompleted: number;
  totalXp: number;
}

export interface FilterOptions {
  search: string;
  type: QuestType | 'all';
  difficulty: Difficulty | 'all';
  category: string | 'all';
  status: 'all' | 'active' | 'completed';
}

export type SortOption = 'newest' | 'oldest' | 'difficulty-asc' | 'difficulty-desc' | 'alphabetical';
