"use client";

import { Prisma } from "@prisma/client";
import { ReactNode, useState, createContext } from "react";
import { calculateProductTotalPrice } from "../_helpers/price";

export interface CartProduct
  extends Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          id: true;
          deliveryFee: true;
          deliveryTimeMinutes: true;
        };
      };
    };
  }> {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  subtotalPrice: number;
  totalPrice: number;
  totalQuantity: number;
  totalDiscount: number;
  addProductToCart: ({
    product,
    emptyCart,
  }: {
    product: CartProduct;
    emptyCart?: boolean | undefined;
  }) => void;
  decreaseProductQuantity: (product: string) => void;
  increaseProductQuantity: (product: string) => void;
  removeProductFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  addProductToCart: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProductFromCart: () => {},
  clearCart: () => {},
  subtotalPrice: 0,
  totalQuantity: 0,
  totalPrice: 0,
  totalDiscount: 0,
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const subtotalPrice = products.reduce((acc, product) => {
    return acc + Number(product.price) * product.quantity;
  }, 0);

  const totalPrice =
    products.reduce((acc, product) => {
      return acc + calculateProductTotalPrice(product) * product.quantity;
    }, 0) + Number(products[0]?.restaurant?.deliveryFee);

  const totalQuantity = products.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);

  const totalDiscount =
    subtotalPrice - totalPrice + +Number(products[0]?.restaurant?.deliveryFee);

  const clearCart = () => {
    return setProducts([]);
  };

  const decreaseProductQuantity = (productId: string) => {
    return setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          if (cartProduct.quantity === 1) {
            return cartProduct;
          }

          return {
            ...cartProduct,
            quantity: cartProduct.quantity - 1,
          };
        }
        return cartProduct;
      }),
    );
  };
  const increaseProductQuantity: ICartContext["increaseProductQuantity"] = (
    productId: string,
  ) => {
    return setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1,
          };
        }
        return cartProduct;
      }),
    );
  };

  const removeProductFromCart: ICartContext["removeProductFromCart"] = (
    productId: string,
  ) => {
    return setProducts((prev) =>
      prev.filter((product) => product.id !== productId),
    );
  };

  const addProductToCart: ICartContext["addProductToCart"] = ({
    product,
    emptyCart,
  }) => {
    if (emptyCart) {
      setProducts([]);
    }

    const isProductAlreadyOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id,
    );

    if (isProductAlreadyOnCart) {
      return setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            if (cartProduct.quantity === 1) {
              return cartProduct;
            }

            return {
              ...cartProduct,
              quantity: cartProduct.quantity + product.quantity,
            };
          }
          return cartProduct;
        }),
      );
    }
    setProducts((prev) => [...prev, { ...product, product }]);
  };
  return (
    <CartContext.Provider
      value={{
        products,
        totalQuantity,
        clearCart,
        addProductToCart,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProductFromCart,
        subtotalPrice,
        totalPrice,
        totalDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
