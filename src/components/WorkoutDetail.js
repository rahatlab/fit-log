"use client";

import Image from "next/image";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import { useToast } from "@/components/Toast";
import StatsRow from "@/components/StatsRow";
import {
  BookmarkIcon,
  CalendarPlusIcon,
  CheckIcon,
} from "@/components/icons";

const SPEC_ROWS = (workout) => [
  ["Equipment", workout.equipment],
  ["Difficulty", workout.difficulty],
  ["Sets", workout.sets],
  ["Reps", workout.reps],
  ["Duration", `${workout.duration} min`],
  ["Calories", `${workout.caloriesBurned} kcal`],
  ["Rating", workout.rating],
];

export default function WorkoutDetail({ workout }) {
  const { addToPlan, addToSaved, inPlan, inSaved, planFull } = usePlan();
  const toast = useToast();

  const alreadyPlanned = inPlan(workout.id);
  const alreadySaved = inSaved(workout.id);
  const planIsFull = planFull && !alreadyPlanned;

  const handleAdd = () => {
    if (alreadyPlanned) {
      toast.push("Already in today's plan", "error");
      return;
    }
    if (planIsFull) {
      toast.push("Plan is full — cap is five lifts for today", "error");
      return;
    }
    addToPlan(workout);
    toast.push("Added to today's plan");
  };

  const handleSave = () => {
    if (alreadySaved) {
      toast.push("Already saved for later", "error");
      return;
    }
    addToSaved(workout);
    toast.push("Saved for later");
  };

  return (
    <div className="mx-auto w-full max-w-[1180px] px-4 py-8 sm:px-6 sm:py-12">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Left — visual */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-surface">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Right — details */}
        <div>
          <h1 className="font-display text-4xl leading-tight font-bold text-white uppercase sm:text-5xl">
            {workout.name}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            {workout.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {workout.muscleGroups.map((group) => (
              <span key={group} className="tag">
                {group}
              </span>
            ))}
          </div>

          {/* Key specs */}
          <div className="card mt-7 divide-y divide-line">
            {SPEC_ROWS(workout).map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between gap-4 px-5 py-3.5"
              >
                <span className="text-[11px] font-medium tracking-[0.15em] text-muted uppercase">
                  {label}
                </span>
                <span className="text-sm font-semibold text-white">
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Instructions */}
          <h2 className="font-display mt-8 text-lg font-semibold tracking-wide text-white uppercase">
            Instructions
          </h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-muted">
            {workout.instructions.map((step) => (
              <li key={step} className="pl-1">
                {step}
              </li>
            ))}
          </ol>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleAdd}
              disabled={alreadyPlanned || planIsFull}
              className="btn-accent"
            >
              {alreadyPlanned ? <CheckIcon /> : <CalendarPlusIcon />}
              {alreadyPlanned
                ? "In today's plan"
                : planIsFull
                  ? "Plan full (5/5)"
                  : "Add to today's plan"}
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={alreadySaved}
              className="btn-outline"
            >
              {alreadySaved ? <CheckIcon /> : <BookmarkIcon />}
              {alreadySaved ? "Saved" : "Save for later"}
            </button>
          </div>

          <div className="mt-6 lg:hidden">
            <StatsRow workout={workout} />
          </div>
        </div>
      </div>

      <Link
        href="/"
        className="mt-10 inline-block text-sm text-muted transition hover:text-accent"
      >
        ← Back to the library
      </Link>
    </div>
  );
}
