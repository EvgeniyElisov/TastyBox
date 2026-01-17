"use client";

import { useEffect, useState } from "react";
import { AlertCircle, RefreshCw, Home, Database } from "lucide-react";
import Link from "next/link";
import { Container } from "widgets/container";
import { Title } from "widgets/title";
import { Button } from "shared/ui";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.error("Application error:", error);
    setMounted(true);
  }, [error]);

  const isDatabaseError = error.message?.includes("DATABASE_URL");

  return (
    <Container className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12 md:py-16 lg:py-20">
      <div className="flex flex-col items-center text-center max-w-2xl w-full animate-in fade-in-0 duration-500">
        {/* Иконка ошибки */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl animate-pulse" />
          <div className="relative bg-red-50 dark:bg-red-950/30 rounded-full p-6 border-4 border-red-100 dark:border-red-900/50">
            {isDatabaseError ? (
              <Database className="w-16 h-16 text-red-500" strokeWidth={1.5} />
            ) : (
              <AlertCircle className="w-16 h-16 text-red-500" strokeWidth={1.5} />
            )}
          </div>
        </div>

        {/* Заголовок */}
        <Title
          size="xl"
          text={isDatabaseError ? "Ошибка подключения к базе данных" : "Произошла ошибка"}
          className="font-extrabold mb-4 text-gray-900 dark:text-gray-100"
        />

        {/* Описание */}
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          {isDatabaseError ? (
            <>
              Не удалось подключиться к базе данных.
              <br />
              Проверьте настройки переменных окружения в Vercel.
            </>
          ) : (
            <>
              Что-то пошло не так при загрузке страницы.
              <br />
              Попробуйте обновить страницу или вернуться на главную.
            </>
          )}
        </p>

        {/* Дополнительная информация для разработчиков */}
        {process.env.NODE_ENV === "development" && (
          <div className="w-full mb-8 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-800">
            <p className="text-sm font-mono text-left text-gray-700 dark:text-gray-300 break-all">
              {error.message || "Неизвестная ошибка"}
            </p>
            {error.digest && (
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                Digest: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Кнопки действий */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button
            onClick={reset}
            variant="default"
            size="lg"
            className="gap-2 min-w-[200px]"
          >
            <RefreshCw className="w-5 h-5" />
            Попробовать снова
          </Button>
          <Link href="/">
            <Button
              variant="outline"
              size="lg"
              className="gap-2 min-w-[200px]"
            >
              <Home className="w-5 h-5" />
              На главную
            </Button>
          </Link>
        </div>

        {/* Декоративные элементы */}
        <div className="mt-12 flex gap-2 opacity-30">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </Container>
  );
}
