import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const EmailContent = ({ children }: Props) => {
  return (
    <tr>
      <td className="px-8 py-10">{children}</td>
    </tr>
  );
};
