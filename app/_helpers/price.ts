import { Product } from "@prisma/client";

export const calculateProductTotalPrice = (product: Product): number => {
  if (product.discountPercent === 0) {
    return Number(product.price);
  }

  const discount = Number(product.price) * (product.discountPercent / 100);

  return Number(product.price) - discount;
};

export const formatCurrency = (value: number): string => {
  return `R$${Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value)}`;
};
