import type { CatalogProduct } from "./catalog";

// iPhones: o catálogo guarda o preço da lista do fornecedor; o custo real soma 1% de nota fiscal e R$ 50 de frete.
// Margem sobre esse custo: 7%, no mínimo R$ 250 e no máximo R$ 800 de lucro (R$ 1.200 quando o custo passa de R$ 15.000).
const marginRate = 0.07;
const minimumProfit = 250;
const maximumProfit = 800;
const highTicketCost = 15000;
const highTicketMaximumProfit = 1200;

export const roundUpTo90 = (value: number) => {
  const whole = Math.ceil(value);
  const remainder = whole % 100;
  return remainder <= 90 ? whole - remainder + 90 : whole - remainder + 190;
};

const priceKey = (product: CatalogProduct) => `${product.category}|${product.name}|${product.specs}`;

// Preços definidos manualmente: têm prioridade sobre o cálculo.
const overrides: Record<string, number> = {
  // por id do card (quando o mesmo modelo tem cards diferentes por cor)
  "iphone-17-pro-256-gb-esim-172": 7690,
  "iphone-16-128-gb-chip-fisico-esim-168": 4790,
  // por categoria|modelo|especificação
  "iPhones lacrados|iPhone 15 Plus|256 GB": 5090,
  "iPhones seminovos|iPhone 13|128 GB · versão EUA": 2090,
  "iPhones seminovos|iPhone 14|128 GB · versão EUA": 2290,
};

export const isIphoneCategory = (product: CatalogProduct) =>
  product.category === "iPhones lacrados" || product.category === "iPhones seminovos";

export const iphoneSalePrice = (product: CatalogProduct) => {
  const manual = overrides[product.id] ?? overrides[priceKey(product)];
  if (manual) return manual;
  const cost = product.price * 1.01 + 50;
  const profit = Math.min(Math.max(cost * marginRate, minimumProfit), cost > highTicketCost ? highTicketMaximumProfit : maximumProfit);
  return roundUpTo90(cost + profit);
};

// iPads: custo já inclui 1% de nota fiscal e R$ 50 de frete; margem bruta-alvo de 15% sobre a venda.
const ipadMargin = 0.15;
const ipadOverrides: Record<string, number> = {
  // mantido abaixo da oferta recorrente da Amazon (R$ 3.243)
  "ipad-a16-128-gb-wi-fi-63": 3190,
};

export const isIpad = (product: CatalogProduct) => product.category === "iPad";

export const ipadSalePrice = (product: CatalogProduct) =>
  ipadOverrides[product.id] ?? roundUpTo90(Math.ceil(product.price / (1 - ipadMargin)));

// Crédito na InfinityPay: a taxa de cada plano é cobrada sobre o total parcelado,
// então o cliente paga preço ÷ (1 − taxa) dividido em N (ex.: R$ 2.090 em 12x → 12x de R$ 208,98).
export const creditRates: Record<number, number> = {
  1: 0.042, 2: 0.0609, 3: 0.0701, 4: 0.0791, 5: 0.0888, 6: 0.0967,
  7: 0.1259, 8: 0.1342, 9: 0.1425, 10: 0.1506, 11: 0.1587, 12: 0.1666,
};
export const creditPlans = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
export const creditTotal = (price: number, installments: number) => price / (1 - creditRates[installments]);
export const creditInstallment = (price: number, installments = 12) => Math.round((creditTotal(price, installments) / installments) * 100) / 100;
