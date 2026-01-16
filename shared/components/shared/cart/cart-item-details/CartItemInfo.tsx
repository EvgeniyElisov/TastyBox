import { cn } from "shared/lib/utils";

type Props = {
  name: string;
  details: string;
  className?: string;
};

export const CartItemInfo = ({ name, details, className }: Props) => {
  return (
    <div className="flex-1 min-w-0">
      <div className={cn("flex items-center justify-between", className)}>
        <h2 className="text-base sm:text-xl font-bold flex-1 leading-6 sm:leading-7 truncate">{name}</h2>
      </div>
      {details.length > 0 && <p className="text-xs sm:text-sm text-gray-400 w-full sm:w-[90%] mt-1 line-clamp-2">{details}</p>}
    </div>
  );
};
