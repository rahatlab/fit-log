import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-[1180px] flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="font-display text-7xl leading-none font-bold text-accent sm:text-8xl">
        404
      </p>
      <h1 className="font-display mt-5 text-2xl font-bold text-white uppercase sm:text-3xl">
        This page missed the set
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted sm:text-base">
        The route you asked for doesn&apos;t exist or the workout id is invalid.
        Head back to the library and keep training.
      </p>
      <Link href="/" className="btn-accent mt-8">
        Back to workouts
      </Link>
    </div>
  );
}
