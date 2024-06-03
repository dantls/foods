import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";
import { CartContext, ICartProduct } from "../_contexts/cart";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";

interface CartItemProps {
  cartProduct: ICartProduct;
}

export default function CartItem({ cartProduct }: CartItemProps) {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
    subtotalPrice,
    totalPrice,
    totalDiscount,
  } = useContext(CartContext);

  const handleDecreaseQuantityClick = () =>
    decreaseProductQuantity(cartProduct.id);

  const handleIncreaseQuantityClick = () =>
    increaseProductQuantity(cartProduct.id);

  const handleRemoveProductClick = () => removeProductFromCart(cartProduct.id);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20">
          <Image
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
            className="rounded-lg object-cover"
            fill
          />
        </div>

        <div className="space-y-1">
          <h3 className="text-xs">{cartProduct.name}</h3>
          <div className="flex items-center gap-1">
            <h4 className="text-sm font-semibold">
              {formatCurrency(
                calculateProductTotalPrice(cartProduct) * cartProduct.quantity,
              )}
            </h4>
            {cartProduct.discountPercent > 0 && (
              <span className="text-sm text-muted-foreground line-through">
                {formatCurrency(
                  Number(cartProduct.price) * cartProduct.quantity,
                )}
              </span>
            )}
          </div>
          {/* QUANTIDADE */}
          <div className="flex items-center gap-3 text-center">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 border border-solid border-muted-foreground"
              onClick={handleDecreaseQuantityClick}
            >
              <ChevronLeftIcon size={18} />
            </Button>
            <span className="w-5 text-sm">{cartProduct.quantity}</span>
            <Button
              size="icon"
              className="h-8 w-8"
              onClick={handleIncreaseQuantityClick}
            >
              <ChevronRightIcon size={18} />
            </Button>
          </div>
        </div>
      </div>

      <Button
        size="icon"
        className="h-8 w-8 border border-solid border-muted-foreground"
        variant="ghost"
        onClick={handleRemoveProductClick}
      >
        <TrashIcon size={18} />
      </Button>
    </div>
  );
}
