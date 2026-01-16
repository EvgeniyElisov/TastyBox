import { LucideIcon } from "lucide-react";
import { cn } from "shared/lib/utils";

type Props = {
  icon: LucideIcon;
  text: string;
  value: React.ReactNode;
  className?: string;
};

export const CheckoutDetails = ({ icon: Icon, text, value, className }: Props) => {
  return (
    <div className={cn("flex flex-col sm:flex-row gap-2 sm:gap-0", className)}>
      <div className="flex flex-1 text-sm sm:text-base text-neutral-500">
        <div className="flex items-center">
          <Icon size={18} className={"mr-2 sm:mr-3 text-gray-400 flex-shrink-0"} />
          <span className="truncate">{text}</span>
        </div>
        <div className="hidden sm:block flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-3" />
      </div>
      <span className="font-bold text-sm sm:text-base sm:ml-auto">{value}</span>
    </div>
  );
};
