import { Category } from "@prisma/client";
import { cn } from "shared/lib/utils";
import { Categories, Container } from ".";

type Props = {
  className?: string;
  categories: Category[];
};

export const TopBar = ({ className, categories }: Props) => {
  return (
    <div className={cn("sticky top-[57px] md:top-[65px] lg:top-[73px] bg-white/95 backdrop-blur-md py-4 md:py-6 lg:py-7 shadow-md shadow-black/5 z-10 border-b border-gray-100", className)}>
      <Container className="flex items-center justify-between">
        <Categories items={categories} />
      </Container>
    </div>
  );
};
