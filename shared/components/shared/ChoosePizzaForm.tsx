"use client";

import { Ingredient, ProductVariant } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSet } from "react-use";
import { mapPizzaSize, mapPizzaType, PizzaSize, pizzaSizes, PizzaType, pizzaTypes } from "shared/constants/pizza";
import { cn } from "shared/lib/utils";
import { GroupVariants, IngredientItem, PizzaImage, Title } from ".";
import { Button } from "../ui";

type Props = {
  imageUrl: string;
  name: string;
  className?: string;
  ingredients: Ingredient[];
  variants: ProductVariant[];
  onClickAdd: () => void;
};

export const ChoosePizzaForm = ({ 
    name, 
    variants, 
    imageUrl, 
    ingredients, 
    onClickAdd, 
    className }: Props) => {



  const [size, setSize] = useState<PizzaSize>(20)
  const [type, setType] = useState<PizzaType>(1)
  const [selectedIngredientsIds, {toggle: toggleSelectedIngredientsIds}] = useSet(new Set<number>([]))
  const pizzaPrice = variants.find((variant) => variant.pizzaType === type && variant.size === size)?.price || 0;
  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredientsIds.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);
  const totalPrice = pizzaPrice + totalIngredientsPrice;
  const textDetails = `${mapPizzaType[type]} тесто, ${size} см`;

  const onClickAddHandler = () => {
    onClickAdd();
  }

  const variantsForSelectedType = variants.filter((variant) => variant.pizzaType === type);
  const availableSizesVariants = pizzaSizes.map((sizeOption) => {
    const sizeValue = Number(sizeOption.value);
    const isSizeAvailable = variantsForSelectedType.some(
      (variant) => variant.size === sizeValue
    );
    
    return {
      name: sizeOption.name,
      value: sizeOption.value,
      disabled: !isSizeAvailable,
    };
  });

  useEffect(() => {
    const availableSize = availableSizesVariants.find((item) => !item.disabled);
    if (availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [type]);

  

  return (
    <div className={cn(className, "flex flex-1")}>
      <PizzaImage src={imageUrl} alt={name} size={size} />

      <div className="w-[490px] bg-form-bg p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetails}</p>

       

       

        <div className={'flex flex-col gap-3 mt-5 mb-8'}>
          <GroupVariants 
            items={availableSizesVariants} 
            value={String(size)} 
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />

            <GroupVariants 
            items={pizzaTypes} 
            value={String(type)} 
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar">
          <div className={"grid grid-cols-3 gap-3"}>
            {ingredients.map((ingredient) => (
              <IngredientItem 
                key={ingredient.id} 
                name={ingredient.name} 
                price={ingredient.price} 
                imageUrl={ingredient.imageUrl} 
                onClick={() => toggleSelectedIngredientsIds(ingredient.id)}
                active={selectedIngredientsIds.has(ingredient.id)}
              />
            ))}
          </div>
        </div>
       

        <Button 
        // loading={loading} 
        onClick={onClickAddHandler} 
        className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
