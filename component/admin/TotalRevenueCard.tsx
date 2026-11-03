import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IndianRupee, TrendingUp } from "lucide-react";

export default function TotalRevenueCard() {
  return (
    <Card className="border-gray-200 shadow-sm">
      <CardHeader className="flex items-center justify-center pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">
          Total Revenue
        </CardTitle>
        <div className="rounded-lg bg-orange-50 p-2">
          <IndianRupee className="h-5 w-5 text-orange-500" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold text-gray-900">₹0.00</div>
        <div className="flex items-center gap-2 mt-2">
          <TrendingUp className="h-4 w-4 text-green-600" />
          <span className="text-xs font-medium text-green-600">
            Revenue Overview
          </span>
          <span className="text-xs text-gray-400">All time</span>
        </div>
      </CardContent>
    </Card>
  );
}
