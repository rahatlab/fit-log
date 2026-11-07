"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import { useToast } from "@/components/Toast";
import StatsRow from "@/components/StatsRow";
import {
  CheckIcon,
  ChevronDownIcon,
  XIcon,
} from "@/components/icons";

const TABS = [
  { id: "plan", label: "Today's Plan" },
  { id: "saved", label: "Saved" },
];

const SORT_OPTIONS = [
  { id: "duration", label: "Duration" },
  { id: "calories", label: "Calories" },
  { id: "rating", label: "Rating" },
];

function PlanRow({ workout, tab, onRemove, onDone }) {
  return (
    <div className="card flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
      <div className="relative h-20 w-full shrink-0 overflow-hidden rounded-lg border border-line bg-black sm:h-16 sm:w-28">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 640px) 100vw, 112px"
          className="object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-display truncate text-lg font-semibold text-white uppercase">
            {workout.name}
          </h3>
          {workout.done && (
            <span className="tag inline-flex items-center gap-1">
              <CheckIcon className="h-2.5 w-2.5" />
              Done
            </span>
          )}
        </div>
        <p className="mt-0.5 text-xs text-muted">{workout.equipment}</p>
        <div className="mt-2">
          <StatsRow workout={workout} />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:justify-end">
        <Link href={`/workout/${workout.id}`} className="btn-outline !px-4 !py-2.5">
          View Details
        </Link>
        {tab === "plan" && (
          <button
            type="button"
            onClick={() => onDone(workout)}
            disabled={workout.done}
            className="btn-accent !px-4 !py-2.5"
          >
            <CheckIcon />
            {workout.done ? "Done" : "Mark as Done"}
          </button>
        )}
        <button
          type="button"
          aria-label={`Remove ${workout.name}`}
          onClick={() => onRemove(workout)}
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-line text-muted transition hover:border-red-500/50 hover:text-red-400"
        >
          <XIcon />
        </button>
      </div>
    </div>
  );
}

export default function MyPlanPage() {
  const {
    plan,
    saved,
    hydrated,
    removeFromPlan,
    removeFromSaved,
    markDone,
  } = usePlan();
  const toast = useToast();

  const [tab, setTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");
  const [loading, setLoading] = useState(true);

  // Brief loading state while the stored plan hydrates from localStorage.
  useEffect(() => {
    if (!hydrated) return;
    const timer = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timer);
  }, [hydrated]);

  const metrics = useMemo(() => {
    const exercises = plan.length;
    const minutes = plan.reduce((sum, w) => sum + (w.duration || 0), 0);
    const calories = plan.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0);
    return { exercises, minutes, calories };
  }, [plan]);

  const visibleList = useMemo(() => {
    const fields = {
      duration: "duration",
      calories: "caloriesBurned",
      rating: "rating",
    };
    const field = fields[sortBy];
    const factor = sortBy === "duration" ? 1 : -1; // duration asc, others desc
    const list = tab === "plan" ? [...plan] : [...saved];
    return list.sort((a, b) => (a[field] - b[field]) * factor);
  }, [plan, saved, tab, sortBy]);

  const handleRemove = (workout) => {
    if (tab === "plan") {
      removeFromPlan(workout.id);
      toast.push(`Removed “${workout.name}” from today's plan`);
    } else {
      removeFromSaved(workout.id);
      toast.push(`Removed “${workout.name}” from saved`);
    }
  };

  const handleDone = (workout) => {
    markDone(workout.id);
    toast.push(`“${workout.name}” marked as done`);
  };

  return (
    <div className="mx-auto w-full max-w-[1180px] px-4 py-10 sm:px-6 sm:py-12">
      <h1 className="font-display text-4xl font-bold text-white uppercase sm:text-5xl">
        My Plan
      </h1>
      <p className="mt-2 text-sm text-muted sm:text-base">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      {/* Metrics summary */}
      <div className="card mt-7 grid grid-cols-3 divide-x divide-line">
        {[
          { label: "Exercises", value: metrics.exercises, accent: true },
          { label: "Minutes", value: metrics.minutes },
          { label: "Calories", value: metrics.calories },
        ].map((stat) => (
          <div key={stat.label} className="px-4 py-5 sm:px-7 sm:py-7">
            <p className="text-xs text-muted sm:text-sm">{stat.label}</p>
            <p
              className={`font-display mt-1 text-3xl font-bold sm:text-5xl ${
                stat.accent ? "text-accent" : "text-white"
              }`}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Tabs + sort */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex rounded-md border border-line bg-surface p-1">
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`cursor-pointer rounded px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                tab === item.id
                  ? "bg-surface-2 text-white"
                  : "text-muted hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="sort-by" className="text-sm text-muted">
            Sort By
          </label>
          <div className="relative">
            <select
              id="sort-by"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="field-select"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-2.5 h-4 w-4 -translate-y-1/2 text-muted" />
          </div>
        </div>
      </div>

      {/* List */}
      <div className="mt-5">
        {loading ? (
          <div className="card px-6 py-16 text-center text-sm text-muted">
            Loading workouts…
          </div>
        ) : visibleList.length === 0 ? (
          <div className="flex flex-col items-center rounded-xl border border-dashed border-line px-6 py-16 text-center">
            <p className="font-display text-2xl font-bold text-white uppercase">
              Nothing here yet
            </p>
            <p className="mt-2 text-sm text-muted">
              {tab === "plan"
                ? "Browse the library and add a lift to get today moving."
                : "Save a workout for later and it will show up here."}
            </p>
            <Link href="/" className="btn-accent mt-6 !rounded-lg">
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {visibleList.map((workout) => (
              <PlanRow
                key={workout.id}
                workout={workout}
                tab={tab}
                onRemove={handleRemove}
                onDone={handleDone}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
