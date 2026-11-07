const PRIMARY = "https://api.abcz.workers.dev/api/fitlog";
const FALLBACK = "https://api.api-store.workers.dev/api/fitlog";

async function get(url) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

async function withFallback(urlFor) {
  try {
    return await get(urlFor(PRIMARY));
  } catch {
    return await get(urlFor(FALLBACK));
  }
}

export function fetchWorkouts() {
  return withFallback((base) => base);
}

export function fetchWorkout(id) {
  return withFallback((base) => `${base}/${id}`);
}
