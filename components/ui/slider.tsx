import { Slider as SliderPrimitive } from "@base-ui/react/slider";

import { cn } from "@/lib/utils/cn";

type SliderProps = SliderPrimitive.Root.Props<number | readonly number[]> & {
  className?: string;
};

export function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: SliderProps) {
  const values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [min];

  return (
    <SliderPrimitive.Root
      className={cn(
        "relative flex w-full items-center select-none touch-none py-2",
        className
      )}
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      {...props}
    >
      <SliderPrimitive.Control className="relative flex w-full grow items-center">
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-zinc-200">
          <SliderPrimitive.Indicator className="absolute h-full rounded-full bg-zinc-950" />
        </SliderPrimitive.Track>
        {values.map((_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            className="block size-5 rounded-full border-2 border-zinc-950 bg-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-zinc-300 active:scale-95"
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}
