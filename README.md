# CryptoCar UAE - Premium Car Buyout Platform

A premium Next.js 14 application for an urgent car buyout company in the UAE, featuring instant crypto payments and automotive-inspired design.

## 🚗 Features

- **Automotive Aesthetic**: Classic car brand styling with UAE color cues
- **Crypto Premium**: Up to 20% more than market value with instant crypto payout
- **Real-time Rate Lock**: 15-minute countdown timer for offer validity
- **Responsive Design**: Mobile-first approach with accessibility compliance
- **Form Validation**: React Hook Form with Zod schema validation
- **Smooth Animations**: Framer Motion for micro-interactions
- **Type Safety**: Full TypeScript implementation

## 🎨 Design System

### Color Palette
- **Carbon**: `#0A0A0B` - Primary background
- **Asphalt**: `#111316` - Section/card backgrounds  
- **Pearl**: `#F2F4F7` - Primary text
- **Taillight Red**: `#E10600` - Primary accent, CTAs
- **Desert Gold**: `#D7B36A` - Premium accent for "+20%"
- **Plate Green**: `#2F9D57` - Minor accent (badges only)

### Typography
- **Headlines**: Saira SemiCondensed (automotive, compact)
- **Body**: Inter (clean, readable)
- **Arabic**: Tajawal (RTL support ready)

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Forms**: React Hook Form + Zod
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📱 Key Components

- **Hero Section**: Value proposition with animated pricing display
- **Offer Comparison**: Market vs Crypto pricing with premium badge
- **Car Valuation Form**: Multi-step form with real-time validation
- **Rate Lock Timer**: Live countdown with accessibility features
- **Trust Strip**: Social proof with animated counters

## 🔧 Configuration

The app is configured with:
- Custom Tailwind color tokens in `globals.css`
- shadcn/ui components in `components/ui/`
- Form schemas and validation in `components/forms/`
- Utility functions in `lib/utils.ts`

## 📋 TODO

- [ ] Implement next-intl for EN/AR internationalization
- [ ] Add RTL support for Arabic
- [ ] Connect to real valuation API
- [ ] Add crypto payment integration
- [ ] Implement user authentication
- [ ] Add admin dashboard

## 🎯 Business Logic

- **Core Promise**: "Sell your car today — get up to 20% more with instant crypto payout"
- **Primary CTA**: "Get My Crypto Offer"
- **Trust Indicators**: "20k+ sellers · 30+ partners · Same-day payout"
- **Compliance**: KYC required under UAE AML/CFT regulations

## 🔒 Compliance

- KYC verification required
- AML/CFT compliant
- UAE Central Bank licensed
- Network fees disclosed
- Rate lock terms clear

---

Built with ❤️ for the UAE automotive market