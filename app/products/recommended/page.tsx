import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import { db } from "@/app/_lib/prisma";

export default async function RecommendedProductsPage() {
  const products = await db.product.findMany({
    where: {
      discountPercent: {
        gt: 0,
      },
    },
    take: 20,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  // TODO: pegar produtos com mais pedidos
  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">Pedidos Recomendados</h2>
        <div className="grid grid-cols-2 gap-6">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={JSON.parse(JSON.stringify(product))}
              className="min-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
}
