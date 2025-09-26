"use client";

import { useState, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, Zap, Clock } from "lucide-react";
import { BRANDS, MODELS } from "@/data/carOptions";
import { sendLeadToWebhook } from "@/lib/lead";
import { useRouter } from "next/navigation";

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
    // NEW: Brand and model fields
    brand: z.enum(BRANDS, { message: "Select your car brand" }),
    model: z.string().min(1, "Please specify model"),
    otherBrand: z.string().optional(),
    otherModel: z.string().optional(),
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
    // NEW: Brand/model validation
    if (val.brand === "Other" && !val.otherBrand) {
      ctx.addIssue({
        path: ["otherBrand"],
        code: z.ZodIssueCode.custom,
        message: "Please specify your car brand",
      });
    }
    if (val.brand === "Other" && !val.otherModel) {
      ctx.addIssue({
        path: ["otherModel"],
        code: z.ZodIssueCode.custom,
        message: "Please specify your car model",
      });
    }
  });

type FormValues = z.infer<typeof schema>;

export function CarValuationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { payoutType: "crypto" },
  });

  const payoutType = watch("payoutType");
  const token = watch("token");
  const selectedCity = watch("city");
  const selectedBrand = watch("brand");

  // Get available models based on selected brand
  const modelOptions = useMemo(() => {
    if (!selectedBrand || selectedBrand === "Other" || !(selectedBrand in MODELS)) return [];
    return MODELS[selectedBrand as keyof typeof MODELS] || [];
  }, [selectedBrand]);

  // Reset dependent fields when brand changes
  useEffect(() => {
    if (selectedBrand && selectedBrand !== "Other") {
      // Reset model when brand changes
      setValue("model", "");
      setValue("otherBrand", "");
      setValue("otherModel", "");
    }
  }, [selectedBrand, setValue]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      console.log("Form data:", data);
      
      // Try to send to webhook (but don't fail the form if it fails)
      try {
        await sendLeadToWebhook({
          name: data.name,
          city: data.city === "Other" ? (data.otherCity || data.city) : data.city,
          phone: data.phone,
          email: data.email,
          payoutMethod: data.payoutType,
          token: data.payoutType === "crypto" ? data.token : undefined,
          otherToken: data.payoutType === "crypto" && data.token === "Other" ? data.otherToken : undefined,
          brand: data.brand === "Other" ? (data.otherBrand || data.brand) : data.brand,
          model: (data.model === "Other" || data.brand === "Other") ? (data.otherModel || data.model) : data.model,
          source: "hero_form_compact",
        });
        console.log("Lead sent successfully");
      } catch (webhookError) {
        console.warn("Webhook failed, but continuing with form submission:", webhookError);
        // Log the lead data for manual processing if needed
        console.log("Lead data for manual processing:", {
          name: data.name,
          phone: data.phone,
          email: data.email,
          city: data.city === "Other" ? (data.otherCity || data.city) : data.city,
          brand: data.brand === "Other" ? (data.otherBrand || data.brand) : data.brand,
          model: (data.model === "Other" || data.brand === "Other") ? (data.otherModel || data.model) : data.model,
          payoutMethod: data.payoutType,
          token: data.payoutType === "crypto" ? data.token : undefined,
        });
      }
      
      // Redirect to thank you page
      router.push('/thank-you');
    } catch (error) {
      console.error("Unexpected error submitting form:", error);
      // Even if there's an unexpected error, redirect to thank you page
      router.push('/thank-you');
    } finally {
      setIsSubmitting(false);
    }
  };


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
          <CardTitle className="text-2xl text-pearl">Get Your Instant Car Offer</CardTitle>
          <p className="text-slate-400">Share a few details and receive a same-day, real-market offer. No branch visit.</p>
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
                  placeholder="you@email.com"
                  className="w-full rounded-md bg-carbon border border-trim-silver/30 px-3 py-2 text-pearl placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-taillight-red"
                />
                {errors.email && <p className="text-xs text-taillight-red mt-1">{errors.email.message}</p>}
              </div>
            </div>

            {/* Car Brand and Model */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1 text-pearl">Car Brand *</label>
                <select
                  {...register("brand")}
                  className="w-full rounded-md bg-carbon border border-trim-silver/30 px-3 py-2 text-pearl focus:outline-none focus:ring-1 focus:ring-taillight-red"
                  defaultValue=""
                >
                  <option value="" disabled>Select a brand</option>
                  {BRANDS.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
                {errors.brand && <p className="text-xs text-taillight-red mt-1">{errors.brand.message}</p>}
              </div>

              {selectedBrand && selectedBrand !== "Other" ? (
                <div>
                  <label className="block text-sm mb-1 text-pearl">Model *</label>
                  <select
                    {...register("model")}
                    disabled={!modelOptions.length}
                    className="w-full rounded-md bg-carbon border border-trim-silver/30 px-3 py-2 text-pearl focus:outline-none focus:ring-1 focus:ring-taillight-red disabled:opacity-50"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      {modelOptions.length ? "Select a model" : "Select brand first"}
                    </option>
                    {modelOptions.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                  {errors.model && <p className="text-xs text-taillight-red mt-1">{errors.model.message}</p>}
                </div>
              ) : selectedBrand === "Other" ? (
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1 text-pearl">Brand (Other) *</label>
                    <input
                      {...register("otherBrand")}
                      type="text"
                      placeholder="Enter brand name"
                      className="w-full rounded-md bg-carbon border border-trim-silver/30 px-3 py-2 text-pearl placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-taillight-red"
                    />
                    {errors.otherBrand && <p className="text-xs text-taillight-red mt-1">{errors.otherBrand.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm mb-1 text-pearl">Model (Other) *</label>
                    <input
                      {...register("otherModel")}
                      type="text"
                      placeholder="Enter model name"
                      className="w-full rounded-md bg-carbon border border-trim-silver/30 px-3 py-2 text-pearl placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-taillight-red"
                    />
                    {errors.otherModel && <p className="text-xs text-taillight-red mt-1">{errors.otherModel.message}</p>}
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm mb-1 text-pearl">Model *</label>
                  <input
                    {...register("model")}
                    type="text"
                    placeholder="Enter car model"
                    disabled
                    className="w-full rounded-md bg-carbon border border-trim-silver/30 px-3 py-2 text-pearl placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-taillight-red disabled:opacity-50"
                  />
                  {errors.model && <p className="text-xs text-taillight-red mt-1">{errors.model.message}</p>}
                </div>
              )}
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