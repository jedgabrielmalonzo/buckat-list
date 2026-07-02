import { BucketItem } from './types';

export const DEFAULT_ITEMS: BucketItem[] = [
  {
    id: 'demo-1',
    title: 'Watch the sunrise from the highest local peak',
    description: 'Set an early alarm, pack a hot thermos of coffee or tea, and witness the world waking up from high ground. Best shared or enjoyed in quiet solitude.',
    isCompleted: false,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'demo-2',
    title: 'Buy a hot beverage for the person behind you in line',
    description: 'A simple, spontaneous act of kindness. Do it anonymously if possible, pay and leave with a smile. Spreads silent goodwill.',
    isCompleted: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'demo-3',
    title: 'Learn the basic structure of a completely new language',
    description: 'Spend an afternoon understanding how sentence structure works. Learn at least 20 key phrases and basic phonetics.',
    isCompleted: false,
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'demo-4',
    title: 'Go an entire Sunday without checking any screens',
    description: 'No phone, no computer, no TV. Read paper books, write by hand, take walks, talk face-to-face, let your mind re-sensitize to physical speed.',
    isCompleted: false,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'demo-5',
    title: 'Create a piece of art or music and share it online',
    description: 'Bypass your inner perfectionist. Paint a small abstract canvas, code a generative visual, or record an acoustic loop. Post it somewhere raw and unedited.',
    isCompleted: false,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'demo-6',
    title: 'Touch the bottom of a 4-meter-deep pool/sea',
    description: 'Test your comfort under water. Equalize your ears, touch the floor, and look back up at the surface ripple. Safely, of course.',
    isCompleted: false,
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'demo-7',
    title: 'Master baking a sourdough bread loaf from scratch',
    description: 'Nurture a wild yeast starter, understand hydration ratios, master fold techniques, and bake a golden, blistered, open-crumb masterpiece.',
    isCompleted: false,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
  }
];
