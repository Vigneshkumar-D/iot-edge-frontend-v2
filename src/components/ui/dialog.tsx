"use client";
import { cn } from "../../lib/utils";
import { X } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ComponentPropsWithoutRef, ComponentRef, HTMLAttributes, Ref } from "react";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = ({
	ref,
	className,
	...props
}: ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> & {
	ref?: Ref<ComponentRef<typeof DialogPrimitive.Overlay>>;
}) => <DialogPrimitive.Overlay ref={ref} className={cn("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80 p-5", className)} {...props} />;
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = ({
	ref,
	className,
	children,
	...props
}: ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
	ref?: Ref<ComponentRef<typeof DialogPrimitive.Content>>;
}) => (
	<DialogPortal>
		<DialogOverlay />
		<DialogPrimitive.Content
			ref={ref}
			className={cn(
				"bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed top-[50%] left-[50%] z-50 grid w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] gap-4 rounded-xl border p-6 shadow-lg duration-200",
				className
			)}
			{...props}
		>
			{children}
			<DialogPrimitive.Close className="ring-offset-background data-[state=open]:bg-accent data-[state=open]:text-muted-foreground focus:ring-ring absolute top-4 right-4 rounded-xl opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
				<X className="size-4" />
				<span className="sr-only">Close</span>
			</DialogPrimitive.Close>
		</DialogPrimitive.Content>
	</DialogPortal>
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => <div className={cn("xs:text-left flex flex-col space-y-1.5 text-center", className)} {...props} />;
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => <div className={cn("xs:flex-row xs:justify-end xs:space-x-2 flex flex-col-reverse", className)} {...props} />;
DialogFooter.displayName = "DialogFooter";

const DialogTitle = ({
	ref,
	className,
	...props
}: ComponentPropsWithoutRef<typeof DialogPrimitive.Title> & {
	ref?: Ref<ComponentRef<typeof DialogPrimitive.Title>>;
}) => <DialogPrimitive.Title ref={ref} className={cn("text-lg leading-none font-semibold tracking-tight", className)} {...props} />;
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = ({
	ref,
	className,
	...props
}: ComponentPropsWithoutRef<typeof DialogPrimitive.Description> & {
	ref?: Ref<ComponentRef<typeof DialogPrimitive.Description>>;
}) => <DialogPrimitive.Description ref={ref} className={cn("text-muted-foreground text-sm", className)} {...props} />;
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export { Dialog, DialogPortal, DialogOverlay, DialogClose, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription };
