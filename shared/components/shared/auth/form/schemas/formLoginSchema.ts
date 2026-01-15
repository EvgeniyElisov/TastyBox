import { z } from "zod";

export const passwordSchema = z.string().min(5, { message: "Пароль должен содержать минимум 5 символов" });

export const formLoginSchema = z.object({
  email: z.email({ error: "Некорректный email" }),
  password: passwordSchema,
});

export type LoginFormInputs = z.infer<typeof formLoginSchema>;
