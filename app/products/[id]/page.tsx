import { Button } from "@/app/_components/ui/button";
import { formatCurrency } from "@/app/_helpers/price";
import { db } from "@/app/_lib/prisma";
import { ArrowDownIcon, ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });
  if (!product) {
    return notFound();
  }

  return (
    <div>
      <div className="relative h-[360px]" w-full>
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
        />

        <Button
          className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white"
          size="icon"
        >
          <ChevronLeftIcon />
        </Button>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-[0.375rem]">
          <div className="relative h-8 w-8">
            <Image
              src={product.restaurant.imageUrl}
              alt={product.restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <span className="text-xs text-muted-foreground">
            {product.restaurant.name}
          </span>
        </div>
        <h1 className="mb-3 mt-1 text-xl font-semibold">{product.name}</h1>

        <div className="flex justify-between">
          <div className="relative flex items-center ">
            <h2 className="text-xl font-semibold">
              {formatCurrency(Number(product.price))}
            </h2>
            {product.discountPercent && (
              <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-primary px-2 py-[2px] text-white">
                <ArrowDownIcon size={12} />
                <span className="text-xs font-semibold">
                  {product.discountPercent}%
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
