import React from "react";

type Props = {
  id?: string;
  className?: string;
  children: React.ReactNode;
};

export default function Section({ id, className = "", children }: Props) {
  return (
    <section id={id} className={`section-y ${className}`}>
      <div className="container mx-auto max-w-7xl px-4">{children}</div>
    </section>
  );
}
