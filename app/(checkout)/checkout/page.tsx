import { CheckoutForm, Container, Title } from "shared/components/shared";

export default function CheckoutPage() {
  return (
    <Container className="mt-6 md:mt-10">
      <Title text="Оформление заказа" className="font-extrabold mb-6 md:mb-8 text-2xl md:text-3xl lg:text-[36px]" />
      <CheckoutForm />
    </Container>
  );
}
