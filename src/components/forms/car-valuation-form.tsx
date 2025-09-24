"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RateLockTimer } from "@/components/ui/rate-lock-timer";
import { Car, Zap, Clock, CheckCircle } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const EMIRATES = [
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Ajman",
  "Ras Al Khaimah",
  "Umm Al Quwain",
  "Fujairah",
  "Other",
] as const;

const TOKENS = [
  "USDC",
  "ETH",
  "SOL",
  "USDT",
  "BTC",
  "BNB",
  "XRP",
  "TRX",
  "ADA",
  "MATIC",
  "Other",
] as const;

const schema = z
  .object({
    name: z.string().min(2, "Please enter your full name"),
    city: z.enum(EMIRATES, { message: "Select your city" }),
    otherCity: z.string().optional(),
    phone: z
      .string()
      .trim()
      .regex(/^\+?\d[\d\s\-()]{7,}$/i, "Enter a valid phone number"),
    email: z.string().email("Enter a valid email"),
    payoutType: z.enum(["crypto", "cash"], {
      message: "Choose payout method",
    }),
    token: z
      .enum(TOKENS)
      .optional(), // required only if payoutType=crypto
    otherToken: z.string().optional(),
  })
  .superRefine((val, ctx) => {
    if (val.city === "Other" && !val.otherCity) {
      ctx.addIssue({
        path: ["otherCity"],
        code: z.ZodIssueCode.custom,
        message: "Type your city/emirate",
      });
    }
    if (val.payoutType === "crypto" && !val.token) {
      ctx.addIssue({
        path: ["token"],
        code: z.ZodIssueCode.custom,
        message: "Select a crypto",
      });
    }
    if (val.payoutType === "crypto" && val.token === "Other" && !val.otherToken) {
      ctx.addIssue({
        path: ["otherToken"],
        code: z.ZodIssueCode.custom,
        message: "Type your preferred token",
      });
    }
  });

type FormValues = z.infer<typeof schema>;

export function CarValuationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [estimatedValue, setEstimatedValue] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { payoutType: "crypto" },
  });

  const payoutType = watch("payoutType");
  const token = watch("token");
  const selectedCity = watch("city");

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Prepare payload with normalized city
      const payload = {
        name: data.name,
        city: data.city === "Other" ? data.otherCity : data.city, // normalized
        phone: data.phone,
        email: data.email,
        payout: {
          type: data.payoutType,
          token: data.payoutType === "crypto" ? data.token : undefined,
          otherToken: data.payoutType === "crypto" && data.token === "Other" ? data.otherToken : undefined,
        },
        source: "hero_form_compact",
      };

      console.log("Form payload:", payload);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock valuation - for crypto payout, show higher value
      const baseValue = payoutType === "crypto" ? 45000 : 38000;
      setEstimatedValue(baseValue);
      setShowResult(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
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
            <p className="text-slate-400">Based on your preferences</p>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div>
              <p className="font-saira text-4xl font-bold text-desert-gold tabular-nums mb-2">
                {formatPrice(estimatedValue)}
              </p>
              <Badge variant="default" className="mb-4 bg-desert-gold text-carbon">
                <Zap className="h-3 w-3 mr-1" />
                {payoutType === "crypto" ? "+18% Crypto Premium" : "Market Rate"}
              </Badge>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Base Value:</span>
                <span className="text-pearl tabular-nums">
                  {formatPrice(payoutType === "crypto" ? Math.round(estimatedValue / 1.18) : estimatedValue)}
                </span>
              </div>
              {payoutType === "crypto" && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Crypto Premium:</span>
                  <span className="text-desert-gold tabular-nums">
                    +{formatPrice(Math.round(estimatedValue * 0.18))}
                  </span>
                </div>
              )}
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
                Get New Offer
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
          <p className="text-slate-400">Tell us about yourself and get an instant offer</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm mb-1 text-pearl">Full name *</label>
              <input
                {...register("name")}
                type="text"
                placeholder="Your name"
                className="w-full rounded-md bg-carbon border border-trim-silver/30 px-3 py-2 text-pearl placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-taillight-red"
              />
              {errors.name && <p className="text-xs text-taillight-red mt-1">{errors.name.message}</p>}
            </div>

            {/* City */}
            <div>
              <label className="block text-sm mb-1 text-pearl">City / Emirate *</label>
              <select
                {...register("city")}
                className="w-full rounded-md bg-carbon border border-trim-silver/30 px-3 py-2 text-pearl focus:outline-none focus:ring-1 focus:ring-taillight-red"
                defaultValue=""
              >
                <option value="" disabled>
                  Select city
                </option>
                {EMIRATES.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
              {errors.city && <p className="text-xs text-taillight-red mt-1">{errors.city.message}</p>}
              
              {/* Extra field when city=Other */}
              {selectedCity === "Other" && (
                <div className="mt-3">
                  <label className="block text-sm mb-1 text-pearl">City/Emirate (Other) *</label>
                  <input
                    {...register("otherCity")}
                    type="text"
                    placeholder="Type your city/emirate"
                    className="w-full rounded-md bg-carbon border border-trim-silver/30 px-3 py-2 text-pearl placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-taillight-red"
                  />
                  {errors.otherCity && <p className="text-xs text-taillight-red mt-1">{errors.otherCity.message}</p>}
                </div>
              )}
            </div>

            {/* Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1 text-pearl">Phone *</label>
                <input
                  {...register("phone")}
                  type="tel"
                  placeholder="+971 XX XXX XXXX"
                  inputMode="tel"
                  className="w-full rounded-md bg-carbon border border-trim-silver/30 px-3 py-2 text-pearl placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-taillight-red"
                />
                {errors.phone && <p className="text-xs text-taillight-red mt-1">{errors.phone.message}</p>}
              </div>
              <div>
                <label className="block text-sm mb-1 text-pearl">Email *</label>
                <input
                  {...register("email")}
                  type="email"
<<<<<<< HEAD
                  placeholder="your@email.com"
=======
                  placeholder="you@email.com"
>>>>>>> 153a1c1346bf295ead69b72d0c73d3ede6c73468
                  className="w-full rounded-md bg-carbon border border-trim-silver/30 px-3 py-2 text-pearl placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-taillight-red"
                />
                {errors.email && <p className="text-xs text-taillight-red mt-1">{errors.email.message}</p>}
              </div>
            </div>

            {/* Payout method */}
            <div className="space-y-2">
              <label className="block text-sm text-pearl">Payout method *</label>
              <div className="flex flex-wrap gap-3">
                <label className="inline-flex items-center gap-2 text-pearl cursor-pointer">
                  <input 
                    type="radio" 
                    value="crypto" 
                    {...register("payoutType")}
                    className="text-taillight-red focus:ring-taillight-red"
                  />
                  <span>Crypto <span className="text-desert-gold">(better terms)</span></span>
                </label>
                <label className="inline-flex items-center gap-2 text-pearl cursor-pointer">
                  <input 
                    type="radio" 
                    value="cash" 
                    {...register("payoutType")}
                    className="text-taillight-red focus:ring-taillight-red"
                  />
                  <span>Cash</span>
                </label>
              </div>
              {errors.payoutType && (
                <p className="text-xs text-taillight-red">{errors.payoutType.message}</p>
              )}
            </div>

            {/* Token select (conditional) */}
            {payoutType === "crypto" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1 text-pearl">Crypto token *</label>
                  <select
                    {...register("token")}
                    defaultValue=""
                    className="w-full rounded-md bg-carbon border border-trim-silver/30 px-3 py-2 text-pearl focus:outline-none focus:ring-1 focus:ring-taillight-red"
                  >
                    <option value="" disabled>
                      Select token
                    </option>
                    {TOKENS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  {errors.token && <p className="text-xs text-taillight-red mt-1">{errors.token.message}</p>}
                </div>

                {token === "Other" && (
                  <div>
                    <label className="block text-sm mb-1 text-pearl">Preferred token</label>
                    <input
                      {...register("otherToken")}
                      type="text"
                      placeholder="e.g., TON, AVAX"
                      className="w-full rounded-md bg-carbon border border-trim-silver/30 px-3 py-2 text-pearl placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-taillight-red"
                    />
                    {errors.otherToken && (
                      <p className="text-xs text-taillight-red mt-1">{errors.otherToken.message}</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              size="lg"
              className="w-full bg-taillight-red hover:bg-taillight-red/90 text-white"
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
                  Get My Offer
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