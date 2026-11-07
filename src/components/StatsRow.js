import { ClockIcon, FlameIcon, StarIcon } from "./icons";

export default function StatsRow({ workout }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
      <span className="inline-flex items-center gap-1.5">
        <ClockIcon />
        {workout.duration} min
      </span>
      <span className="inline-flex items-center gap-1.5">
        <FlameIcon />
        {workout.caloriesBurned} kcal
      </span>
      <span className="inline-flex items-center gap-1.5">
        <StarIcon />
        {workout.rating}
      </span>
    </div>
  );
}
