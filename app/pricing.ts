import type { CatalogProduct } from "./catalog";

// Regra única para todos os produtos:
//   custo = preço do fornecedor + 1% de nota fiscal + R$ 50 de frete
//   venda = custo + lucro (8% do custo, mínimo de R$ 250, sem teto), arredondado para cima até terminar em 90.
// No catálogo, iPhones guardam o preço da lista do fornecedor; os demais produtos já guardam o custo (NF + frete somados).
const nfRate = 0.01;
const freight = 50;
const profitRate = 0.08;
const minimumProfit = 250;

export const roundUpTo90 = (value: number) => {
  const whole = Math.ceil(value);
  const remainder = whole % 100;
  return remainder <= 90 ? whole - remainder + 90 : whole - remainder + 190;
};

export const isIphoneCategory = (product: CatalogProduct) =>
  product.category === "iPhones lacrados" || product.category === "iPhones seminovos";

export const isIpad = (product: CatalogProduct) => product.category === "iPad";

export const productCost = (product: CatalogProduct) =>
  isIphoneCategory(product) ? product.price * (1 + nfRate) + freight : product.price;

export const salePrice = (product: CatalogProduct) => {
  const cost = productCost(product);
  return roundUpTo90(cost + Math.max(cost * profitRate, minimumProfit));
};

export const iphoneSalePrice = salePrice;
export const ipadSalePrice = salePrice;

// Crédito na InfinityPay: a taxa de cada plano é cobrada sobre o total parcelado,
// então o cliente paga preço ÷ (1 − taxa) dividido em N (ex.: R$ 2.090 em 12x → 12x de R$ 208,98).
export const creditRates: Record<number, number> = {
  1: 0.042, 2: 0.0609, 3: 0.0701, 4: 0.0791, 5: 0.0888, 6: 0.0967,
  7: 0.1259, 8: 0.1342, 9: 0.1425, 10: 0.1506, 11: 0.1587, 12: 0.1666,
};
export const creditPlans = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
export const creditTotal = (price: number, installments: number) => price / (1 - creditRates[installments]);
export const creditInstallment = (price: number, installments = 12) => Math.round((creditTotal(price, installments) / installments) * 100) / 100;
