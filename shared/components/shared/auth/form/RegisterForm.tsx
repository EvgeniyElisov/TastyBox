"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { FormField, SubmitButton, Title } from "../..";
import { toastError, toastSuccess } from "shared/lib";
import { formRegisterSchema, RegisterFormInputs } from "./schemas";
import { registerUser } from "app/serverActions";

type Props = {
  onClose?: () => void;
  onClickLogin?: () => void;
};

export const RegisterForm = ({ onClose, onClickLogin }: Props) => {
  const form = useForm<RegisterFormInputs>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toastSuccess("Регистрация прошла успешно 📝. Проверьте вашу почту для подтверждения регистрации");

      onClose?.();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Не удалось зарегистрировать пользователя";
      toastError(errorMessage);
    }
  };

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-2">
          <Title text="Создать аккаунт" size="md" className="font-bold mb-2" />
          <p className="text-muted-foreground text-sm leading-relaxed">Заполните форму, чтобы создать новый аккаунт</p>
        </div>

        <div className="space-y-5">
          <FormField type="email" name="email" label="E-Mail" placeholder="Введите вашу почту" required />
          <FormField type="text" name="fullName" label="Полное имя" placeholder="Введите ваше полное имя" required />
          <FormField type="password" name="password" label="Пароль" placeholder="Введите ваш пароль" required />
          <FormField type="password" name="confirmPassword" label="Подтвердите пароль" placeholder="Подтвердите ваш пароль" required />
        </div>

        <SubmitButton isSubmitting={form.formState.isSubmitting} className="h-12 text-base font-semibold shadow-md hover:shadow-lg transition-shadow mt-2">
          Зарегистрироваться
        </SubmitButton>
      </form>
    </FormProvider>
  );
};
