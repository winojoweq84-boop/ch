"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text";
import { HelpCircle } from "lucide-react";
import { getAssetPath } from "@/lib/basepath";

export default function FAQ() {
  const shouldReduceMotion = useReducedMotion();

  const faqItems = [
    {
      id: 'item-1',
      question: 'How quickly can I sell my car?',
      answer: 'With CarVault, you can sell your car in as little as 2 hours! Our process includes instant online valuation, same-day inspection, and immediate payment in crypto or cash. Most transactions are completed within 24 hours.',
    },
    {
      id: 'item-2',
      question: 'What payment methods do you accept?',
      answer: 'We accept multiple payment methods including USDT, USDC, Bitcoin, Ethereum, and traditional cash payments. All crypto payments are processed instantly to your wallet, while cash payments are available for same-day transactions.',
    },
    {
      id: 'item-3',
      question: 'Do you buy cars in any condition?',
      answer: 'Yes! We buy cars in any condition - from brand new to heavily damaged. Whether your car is running perfectly or needs major repairs, we provide fair valuations based on current market value and condition.',
    },
    {
      id: 'item-4',
      question: 'How accurate is your online valuation?',
      answer: 'Our online valuation is highly accurate and based on real-time market data, your car\'s specifications, and current UAE market conditions. The final price is confirmed after our quick inspection, but typically matches our online estimate within 5-10%.',
    },
    {
      id: 'item-5',
      question: 'What paperwork is required?',
      answer: 'We handle all the paperwork for you! You just need your Emirates ID, car registration (mulkiya), and any service records. Our team takes care of the transfer process, insurance cancellation, and all necessary documentation.',
    },
    {
      id: 'item-6',
      question: 'Do you offer better prices than dealerships?',
      answer: 'Yes! We typically offer 15-20% more than traditional dealerships because we have lower overhead costs and work directly with buyers. Our transparent pricing ensures you get the best market value for your vehicle.',
    },
    {
      id: 'item-7',
      question: 'Is there a fee for the service?',
      answer: 'No hidden fees! Our service is completely free for sellers. We make money by selling your car to our network of buyers, so you keep 100% of the agreed price. The only fees are standard government transfer fees.',
    },
    {
      id: 'item-8',
      question: 'Can I sell my car if I still have a loan?',
      answer: 'Absolutely! We work with banks and finance companies to settle outstanding loans. We can pay off your remaining balance directly to the bank and give you the difference, or help you understand your options if you owe more than the car\'s value.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion ? {} : {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
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

  return (
    <section 
      id="faq" 
      data-testid="faq-section" 
      className="relative bg-carbon text-pearl py-12 lg:py-16"
    >
      {/* Background texture */}
      <div 
        aria-hidden 
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_50%,#000_40%,transparent_100%)] opacity-[0.04]"
        style={{ backgroundImage: `url(${getAssetPath('/images/patterns/grille-hex.svg')})` }} 
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-4xl mx-auto px-safe no-x-scroll"
      >
        {/* Section Header */}
        <motion.div 
          variants={itemVariants}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-taillight-red/20 to-desert-gold/20 ring-1 ring-trim-silver/20 flex items-center justify-center">
              <HelpCircle className="h-6 w-6 text-trim-silver" />
            </div>
            <div className="font-saira text-4xl/tight md:text-5xl font-bold">
              <div className="flex items-baseline justify-center">
                <BlurredStagger text="Frequently Asked " className="text-pearl" />
                <span className="text-desert-gold">
                  <BlurredStagger text="Questions" className="text-desert-gold" />
                </span>
              </div>
            </div>
          </div>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Get instant answers to common questions about selling your car with CarVault. 
            Can&apos;t find what you&apos;re looking for? Our support team is here to help.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div 
          variants={itemVariants}
          className="relative"
        >
          <Accordion
            type="single"
            collapsible
            className="bg-asphalt/40 backdrop-blur-sm rounded-3xl w-full border-0 px-6 lg:px-8 py-4 shadow-2xl"
          >
            {faqItems.map((item, index) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="last:border-b-0"
              >
                <AccordionTrigger className="cursor-pointer text-left text-lg font-semibold text-pearl hover:text-taillight-red hover:no-underline py-6 transition-colors duration-200">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-slate-300 text-base leading-relaxed pb-4">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

      </motion.div>
    </section>
  );
}
