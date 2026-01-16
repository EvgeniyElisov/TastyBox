"use client";

import { useFilters, useIngredients, useQueryFilters } from "shared/hooks";
import { CheckboxFiltersGroup, RangeSlider, Title } from ".";
import { Input } from "../ui";
import { cn } from "shared/lib/utils";

type Props = {
  className?: string;
};

export const Filters = ({ className }: Props) => {
  const minPrice = 0;
  const maxPrice = 100;

  const { ingredients, loading } = useIngredients();
  const filters = useFilters();

  useQueryFilters(filters);

  const items = ingredients.map((ingredient) => ({
    text: ingredient.name,
    value: ingredient.id.toString(),
  }));

  const updatePrice = (price: number[]) => {
    filters.setPrice("priceFrom", price[0]);
    filters.setPrice("priceTo", price[1]);
  };

  return (
    <div className={cn("bg-white rounded-2xl md:rounded-3xl lg:rounded-3xl p-4 md:p-6 lg:p-6 shadow-lg border border-gray-100", className)}>
      <div className="mb-6 md:mb-8 lg:mb-8">
        <Title text="Фильтрация" size="sm" className="font-bold" />
      </div>

      <CheckboxFiltersGroup
        title="Тип теста"
        name="PizzaTypes"
        className={"mt-4 md:mt-6 lg:mt-6"}
        selectedValues={filters.pizzaTypes}
        onClickCheckbox={filters.setPizzaTypes}
        items={[
          { text: "Тонкое", value: "1" },
          { text: "Традиционное", value: "2" },
        ]}
      />

      <CheckboxFiltersGroup
        title="Размеры"
        name="Sizes"
        className={"mt-4 md:mt-6 lg:mt-6"}
        selectedValues={filters.sizes}
        onClickCheckbox={filters.setSizes}
        items={[
          { text: "20 см", value: "20" },
          { text: "30 см", value: "30" },
          { text: "40 см", value: "40" },
        ]}
      />

      <div className={"mt-4 md:mt-6 lg:mt-6 border-y border-y-neutral-100 py-5 md:py-7 lg:py-7 pb-6 md:pb-8 lg:pb-8"}>
        <p className={"font-bold mb-3 md:mb-4 lg:mb-4 text-sm md:text-base lg:text-base"}>Цена от и до:</p>
        <div className={"flex gap-3 md:gap-4 lg:gap-4 mb-4 md:mb-6 lg:mb-6"}>
          <Input
            type="number"
            placeholder={minPrice.toString()}
            min={minPrice}
            max={maxPrice}
            value={filters.price.priceFrom || minPrice}
            onChange={(e) => filters.setPrice("priceFrom", Number(e.currentTarget.value))}
          />
          <Input
            type="number"
            placeholder={maxPrice.toString()}
            min={minPrice}
            max={maxPrice}
            value={filters.price.priceTo || maxPrice}
            onChange={(e) => filters.setPrice("priceTo", Number(e.currentTarget.value))}
          />
        </div>

        <RangeSlider
          min={minPrice}
          max={maxPrice}
          step={10}
          value={[filters.price.priceFrom || minPrice, filters.price.priceTo || maxPrice]}
          onValueChange={updatePrice}
        />
      </div>

      <CheckboxFiltersGroup
        title="Ингредиенты"
        name="Ingredients"
        className={"mt-4 md:mt-6 lg:mt-6"}
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        onClickCheckbox={filters.setSelectedIngredientIds}
        loading={loading}
        selectedValues={filters.selectedIngredientIds}
      />
    </div>
  );
};
