import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type SpinnerProps = {
  size?: number;            // px
  label?: string | null;    // null to hide text
  className?: string;
};

export function Spinner({ size = 20, label = "Loading…", className }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn("inline-flex items-center gap-2 text-muted-foreground my-6", className)}
    >
      <Loader2 className="animate-spin" size={size} />
      {label && <span className="text-sm">{label}</span>}
    </div>
  );
}
