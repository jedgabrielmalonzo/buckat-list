export interface BucketItem {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: string;
  targetDate?: string;
}

export interface FilterOptions {
  search: string;
  status: 'all' | 'active' | 'completed';
}

export type SortOption = 'newest' | 'oldest' | 'alphabetical';
