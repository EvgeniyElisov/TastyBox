"use client";

import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input, Textarea } from "shared/components/ui";
import { ClearButton, ErrorText, Label } from ".";
import { cn } from "shared/lib/utils";
import { AddressInput } from "../checkout";

type BaseProps = {
  name: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  fieldType?: "input" | "textarea" | "address";
};

type InputProps = BaseProps & InputHTMLAttributes<HTMLInputElement>;

type TextareaProps = BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>;

type Props = InputProps | TextareaProps | BaseProps;

export const FormField = ({ className, name, label, required, fieldType = "input", ...props }: Props) => {
  const {
    control,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const errorText = errors?.[name]?.message as string;
  const text = watch(name);

  const onClickClear = () => {
    setValue(name, "", { shouldValidate: true });
  };

  const isTextarea = fieldType === "textarea";
  const isAddress = fieldType === "address";
 

  return (
    <div className={cn("text-base", className)}>
      {label && <Label label={label} required={required} />}

      <div className="relative">
        { isAddress ? (
          <Controller 
            control={control} 
            name={name} 
            render={({ field }) => (
              <AddressInput 
                value={field.value} 
                onChange={field.onChange} 
                {...(props as BaseProps)} 
              />
            )} 
          />
        ) : isTextarea ? (
          <Controller 
            control={control} 
            name={name} 
            render={({ field }) => (
              <Textarea 
                className="h-20 text-md" 
                {...field}
                {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)} 
              />
            )} 
          />
        ) : (
          <Controller 
            control={control} 
            name={name} 
            render={({ field }) => (
              <Input 
                className="h-12 text-md" 
                {...field}
                {...(props as InputHTMLAttributes<HTMLInputElement>)} 
              />
            )} 
          />
        )}
       
        {text && <ClearButton onClick={onClickClear} />}
      </div>

      {errorText && <ErrorText text={errorText} />}
    </div>
  );
};
