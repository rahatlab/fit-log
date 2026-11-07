"use client";

import { createContext, useContext, useEffect, useState } from "react";

const PlanContext = createContext(null);

const PLAN_KEY = "fitlog:plan";
const SAVED_KEY = "fitlog:saved";
export const PLAN_CAP = 5;

function readList(key) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // One-time hydration from localStorage after mount, so the server-rendered
  // HTML (empty lists) never mismatches the client's stored lists.
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setPlan(readList(PLAN_KEY));
    setSaved(readList(SAVED_KEY));
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  }, [plan, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  }, [saved, hydrated]);

  const addToPlan = (workout) => {
    let added = false;
    setPlan((current) => {
      if (current.length >= PLAN_CAP) return current;
      if (current.some((w) => w.id === workout.id)) return current;
      added = true;
      return [...current, { ...workout, done: false }];
    });
    return added;
  };

  const addToSaved = (workout) => {
    let added = false;
    setSaved((current) => {
      if (current.some((w) => w.id === workout.id)) return current;
      added = true;
      return [...current, workout];
    });
    return added;
  };

  const removeFromPlan = (id) =>
    setPlan((current) => current.filter((w) => w.id !== id));

  const removeFromSaved = (id) =>
    setSaved((current) => current.filter((w) => w.id !== id));

  const markDone = (id) =>
    setPlan((current) =>
      current.map((w) => (w.id === id ? { ...w, done: !w.done } : w)),
    );

  const value = {
    plan,
    saved,
    hydrated,
    addToPlan,
    addToSaved,
    removeFromPlan,
    removeFromSaved,
    markDone,
    inPlan: (id) => plan.some((w) => w.id === id),
    inSaved: (id) => saved.some((w) => w.id === id),
    planFull: plan.length >= PLAN_CAP,
  };

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used inside <PlanProvider>");
  return ctx;
}
