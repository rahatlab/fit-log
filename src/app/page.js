"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchWorkouts } from "@/lib/api";
import WorkoutCard from "@/components/WorkoutCard";
import { WorkoutCardSkeleton } from "@/components/skeletons";
import { DumbbellIcon } from "@/components/icons";

export default function Home() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await fetchWorkouts();
        if (!cancelled) {
          setWorkouts(Array.isArray(data) ? data : []);
          setError(false);
        }
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      {/* Hero / Banner */}
      <section className="mx-auto w-full max-w-[1180px] px-4 pt-6 sm:px-6 sm:pt-8">
        <div className="relative overflow-hidden rounded-2xl border border-line bg-surface">
          <div className="grid items-center gap-8 p-7 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:p-14">
            <div>
              <p className="text-xs font-bold tracking-[0.25em] text-accent uppercase">
                Workout Library
              </p>
              <h1 className="font-display mt-5 text-4xl leading-[0.95] font-bold text-white uppercase sm:text-5xl lg:text-6xl">
                Train with intent.
                <br />
                Log every set.
              </h1>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-muted sm:text-base">
                FitLog is a dark, no-nonsense gym companion: pick a lift, lock
                it into today&apos;s plan, and watch the week&apos;s work add
                up.
              </p>
              <a href="#library" className="btn-accent mt-7">
                <DumbbellIcon />
                Browse Workouts
              </a>
            </div>
            <div className="relative mx-auto w-full max-w-[440px] lg:max-w-none">
              <Image
                src="/banner.png"
                alt="Athlete training on a gym machine"
                width={560}
                height={440}
                priority
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Library */}
      <section
        id="library"
        className="mx-auto w-full max-w-[1180px] px-4 py-12 sm:px-6 sm:py-16"
      >
        <h2 className="font-display text-3xl font-bold text-white uppercase sm:text-4xl">
          The Library
        </h2>
        <p className="mt-2 text-sm text-muted sm:text-base">
          Twelve lifts covering every major muscle group.
        </p>

        {loading && (
          <>
            <p className="sr-only" role="status">
              Loading workouts…
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <WorkoutCardSkeleton key={index} />
              ))}
            </div>
          </>
        )}

        {!loading && error && (
          <div className="card mt-8 flex flex-col items-center gap-4 px-6 py-16 text-center">
            <p className="font-display text-2xl text-white uppercase">
              Couldn&apos;t load the library
            </p>
            <p className="text-sm text-muted">
              Something went wrong while fetching workouts. Check your
              connection and try again.
            </p>
            <button
              type="button"
              onClick={() => {
                setLoading(true);
                setError(false);
                fetchWorkouts()
                  .then((data) => setWorkouts(Array.isArray(data) ? data : []))
                  .catch(() => setError(true))
                  .finally(() => setLoading(false));
              }}
              className="btn-accent"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {workouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
