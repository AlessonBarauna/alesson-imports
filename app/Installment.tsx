import { creditInstallment, creditInstallments } from "./pricing";

const money2 = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Parcelamento no crédito (12x) exibido abaixo do preço de cada produto.
export function Installment({ price }: { price: number }) {
  return (
    <span className="installment">
      ou <b>{creditInstallments}x de {money2(creditInstallment(price))}</b> no crédito
      <em>Valor aproximado · confirme com a gente no WhatsApp</em>
    </span>
  );
}
