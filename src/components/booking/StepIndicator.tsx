import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  steps: string[];
  current: number;
}

const StepIndicator = ({ steps, current }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all",
                i < current
                  ? "bg-primary text-primary-foreground"
                  : i === current
                  ? "bg-primary/20 text-primary border-2 border-primary"
                  : "bg-secondary/50 text-muted-foreground"
              )}
            >
              {i < current ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <span
              className={cn(
                "text-xs uppercase tracking-wider hidden sm:block",
                i <= current ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={cn("w-8 h-px", i < current ? "bg-primary" : "bg-border/50")} />
          )}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
