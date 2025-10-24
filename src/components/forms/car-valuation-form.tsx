"use client";

import { useState, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, Clock, ArrowRight } from "lucide-react";
import { BRANDS, MODELS } from "@/data/carOptions";
import { PaymentMethodSelection } from "./payment-method-selection";


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

// const TOKENS = [
//   "USDT",
//   "USDC",
// ] as const;

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
    // Brand and model fields
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
    // Brand/model validation
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
  const [currentStep, setCurrentStep] = useState<'form' | 'payment'>('form');
  const [formData, setFormData] = useState<FormValues | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

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
      
      // Store form data and move to payment selection
      setFormData(data);
      setCurrentStep('payment');
    } catch (error) {
      console.error("Unexpected error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToForm = () => {
    setCurrentStep('form');
    setFormData(null);
  };


  return (
    <div className="max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {currentStep === 'form' ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
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
                  Processing...
                </>
              ) : (
                <>
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Continue to Payment
                </>
              )}
            </Button>

            <p className="text-xs text-slate-400 text-center">
              By submitting, you agree to our terms and privacy policy.
            </p>
          </form>
        </CardContent>
      </Card>
    </motion.div>
        ) : (
          <motion.div
            key="payment"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
          >
            {formData && (
              <PaymentMethodSelection 
                formData={formData} 
                onBack={handleBackToForm}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}