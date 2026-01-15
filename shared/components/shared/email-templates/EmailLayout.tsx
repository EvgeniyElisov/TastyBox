import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const EmailLayout = ({ children }: Props) => {
  return (
    <html>
      <body className="m-0 p-0 bg-gray-100 font-sans">
        <table role="presentation" className="w-full border-collapse bg-gray-100 py-5">
          <tr>
            <td align="center" className="px-5 py-10">
              <table
                role="presentation"
                className="max-w-[600px] w-full bg-white rounded-xl shadow-md border-collapse overflow-hidden"
              >
                {children}
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  );
};
