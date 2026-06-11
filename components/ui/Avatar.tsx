/* eslint-disable @next/next/no-img-element */
export function Avatar({
  name,
  src,
  size = "md",
}: {
  name: string;
  src?: string | null;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = { sm: "h-8 w-8 text-xs", md: "h-10 w-10 text-sm", lg: "h-16 w-16 text-xl" };
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("");

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${sizes[size]} rounded-full object-cover ring-2 ring-primary/20`}
      />
    );
  }
  return (
    <span
      className={`${sizes[size]} grid place-items-center rounded-full bg-primary/15 font-semibold text-primary dark:text-primary-strong ring-2 ring-primary/20`}
    >
      {initials}
    </span>
  );
}
