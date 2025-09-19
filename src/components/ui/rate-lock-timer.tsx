"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { getTimeRemaining } from "@/lib/utils";

interface RateLockTimerProps {
  duration?: number; // in minutes
  onExpire?: () => void;
  className?: string;
}

export function RateLockTimer({ 
  duration = 15, 
  onExpire,
  className = "" 
}: RateLockTimerProps) {
  const [timeLeft, setTimeLeft] = useState(() => {
    const targetTime = new Date();
    targetTime.setMinutes(targetTime.getMinutes() + duration);
    return getTimeRemaining(targetTime);
  });

  useEffect(() => {
    const targetTime = new Date();
    targetTime.setMinutes(targetTime.getMinutes() + duration);

    const timer = setInterval(() => {
      const remaining = getTimeRemaining(targetTime);
      setTimeLeft(remaining);

      if (remaining.totalSeconds <= 0) {
        clearInterval(timer);
        onExpire?.();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [duration, onExpire]);

  const formatTime = (minutes: number, seconds: number) => {
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const isLowTime = timeLeft.totalSeconds <= 300; // 5 minutes or less

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border ${
        isLowTime 
          ? 'border-taillight-red/30 bg-taillight-red/5' 
          : 'border-trim-silver/20 bg-carbon/50'
      } ${className}`}
    >
      <Clock className={`h-4 w-4 ${isLowTime ? 'text-taillight-red' : 'text-trim-silver'}`} />
      <div className="text-sm">
        <span className="text-slate-400">Rate locked for:</span>
        <span 
          className={`ml-2 font-mono font-bold tabular-nums ${
            isLowTime ? 'text-taillight-red' : 'text-pearl'
          }`}
          aria-live="polite"
        >
          {formatTime(timeLeft.minutes, timeLeft.seconds)}
        </span>
      </div>
    </motion.div>
  );
}





