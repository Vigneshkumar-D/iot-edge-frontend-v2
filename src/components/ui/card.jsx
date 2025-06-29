// import { cn } from "../../lib/utils";
// import { HTMLAttributes, Ref } from "react";

// const Card = ({
// 	ref,
// 	className,
// 	...props
// }: HTMLAttributes<HTMLDivElement> & {
// 	ref?: Ref<HTMLDivElement>;
// }) => <div ref={ref} className={cn("bg-card text-card-foreground flex flex-col gap-2 rounded-xl border p-3 shadow-xs", className)} {...props} />;
// Card.displayName = "Card";

// const CardHeader = ({
// 	ref,
// 	className,
// 	...props
// }: HTMLAttributes<HTMLDivElement> & {
// 	ref?: Ref<HTMLDivElement>;
// }) => <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props} />;
// CardHeader.displayName = "CardHeader";

// const CardTitle = ({
// 	ref,
// 	className,
// 	...props
// }: HTMLAttributes<HTMLHeadingElement> & {
// 	ref?: Ref<HTMLParagraphElement>;
// }) => <h3 ref={ref} className={cn("text-2xl leading-none font-semibold tracking-tight", className)} {...props} />;
// CardTitle.displayName = "CardTitle";

// const CardDescription = ({
// 	ref,
// 	className,
// 	...props
// }: HTMLAttributes<HTMLParagraphElement> & {
// 	ref?: Ref<HTMLParagraphElement>;
// }) => <p ref={ref} className={cn("text-muted-foreground text-sm", className)} {...props} />;
// CardDescription.displayName = "CardDescription";

// const CardContent = ({
// 	ref,
// 	className,
// 	...props
// }: HTMLAttributes<HTMLDivElement> & {
// 	ref?: Ref<HTMLDivElement>;
// }) => <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props} />;
// CardContent.displayName = "CardContent";

// const CardFooter = ({
// 	ref,
// 	className,
// 	...props
// }: HTMLAttributes<HTMLDivElement> & {
// 	ref?: Ref<HTMLDivElement>;
// }) => <div ref={ref} className={cn("flex items-center gap-2", className)} {...props} />;
// CardFooter.displayName = "CardFooter";

// export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };


import { cn } from "../../lib/utils";

const Card = ({ innerRef, className, ...props }) => (
  <div
    ref={innerRef}
    className={cn(
      "bg-card text-card-foreground flex flex-col gap-2 rounded-xl border p-3 shadow-xs",
      className
    )}
    {...props}
  />
);
Card.displayName = "Card";

const CardHeader = ({ innerRef, className, ...props }) => (
  <div
    ref={innerRef}
    className={cn("flex flex-col gap-2", className)}
    {...props}
  />
);
CardHeader.displayName = "CardHeader";

const CardTitle = ({ innerRef, className, ...props }) => (
  <h3
    ref={innerRef}
    className={cn(
      "text-2xl leading-none font-semibold tracking-tight",
      className
    )}
    {...props}
  />
);
CardTitle.displayName = "CardTitle";

const CardDescription = ({ innerRef, className, ...props }) => (
  <p
    ref={innerRef}
    className={cn("text-muted-foreground text-sm", className)}
    {...props}
  />
);
CardDescription.displayName = "CardDescription";

const CardContent = ({ innerRef, className, ...props }) => (
  <div
    ref={innerRef}
    className={cn("flex flex-col gap-2", className)}
    {...props}
  />
);
CardContent.displayName = "CardContent";

const CardFooter = ({ innerRef, className, ...props }) => (
  <div
    ref={innerRef}
    className={cn("flex items-center gap-2", className)}
    {...props}
  />
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
