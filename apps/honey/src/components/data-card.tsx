import { cn } from "@bera/ui";
import { Skeleton } from "@bera/ui/skeleton";

export default function DataCard({
  icon,
  title,
  value,
  isLoading,
}: {
  icon: React.ReactNode;
  title: string;
  value: any;
  isLoading?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl bg-card border-[3px] border-dashed border-foregroundSecondary px-6 py-4 text-foregroundSecondary",
      )}
    >
      <div className={cn("flex items-center gap-2 text-xs")}>
        <div>{icon}</div>
        <div>{title}</div>
      </div>
      {!isLoading ? (
        <div className="mt-2 text-2xl leading-7">{value}</div>
      ) : (
        <Skeleton className="mt-2 h-12 w-full" />
      )}
    </div>
  );
}
