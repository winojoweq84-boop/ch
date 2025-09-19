"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Car, Search, DollarSign, Zap, ArrowRight, Clock } from "lucide-react";

const steps = [
  {
    icon: Car,
    title: "Enter Car Details",
    description: "Tell us about your car - make, model, year, mileage, and condition.",
    time: "2 minutes",
    color: "taillight-red"
  },
  {
    icon: Search,
    title: "Get Instant Valuation",
    description: "Our AI analyzes market data and provides a fair crypto offer.",
    time: "Instant",
    color: "desert-gold"
  },
  {
    icon: DollarSign,
    title: "Schedule Inspection",
    description: "Book a quick 15-minute inspection at your location or our center.",
    time: "Same day",
    color: "plate-green"
  },
  {
    icon: Zap,
    title: "Receive Crypto Payment",
    description: "Get paid instantly in crypto or traditional bank transfer.",
    time: "Immediate",
    color: "taillight-red"
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12 lg:py-16 bg-asphalt">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            <Clock className="h-3 w-3 mr-1" />
            Simple Process
          </Badge>
          <h2 className="font-saira text-3xl lg:text-4xl font-bold text-pearl mb-4">
            How It Works
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Sell your car in 4 simple steps. From valuation to payment, we handle everything.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="h-full bg-carbon border-trim-silver/20 hover:border-trim-silver/40 transition-colors group">
                <CardContent className="p-6 text-center">
                  {/* Step number */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-taillight-red rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-white tabular-nums">
                      {index + 1}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <div className={`p-4 rounded-full bg-${step.color}/10 border border-${step.color}/20 group-hover:border-${step.color}/40 transition-colors`}>
                      <step.icon className={`h-6 w-6 text-${step.color}`} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-saira text-lg font-semibold text-pearl mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-400 mb-4">
                    {step.description}
                  </p>

                  {/* Time badge */}
                  <Badge variant="outline" className="text-xs">
                    {step.time}
                  </Badge>
                </CardContent>
              </Card>

              {/* Arrow connector */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 z-10">
                  <div className="w-6 h-6 bg-asphalt rounded-full border border-trim-silver/20 flex items-center justify-center">
                    <ArrowRight className="h-3 w-3 text-trim-silver" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="max-w-2xl mx-auto bg-carbon border-trim-silver/20">
            <CardContent className="p-8">
              <h3 className="font-saira text-2xl font-bold text-pearl mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-slate-400 mb-6">
                Join thousands of satisfied customers who got more for their cars with crypto payment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="animate-taillight-pulse"
                  data-analytics="how-it-works-cta"
                  data-cta="get-offer"
                  asChild
                >
                  <a href="#offer-form">
                    <Zap className="h-4 w-4 mr-2" />
                    Get My Offer
                  </a>
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}




