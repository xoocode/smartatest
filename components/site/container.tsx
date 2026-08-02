import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto w-full px-4 sm:px-6", {
  variants: {
    size: {
      /** Long-form reading column — buying guides, editorial prose. */
      narrow: "max-w-3xl",
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
