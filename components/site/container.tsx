import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto w-full px-4 sm:px-6", {
  variants: {
    size: {
      /** Long-form reading column — buying guides, editorial prose. */
      narrow: "max-w-3xl",
      /**
       * Ett snäpp bredare än `narrow`. Ligger mellan den och `default`.
       *
       * För sidor med två spalter där den ena är ett formulär. `narrow` gav
       * `/kontakt` en formulärspalt som blev trång så snart en sidokolumn stod
       * bredvid, men steget till `default` eller bredare gör sidan till en
       * yta i stället för en läsbredd. Provat på `max-w-6xl` 2026-08-03 och
       * förkastat: alldeles för brett.
       */
      roomy: "max-w-4xl",
      /** Default page width for comparison content. */
      default: "max-w-5xl",
      /** Wide tables and card grids. */
      wide: "max-w-7xl",
      /** Edge to edge, keeps only the gutter. */
      full: "max-w-none",
    },
  },
  defaultVariants: { size: "default" },
});

export type ContainerProps = React.ComponentProps<"div"> &
  VariantProps<typeof containerVariants> & {
    as?: React.ElementType;
  };

export function Container({
  className,
  size,
  as: Comp = "div",
  ...props
}: ContainerProps) {
  return (
    <Comp
      data-slot="container"
      className={cn(containerVariants({ size }), className)}
      {...props}
    />
  );
}
