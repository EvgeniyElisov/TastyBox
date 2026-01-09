import { InfoBlock } from ".";
import { FormInput } from "..";

type Props = {
  totalAmount: number;
};

export const CheckoutPersonalInfo = ({ totalAmount }: Props) => {
  return (
    <InfoBlock 
        title="2. Персональная информация" 
        className={!totalAmount ? "opacity-50 pointer-events-none" : ""} 
        contentClassName="p-8"
    >
      <div className="grid grid-cols-2 gap-5">
        <FormInput name="firstName" className="text-base" placeholder="Имя" />
        <FormInput name="lastName" className="text-base" placeholder="Фамилия" />
        <FormInput name="email" className="text-base" placeholder="E-Mail" />
        <FormInput name="phone" className="text-base" placeholder="Телефон" />
      </div>
    </InfoBlock>
  );
};
