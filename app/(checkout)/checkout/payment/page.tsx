import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { Container, Title } from "shared/components/shared";
import { InfoBlock } from "shared/components/shared/checkout";
import { Button } from "shared/components/ui";

export default function PaymentPage() {
  return (
    <Container className="mt-10">
      <Title text="Оплата заказа" className="font-extrabold mb-8 text-[36px]" />
      <InfoBlock className="p-8">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-orange-500" />
          </div>
          <Title text="Необходимо добавить платежную систему" size="md" className="font-bold text-gray-800" />
          <p className="text-gray-600 text-lg max-w-md">
            В данный момент платежная система находится в разработке.
          </p>
          <Link href="/">
            <Button variant="default" size="lg" className="mt-4">
              Вернуться на главную
            </Button>
          </Link>
        </div>
      </InfoBlock>
    </Container>
  );
}