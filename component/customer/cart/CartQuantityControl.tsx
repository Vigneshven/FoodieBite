import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

type CartQuantityControlProps = {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
  disable?: boolean;
};

export default function CartQuantityControl({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 100,
  disable = false,
}: CartQuantityControlProps) {
  const isMin = quantity <= min;
  const isMax = quantity >= max;

  return (
    <div className="flex w-fit items-center gap-3 rounded-lg">
      <Button
        variant="secondary"
        onClick={onDecrease}
        disabled={disable || isMin}
        className="flex items-center justify-center bg-gray-600 transition hover:bg-muted hover:text-primary"
      >
        <Minus />
      </Button>
      <span>{quantity}</span>
      <Button
        variant="secondary"
        onClick={onIncrease}
        disabled={disable || isMax}
        className="flex items-center justify-center bg-gray-600 transition hover:bg-muted hover:text-primary"
      >
        <Plus />
      </Button>
    </div>
  );
}
