"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";
import { toastError, toastSuccess } from "shared/lib";
import { FormField, SocialAuthButtons, SubmitButton, Title } from "../..";
import { formLoginSchema, LoginFormInputs } from "./schemas";

type Props = {
  onClose?: () => void;
};

export const LoginForm = ({ onClose }: Props) => {
  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const resp = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (!resp?.ok) {
        toastError("Неверный E-Mail или пароль");
        return;
      }

      toastSuccess("Вы успешно вошли в аккаунт");
      onClose?.();
    } catch (error) {
      console.log("Error [LOGIN]", error);
      toastError("Не удалось войти в аккаунт");
    }
  };

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Вход в аккаунт" size="md" className="font-bold" />
            <p className="text-gray-400">Введите свою почту, чтобы войти в свой аккаунт</p>
          </div>
          <Image src="/assets/images/email-icon.png" alt="email-icon" width={60} height={60} />
        </div>

        <FormField 
          type="email" 
          name="email" 
          label="E-Mail" 
          placeholder="Введите вашу почту" 
          required 
        />
        <FormField 
          type="password" 
          name="password" 
          label="Пароль" 
          placeholder="Введите ваш пароль" 
          required 
        />

        <SubmitButton isSubmitting={form.formState.isSubmitting}>
          Войти
        </SubmitButton>
        <p className="text-gray-400">Или войдите с помощью социальных сетей</p>
        <SocialAuthButtons type="login" onSwitchType={() => {}} />
      </form>
    </FormProvider>
  );
};
