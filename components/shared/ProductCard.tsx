import Link from "next/link";
import { Title } from ".";
import Image from "next/image";
import { Button } from "components/ui";
import { Plus } from "lucide-react";

type Props = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  className?: string;
  variants: any[];
  ingredients: any[];
};

export const ProductCard = ({ id, name, price, imageUrl, className, variants, ingredients }: Props) => {
  return (
    <div className={className}>
      <Link href={`/product/${id}`}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <Image className="w-[215px] h-[215px]" src={imageUrl} alt="Product" width={100} height={100} />
        </div>

        <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

        <p className="text-sm text-gray-400">Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, соус альфредо, чеснок</p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-[20px]">
            от <b>{price} ₽</b>
          </span>

          <Button variant="secondary" className="text-base font-bold">
            <Plus size={20} className="mr-1" />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  );
  return <div>ProductCard</div>;
};
