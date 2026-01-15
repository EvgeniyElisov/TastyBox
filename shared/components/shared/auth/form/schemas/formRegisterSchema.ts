import { z } from "zod";
import { formLoginSchema, passwordSchema } from "./formLoginSchema";

export const formRegisterSchema = formLoginSchema
  .extend({
    fullName: z.string().min(1, { error: "Введите имя и фамилию" }),
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Пароли не совпадают",
  });

export type RegisterFormInputs = z.infer<typeof formRegisterSchema>;
