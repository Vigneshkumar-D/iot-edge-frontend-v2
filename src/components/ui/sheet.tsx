"use client";
import { cn } from "../../lib/utils";
import { X } from "lucide-react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { ComponentPropsWithoutRef, ComponentRef, HTMLAttributes, Ref } from "react";

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = ({
	ref,
	className,
	...props
}: ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay> & {
	ref?: Ref<ComponentRef<typeof SheetPrimitive.Overlay>>;
}) => <SheetPrimitive.Overlay className={cn("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80", className)} {...props} ref={ref} />;
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-xs transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500", {
	variants: {
		side: {
			top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
			bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
			left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
			right: "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
		},
	},
	defaultVariants: {
		side: "right",
	},
});

interface SheetContentProps extends ComponentPropsWithoutRef<typeof SheetPrimitive.Content>, VariantProps<typeof sheetVariants> {}

const SheetContent = ({
	ref,
	side = "right",
	className,
	children,
	...props
}: SheetContentProps & {
	ref?: Ref<ComponentRef<typeof SheetPrimitive.Content>>;
}) => (
	<SheetPortal>
		<SheetOverlay />
		<SheetPrimitive.Content ref={ref} className={cn(sheetVariants({ side }), className)} {...props}>
			{children}
			<SheetPrimitive.Close className="ring-offset-background data-[state=open]:bg-secondary focus:ring-ring absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
				<X className="size-4" />
				<span className="sr-only">Close</span>
			</SheetPrimitive.Close>
		</SheetPrimitive.Content>
	</SheetPortal>
);
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />;
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />;
SheetFooter.displayName = "SheetFooter";

const SheetTitle = ({
	ref,
	className,
	...props
}: ComponentPropsWithoutRef<typeof SheetPrimitive.Title> & {
	ref?: Ref<ComponentRef<typeof SheetPrimitive.Title>>;
}) => <SheetPrimitive.Title ref={ref} className={cn("text-foreground text-lg font-semibold", className)} {...props} />;
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = ({
	ref,
	className,
	...props
}: ComponentPropsWithoutRef<typeof SheetPrimitive.Description> & {
	ref?: Ref<ComponentRef<typeof SheetPrimitive.Description>>;
}) => <SheetPrimitive.Description ref={ref} className={cn("text-muted-foreground text-sm", className)} {...props} />;
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export { Sheet, SheetPortal, SheetOverlay, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription };
