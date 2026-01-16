"use client";

import Link from "next/link";
import { CheckCircle2, Home } from "lucide-react";
import { Container } from "shared/components/shared";
import { Button } from "shared/components/ui";

export default function VerifiedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-20">
      <Container className="flex flex-col items-center">
        <div className="flex flex-col items-center max-w-2xl text-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative bg-green-500 rounded-full p-6 shadow-lg">
              <CheckCircle2 className="w-16 h-16 text-white" strokeWidth={2.5} />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-5xl font-extrabold text-gray-900 mb-4">Регистрация завершена!</h1>

          <p className="text-lg text-gray-600 mb-2 leading-relaxed">Поздравляем! Ваш аккаунт успешно создан и подтверждён.</p>
          <p className="text-base text-gray-500 mb-12 leading-relaxed">Теперь вы можете войти в свой аккаунт и начать делать заказы.</p>

          <Link href="/">
            <Button variant="default" size="lg" className="min-w-[200px] gap-2 h-12 text-base font-medium">
              <Home size={20} />
              На главную
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
