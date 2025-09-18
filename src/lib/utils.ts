import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, currency: string = "AED"): string {
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatPercentage(value: number): string {
  return new Intl.NumberFormat("en-AE", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(value / 100)
}

export function formatOdometerReading(miles: number): string {
  return new Intl.NumberFormat("en-AE", {
    minimumIntegerDigits: 6,
    useGrouping: false,
  }).format(miles)
}

export function getTimeRemaining(targetTime: Date): {
  minutes: number
  seconds: number
  totalSeconds: number
} {
  const now = new Date()
  const diff = targetTime.getTime() - now.getTime()
  
  if (diff <= 0) {
    return { minutes: 0, seconds: 0, totalSeconds: 0 }
  }
  
  const totalSeconds = Math.floor(diff / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  
  return { minutes, seconds, totalSeconds }
}

