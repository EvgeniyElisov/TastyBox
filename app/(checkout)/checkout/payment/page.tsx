import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { Container, Title } from "shared/components/shared";
import { InfoBlock } from "shared/components/shared/checkout";
import { Button } from "shared/components/ui";

export default function PaymentPage() {
  return (
    <Container className="mt-6 md:mt-10">
      <Title text="Оплата заказа" className="font-extrabold mb-6 md:mb-8 text-2xl md:text-3xl lg:text-[36px]" />
      <InfoBlock className="p-6 md:p-8">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-orange-100 flex items-center justify-center">
            <AlertCircle className="w-6 h-6 md:w-8 md:h-8 text-orange-500" />
          </div>
          <Title text="Необходимо добавить платежную систему" size="md" className="font-bold text-gray-800" />
          <p className="text-gray-600 text-base md:text-lg max-w-md px-4">
            В данный момент платежная система находится в разработке.
          </p>
          <Link href="/">
            <Button variant="default" size="lg" className="mt-4 w-full sm:w-auto">
              Вернуться на главную
            </Button>
          </Link>
        </div>
      </InfoBlock>
    </Container>
  );
}