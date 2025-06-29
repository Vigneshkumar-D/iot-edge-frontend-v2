"use client";
import { cn } from "../../lib/utils";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { ComponentPropsWithoutRef, ComponentRef, Ref } from "react";

const ScrollArea = ({
	ref,
	className,
	children,
	...props
}: ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & {
	ref?: Ref<ComponentRef<typeof ScrollAreaPrimitive.Root>>;
}) => (
	<ScrollAreaPrimitive.Root ref={ref} className={cn("relative overflow-hidden", className)} {...props}>
		<ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">{children}</ScrollAreaPrimitive.Viewport>
		<ScrollBar />
		<ScrollAreaPrimitive.Corner />
	</ScrollAreaPrimitive.Root>
);
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = ({
	ref,
	className,
	orientation = "vertical",
	...props
}: ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> & {
	ref?: Ref<ComponentRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>>;
}) => (
	<ScrollAreaPrimitive.ScrollAreaScrollbar
		ref={ref}
		orientation={orientation}
		className={cn(
			"flex touch-none transition-colors select-none",
			orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-px",
			orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-px",
			className
		)}
		{...props}
	>
		<ScrollAreaPrimitive.ScrollAreaThumb className="bg-border relative flex-1 rounded-full" />
	</ScrollAreaPrimitive.ScrollAreaScrollbar>
);
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
