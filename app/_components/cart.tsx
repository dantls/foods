import { useContext } from "react";
import { CartContext } from "../_contexts/cart";
import { formatCurrency } from "../_helpers/price";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";

export default function Cart() {
  const { products, subtotalPrice, totalPrice, totalDiscount } =
    useContext(CartContext);

  return (
    <div className="py-5">
      <div className="space-y-4">
        {products.map((product) => (
          <CartItem key={product.id} cartProduct={product} />
        ))}
      </div>

      <div className="mt-6">
        <Card>
          <CardContent className="space-y-2 p-5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Subtotal:</span>
              <span>{formatCurrency(subtotalPrice)}</span>
            </div>
            <Separator />

            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Entrega:</span>
              <span>
                {!!products[0] &&
                  (Number(products[0]?.restaurant?.deliveryFee) === 0
                    ? "Grátis"
                    : formatCurrency(
                        Number(products[0]?.restaurant?.deliveryFee),
                      ))}
              </span>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Descontos:</span>
              <span>- {formatCurrency(totalDiscount)}</span>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-xs font-semibold">
              <span>Total:</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
