"use client";

import { Ingredient, ProductVariant } from "@prisma/client";
import { PizzaSize, PizzaType, pizzaTypes } from "shared/constants/pizza";
import { usePizzaOptions } from "shared/hooks";
import { getPizzaDetails } from "shared/lib";
import { cn } from "shared/lib/utils";
import { GroupVariants, IngredientItem, PizzaImage, Title } from ".";
import { Button } from "../ui";

type Props = {
  imageUrl: string;
  name: string;
  className?: string;
  ingredients: Ingredient[];
  variants: ProductVariant[];
  addPizzaToCart: (productVariantId: number, ingredients: number[]) => void;
  loading: boolean;
};

export const ChoosePizzaForm = ({ 
    name, 
    variants, 
    imageUrl, 
    ingredients, 
    addPizzaToCart, 
    className,
    loading,
  }: Props) => {


  const { 
    size, 
    type, 
    setSize, 
    setType, 
    selectedIngredientsIds, 
    toggleSelectedIngredientsIds,
    availableSizesVariants,
    currentVariantId,
  } = usePizzaOptions(variants);
  

  const { totalPrice, textDetails } = getPizzaDetails(type, size, variants, ingredients, selectedIngredientsIds);

  
  const addPizzaToCartHandler = () => {
    if (currentVariantId) {
      addPizzaToCart(currentVariantId, Array.from(selectedIngredientsIds));
    }
  }
  
  return (
    <div className={cn(className, "flex flex-col lg:flex-row flex-1 min-h-[500px] lg:min-h-[600px]")}>
      <div className="flex-1 relative flex items-center justify-center min-h-[200px] md:h-[300px] lg:h-full overflow-hidden">
        <PizzaImage src={imageUrl} alt={name} size={size} />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl -z-10 blur-3xl" />
      </div>

      <div className="w-full lg:w-[560px] bg-gradient-to-br from-form-bg to-white p-4 md:p-6 lg:p-10 rounded-3xl shadow-2xl border border-gray-100">
        <div className="mb-4">
          <Title text={name} size="md" className="font-extrabold mb-3" />
          <p className="text-sm md:text-base text-gray-500 leading-relaxed">{textDetails}</p>
        </div>
        
        <div className={'flex flex-col gap-5 mt-6 md:mt-8 mb-6 md:mb-10'}>
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
        
        <div className="bg-gradient-to-br from-gray-50 to-white p-4 md:p-6 lg:p-7 rounded-2xl h-[300px] md:h-[400px] lg:h-[480px] overflow-auto scrollbar shadow-inner border border-gray-100">
          <div className={"grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 lg:gap-5"}>
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
          loading={loading} 
          onClick={addPizzaToCartHandler} 
          className="h-[56px] md:h-[64px] px-6 md:px-10 text-base md:text-lg font-bold rounded-2xl w-full mt-6 md:mt-12 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
        >
          Добавить в корзину за {totalPrice} руб.
        </Button>
      </div>
    </div>
  );
};
