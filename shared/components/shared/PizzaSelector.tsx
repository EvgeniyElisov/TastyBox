import React from 'react';
import { GroupVariants } from '.';
import { cn } from 'shared/lib/utils';
import { pizzaSizes, pizzaTypes } from 'shared/constants/pizza';

type Props = {
//   pizzaSizes: PizzaSizeItem[];
  selectedSize?: string;
  onClickSize: (value: string) => void;
  selectedPizzaType?: string;
  onClickPizzaType: (value: string) => void;
  className?: string;
}

export const PizzaSelector = ({
//   pizzaSizes,
  selectedSize = '20',
  selectedPizzaType = '1',
  onClickSize,
  onClickPizzaType,
  className,
}: Props) => {
  return (
    <div className={cn('flex flex-col gap-3 mt-5 mb-8', className)}>
      <GroupVariants
        items={pizzaSizes}
        onClick={onClickSize}
        value={selectedSize}
      />

      <GroupVariants
        items={pizzaTypes}
        onClick={onClickPizzaType}
        value={selectedPizzaType}
      />
    </div>
  );
};
