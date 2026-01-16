import { Suspense } from "react";
import { Container, Filters, ProductsGroupList, Stories, TopBar } from "shared/components/shared";
import { findPizzas, GetSearchParams } from "shared/lib/findPizzas";
import { FiltersMobile } from "shared/components/shared/FiltersMobile";

export default async function Home({searchParams}: {searchParams: Promise<GetSearchParams>}) {
  const params = await searchParams;
  const categories = await findPizzas(params);
 

  return (
    <>
      <TopBar categories={categories.filter((category) => category.products.length > 0)} />

      <Stories/>
      
      <Container className={"mt-8 md:mt-12 lg:mt-16 pb-12 md:pb-20 lg:pb-24"}>
        <div className={"flex flex-col lg:flex-row gap-6 lg:gap-12 lg:gap-20"}>
          <div className={"hidden lg:block w-[280px] lg:w-[300px] sticky top-[140px] h-fit"}>
            <Suspense>
              <Filters />
            </Suspense>
          </div>
          <div className={"lg:hidden"}>
            <Suspense>
              <FiltersMobile />
            </Suspense>
          </div>
          <div className={"flex-1"}>
            <div className={"flex flex-col gap-12 md:gap-16 lg:gap-24"}>
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList 
                      key={category.id} 
                      title={category.name} 
                      products={category.products} 
                      categoryId={category.id} 
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
