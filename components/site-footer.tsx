"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { navLinks, wedding } from "@/lib/wedding-data"
import { Separator } from "@/components/ui/separator"

export function SiteFooter() {
  const pathname = usePathname()
  if (pathname?.startsWith("/admin")) return null

  return (
    <footer className="mt-20 border-t border-[var(--sidebar-border)] bg-[var(--navy)] text-[var(--navy-foreground)]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--sage)]">
            Together with their families
          </p>
          <h2 className="mt-4 font-serif text-4xl font-semibold text-[var(--navy-foreground)] sm:text-5xl">
            {wedding.brideFirst} <span className="text-[color-mix(in_oklch,var(--burgundy),white_18%)]">&amp;</span>{" "}
            {wedding.groomFirst}
          </h2>
          <p className="mt-3 text-sm tracking-[0.2em] text-[var(--navy-foreground)]/80">
            {wedding.dateShort} &nbsp;·&nbsp; {wedding.city}
          </p>
        </div>

        <Separator className="my-10 bg-[var(--sidebar-border)]" />

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--navy-foreground)]/75 transition-colors hover:text-[color-mix(in_oklch,var(--burgundy),white_18%)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="mt-10 text-center text-xs text-[var(--navy-foreground)]/55">
          {wedding.hashtag} &nbsp;·&nbsp; We are honored to celebrate with you in
          Savannah.
        </p>
      </div>
    </footer>
  )
}
