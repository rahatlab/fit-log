"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

const LINKS = [
  { href: "/", label: "Workouts" },
  { href: "/my-plan", label: "My Plan" },
];

function isActiveLink(pathname, href) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-[#0a0a0b]/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between gap-3 px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image src="/logo.png" alt="FitLog logo" width={26} height={26} />
          <span className="font-display text-lg leading-none font-bold tracking-wide text-white">
            FITLOG
          </span>
        </Link>

        {/* Center nav */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {LINKS.map((link) => {
            const active = isActiveLink(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition sm:px-4 sm:text-sm ${
                  active
                    ? "bg-accent text-black"
                    : "text-muted hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Status badges */}
        <div className="flex shrink-0 items-center gap-3 sm:gap-5">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-xs text-muted transition hover:text-white sm:text-sm"
          >
            <span>Plan</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-[11px] font-bold text-black">
              {plan.length}
            </span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-xs text-muted transition hover:text-white sm:text-sm"
          >
            <span>Saved</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-line px-1.5 text-[11px] font-bold text-white">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
