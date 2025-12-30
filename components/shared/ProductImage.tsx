import { cn } from "lib/utils";
import Image from "next/image";
type Props = {
  src: string;
  alt: string;
  size: 20 | 30 | 40;
  className?: string;
};

const mapSizeToDimensions = {
  20: 300,
  30: 400,
  40: 500,
};

export const ProductImage = ({ src, alt, size, className }: Props) => {
  return (
    <div className={cn("flex items-center justify-center flex-1 relative w-full", className)}>
      <Image
        src={src}
        alt={alt}
        width={mapSizeToDimensions[size]}
        height={mapSizeToDimensions[size]}
        className={cn("relative left-2 top-2 transition-all z-10")}
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[450px] h-[450px]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100 w-[370px] h-[370px]" />
    </div>
  );
};
