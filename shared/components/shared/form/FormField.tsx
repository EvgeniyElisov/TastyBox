"use client";

import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import { Input, Textarea } from "shared/components/ui";
import { ClearButton, ErrorText, Label } from ".";

type BaseProps = {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
  fieldType?: "input" | "textarea";
};

type InputProps = BaseProps & {
  fieldType?: "input";
} & InputHTMLAttributes<HTMLInputElement>;

type TextareaProps = BaseProps & {
  fieldType: "textarea";
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

type Props = InputProps | TextareaProps;

export const FormField = ({ className, name, label, required, fieldType = "input", ...props }: Props) => {
  const {
    register,
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

  return (
    <div className={className}>
      {label && <Label label={label} required={required} />}

      <div className="relative">
        {isTextarea ? (
          <Textarea 
            className="h-20 text-md" 
            {...register(name)} 
            {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)} 
          />
        ) : (
          <Input 
            className="h-12 text-md" 
            {...register(name)} 
            {...(props as InputHTMLAttributes<HTMLInputElement>)} 
          />
        )}

        {text && <ClearButton onClick={onClickClear} />}
      </div>

      {errorText && <ErrorText text={errorText} />}
    </div>
  );
};
