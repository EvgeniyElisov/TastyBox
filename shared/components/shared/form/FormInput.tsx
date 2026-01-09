"use client";

import { InputHTMLAttributes } from "react";
import { Input } from "shared/components/ui";
import { ClearButton, ErrorText, Label } from ".";
import { useForm } from "react-hook-form";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
};

export const FormInput = ({ className, name, label, required, ...props }: Props) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  const errorText = errors?.[name]?.message as string;

  const text = watch(name);

  const onClickClear = () => {
    setValue(name, "", { shouldValidate: true });
  };

  return (
    <div className={className}>
      {label && <Label label={label} required={required} />}

      <div className="relative">
        <Input className="h-12 text-md" {...register(name)} {...props} />

        {Boolean(text) && <ClearButton onClick={onClickClear} />}
      </div>

      {errorText && <ErrorText text={errorText} />}
    </div>
  );
};
