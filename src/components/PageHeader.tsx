import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

type PageHeaderProps = {
  title: ReactNode;
  description?: string;
};

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden pt-36 pb-16">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float-slow absolute -top-32 left-1/4 h-80 w-80 rounded-full bg-accent-blue/25 blur-[110px]" />
        <div className="animate-float-slower absolute top-10 right-1/4 h-80 w-80 rounded-full bg-accent-violet/25 blur-[110px]" />
      </div>

      <Reveal className="relative mx-auto max-w-3xl px-6 text-center">
        <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-balance sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted">
            {description}
          </p>
        )}
      </Reveal>
    </section>
  );
}
