import { cn } from "shared/lib/utils";
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

export const PizzaImage = ({ src, alt, size, className }: Props) => {
  const baseSize = mapSizeToDimensions[size];
  return (
    <figure className={cn("flex items-center justify-center flex-1 relative w-full max-w-full", className)}>
      <div className="relative z-10 drop-shadow-2xl max-w-full max-h-full">
        <Image
          src={src}
          alt={alt}
          width={baseSize}
          height={baseSize}
          className={cn("transition-all w-[150px] h-[150px] md:w-[200px] md:h-[200px] object-contain max-w-full max-h-full", {
            "lg:w-[300px] lg:h-[300px]": size === 20,
            "lg:w-[400px] lg:h-[400px]": size === 30,
            "lg:w-[500px] lg:h-[500px]": size === 40,
          })}
        />
      </div>
    </figure>
  );
};
