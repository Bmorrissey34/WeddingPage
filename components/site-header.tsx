"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { navLinks, wedding } from "@/lib/wedding-data"

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  // Hide the public site chrome inside the admin area.
  if (pathname?.startsWith("/admin")) return null

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur supports-backdrop-filter:bg-background/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-serif text-xl font-semibold tracking-wide text-foreground">
            {wedding.monogram}
          </span>
          <span className="text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground">
            Savannah
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium tracking-wide transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                {active && (
                  <span className="mx-auto mt-0.5 block h-px w-4 bg-[var(--sage)]" />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            render={<Link href="/rsvp" />}
            nativeButton={false}
            className="hidden sm:inline-flex"
          >
            RSVP
          </Button>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="lg:hidden" />
              }
            >
              <Menu />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-4/5 max-w-sm">
              <SheetHeader className="border-b border-border/60">
                <SheetTitle className="font-serif text-2xl">
                  {wedding.monogram}
                </SheetTitle>
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  {wedding.city}
                </p>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {navLinks.map((link) => {
                  const active = pathname === link.href
                  return (
                    <SheetClose
                      key={link.href}
                      render={
                        <Link
                          href={link.href}
                          className={cn(
                            "rounded-md px-3 py-3 text-base font-medium transition-colors",
                            active
                              ? "bg-secondary text-foreground"
                              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                          )}
                        />
                      }
                    >
                      {link.label}
                    </SheetClose>
                  )
                })}
              </nav>
              <div className="mt-auto p-4">
                <SheetClose
                  render={
                    <Button
                      render={<Link href="/rsvp" />}
                      nativeButton={false}
                      size="lg"
                      className="w-full"
                    />
                  }
                >
                  RSVP
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
