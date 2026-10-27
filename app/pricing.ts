import type { CatalogProduct } from "./catalog";

// Margem sobre o custo do fornecedor: 7%, no mínimo R$ 250 e no máximo R$ 800 de lucro.
const marginRate = 0.07;
const minimumProfit = 250;
const maximumProfit = 800;

export const roundUpTo90 = (value: number) => {
  const whole = Math.ceil(value);
  const remainder = whole % 100;
  return remainder <= 90 ? whole - remainder + 90 : whole - remainder + 190;
};

const priceKey = (product: CatalogProduct) => `${product.category}|${product.name}|${product.specs}`;

// Preços definidos manualmente: têm prioridade sobre o cálculo.
const overrides: Record<string, number> = {
  "iPhones lacrados|iPhone 15|128 GB · chip físico + eSIM": 4490,
  "iPhones lacrados|iPhone 15 Plus|256 GB": 5090,
  "iPhones lacrados|iPhone 16 Pro Max|256 GB · eSIM": 7690,
  "iPhones seminovos|iPhone 13|128 GB · versão EUA": 1990,
  "iPhones seminovos|iPhone 14|128 GB · versão EUA": 2290,
};

export const isIphoneCategory = (product: CatalogProduct) =>
  product.category === "iPhones lacrados" || product.category === "iPhones seminovos";

export const iphoneSalePrice = (product: CatalogProduct) => {
  const manual = overrides[priceKey(product)];
  if (manual) return manual;
  const profit = Math.min(Math.max(product.price * marginRate, minimumProfit), maximumProfit);
  return roundUpTo90(product.price + profit);
};
