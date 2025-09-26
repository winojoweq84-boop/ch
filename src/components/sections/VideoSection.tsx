'use client';

import Section from '@/components/layout/Section';
import { CheckCircle2 } from 'lucide-react';

export default function VideoSection() {
  return (
    <Section id="how-it-works">
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Text */}
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            How <span className="text-[#D7B56D]">CarVault</span> Works
          </h2>

          <p className="mt-4 text-xl text-zinc-400">
            Fast, fair, and stress-free across the UAE —{" "}
            <strong>in three quick steps</strong>.
          </p>

          <ul className="mt-6 space-y-3 text-lg">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-1 size-5 text-[#D7B56D]" />
              <span>
                <strong>Submit your car details</strong> — tell us about your car and get an instant valuation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-1 size-5 text-[#D7B56D]" />
              <span>
                <strong>Quick video inspection</strong> — share a short video walkthrough of your car.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-1 size-5 text-[#D7B56D]" />
              <span>
                <strong>Get your offer</strong> — receive a fair market price within hours.
              </span>
            </li>
          </ul>
        </div>

        {/* Video */}
        <div className="relative aspect-video overflow-hidden rounded-2xl ring-1 ring-white/10 bg-black/30">
          <iframe
            className="absolute inset-0 h-full w-full"
            src="https://player.vimeo.com/video/1121566022?badge=0&autopause=0&app_id=58479"
            title="How CarVault Works"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            loading="lazy"
          />
        </div>
      </div>
    </Section>
  );
}