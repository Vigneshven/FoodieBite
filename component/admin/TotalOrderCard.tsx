import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, TrendingUp } from "lucide-react";

export default function TotalOrderCard() {
  return (
    <Card className="border-gray-200 shadow-sm">
      <CardHeader className="flex items-center justify-center pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">
          Total Orders
        </CardTitle>
        <div className="rounded-lg bg-blue-50 p-2">
          <ShoppingBag className="h-5 w-5 text-orange-500" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold text-gray-900">100</div>
        <div className="mt-2 flex items-center gap-2">
          <TrendingUp  className="h-4 w-4 text-green-600"/>
          <span className="text-xs font-medium text-green-600">+40%</span>
          <span className="text-xs text-gray-400">Compared to last month</span>
        </div>
      </CardContent>
    </Card>
  );
}
