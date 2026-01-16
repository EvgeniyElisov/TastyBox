import Link from "next/link";
import { Title } from ".";
import Image from "next/image";
import { Button } from "../ui";
import { Plus } from "lucide-react";
import { Ingredient } from "@prisma/client";

type Props = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  className?: string;
  ingredients: Ingredient[];
};

export const ProductCard = ({ id, name, price, imageUrl, className, ingredients }: Props) => {
  return (
    <article className={className}>
      <Link href={`/product/${id}`} className="group block">
        <div className="relative overflow-hidden rounded-xl md:rounded-2xl lg:rounded-2xl bg-linear-to-br from-secondary to-secondary/50 h-[240px] md:h-[300px] lg:h-[320px] shadow-lg shadow-primary/5 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary/10 group-hover:-translate-y-1">
          <div className="absolute inset-0 bg-linear-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex justify-center items-center h-full p-4 md:p-8 lg:p-8">
            <Image 
              className="w-full max-w-[200px] md:max-w-[240px] lg:max-w-[260px] h-auto object-contain transition-transform duration-300 group-hover:scale-110 group-hover:rotate-2" 
              src={imageUrl} 
              alt="Product" 
              width={260} 
              height={260}
              sizes="(max-width: 768px) 200px, (max-width: 1024px) 240px, 260px"
            />
          </div>
        </div>

        <div className="mt-4 md:mt-5 lg:mt-5 space-y-1.5 md:space-y-2 lg:space-y-2">
          <Title text={name} size="sm" className="font-bold group-hover:text-primary transition-colors" />
          <p className="text-xs md:text-sm lg:text-sm text-gray-500 leading-relaxed line-clamp-2 min-h-[36px] md:min-h-[40px] lg:min-h-[40px]">
            {ingredients.map((ingredient) => ingredient.name).join(", ")}
          </p>
        </div>

        <div className="flex justify-between items-center mt-4 md:mt-6 lg:mt-6 gap-3">
          <div>
            <span className="text-xs text-gray-400 font-medium">от</span>
            <span className="text-xl md:text-2xl lg:text-2xl font-bold ml-1.5 text-primary">{price} руб.</span>
          </div>

          <Button 
            variant="secondary" 
            className="text-sm md:text-base lg:text-base font-bold px-4 md:px-7 lg:px-7 h-10 md:h-12 lg:h-12 rounded-lg md:rounded-xl lg:rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 shrink-0"
          >
            <Plus size={18} className="md:w-5 md:h-5 lg:w-5 lg:h-5 mr-1.5 md:mr-2 lg:mr-2" />
            <span className="inline">Добавить</span>
          </Button>
        </div>
      </Link>
    </article>
  );
};
