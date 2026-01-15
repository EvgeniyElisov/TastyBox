"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { updateUserInfo } from "app/serverActions";
import { signOut } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "shared/components/ui";
import { toastError, toastSuccess } from "shared/lib";
import { Container, FormField, SubmitButton, Title } from "../..";
import { formProfileSchema, ProfileFormInputs } from "./schemas";
import { redirect } from "next/navigation";

type Props = {
  data: User;
};

export const ProfileForm = ({ data }: Props) => {
  const form = useForm<ProfileFormInputs>({
    resolver: zodResolver(formProfileSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ProfileFormInputs) => {
    try {
      await updateUserInfo({
        email: data.email,
        fullName: data.fullName,
        password: data.password && data.password.length > 0 ? data.password : undefined,
      });
      toastSuccess("Данные обновлены 📝");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ошибка при обновлении данных";
      return toastError(errorMessage);
    }
  };

  const onClickSignOut = () => {
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <Container className="my-10">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Title text="Личные данные" size="md" className="font-bold mb-2" />
          <p className="text-muted-foreground text-sm leading-relaxed">
            Управляйте своими личными данными и настройками аккаунта
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
          <FormProvider {...form}>
            <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-5">
                <FormField 
                  type="email" 
                  name="email" 
                  label="E-Mail" 
                  placeholder="Введите ваш email"
                  required 
                />
                <FormField 
                  type="text" 
                  name="fullName" 
                  label="Полное имя" 
                  placeholder="Введите ваше полное имя"
                  required 
                />

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-4">
                    Оставьте поля пароля пустыми, если не хотите менять пароль
                  </p>
                  <div className="space-y-5">
                    <FormField 
                      type="password" 
                      name="password" 
                      label="Новый пароль" 
                      placeholder="Введите новый пароль (необязательно)"
                    />
                    <FormField 
                      type="password" 
                      name="confirmPassword" 
                      label="Повторите пароль" 
                      placeholder="Повторите новый пароль (необязательно)"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <SubmitButton 
                  isSubmitting={form.formState.isSubmitting} 
                  className="h-12 text-base font-semibold shadow-md hover:shadow-lg transition-shadow flex-1"
                >
                  Сохранить изменения
                </SubmitButton>

                <Button 
                  onClick={onClickSignOut} 
                  variant="outline" 
                  disabled={form.formState.isSubmitting} 
                  className="h-12 text-base font-semibold px-6" 
                  type="button"
                >
                  Выйти из аккаунта
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </Container>
  );
};
