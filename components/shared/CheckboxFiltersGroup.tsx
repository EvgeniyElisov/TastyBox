"use client";

import { Input, Skeleton } from "components/ui";
import { FilterCheckbox, FilterCheckboxProps } from "./FilterCheckbox";
import { useState } from "react";

type Item = FilterCheckboxProps;

type Props = {
  title: string;
  className?: string;
  items: Item[];
  defaultItems: Item[];
  limit?: number;
  loading?: boolean;
  searchInputPlaceholder?: string;
  onClickCheckbox?: (id: string) => void;
  defaultValue?: string[];
  selectedIds?: Set<string>;
  name?: string;
};

export const CheckboxFiltersGroup = ({
  title,
  className,
  items,
  defaultItems,
  limit = 5,
  loading,
  searchInputPlaceholder = "Поиск...",
  onClickCheckbox,
  defaultValue,
  selectedIds,
  name,
}: Props) => {
  const [showAll, setShowAll] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const list = showAll 
  ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase())) 
  : defaultItems.slice(0, limit);

  const onChangeSearchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };

  if (loading) {
    return (
      <div className={className}>
        <p className="font-bold mb-3">{title}</p>
        
        {Array(limit)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className="w-full mb-4 h-6 bg-gray-200 rounded-[8px]" />
          ))}

        <Skeleton className="w-28 h-6 bg-gray-200 rounded-[8px]" />
      </div>
    );
  }

  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>

      {showAll && (
        <div className="mb-5">
          <Input 
            onChange={onChangeSearchHandler}
            value={searchValue}
            placeholder={searchInputPlaceholder}
            className={"bg-gray-50 border-none"}
            type="search"
          />
        </div>
      )}

      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map((item) => (
          <FilterCheckbox
            onCheckedChange={() => onClickCheckbox?.(item.value)}
            checked={selectedIds?.has(item.value)}
            key={String(item.value)}
            value={item.value}
            text={item.text}
            endAdornment={item.endAdornment}
            name={name}
          />
        ))}
      </div>

      {items.length > limit && (
        <div className={showAll ? "border-t border-t-neutral-100 mt-4" : ""}>
          <button onClick={() => setShowAll(!showAll)} className="text-primary mt-3">
            {showAll ? "Скрыть" : "+ Показать все"}
          </button>
        </div>
      )}
    </div>
  );
};
