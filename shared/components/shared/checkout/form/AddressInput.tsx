"use client";

import { useEffect, useState } from "react";
import { AddressSuggestions, DaDataAddress, DaDataSuggestion } from "react-dadata";
import "react-dadata/dist/react-dadata.css";
import { useAddressSuggestion } from "shared/hooks";
import { cn } from "shared/lib/utils";

type Props = {
  value?: DaDataSuggestion<DaDataAddress> | string | undefined;
  onChange: (value?: string) => void;
  placeholder?: string;
};

export const AddressInput = ({ value, onChange, placeholder }: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const { selectedSuggestion, setSelectedSuggestion } = useAddressSuggestion(value);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    const displayValue = typeof value === "string" ? value : value?.value || "";
    return (
      <input
        type="text"
        value={displayValue}
        placeholder={placeholder}
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-12 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-md shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm lg:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
        )}
        readOnly
      />
    );
  }

  const handleChange = (data?: DaDataSuggestion<DaDataAddress>) => {
    setSelectedSuggestion(data);
    onChange(data?.value);
  };

  return (
    <AddressSuggestions
      value={selectedSuggestion}
      token="a4c9ee63f61348d29c89e4edd52e40a2bfacd3fa"
      onChange={handleChange}
      filterLocations={[{ country: "Беларусь" }]}
      inputProps={{
        placeholder,
        className: cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-12 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-md shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm lg:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
        ),
      }}
    />
  );
};
