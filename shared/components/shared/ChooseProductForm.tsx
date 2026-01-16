'use client';

import Image from 'next/image';
import { cn } from 'shared/lib/utils';
import { Title } from '.';
import { Button } from '../ui';

type Props = {
  imageUrl: string;
  name: string;
  price: number;
  className?: string;
  addProductToCart: () => void;
  loading: boolean;
}

export const ChooseProductForm = ({
  name,
  imageUrl,
  price,
  addProductToCart,
  className,
  loading,
}: Props) => {
 
  const addProductToCartHandler = () => {
    addProductToCart();
  }

  return (
    <div className={cn(className, 'flex flex-col lg:flex-row flex-1')}>
      <div className="flex items-center justify-center flex-1 relative w-full min-h-[200px] md:min-h-[300px] lg:min-h-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl -z-10 blur-3xl" />
        <Image
          src={imageUrl}
          alt={name}
          className="relative left-0 md:left-2 top-0 md:top-2 transition-all z-10 duration-300 drop-shadow-2xl w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[480px] lg:h-[480px] object-contain"
          width={480}
          height={480}
        />
      </div>

      <div className="w-full lg:w-[560px] bg-gradient-to-br from-form-bg to-white p-4 md:p-6 lg:p-10 rounded-3xl shadow-2xl border border-gray-100">
        <Title text={name} size="md" className="font-extrabold mb-4 md:mb-6" />

        <Button
          loading={loading}
          onClick={addProductToCartHandler}
          className="h-[56px] md:h-[64px] px-6 md:px-10 text-base md:text-lg font-bold rounded-2xl w-full mt-6 md:mt-8 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]">
          Добавить в корзину за {price} руб.
        </Button>
      </div>
    </div>
  );
};
