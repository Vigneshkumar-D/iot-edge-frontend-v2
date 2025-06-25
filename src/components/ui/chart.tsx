// "use client";
// import { cn } from "../../lib/utils";
// import * as RechartsPrimitive from "recharts";
// import { ComponentProps, ComponentPropsWithoutRef, ComponentRef, ComponentType, createContext, CSSProperties, ReactNode, Ref, use, useId, useMemo } from "react";

// // Format: { THEME_NAME: CSS_SELECTOR }
// const THEMES = { light: "", dark: ".dark" } as const;

// export type ChartConfig = {
// 	[k in string]: {
// 		label?: ReactNode;
// 		icon?: ComponentType;
// 	} & ({ color?: string; theme?: never } | { color?: never; theme: Record<keyof typeof THEMES, string> });
// };

// export type ChartData = {
// 	label: string;
// 	value: number;
// }[];

// type ChartContextProps = {
// 	config: ChartConfig;
// };

// const ChartContext = createContext<ChartContextProps | null>(null);

// function useChart() {
// 	const context = use(ChartContext);

// 	if (!context) {
// 		throw new Error("useChart must be used within a <ChartContainer />");
// 	}

// 	return context;
// }

// const ChartContainer = ({
// 	ref,
// 	id,
// 	className,
// 	children,
// 	config,
// 	...props
// }: ComponentPropsWithoutRef<"div"> & {
// 	config: ChartConfig;
// 	children: ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];
// 	ref?: Ref<ComponentRef<"div">>;
// }) => {
// 	const uniqueId = useId();
// 	const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

// 	return (
//         (<ChartContext value={{ config }}>
//             <div
// 				data-chart={chartId}
// 				ref={ref}
// 				className={cn(
// 					"[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
// 					className
// 				)}
// 				{...props}
// 			>
// 				<ChartStyle id={chartId} config={config} />
// 				<RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
// 			</div>
//         </ChartContext>)
//     );
// };
// ChartContainer.displayName = "Chart";

// const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
// 	const colorConfig = Object.entries(config).filter(config => config[1].theme || config[1].color);

// 	if (!colorConfig.length) {
// 		return null;
// 	}

// 	return (
// 		<style
// 			dangerouslySetInnerHTML={{
// 				__html: Object.entries(THEMES)
// 					.map(
// 						([theme, prefix]) => `
// ${prefix} [data-chart=${id}] {
// ${colorConfig
// 	.map(([key, itemConfig]) => {
// 		const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] || itemConfig.color;
// 		return color ? `  --color-${key}: ${color};` : null;
// 	})
// 	.join("\n")}
// }
// `
// 					)
// 					.join("\n"),
// 			}}
// 		/>
// 	);
// };

// const ChartTooltip = RechartsPrimitive.Tooltip;

// const ChartTooltipContent = ({
// 	ref,
// 	active,
// 	payload,
// 	className,
// 	indicator = "dot",
// 	hideLabel = false,
// 	hideIndicator = false,
// 	label,
// 	labelFormatter,
// 	labelClassName,
// 	formatter,
// 	color,
// 	nameKey,
// 	labelKey,
// }: ComponentPropsWithoutRef<"div"> &
// 	ComponentProps<typeof RechartsPrimitive.Tooltip> & {
// 		hideLabel?: boolean;
// 		hideIndicator?: boolean;
// 		indicator?: "line" | "dot" | "dashed";
// 		nameKey?: string;
// 		labelKey?: string;
// 		ref?: Ref<ComponentRef<"div">>;
// 	}) => {
// 	const { config } = useChart();

// 	const tooltipLabel = useMemo(() => {
// 		if (hideLabel || !payload?.length) {
// 			return null;
// 		}

// 		const [item] = payload;
// 		const key = `${labelKey || item.dataKey || item.name || "value"}`;
// 		const itemConfig = getPayloadConfigFromPayload(config, item, key);
// 		const value = !labelKey && typeof label === "string" ? config[label as keyof typeof config]?.label || label : itemConfig?.label;

// 		if (labelFormatter) {
// 			return <div className={cn("font-medium", labelClassName)}>{labelFormatter(value, payload)}</div>;
// 		}

// 		if (!value) {
// 			return null;
// 		}

// 		return <div className={cn("font-medium", labelClassName)}>{value}</div>;
// 	}, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);

// 	if (!active || !payload?.length) {
// 		return null;
// 	}

// 	const nestLabel = payload.length === 1 && indicator !== "dot";

// 	return (
// 		<div ref={ref} className={cn("border-border/50 bg-background grid min-w-32 items-start gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs shadow-xl", className)}>
// 			{!nestLabel ? tooltipLabel : null}
// 			<div className="grid gap-1.5">
// 				{payload.map((item, index) => {
// 					const key = `${nameKey || item.name || item.dataKey || "value"}`;
// 					const itemConfig = getPayloadConfigFromPayload(config, item, key);
// 					const indicatorColor = color || item.payload.fill || item.color;

// 					return (
// 						<div key={item.dataKey} className={cn("[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5", indicator === "dot" && "items-center")}>
// 							{formatter && item?.value !== undefined && item.name ? (
// 								formatter(item.value, item.name, item, index, item.payload)
// 							) : (
// 								<>
// 									{itemConfig?.icon ? (
// 										<itemConfig.icon />
// 									) : (
// 										!hideIndicator && (
// 											<div
// 												className={cn("shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)", {
// 													"h-2.5 w-2.5": indicator === "dot",
// 													"w-1": indicator === "line",
// 													"w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
// 													"my-0.5": nestLabel && indicator === "dashed",
// 												})}
// 												style={
// 													{
// 														"--color-bg": indicatorColor,
// 														"--color-border": indicatorColor,
// 													} as CSSProperties
// 												}
// 											/>
// 										)
// 									)}
// 									<div className={cn("flex flex-1 justify-between gap-1 leading-none", nestLabel ? "items-end" : "items-center")}>
// 										<div className="grid gap-1.5">
// 											{nestLabel ? tooltipLabel : null}
// 											<span className="text-muted-foreground">{itemConfig?.label || item.name}</span>
// 										</div>
// 										{item.value && <span className="text-foreground font-mono font-medium tabular-nums">{item.value.toLocaleString()}</span>}
// 									</div>
// 								</>
// 							)}
// 						</div>
// 					);
// 				})}
// 			</div>
// 		</div>
// 	);
// };
// ChartTooltipContent.displayName = "ChartTooltip";

// const ChartLegend = RechartsPrimitive.Legend;

// const ChartLegendContent = ({
// 	ref,
// 	className,
// 	hideIcon = false,
// 	payload,
// 	verticalAlign = "bottom",
// 	nameKey,
// }: ComponentPropsWithoutRef<"div"> &
// 	Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
// 		hideIcon?: boolean;
// 		nameKey?: string;
// 		ref?: Ref<ComponentRef<"div">>;
// 	}) => {
// 	const { config } = useChart();

// 	if (!payload?.length) {
// 		return null;
// 	}

// 	return (
// 		<div ref={ref} className={cn("flex items-center justify-center gap-4", verticalAlign === "top" ? "pb-3" : "pt-3", className)}>
// 			{payload.map(item => {
// 				const key = `${nameKey || item.dataKey || "value"}`;
// 				const itemConfig = getPayloadConfigFromPayload(config, item, key);

// 				return (
// 					<div key={item.value} className={cn("[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3")}>
// 						{itemConfig?.icon && !hideIcon ? (
// 							<itemConfig.icon />
// 						) : (
// 							<div
// 								className="h-2 w-2 shrink-0 rounded-[2px]"
// 								style={{
// 									backgroundColor: item.color,
// 								}}
// 							/>
// 						)}
// 						{itemConfig?.label}
// 					</div>
// 				);
// 			})}
// 		</div>
// 	);
// };
// ChartLegendContent.displayName = "ChartLegend";

// // Helper to extract item config from a payload.
// function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown, key: string) {
// 	if (typeof payload !== "object" || payload === null) {
// 		return undefined;
// 	}

// 	const payloadPayload = "payload" in payload && typeof payload.payload === "object" && payload.payload !== null ? payload.payload : undefined;

// 	let configLabelKey: string = key;

// 	if (key in payload && typeof payload[key as keyof typeof payload] === "string") {
// 		configLabelKey = payload[key as keyof typeof payload] as string;
// 	} else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key as keyof typeof payloadPayload] === "string") {
// 		configLabelKey = payloadPayload[key as keyof typeof payloadPayload] as string;
// 	}

// 	return configLabelKey in config ? config[configLabelKey] : config[key as keyof typeof config];
// }

// export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle };



"use client";

import { cn } from "../../lib/utils";
import * as Recharts from "recharts";
import {
  createContext,
  useContext,
  useMemo,
  useId,
  forwardRef,
  ComponentType,
  ReactNode,
  CSSProperties,
} from "react";

const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [key: string]: {
    label?: ReactNode;
    icon?: ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

export type ChartData = {
  label: string;
  value: number;
}[];

const ChartContext = createContext<{ config: ChartConfig } | null>(null);

const useChart = () => {
  const context = useContext(ChartContext);
  if (!context) throw new Error("useChart must be used within <ChartContainer />");
  return context;
};

const ChartContainer = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div"> & {
  config: ChartConfig;
  children: React.ReactElement;
}>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        ref={ref}
        data-chart={chartId}
        className={cn(
          "flex aspect-video justify-center text-xs",
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground",
          "[&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50",
          "[&_.recharts-curve.recharts-tooltip-cursor]:stroke-border",
          "[&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border",
          "[&_.recharts-radial-bar-background-sector]:fill-muted",
          "[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted",
          "[&_.recharts-reference-line_[stroke='#ccc']]:stroke-border",
          "[&_.recharts-dot[stroke='#fff']]:stroke-transparent",
          "[&_.recharts-layer]:outline-hidden",
          "[&_.recharts-sector]:outline-hidden",
          "[&_.recharts-sector[stroke='#fff']]:stroke-transparent",
          "[&_.recharts-surface]:outline-hidden",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <Recharts.ResponsiveContainer>
          {children}
        </Recharts.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "ChartContainer";

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const themedStyles = Object.entries(THEMES).map(([theme, prefix]) => {
    const styles = Object.entries(config)
      .map(([key, item]) => {
        const color = item.theme?.[theme as keyof typeof item.theme] || item.color;
        return color ? `  --color-${key}: ${color};` : null;
      })
      .filter(Boolean)
      .join("\n");
    return `${prefix} [data-chart=${id}] {\n${styles}\n}`;
  });

  if (!themedStyles.length) return null;

  return <style dangerouslySetInnerHTML={{ __html: themedStyles.join("\n") }} />;
};

const ChartTooltip = Recharts.Tooltip;

const ChartTooltipContent = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div"> & {
  active?: boolean;
  payload?: any[];
  indicator?: "line" | "dot" | "dashed";
  hideLabel?: boolean;
  hideIndicator?: boolean;
  label?: ReactNode;
  labelFormatter?: (value: any, payload?: any[]) => ReactNode;
  labelClassName?: string;
  formatter?: (...args: any[]) => ReactNode;
  color?: string;
  nameKey?: string;
  labelKey?: string;
}>(({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
  ...props
}, ref) => {
  const { config } = useChart();

  const tooltipLabel = useMemo(() => {
    if (hideLabel || !payload?.length) return null;
    const item = payload[0];
    const key = labelKey || item.dataKey || item.name || "value";
    const itemConfig = getPayloadConfig(config, item, key);
    const value = !labelKey && typeof label === "string" ? config[label]?.label ?? label : itemConfig?.label;
    return value ? (
      <div className={cn("font-medium", labelClassName)}>
        {labelFormatter ? labelFormatter(value, payload) : value}
      </div>
    ) : null;
  }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);

  if (!active || !payload?.length) return null;
  const nestLabel = payload.length === 1 && indicator !== "dot";

  return (
    <div
      ref={ref}
      className={cn("grid min-w-32 gap-1.5 rounded-xl border bg-background p-2.5 text-xs shadow-xl", className)}
      {...props}
    >
      {!nestLabel && tooltipLabel}
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = nameKey || item.name || item.dataKey || "value";
          const itemConfig = getPayloadConfig(config, item, key);
          const indicatorColor = color || item.payload?.fill || item.color;

          return (
            <div key={index} className={cn("flex flex-wrap items-stretch gap-2", indicator === "dot" ? "items-center" : "")}>
              {formatter && item?.value !== undefined && item.name ? (
                formatter(item.value, item.name, item, index, item.payload)
              ) : (
                <>
                  {!hideIndicator && (
                    itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      <div
                        className={cn("shrink-0 rounded-[2px]", {
                          "h-2.5 w-2.5": indicator === "dot",
                          "w-1": indicator === "line",
                          "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
                          "my-0.5": nestLabel && indicator === "dashed",
                        })}
                        style={{
                          "--color-bg": indicatorColor,
                          "--color-border": indicatorColor,
                          backgroundColor: indicatorColor,
                          borderColor: indicatorColor,
                        } as CSSProperties}
                      />
                    )
                  )}
                  <div className="flex flex-1 justify-between gap-1 leading-none">
                    <div className="grid gap-1.5">
                      {nestLabel && tooltipLabel}
                      <span className="text-muted-foreground">{itemConfig?.label || item.name}</span>
                    </div>
                    {item.value && (
                      <span className="font-mono font-medium tabular-nums text-foreground">
                        {item.value.toLocaleString()}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});
ChartTooltipContent.displayName = "ChartTooltipContent";

const ChartLegend = Recharts.Legend;

const ChartLegendContent = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div"> & {
  payload?: any[];
  verticalAlign?: "top" | "bottom";
  hideIcon?: boolean;
  nameKey?: string;
}>(({ className, payload, verticalAlign = "bottom", hideIcon = false, nameKey, ...props }, ref) => {
  const { config } = useChart();
  if (!payload?.length) return null;

  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-center gap-4", verticalAlign === "top" ? "pb-3" : "pt-3", className)}
      {...props}
    >
      {payload.map(item => {
        const key = nameKey || item.dataKey || "value";
        const itemConfig = getPayloadConfig(config, item, key);

        return (
          <div key={item.value} className="flex items-center gap-1.5">
            {!hideIcon &&
              (itemConfig?.icon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{ backgroundColor: item.color }}
                />
              ))}
            {itemConfig?.label}
          </div>
        );
      })}
    </div>
  );
});
ChartLegendContent.displayName = "ChartLegendContent";

function getPayloadConfig(config: ChartConfig, payload: any, key: string) {
  if (!payload || typeof payload !== "object") return undefined;
  const valueFromPayload = payload[key] || payload?.payload?.[key];
  const configKey = typeof valueFromPayload === "string" ? valueFromPayload : key;
  return config[configKey] ?? config[key];
}

export {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
};
