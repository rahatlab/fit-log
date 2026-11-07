import { notFound } from "next/navigation";
import { fetchWorkout } from "@/lib/api";
import WorkoutDetail from "@/components/WorkoutDetail";

export default async function WorkoutPage({ params }) {
  const { id } = await params;

  if (!/^\d+$/.test(id)) notFound();

  let workout = null;
  try {
    workout = await fetchWorkout(id);
  } catch {
    workout = null;
  }

  if (!workout || !workout.id) notFound();

  return <WorkoutDetail workout={workout} />;
}
