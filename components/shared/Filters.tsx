"use client";

import { Input } from "components/ui";
import { CheckboxFiltersGroup, FilterCheckbox, RangeSlider, Title } from ".";
import { useFilterIngredients } from "hooks";

type Props = {
  className?: string;
};

export const Filters = ({ className }: Props) => {
  const { ingredients, loading, toggleId, selectedIds } = useFilterIngredients();
  const items = ingredients.map((ingredient) => ({
    text: ingredient.name,
    value: ingredient.id.toString(),
  }));
  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      <div className="flex flex-col gap-4">
        <FilterCheckbox name="Can-collect" text="Можно собирать" value="1" />
        <FilterCheckbox name="New-products" text="Новинки" value="2" />
      </div>

      <div className={"mt-5 border-y border-y-neutral-100 py-6 pb-7"}>
        <p className={"font-bold mb-3"}>Цена от и до:</p>
        <div className={"flex gap-3 mb-5"}>
          <Input type="number" placeholder="0" min={0} max={1000} defaultValue={0} />
          <Input type="number" placeholder="1000" min={100} max={1000} />
        </div>

        <RangeSlider min={0} max={1000} step={10} value={[0, 1000]} />
      </div>

      <CheckboxFiltersGroup
        title="Ингредиенты"
        name="Ingredients"
        className={"mt-5"}
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        onClickCheckbox={toggleId}
        loading={loading}
        selectedIds={selectedIds}
      />
    </div>
  );
};
