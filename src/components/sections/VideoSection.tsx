'use client';

import StickyVimeo from '@/components/media/StickyVimeo';

export default function VideoSection() {

  return (
    <section id="how-video" className="section section--how-video no-x-scroll px-safe">
      <div className="mx-auto max-w-7xl px-4 lg:grid lg:grid-cols-12 lg:gap-10">
        {/* Left: title + description (match Who We Are styles) */}
        <div className="lg:col-span-6">
          <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6">
            How <span className="text-desert-gold">CarVault</span> Works
          </h2>
          <p className="text-neutral-300 text-lg lg:text-xl leading-relaxed max-w-[60ch] mb-6">
            Fast, fair, and stress-free across the UAE. Online valuation, quick video walk-through,
            instant pricing, and same-day payout & paperwork.
          </p>
          <ol className="space-y-6 mt-8">
            <li>
              <strong className="text-white">Submit Your Car Details</strong><br />
              <span className="text-neutral-300">Tell us about your car and get an instant valuation.</span>
            </li>
            <li>
              <strong className="text-white">Quick Video Inspection</strong><br />
              <span className="text-neutral-300">Share a short video walkthrough of your car.</span>
            </li>
            <li>
              <strong className="text-white">Get Your Offer</strong><br />
              <span className="text-neutral-300">Receive a fair market price offer within hours.</span>
            </li>
            <li>
              <strong className="text-white">Same-Day Settlement</strong><br />
              <span className="text-neutral-300">Complete paperwork and get paid instantly.</span>
            </li>
          </ol>
        </div>

        {/* Right: sticky Vimeo */}
        <div className="lg:col-span-6 lg:self-start mt-8 lg:mt-0">
          <StickyVimeo videoId={1121566022} />
        </div>
      </div>
    </section>
  );
}