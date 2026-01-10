import { InfoBlock } from ".";
import { FormField } from "../form";

type Props = {
  totalAmount: number;
};

export const CheckoutAddress = ({ totalAmount }: Props) => {
  return (
    <InfoBlock title="3. Адрес доставки" className={!totalAmount ? "opacity-50 pointer-events-none" : ""} contentClassName="p-8">
      <div className="flex flex-col gap-5">
        <FormField name="address" fieldType="address" placeholder="Адрес" />
        <FormField name="comment" fieldType="textarea" placeholder="Комментарий к заказу" />
      </div>
    </InfoBlock>
  );
};
