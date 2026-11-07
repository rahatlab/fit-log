const baseProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function ClockIcon({ className = "h-3.5 w-3.5" }) {
  return (
    <svg {...baseProps} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function FlameIcon({ className = "h-3.5 w-3.5" }) {
  return (
    <svg {...baseProps} className={className} aria-hidden="true">
      <path d="M12 3s5 4 5 8a5 5 0 0 1-10 0c0-1.5.7-2.8 1.5-3.7C9 8.5 10 7 10 5c1 .8 2 2 2 4 1-1 1.5-3 0-6z" />
    </svg>
  );
}

export function StarIcon({ className = "h-3.5 w-3.5" }) {
  return (
    <svg
      {...baseProps}
      className={className}
      fill="currentColor"
      stroke="none"
      aria-hidden="true"
    >
      <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.7L12 16.9l-5.2 2.6 1-5.7L3.5 9.7l5.9-.9L12 3.5z" />
    </svg>
  );
}

export function DumbbellIcon({ className = "h-4 w-4" }) {
  return (
    <svg {...baseProps} className={className} aria-hidden="true">
      <path d="M6.5 6.5v11M3.5 8.5v7M17.5 6.5v11M20.5 8.5v7M6.5 12h11" />
    </svg>
  );
}

export function CalendarPlusIcon({ className = "h-4 w-4" }) {
  return (
    <svg {...baseProps} className={className} aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18M12 14v4M10 16h4" />
    </svg>
  );
}

export function BookmarkIcon({ className = "h-4 w-4" }) {
  return (
    <svg {...baseProps} className={className} aria-hidden="true">
      <path d="M6 4h12v17l-6-4-6 4V4z" />
    </svg>
  );
}

export function CheckIcon({ className = "h-4 w-4" }) {
  return (
    <svg {...baseProps} className={className} aria-hidden="true">
      <path d="M4 12.5l5 5L20 6.5" />
    </svg>
  );
}

export function XIcon({ className = "h-4 w-4" }) {
  return (
    <svg {...baseProps} className={className} aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function ChevronDownIcon({ className = "h-4 w-4" }) {
  return (
    <svg {...baseProps} className={className} aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function ArrowRightIcon({ className = "h-4 w-4" }) {
  return (
    <svg {...baseProps} className={className} aria-hidden="true">
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}
