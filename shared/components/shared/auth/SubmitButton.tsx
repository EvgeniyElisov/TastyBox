"use client";

import { Button } from "shared/components/ui";

type Props = {
  isSubmitting: boolean;
  children: React.ReactNode;
};

export const SubmitButton = ({ isSubmitting, children }: Props) => {
  return (
    <Button loading={isSubmitting} className="h-12 text-base" type="submit">
      {children}
    </Button>
  );
};
