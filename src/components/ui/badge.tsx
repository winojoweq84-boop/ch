"use client";

import * as React from "react"
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export type BadgeProps = Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag"> &
  HTMLMotionProps<"div"> &
  VariantProps<typeof badgeVariants> & {
    animateOnAppear?: boolean;
  };

function Badge({ className, variant, animateOnAppear = true, ...props }: BadgeProps) {
  const shouldReduceMotion = useReducedMotion();

  const motionVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: shouldReduceMotion ? {} : {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
  };

  if (!animateOnAppear) {
    // Filter out motion-specific props when using regular div
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- destructuring to filter out motion props
    const { onDrag: _onDrag, onDragStart: _onDragStart, onDragEnd: _onDragEnd, onAnimationStart: _onAnimationStart, onAnimationComplete: _onAnimationComplete, ...htmlProps } = props;
    return (
      <div className={cn(badgeVariants({ variant }), className)} {...htmlProps} />
    );
  }

  return (
    <motion.div
      variants={motionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={cn(badgeVariants({ variant }), className)} 
      {...props}
    >
      {props.children}
    </motion.div>
  );
}

export { Badge, badgeVariants }

