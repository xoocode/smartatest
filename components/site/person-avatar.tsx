import Image from "next/image";

import { cn } from "@/lib/utils";
import type { Person } from "@/lib/people";

const sizeMap = {
  xs: { box: "size-8", text: "text-xs", sizes: "32px" },
  sm: { box: "size-10", text: "text-sm", sizes: "40px" },
  md: { box: "size-14", text: "text-base", sizes: "56px" },
  lg: { box: "size-20", text: "text-xl", sizes: "80px" },
  xl: { box: "size-32 sm:size-40", text: "text-4xl", sizes: "160px" },
} as const;

export type PersonAvatarProps = {
  person: Pick<Person, "name" | "avatar">;
  size?: keyof typeof sizeMap;
  /** Accent ring around the portrait, as on the author page header. */
  ring?: boolean;
  className?: string;
};

/**
 * Portraits are frequently missing while content is being built, so initials
 * are a designed state rather than a broken image.
 */
export function PersonAvatar({
  person,
  size = "md",
  ring = false,
  className,
}: PersonAvatarProps) {
  const s = sizeMap[size];
  const initials = person.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <span
      data-slot="person-avatar"
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted",
        s.box,
        ring && "ring-2 ring-award-accent ring-offset-2 ring-offset-background",
        className,
      )}
    >
      {person.avatar ? (
        <Image
          src={person.avatar}
          alt={person.name}
          fill
          sizes={s.sizes}
          className="object-cover"
        />
      ) : (
        <span
          aria-hidden="true"
          className={cn("font-heading text-muted-foreground", s.text)}
        >
          {initials}
        </span>
      )}
    </span>
  );
}
