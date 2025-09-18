"use client";

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  animateOnAppear?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, animateOnAppear = true, ...props }, ref) => {
    const shouldReduceMotion = useReducedMotion();

    const cardVariants = {
      hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: shouldReduceMotion ? {} : {
          duration: 0.6,
          ease: "easeOut" as const,
        },
      },
    };

    if (!animateOnAppear) {
      return (
        <div
          ref={ref}
          className={cn(
            "rounded-2xl border border-trim-silver/20 bg-asphalt text-pearl shadow-xl",
            className
          )}
          {...props}
        />
      );
    }

    return (
      <motion.div
        ref={ref}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className={cn(
          "rounded-2xl border border-trim-silver/20 bg-asphalt text-pearl shadow-xl",
          className
        )}
      />
    );
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-saira text-2xl font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-slate-400", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

