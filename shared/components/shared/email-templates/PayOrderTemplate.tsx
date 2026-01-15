import { EmailButton } from "./EmailButton";
import { EmailContent } from "./EmailContent";
import { EmailFooter } from "./EmailFooter";
import { EmailHeader } from "./EmailHeader";
import { EmailInfoText } from "./EmailInfoText";
import { EmailLayout } from "./EmailLayout";

type Props = {
  oderId: number;
  totalAmount: number;
  paymentUrl: string;
};

export const PayOrderTemplate = ({ oderId, totalAmount, paymentUrl }: Props) => {
  return (
    <EmailLayout>
      <EmailHeader />

      <EmailContent>
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-emerald-500 rounded-full inline-flex items-center justify-center mb-5">
            <span className="text-4xl">✓</span>
          </div>
          <h2 className="m-0 mb-2.5 text-gray-800 text-2xl font-semibold">Заказ успешно оформлен!</h2>
          <p className="m-0 text-gray-500 text-base">Спасибо за ваш заказ</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200">
          <table role="presentation" className="w-full border-collapse">
            <tr>
              <td className="py-2">
                <span className="text-gray-500 text-sm font-medium">Номер заказа:</span>
              </td>
              <td className="py-2 text-right">
                <span className="text-gray-800 text-base font-semibold">№{oderId}</span>
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="py-3 pt-3 pb-2 border-t border-gray-200"></td>
            </tr>
            <tr>
              <td className="py-2">
                <span className="text-gray-500 text-sm font-medium">Сумма заказа:</span>
              </td>
              <td className="py-2 text-right">
                <span className="text-[#ff6b35] text-2xl font-bold">{totalAmount.toLocaleString("ru-RU")} ₽</span>
              </td>
            </tr>
          </table>
        </div>

        <EmailButton href={paymentUrl}>Оплатить заказ</EmailButton>

        <EmailInfoText text="Нажмите на кнопку выше, чтобы перейти к оплате заказа." url={paymentUrl} />
      </EmailContent>

      <EmailFooter />
    </EmailLayout>
  );
};
