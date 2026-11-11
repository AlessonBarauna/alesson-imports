import { creditInstallment, creditPlans } from "./pricing";

const money2 = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Parcelamento no crédito: destaque em 12x e lista completa de 1x a 12x ao abrir "Ver todas as parcelas".
export function Installment({ price }: { price: number }) {
  return (
    <span className="installment">
      ou <b>12x de {money2(creditInstallment(price, 12))}</b> no crédito
      <details>
        <summary>Ver todas as parcelas</summary>
        <ul>
          {creditPlans.map((n) => <li key={n}><span>{n}x</span><b>{money2(creditInstallment(price, n))}</b></li>)}
        </ul>
      </details>
      <em>Valores aproximados · confirme com a gente no WhatsApp</em>
    </span>
  );
}
