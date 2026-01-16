import clsx from "clsx";
import React from "react";

type TitleSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

type Props = {
  size?: TitleSize;
  className?: string;
  text: string;
};

export const Title = ({ text, size = "sm", className }: Props) => {
  const mapTagBySize = {
    xs: "h5",
    sm: "h4",
    md: "h3",
    lg: "h2",
    xl: "h1",
    "2xl": "h1",
  } as const;

  const mapClassNameBySize = {
    xs: "text-base md:text-[18px] lg:text-[18px]",
    sm: "text-lg md:text-xl lg:text-[24px]",
    md: "text-xl md:text-2xl lg:text-[30px]",
    lg: "text-2xl md:text-3xl lg:text-[38px]",
    xl: "text-3xl md:text-4xl lg:text-[48px]",
    "2xl": "text-4xl md:text-5xl lg:text-[56px]",
  } as const;

  return React.createElement(mapTagBySize[size], { className: clsx(mapClassNameBySize[size], className) }, text);
};
