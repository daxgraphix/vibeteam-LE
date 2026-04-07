import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface AchievementBadgeProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  key?: number;
}

export function AchievementBadge({ icon: Icon, title, description, color }: AchievementBadgeProps) {
  return (
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`flex items-center gap-3 p-4 rounded-2xl border ${color} shadow-sm`}
    >
      <div className="p-2 rounded-lg bg-white/20">
        <Icon size={20} />
      </div>
      <div className="text-left">
        <p className="text-xs font-bold uppercase tracking-wider opacity-80">{title}</p>
        <p className="text-sm font-bold">{description}</p>
      </div>
    </motion.div>
  );
}
