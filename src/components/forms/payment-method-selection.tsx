"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Banknote, 
  Zap, 
  Shield, 
  Clock, 
  TrendingUp,
  CheckCircle,
  ArrowLeft
} from "lucide-react";
import { useRouter } from "next/navigation";

interface PaymentMethodSelectionProps {
  formData: any;
  onBack: () => void;
}

const TOKENS = [
  "USDT",
  "USDC",
] as const;

export function PaymentMethodSelection({ formData, onBack }: PaymentMethodSelectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedToken, setSelectedToken] = useState<string>('');
  const router = useRouter();

  const handlePaymentMethod = async (method: 'crypto' | 'bank') => {
    // For crypto payments, require token selection
    if (method === 'crypto' && !selectedToken) {
      alert('Please select a crypto token before proceeding.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Store the complete lead data with payment method
      const leadData = {
        ...formData,
        payoutMethod: method,
        token: method === 'crypto' ? selectedToken : undefined,
        timestamp: new Date().toISOString(),
      };
      
      // Store in session storage for thank-you page
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('leadData', JSON.stringify(leadData));
      }
      
      // Send to webhook
      try {
        const { sendLeadToWebhook } = await import('@/lib/lead');
        await sendLeadToWebhook({
          name: formData.name,
          city: formData.city === "Other" ? (formData.otherCity || formData.city) : formData.city,
          phone: formData.phone,
          email: formData.email,
          payoutMethod: method === 'crypto' ? 'crypto' : 'cash',
          token: method === 'crypto' ? selectedToken : undefined,
          brand: formData.brand === "Other" ? (formData.otherBrand || formData.brand) : formData.brand,
          model: (formData.model === "Other" || formData.brand === "Other") ? (formData.otherModel || formData.model) : formData.model,
          source: "hero_form_compact",
        });
        console.log("Lead sent successfully");
      } catch (webhookError) {
        console.warn("Webhook failed, but continuing with form submission:", webhookError);
      }
      
      // Redirect based on payment method
      if (method === 'crypto') {
        router.push('/thank-you');
      } else {
        router.push('/cash-option');
      }
    } catch (error) {
      console.error("Error processing payment method:", error);
      // Still redirect even if there's an error
      if (method === 'crypto') {
        router.push('/thank-you');
      } else {
        router.push('/cash-option');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      {/* Progress Indicator */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-taillight-red rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm text-pearl">Step 1 of 2</span>
          </div>
          <div className="w-12 h-0.5 bg-trim-silver/30"></div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-trim-silver/30 rounded-full flex items-center justify-center">
              <span className="text-sm text-slate-400">2</span>
            </div>
            <span className="text-sm text-slate-400">Step 2 of 2</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold text-pearl mb-4"
        >
          Choose Your Payout Method
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-slate-400 text-lg"
        >
          Select how you'd like to receive your payment
        </motion.p>
      </div>

      {/* Payment Options */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Crypto Payment - Recommended */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          <Card className="bg-gradient-to-br from-emerald-900/20 to-emerald-800/10 border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 cursor-pointer group">
            <div className="absolute -top-3 left-4">
              <Badge className="bg-emerald-500 text-white font-semibold px-3 py-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                Recommended
              </Badge>
            </div>
            
            <CardHeader className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                  <Zap className="h-6 w-6 text-emerald-400" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-400">+5-10%</div>
                  <div className="text-sm text-emerald-300">Higher payout</div>
                </div>
              </div>
              <CardTitle className="text-xl text-pearl">Crypto Payment</CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-emerald-300">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">Instant settlement</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-300">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">Zero banking delays</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-300">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">No processing fees</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-300">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">5-10% higher offers</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-emerald-500/20">
                  <p className="text-sm text-emerald-200">
                    Receive your payout instantly with better rates and no banking delays or fees.
                  </p>
                </div>
                
                {/* Crypto Token Selection */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-emerald-200 mb-2">
                    Select Crypto Token *
                  </label>
                  <select
                    value={selectedToken}
                    onChange={(e) => setSelectedToken(e.target.value)}
                    className="w-full rounded-md bg-emerald-900/30 border border-emerald-500/30 px-3 py-2 text-emerald-100 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  >
                    <option value="" disabled>Choose token</option>
                    {TOKENS.map((token) => (
                      <option key={token} value={token} className="bg-emerald-900">
                        {token}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Button
            onClick={() => handlePaymentMethod('crypto')}
            disabled={isSubmitting || !selectedToken}
            className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Choose Crypto Payment
              </>
            )}
          </Button>
        </motion.div>

        {/* Bank/Cash Transfer */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-asphalt border-trim-silver/20 hover:border-trim-silver/40 transition-all duration-300 hover:shadow-lg cursor-pointer group">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-full bg-slate-500/20 border border-slate-500/30">
                  <Banknote className="h-6 w-6 text-slate-400" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-400">Standard</div>
                  <div className="text-sm text-slate-500">Rate</div>
                </div>
              </div>
              <CardTitle className="text-xl text-pearl">Bank / Cash Transfer</CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">1-3 business days</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm">Bank verification required</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <CreditCard className="w-4 h-4" />
                    <span className="text-sm">Possible local fees</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Processing delays</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-trim-silver/20">
                  <p className="text-sm text-slate-400">
                    Standard payout with possible processing delays or local fees.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Button
            onClick={() => handlePaymentMethod('bank')}
            disabled={isSubmitting}
            className="w-full mt-4 border border-trim-silver/30 text-pearl hover:bg-trim-silver/10 hover:text-pearl bg-asphalt/50"
          >
            {isSubmitting ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Banknote className="h-4 w-4 mr-2" />
                Choose Bank Transfer
              </>
            )}
          </Button>
        </motion.div>
      </div>

      {/* Back Button */}
      <div className="text-center">
        <Button
          onClick={onBack}
          className="text-slate-400 hover:text-pearl bg-transparent hover:bg-trim-silver/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to form
        </Button>
      </div>
    </motion.div>
  );
}
