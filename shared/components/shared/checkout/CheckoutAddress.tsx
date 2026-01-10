"use client";

import { Controller, useFormContext } from "react-hook-form";
import { AddressInput, InfoBlock } from ".";
import { FormTextarea } from "../form";

type Props = {
  totalAmount: number;
};

export const CheckoutAddress = ({ totalAmount }: Props) => {
  const {control} = useFormContext();
  return (
    <InfoBlock title="3. Адрес доставки" className={!totalAmount ? "opacity-50 pointer-events-none" : ""} contentClassName="p-8">
      <div className="flex flex-col gap-5">
        <Controller
          control={control}
          name={"address"}
          render={({ field }) => <AddressInput onChange={field.onChange} />}
        />
        <FormTextarea name="comment" className="text-base" placeholder="Комментарий к заказу" />
      </div>
    </InfoBlock>
  );
};
