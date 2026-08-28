import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
};

export default function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden pt-36 pb-16">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float-slow absolute -top-32 left-1/4 h-80 w-80 rounded-full bg-accent-blue/25 blur-[110px]" />
        <div className="animate-float-slower absolute top-10 right-1/4 h-80 w-80 rounded-full bg-accent-violet/25 blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-accent-violet">
          {eyebrow}
        </span>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
