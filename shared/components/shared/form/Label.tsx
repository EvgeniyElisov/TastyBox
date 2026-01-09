import { RequiredSymbol } from ".";

type Props = {
  label: string;
  required?: boolean;
};

export const Label = ({ label, required }: Props) => {
  return (
    <p className="font-medium mb-2">
      {label} {required && <RequiredSymbol />}
    </p>
  );
};
