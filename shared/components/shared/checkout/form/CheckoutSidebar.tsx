import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { Button, Skeleton } from "shared/components/ui";
import { cn } from "shared/lib/utils";
import { CheckoutDetails, InfoBlock } from "..";

type Props = {
  totalAmount: number;
  loading?: boolean;
  className?: string;
};

const VAT = 15;
const DEVIVERY_PRICE = 5;

export const CheckoutSidebar = ({ totalAmount, className, loading }: Props) => {
  
  const vatPrice = totalAmount * VAT / 100;
  const totalPrice = totalAmount ? totalAmount + vatPrice + DEVIVERY_PRICE : 0;
  
  return (
    <InfoBlock className={cn("p-6 md:p-10 lg:sticky lg:top-4 bg-gradient-to-br from-white to-gray-50/50", className)}>
      <div className="flex flex-col gap-3 mb-6 md:mb-8 pb-4 md:pb-6 border-b border-gray-200">
        <span className="text-lg md:text-xl font-semibold text-gray-600">Итого:</span>
        {
          loading 
           ? <Skeleton className="h-10 md:h-14 w-full md:w-64 bg-gradient-to-r from-gray-200 to-gray-100 rounded-xl animate-pulse" />
           : <span className="h-10 md:h-14 text-3xl md:text-[44px] font-extrabold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">{`${totalPrice} руб.`}</span>          
        }
      </div>

      <div className="space-y-4 md:space-y-5 mb-6 md:mb-10">
        <CheckoutDetails
          icon={Package}
          text="Стоимость товаров"
          value={loading ? <Skeleton className="h-6 w-32 bg-gray-200 rounded-lg animate-pulse" /> : `${totalAmount} руб.`}
        />
        <CheckoutDetails
          icon={Percent}
          text="Налоги"
          value={loading ? <Skeleton className="h-6 w-32 bg-gray-200 rounded-lg animate-pulse" /> : `${vatPrice} руб.`}
        />
        <CheckoutDetails
          icon={Truck}
          text="Доставка"
          value={loading ? <Skeleton className="h-6 w-32 bg-gray-200 rounded-lg animate-pulse" /> : `${DEVIVERY_PRICE} руб.`}
        />
      </div>

      <Button 
        type="submit" 
        loading={loading} 
        className="w-full h-12 md:h-16 rounded-2xl text-base md:text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
      >
        Перейти к оплате
        <ArrowRight className="w-5 md:w-6 ml-2" />
      </Button>
    </InfoBlock>
  );
};
