"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RateLockTimer } from "@/components/ui/rate-lock-timer";
import { Car, Zap, Clock, CheckCircle } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const carValuationSchema = z.object({
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z.number().min(1990).max(new Date().getFullYear() + 1),
  mileage: z.number().min(0).max(999999),
  condition: z.enum(["excellent", "good", "fair", "poor"]),
  location: z.string().min(1, "Location is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  utm_source: z.string().optional(),
  utm_campaign: z.string().optional(),
});

type CarValuationForm = z.infer<typeof carValuationSchema>;

const carMakes = [
  "Toyota", "Honda", "Nissan", "BMW", "Mercedes-Benz", "Audi", "Volkswagen",
  "Hyundai", "Kia", "Mazda", "Ford", "Chevrolet", "Lexus", "Infiniti",
  "Porsche", "Jaguar", "Land Rover", "Mitsubishi", "Subaru", "Other"
];

const conditions = [
  { value: "excellent", label: "Excellent", description: "Like new, no issues" },
  { value: "good", label: "Good", description: "Minor wear, well maintained" },
  { value: "fair", label: "Fair", description: "Some wear, needs minor repairs" },
  { value: "poor", label: "Poor", description: "Significant wear or damage" },
];

const locations = [
  "Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", 
  "Fujairah", "Umm Al Quwain", "Al Ain"
];

export function CarValuationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [estimatedValue, setEstimatedValue] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CarValuationForm>({
    resolver: zodResolver(carValuationSchema),
    defaultValues: {
      utm_source: "website",
      utm_campaign: "homepage",
    },
  });

  const onSubmit = async (data: CarValuationForm) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock valuation calculation
    const baseValue = 50000; // Base value for demo
    const yearMultiplier = (data.year - 1990) / 30; // 0-1 based on year
    const mileageMultiplier = Math.max(0, 1 - (data.mileage / 200000)); // 0-1 based on mileage
    const conditionMultiplier = {
      excellent: 1.0,
      good: 0.85,
      fair: 0.7,
      poor: 0.5,
    }[data.condition];
    
    const marketValue = Math.round(baseValue * yearMultiplier * mileageMultiplier * conditionMultiplier);
    const cryptoValue = Math.round(marketValue * 1.2); // 20% premium
    
    setEstimatedValue(cryptoValue);
    setShowResult(true);
    setIsSubmitting(false);
  };

  if (showResult) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-2xl mx-auto bg-asphalt border-trim-silver/20">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-desert-gold/10 border border-desert-gold/30">
                <Zap className="h-8 w-8 text-desert-gold" />
              </div>
            </div>
            <CardTitle className="text-2xl text-pearl">Your Crypto Offer</CardTitle>
            <p className="text-slate-400">Based on your car details</p>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div>
              <p className="font-saira text-4xl font-bold text-desert-gold tabular-nums mb-2">
                {formatPrice(estimatedValue)}
              </p>
              <Badge variant="default" className="mb-4 bg-desert-gold text-carbon">
                <Zap className="h-3 w-3 mr-1" />
                +20% Crypto Premium
              </Badge>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Market Value:</span>
                <span className="text-pearl tabular-nums">
                  {formatPrice(Math.round(estimatedValue / 1.2))}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Crypto Premium:</span>
                <span className="text-desert-gold tabular-nums">
                  +{formatPrice(Math.round(estimatedValue * 0.2))}
                </span>
              </div>
            </div>

            <div className="flex justify-center">
              <RateLockTimer duration={15} />
            </div>

            <div className="space-y-3">
              <Button 
                size="lg" 
                className="w-full animate-taillight-pulse"
                data-analytics="valuation-result-cta"
                data-cta="accept-offer"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Accept This Offer
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full"
                onClick={() => setShowResult(false)}
              >
                Get New Valuation
              </Button>
            </div>

            <p className="text-xs text-slate-400">
              Final price subject to inspection. KYC required. Network fees apply.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="max-w-2xl mx-auto bg-asphalt border-trim-silver/20">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-taillight-red/10 border border-taillight-red/30">
              <Car className="h-8 w-8 text-taillight-red" />
            </div>
          </div>
          <CardTitle className="text-2xl text-pearl">Get Your Crypto Offer</CardTitle>
          <p className="text-slate-400">Tell us about your car and get an instant valuation</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Car Details */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="make">Make *</Label>
                <select
                  id="make"
                  {...register("make")}
                  className="flex h-9 w-full rounded-md border border-trim-silver/30 bg-asphalt px-3 py-1 text-sm text-pearl shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-taillight-red disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select make</option>
                  {carMakes.map((make) => (
                    <option key={make} value={make}>
                      {make}
                    </option>
                  ))}
                </select>
                {errors.make && (
                  <p className="text-xs text-taillight-red">{errors.make.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Model *</Label>
                <Input
                  id="model"
                  placeholder="e.g., Camry, Accord"
                  {...register("model")}
                />
                {errors.model && (
                  <p className="text-xs text-taillight-red">{errors.model.message}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year">Year *</Label>
                <Input
                  id="year"
                  type="number"
                  placeholder="2020"
                  {...register("year", { valueAsNumber: true })}
                />
                {errors.year && (
                  <p className="text-xs text-taillight-red">{errors.year.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="mileage">Mileage (km) *</Label>
                <Input
                  id="mileage"
                  type="number"
                  placeholder="50000"
                  {...register("mileage", { valueAsNumber: true })}
                />
                {errors.mileage && (
                  <p className="text-xs text-taillight-red">{errors.mileage.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Condition *</Label>
              <div className="grid grid-cols-2 gap-3">
                {conditions.map((condition) => (
                  <label
                    key={condition.value}
                    className="flex items-center space-x-3 p-3 rounded-lg border border-trim-silver/20 bg-carbon/50 hover:bg-carbon/70 cursor-pointer transition-colors"
                  >
                    <input
                      type="radio"
                      value={condition.value}
                      {...register("condition")}
                      className="text-taillight-red focus:ring-taillight-red"
                    />
                    <div>
                      <div className="text-sm font-medium text-pearl">
                        {condition.label}
                      </div>
                      <div className="text-xs text-slate-400">
                        {condition.description}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              {errors.condition && (
                <p className="text-xs text-taillight-red">{errors.condition.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <select
                id="location"
                {...register("location")}
                className="flex h-9 w-full rounded-md border border-trim-silver/30 bg-asphalt px-3 py-1 text-sm text-pearl shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-taillight-red disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select location</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              {errors.location && (
                <p className="text-xs text-taillight-red">{errors.location.message}</p>
              )}
            </div>

            {/* Contact Details */}
            <div className="space-y-4 pt-4 border-t border-trim-silver/20">
              <h3 className="font-saira text-lg font-semibold text-pearl">
                Contact Information
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-xs text-taillight-red">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+971 XX XXX XXXX"
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="text-xs text-taillight-red">{errors.phone.message}</p>
                  )}
                </div>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
              data-analytics="valuation-form-submit"
              data-cta="get-valuation"
            >
              {isSubmitting ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Calculating...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Get My Crypto Offer
                </>
              )}
            </Button>

            <p className="text-xs text-slate-400 text-center">
              By submitting, you agree to our terms and privacy policy. 
              KYC verification required for crypto payments.
            </p>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
