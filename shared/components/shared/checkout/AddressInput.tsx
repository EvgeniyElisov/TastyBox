"use client";

import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";
import { useFormContext } from "react-hook-form";
import { cn } from "shared/lib/utils";
import { ClearButton, ErrorText, Label } from "../form";

type Props = {
  onChange: (value?: string) => void;
  label?: string;
  required?: boolean;
  className?: string;
};

export const AddressInput = ({ onChange, label, required, className }: Props) => {
  const {
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const errorText = errors?.["address"]?.message as string;
  const text = watch("address");

  const onClickClear = () => {
    setValue("address", "", { shouldValidate: true });
  };

  return (
    <div className={className}>
      {label && <Label label={label} required={required} />}

      <div className="relative">
        <AddressSuggestions
          value={text}
          token="a4c9ee63f61348d29c89e4edd52e40a2bfacd3fa"
          onChange={(data) => onChange(data?.value)}
          filterLocations={[{ country: "Беларусь" }]}
          inputProps={{
            placeholder: "Адрес",
            "aria-invalid": errorText ? true : undefined,
            className: cn(
              "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-12 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-md shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
              errorText && "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
            ),
          }}
        />
        {text && <ClearButton onClick={onClickClear} />}
      </div>
      {errorText && <ErrorText text={errorText} />}
    </div>
  );
};
