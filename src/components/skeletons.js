function Bar({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse bg-surface-2 ${className}`}
    />
  );
}

/** Skeleton card used while the library grid is fetching. */
export function WorkoutCardSkeleton() {
  return (
    <div className="card overflow-hidden">
      <div className="aspect-[16/10] animate-pulse bg-surface-2" />
      <div className="flex flex-col gap-3 p-4">
        <div className="flex gap-2">
          <Bar className="h-5 w-16 rounded-full" />
          <Bar className="h-5 w-12 rounded-full" />
        </div>
        <Bar className="h-5 w-2/3 rounded" />
        <Bar className="h-3 w-1/2 rounded" />
        <Bar className="h-3 w-3/4 rounded" />
      </div>
    </div>
  );
}

/** Skeleton row used in the My Plan lists. */
export function PlanRowSkeleton() {
  return (
    <div className="card flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
      <Bar className="h-20 w-full rounded-lg sm:h-16 sm:w-28" />
      <div className="flex-1 space-y-2">
        <Bar className="h-5 w-40 max-w-full rounded" />
        <Bar className="h-3 w-24 rounded" />
        <Bar className="h-3 w-48 max-w-full rounded" />
      </div>
      <div className="flex gap-2">
        <Bar className="h-9 w-28 rounded-md" />
        <Bar className="h-9 w-32 rounded-md" />
      </div>
    </div>
  );
}

/** Full-page skeleton for the My Plan route. */
export function MyPlanSkeleton() {
  return (
    <div className="mx-auto w-full max-w-[1180px] px-4 py-10 sm:px-6 sm:py-12">
      <Bar className="h-9 w-40 rounded sm:h-11" />
      <Bar className="mt-3 h-4 w-72 max-w-full rounded" />

      <div className="card mt-7 grid grid-cols-3 divide-x divide-line">
        {[0, 1, 2].map((index) => (
          <div key={index} className="px-4 py-5 sm:px-7 sm:py-7">
            <Bar className="h-3 w-16 rounded" />
            <Bar className="mt-2 h-8 w-20 rounded sm:h-10" />
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <Bar className="h-10 w-56 max-w-full rounded-md" />
        <Bar className="h-9 w-32 rounded-md" />
      </div>

      <div className="mt-5 flex flex-col gap-4">
        <PlanRowSkeleton />
        <PlanRowSkeleton />
        <PlanRowSkeleton />
      </div>

      <p className="sr-only" role="status">
        Loading workouts…
      </p>
    </div>
  );
}

/** Full-page skeleton for the workout details route. */
export function DetailSkeleton() {
  return (
    <div className="mx-auto w-full max-w-[1180px] px-4 py-8 sm:px-6 sm:py-12">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <Bar className="aspect-[4/5] w-full rounded-2xl" />

        <div>
          <Bar className="h-10 w-4/5 rounded sm:h-12" />
          <div className="mt-4 space-y-2.5">
            <Bar className="h-4 w-full rounded" />
            <Bar className="h-4 w-11/12 rounded" />
            <Bar className="h-4 w-2/3 rounded" />
          </div>

          <div className="mt-5 flex gap-2">
            <Bar className="h-6 w-16 rounded-full" />
            <Bar className="h-6 w-14 rounded-full" />
          </div>

          <div className="card mt-7 divide-y divide-line">
            {[0, 1, 2, 3, 4, 5, 6].map((index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 px-5 py-3.5"
              >
                <Bar className="h-3 w-24 rounded" />
                <Bar className="h-3 w-20 rounded" />
              </div>
            ))}
          </div>

          <Bar className="mt-8 h-5 w-40 rounded" />
          <div className="mt-3 space-y-2.5">
            {[0, 1, 2, 3].map((index) => (
              <Bar key={index} className="h-4 w-full rounded" />
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Bar className="h-11 w-52 rounded-md" />
            <Bar className="h-11 w-44 rounded-md" />
          </div>
        </div>
      </div>

      <p className="sr-only" role="status">
        Loading workout…
      </p>
    </div>
  );
}
