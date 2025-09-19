"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RateLockTimer } from "@/components/ui/rate-lock-timer";
import { TrendingUp, DollarSign, Zap, CheckCircle } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const marketPrice = 45000;
const cryptoPrice = 54000;
const savings = cryptoPrice - marketPrice;
const percentage = Math.round((savings / marketPrice) * 100);

export function OfferComparison() {
  return (
    <section id="pricing" className="py-12 lg:py-16 bg-carbon">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-saira text-3xl lg:text-4xl font-bold text-pearl mb-4">
            Why Choose Crypto Payment?
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Traditional dealerships offer market rates. We offer market rates plus crypto premium.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Market Offer */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="relative h-full bg-asphalt border-trim-silver/20">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-slate-400/10 border border-slate-400/20">
                    <DollarSign className="h-6 w-6 text-slate-400" />
                  </div>
                </div>
                <CardTitle className="text-pearl">Traditional Market</CardTitle>
                <p className="text-slate-400 text-sm">What dealerships typically offer</p>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div>
                  <p className="font-saira text-4xl font-bold text-pearl tabular-nums mb-2">
                    {formatPrice(marketPrice)}
                  </p>
                  <p className="text-sm text-slate-400">Market value</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <CheckCircle className="h-4 w-4 text-slate-400" />
                    <span>Standard market rate</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <CheckCircle className="h-4 w-4 text-slate-400" />
                    <span>Bank transfer payment</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <CheckCircle className="h-4 w-4 text-slate-400" />
                    <span>3-5 business days</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full" size="lg">
                  Get Market Offer
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Crypto Offer */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="relative h-full bg-asphalt border-desert-gold/30 overflow-hidden">
              {/* Premium badge */}
              <div className="absolute top-4 right-4">
                <Badge className="bg-desert-gold text-carbon font-semibold">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +{percentage}%
                </Badge>
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-desert-gold/5 via-transparent to-taillight-red/5 pointer-events-none" />

              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-desert-gold/10 border border-desert-gold/30">
                    <Zap className="h-6 w-6 text-desert-gold" />
                  </div>
                </div>
                <CardTitle className="text-pearl">Crypto Premium</CardTitle>
                <p className="text-slate-400 text-sm">Our exclusive crypto payout</p>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div>
                  <p className="font-saira text-4xl font-bold text-desert-gold tabular-nums mb-2">
                    {formatPrice(cryptoPrice)}
                  </p>
                  <p className="text-sm text-slate-400">
                    +{formatPrice(savings)} more
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-pearl">
                    <CheckCircle className="h-4 w-4 text-plate-green" />
                    <span>+{percentage}% above market</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-pearl">
                    <CheckCircle className="h-4 w-4 text-plate-green" />
                    <span>Instant crypto transfer</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-pearl">
                    <CheckCircle className="h-4 w-4 text-plate-green" />
                    <span>Same-day payout</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-taillight-red hover:bg-taillight-red/90 animate-taillight-pulse" 
                  size="lg"
                  data-analytics="comparison-cta"
                  data-cta="get-my-offer"
                  asChild
                >
                  <a href="#offer-form">
                    <Zap className="h-4 w-4 mr-2" />
                    Get My Offer
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bottom disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12 space-y-4"
        >
          <div className="flex justify-center">
            <RateLockTimer duration={15} />
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-carbon/50 rounded-lg border border-trim-silver/10">
            <div className="w-2 h-2 bg-plate-green rounded-full animate-pulse" />
            <p className="text-xs text-slate-400">
              KYC required under UAE AML/CFT. Final price after quick inspection. Network fees apply.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
