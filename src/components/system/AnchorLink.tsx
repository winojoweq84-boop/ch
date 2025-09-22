'use client';
import Link from 'next/link';
import { MouseEvent, ReactNode } from 'react';

export default function AnchorLink({
  href, 
  children, 
  onNavigate, 
  className, 
  ariaLabel,
}: { 
  href: `#${string}`; 
  children: ReactNode; 
  onNavigate?: () => void; 
  className?: string; 
  ariaLabel?: string;
}) {
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 0;
      const y = el.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: y, behavior: 'smooth' });
      onNavigate?.();
      history.replaceState(null, '', href); // update hash
    }
  };
  
  return (
    <Link href={href} onClick={onClick} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
