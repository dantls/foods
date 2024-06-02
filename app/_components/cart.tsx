import { useContext } from "react";
import { CartContext } from "../_contexts/cart";
import CartItem from "./cart-item";

export default function Cart() {
  const { products } = useContext(CartContext);

  return (
    <div className="pt-4">
      <div className="space-y-4">
        {products.map((product) => (
          <CartItem key={product.id} cartProduct={product} />
        ))}
      </div>
    </div>
  );
}
