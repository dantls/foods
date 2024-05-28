import { db } from "@/app/_lib/prisma";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/restaurant-image";

interface RestaurantProps {
  params: {
    id: string;
  };
}

export default async function Restaurants({ params: { id } }: RestaurantProps) {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
  });

  if (!restaurant) {
    return notFound();
  }

  return (
    <div>
      <RestaurantImage restaurant={restaurant} />

      <div className="item-center flex justify-between px-5 pt-5">
        <div className="item-center flex gap-[0.375rem]">
          <div className="relative h-8 w-8">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <h1 className="text-xl font-semibold">{restaurant.name}</h1>
        </div>
        <div className="flex items-center gap-[3px] rounded-full bg-foreground px-2 py-[2px] text-white">
          <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-semibold">5.0</span>
        </div>
      </div>
    </div>
  );
}
