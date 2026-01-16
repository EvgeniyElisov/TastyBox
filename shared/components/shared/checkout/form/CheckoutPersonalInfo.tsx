import { InfoBlock } from "..";
import { FormField } from "../..";

type Props = {
  totalAmount: number;
  className?: string;
};

export const CheckoutPersonalInfo = ({ totalAmount, className }: Props) => {
  return (
    <InfoBlock 
        title="2. Персональная информация" 
        className={className} 
        contentClassName="p-6 md:p-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <FormField 
          type="text" 
          name="firstName" 
          fieldType="input" 
          placeholder="Введите ваше имя" 
          label="Имя" 
          required 
        />
        <FormField 
          type="text" 
          name="lastName" 
          fieldType="input" 
          placeholder="Введите вашу фамилию" 
          label="Фамилия" 
          required 
        />
        <FormField 
          type="email" 
          name="email" 
          fieldType="input" 
          placeholder="Введите вашу почту" 
          label="E-Mail" 
          required 
        />
        <FormField 
          type="tel" 
          name="phone" 
          fieldType="input" 
          placeholder="Введите ваш телефон" 
          label="Телефон" 
          required 
        />
      </div>  
    </InfoBlock>
  );
};
