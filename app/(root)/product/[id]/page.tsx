import { Container, GroupVariants, ProductImage, Title } from "components/shared";
import { notFound } from "next/navigation";
import { prisma } from "prisma/prisma";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className={"flex flex-col mt-10 mb-10"}>
      <div className={"flex flex-1"}>
        <ProductImage src={product.imageUrl} alt={product.name} size={20} />
        <div className={"w-[490px] bg-[#f9f4f0] p-7"}>
          <Title text={product.name} size="md" className="font-extrabold mb-1" />
          <p className={"text-gray-400"}>Lorem ipsum dolor sit amet consectetur</p>
          <GroupVariants 
          selectedValue="1"
          items={[
            {
              name: "Маленькая",
              value: "1",
            },
            {
              name: "Средняя",
              value: "2",
            },
            {
              name: "Большая",
              value: "3",
              disabled: true,
            },
          ]} />
        </div>
      </div>
    </Container>
  );
}
