import { z } from "zod";

export const formProfileSchema = z
  .object({
    email: z.email({ error: "Некорректный email" }),
    fullName: z.string().min(1, { message: "Введите имя и фамилию" }),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {

      const password = data.password || "";
      const confirmPassword = data.confirmPassword || "";

      if (password === "" && confirmPassword === "") {
        return true;
      }

      return password === confirmPassword;
    },
    {
      path: ["confirmPassword"],
      message: "Пароли не совпадают",
    }
  )
  .refine(
    (data) => {
      const password = data.password || "";
      if (password.length > 0 && password.length < 5) {
        return false;
      }
      return true;
    },
    {
      path: ["password"],
      message: "Пароль должен содержать минимум 5 символов",
    }
  )
export type ProfileFormInputs = z.infer<typeof formProfileSchema>;
