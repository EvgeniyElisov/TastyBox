import { EmailButton } from "./EmailButton";
import { EmailContent } from "./EmailContent";
import { EmailFooter } from "./EmailFooter";
import { EmailHeader } from "./EmailHeader";
import { EmailInfoText } from "./EmailInfoText";
import { EmailLayout } from "./EmailLayout";

type Props = {
  code: string;
};

export const VerifyUserTemplate = ({ code }: Props) => {
  const verifyUrl = `http://localhost:3000/api/auth/verify?code=${code}`;

  return (
    <EmailLayout>
      <EmailHeader />

      <EmailContent>
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-500 rounded-full inline-flex items-center justify-center mb-5">
            <span className="text-4xl text-white">✉️</span>
          </div>
          <h2 className="m-0 mb-2.5 text-gray-800 text-2xl font-semibold">Подтвердите регистрацию</h2>
          <p className="m-0 text-gray-500 text-base">Добро пожаловать в TastyShop!</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200 text-center">
          <p className="m-0 mb-3 text-gray-500 text-sm font-medium">Ваш код подтверждения:</p>
          <div className="bg-white rounded-lg p-4 border-2 border-dashed border-blue-500 inline-block">
            <span className="text-gray-800 text-[32px] font-bold tracking-[4px] font-mono">{code}</span>
          </div>
        </div>

        <EmailButton href={verifyUrl}>Подтвердить регистрацию</EmailButton>

        <EmailInfoText text="Нажмите на кнопку выше, чтобы подтвердить ваш email адрес." url={verifyUrl} />
      </EmailContent>

      <EmailFooter />
    </EmailLayout>
  );
};
