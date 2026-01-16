import { CircleCheck } from "lucide-react";
import { cn } from "shared/lib/utils";
import Image from "next/image";

type Props = {
  className?: string;
  imageUrl: string;
  name: string;
  price: number;
  active?: boolean;
  onClick?: () => void;
};

export const IngredientItem = ({ className, active, price, name, imageUrl, onClick }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={`${name}, цена ${price} рублей. ${active ? "Выбрано" : "Не выбрано"}`}
      className={cn(
        "flex items-center flex-col p-3 rounded-2xl w-full text-center relative cursor-pointer transition-all duration-200 group",
        active
          ? "bg-linear-to-br from-primary/10 to-primary/5 border-2 border-primary shadow-lg shadow-primary/20 scale-105"
          : "bg-white border-2 border-gray-100 shadow-md hover:shadow-lg hover:border-primary/30 hover:scale-105",
        className
      )}
    >
      {active && (
        <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-md" aria-hidden="true">
          <CircleCheck className="text-white" size={16} />
        </div>
      )}
      <figure
        className={cn(
          "rounded-xl overflow-hidden mb-2 transition-transform duration-200",
          active ? "ring-2 ring-primary/30" : "ring-1 ring-gray-100 group-hover:ring-primary/20"
        )}
      >
        <Image width={110} height={110} src={imageUrl} alt="" className="object-cover" aria-hidden="true" />
      </figure>
      <span className={cn("text-xs mb-1 font-medium", active ? "text-primary" : "text-gray-700")}>{name}</span>
      <span className={cn("font-bold text-sm", active ? "text-primary" : "text-gray-900")}>{price} руб.</span>
    </button>
  );
};
