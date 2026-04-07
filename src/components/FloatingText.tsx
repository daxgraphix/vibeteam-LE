import { motion } from 'motion/react';

interface FloatingTextProps {
  text: string;
  onComplete: () => void;
}

export function FloatingText({ text, onComplete }: FloatingTextProps) {
  return (
    <motion.div
      initial={{ y: 0, opacity: 1, scale: 0.5 }}
      animate={{ y: -100, opacity: 0, scale: 2 }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 flex items-center justify-center pointer-events-none z-[300]"
    >
      <span className="text-6xl font-black text-indigo-500 drop-shadow-[0_0_20px_rgba(79,70,229,0.8)] italic uppercase tracking-tighter">
        {text}
      </span>
    </motion.div>
  );
}
