import { 
  Compass, 
  Paintbrush, 
  Dumbbell, 
  BookOpen, 
  Users, 
  Briefcase, 
  Sparkles
} from 'lucide-react';

interface CategoryIconProps {
  name: string;
  className?: string;
  size?: number | string;
}

export default function CategoryIcon({ name, className, size }: CategoryIconProps) {
  const iconProps = { className, size: size ? Number(size) : undefined };
  
  switch (name.toLowerCase()) {
    case 'adventure':
    case 'compass':
      return <Compass {...iconProps} />;
    case 'creative':
    case 'paintbrush':
      return <Paintbrush {...iconProps} />;
    case 'fitness':
    case 'health':
    case 'dumbbell':
      return <Dumbbell {...iconProps} />;
    case 'skills':
    case 'learning':
    case 'bookopen':
      return <BookOpen {...iconProps} />;
    case 'social':
    case 'connection':
    case 'users':
      return <Users {...iconProps} />;
    case 'finance':
    case 'career':
    case 'briefcase':
      return <Briefcase {...iconProps} />;
    case 'mindfulness':
    case 'spirit':
    case 'sparkles':
      return <Sparkles {...iconProps} />;
    default:
      return <Sparkles {...iconProps} />;
  }
}
