// import { cn } from "../../lib/utils";
// import { InputHTMLAttributes, ReactNode, Ref } from "react";

// export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
// 	endContent?: ReactNode;
// 	type?: "email" | "number" | "password" | "search" | "tel" | "text" | "time" | "url";
// 	startContent?: ReactNode;
// }

// const Input = ({
// 	ref,
// 	className,
// 	endContent,
// 	startContent,
// 	type,
// 	...props
// }: InputProps & {
// 	ref?: Ref<HTMLInputElement>;
// }) => {
// 	return (
// 		<div
// 			className={cn(
// 				"border-border bg-input ring-offset-background has-focus:ring-ring flex h-12 w-full items-center justify-center gap-2 rounded-xl border px-3 py-2 has-focus:ring-2 has-focus:ring-offset-2 has-disabled:cursor-not-allowed has-disabled:opacity-50",
// 				className
// 			)}
// 		>
// 			{startContent}
// 			<input autoComplete="on" className="peer placeholder:text-muted-foreground flex w-full items-center bg-transparent text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50" ref={ref} type={type} {...props} />
// 			{endContent}
// 		</div>
// 	);
// };

// Input.displayName = "Input";

// export { Input };


import { cn } from "../../lib/utils";
import { forwardRef } from "react";

const Input = forwardRef(({ className, endContent, startContent, type, ...props }, ref) => {
  return (
    <div
      className={cn(
        "border-border bg-input ring-offset-background has-focus:ring-ring flex h-12 w-full items-center justify-center gap-2 rounded-xl border px-3 py-2 has-focus:ring-2 has-focus:ring-offset-2 has-disabled:cursor-not-allowed has-disabled:opacity-50",
        className
      )}
    >
      {startContent}
      <input
        autoComplete="on"
        className="peer placeholder:text-muted-foreground flex w-full items-center bg-transparent text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
        ref={ref}
        type={type}
        {...props}
      />
      {endContent}
    </div>
  );
});

Input.displayName = "Input";

export { Input };
