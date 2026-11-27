const paths = {
  "up-right": "M5 19 19 5M5 5h14v14",
  right: "M4 12h16m-7-7 7 7-7 7",
  down: "M12 4v16m-7-7 7 7 7-7",
  up: "M12 20V4m-7 7 7-7 7 7",
};

/** Draw arrows rather than relying on platform-specific Unicode emoji fonts. */
export function ArrowIcon({ direction = "up-right" }: { direction?: keyof typeof paths }) {
  return (
    <svg className="zoo-arrow-icon" width="1em" height="1em" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={paths[direction]} />
    </svg>
  );
}
