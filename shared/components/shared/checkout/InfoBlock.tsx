import React, { PropsWithChildren } from "react";
import { Title } from "..";
import { cn } from "shared/lib/utils";

type Props = {
  className?: string;
  contentClassName?: string;
  title?: string;
  endAdornment?: React.ReactNode;
}

export const InfoBlock = ({ title, endAdornment, className, contentClassName, children }: PropsWithChildren<Props>) => {
  return (
    <div className={cn("bg-white rounded-2xl md:rounded-3xl shadow-lg border border-gray-100 overflow-hidden", className)}>
      {title && (
        <div className="flex items-center justify-between p-4 md:p-7 px-5 md:px-9 border-b border-gray-100 bg-gradient-to-r from-gray-50/50 to-white">
          <Title text={title} size="sm" className="font-bold" />
          {endAdornment}
        </div>
      )}

      <div className={cn("px-4 md:px-7 py-4 md:py-6", contentClassName)}>{children}</div>
    </div>
  );
};
