import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const CloudElement = ({
  variant = 1,
  className = "",
  style = {},
  ...props
}: React.ComponentProps<'div'> & { variant?: 1 | 2 }) => {
  const src = `/cloud-${variant}.png`;
  return (
    <div className={cn("pointer-events-none select-none", className)} style={style} {...props}>
      <Image src={src} alt={`Cloud ${variant}`} width={120} height={80} priority draggable={false} />
    </div>
  );
};

export const GrassBushElement = ({
  variant = 1,
  className = "",
  style = {},
  ...props
}: React.ComponentProps<'div'> & { variant?: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 7 }) => {
  const src = `/grass-bush-${variant}.png`;
  if(variant === 7) {
    return (
      <div
        className={cn("pointer-events-none select-none", className)}
        style={style}
        {...props}
      >
        <Image
          src={"/rass-around-stone.png"}
          alt={`Grass Bush ${variant}`}
          width={120}
          height={60}
          priority
          draggable={false}
        />
      </div>
    );
  }
  return (
    <div className={cn("pointer-events-none select-none", className)} style={style} {...props}>
      <Image src={src} alt={`Grass Bush ${variant}`} width={120} height={60} priority draggable={false} />
    </div>
  );
};

export const FlowerCropElement = ({
  variant = 1,
  className = "",
  style = {},
  ...props
}: React.ComponentProps<'div'> & { variant?: 1 | 2 | 3 }) => {
  const src = `/flower-crop-${variant}.png`;
  return (
    <div className={cn("pointer-events-none select-none", className)} style={style} {...props}>
      <Image src={src} alt={`Flower Crop ${variant}`} width={60} height={60} priority draggable={false} />
    </div>
  );
};
