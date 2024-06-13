import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { formatCurrency } from "@/app/_helpers/price";
import { OrderStatus, Prisma } from "@prisma/client";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true;
      products: {
        include: {
          product: true;
        };
      };
    };
  }>;
}

const getOrderStatusLabel = (status: OrderStatus) => {
  switch (status) {
    case "CANCELED":
      return "Cancelado";
    case "DELIVERED":
      return "Entregue";
    case "CONFIRMED":
      return "Confirmado";
    case "DELIVERING":
      return "Em Transporte";
    case "PREPARING":
      return "Preparando";
  }
};

export default function OrderItem({ order }: OrderItemProps) {
  return (
    <Card>
      <CardContent className="space-y-3 p-5">
        <div
          className={`w-min rounded-full bg-[#EEEEEE] px-2 py-1 text-muted-foreground ${order.status !== "DELIVERED" && "bg-green-500 text-white"}`}
        >
          <span className="block text-xs font-semibold">
            {getOrderStatusLabel(order.status)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={order.restaurant.imageUrl} />
            </Avatar>

            <span className="text-sm font-semibold">
              {order.restaurant.name}
            </span>
          </div>

          <Button variant="link" size="icon" className="h-5 w-5" asChild>
            <Link href={`/restaurants/${order.restaurantsId}`}>
              <ChevronRightIcon />
            </Link>
          </Button>
        </div>
        <Separator />

        <div className="space-y-2">
          {order.products.map((product) => (
            <div className="flex items-center gap-2 space-x-1" key={product.id}>
              <div className=" flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground">
                <span className="block text-xs text-white">
                  {product.quantity}
                </span>
              </div>

              <span className="block text-xs text-muted-foreground">
                {product.product.name}
              </span>
            </div>
          ))}
        </div>
        <div className="py-3">
          <Separator />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm">{formatCurrency(Number(order.totalPrice))}</p>
          <Button
            variant="ghost"
            className="text-xs text-primary"
            disabled={order.status !== "DELIVERED"}
          >
            Refazer pedido
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
