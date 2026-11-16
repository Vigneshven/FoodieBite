import { Badge } from "@/components/ui/badge";
import { Bike } from "lucide-react";

type DeliveryWelcomeProps = {
  partnerName: string;
  isOnline: boolean;
};

export default function DeliveryWelcome({
  partnerName,
  isOnline,
}: DeliveryWelcomeProps) {
  return (
    <div>
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Good morning, {partnerName}!</h1>

        <p className="text-sm text-muted-foreground">
          Here's your delivery overview for today.
        </p>
      </div>
      <Badge
        variant="outline"
        className={
          isOnline
            ? "w-fit gap-2 border-green-200 bg-green-50 px-3 py-1.5 text-green-700"
            : "w-fit gap-2 border-red-200 bg-red-50 px-3 py-1.5 text-red-700"
        }
      >
        <Bike className="size-4" />
        {isOnline ? "You're Online" : "You're Offline"}
      </Badge>
    </div>
  );
}
