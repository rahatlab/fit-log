import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-[#0a0a0b]">
      <div className="mx-auto flex max-w-[1180px] flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog logo" width={20} height={20} />
          <span className="font-display text-base font-bold tracking-wide text-white">
            FITLOG
          </span>
        </div>
        <p className="text-center text-xs text-muted sm:text-right sm:text-sm">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
