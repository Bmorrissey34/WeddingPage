import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: "center" | "left"
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <span className="text-xs font-medium uppercase tracking-[0.3em] text-[color-mix(in_oklch,var(--burgundy),transparent_10%)]">
          {eyebrow}
        </span>
      )}
      <h2 className="text-balance font-serif text-3xl font-semibold text-foreground sm:text-4xl">
        {title}
      </h2>
      {align === "center" && (
        <span className="mt-1 h-px w-16 bg-[var(--sage)]" />
      )}
      {description && (
        <p
          className={cn(
            "mt-1 max-w-2xl text-pretty leading-relaxed text-muted-foreground",
            align === "center" ? "mx-auto" : ""
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}

type PageHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="border-b border-border/60 bg-[var(--navy)] text-[var(--navy-foreground)]">
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20">
        {eyebrow && (
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-[var(--sage)]">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-4 text-balance font-serif text-4xl font-semibold sm:text-5xl">
          {title}
        </h1>
        <span className="mx-auto mt-5 block h-px w-16 bg-[var(--sage)]" />
        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-pretty leading-relaxed text-[var(--navy-foreground)]/80">
            {description}
          </p>
        )}
      </div>
    </section>
  )
}
