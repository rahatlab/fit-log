import Image from "next/image";
import Link from "next/link";
import StatsRow from "./StatsRow";

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group card flex flex-col overflow-hidden transition hover:border-accent/50"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-black">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((group) => (
            <span key={group} className="tag">
              {group}
            </span>
          ))}
        </div>
        <div>
          <h3 className="font-display text-lg leading-tight font-semibold text-white uppercase">
            {workout.name}
          </h3>
          <p className="mt-1 text-xs text-muted">{workout.equipment}</p>
        </div>
        <div className="mt-auto pt-1">
          <StatsRow workout={workout} />
        </div>
      </div>
    </Link>
  );
}
