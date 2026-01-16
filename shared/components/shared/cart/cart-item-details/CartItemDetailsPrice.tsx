import { cn } from "shared/lib/utils";

interface Props {
  value: number;
  className?: string;
}

export const CartItemDetailsPrice = ({ value, className }: Props) => {
  return <h2 className={cn("font-bold text-base sm:text-lg whitespace-nowrap", className)}>{`${value} руб.`}</h2>;
};
