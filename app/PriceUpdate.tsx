"use client";

import { useSyncExternalStore } from "react";

const timeZone = "America/Sao_Paulo";
const dayOf = (date: Date) => new Intl.DateTimeFormat("sv-SE", { timeZone }).format(date);

const subscribe = () => () => {};

// Quando os preços da página foram atualizados pela última vez.
// Ao mudar qualquer preço, atualize a data/hora da página correspondente.
export function PriceUpdate({ updatedAt, whatsappLink }: { updatedAt: string; whatsappLink: string }) {
  const updated = new Date(updatedAt);
  // No servidor (e na primeira renderização) não há "hoje": só o navegador decide se o aviso aparece.
  const today = useSyncExternalStore(subscribe, () => dayOf(new Date()), () => "");
  const stale = today !== "" && today !== dayOf(updated);

  const date = new Intl.DateTimeFormat("pt-BR", { timeZone, day: "2-digit", month: "2-digit", year: "numeric" }).format(updated);
  const time = new Intl.DateTimeFormat("pt-BR", { timeZone, hour: "2-digit", minute: "2-digit" }).format(updated).replace(":", "h");

  return (
    <div className={`price-update${stale ? " is-stale" : ""}`}>
      <p className="price-update-stamp"><span aria-hidden="true" />Preços atualizados em {date} às {time}</p>
      {stale && <p className="price-update-warning" role="alert">Estes preços não foram atualizados hoje e podem ter mudado. Confirme o valor atual antes de comprar. <a href={whatsappLink} target="_blank" rel="noreferrer">Consultar valor atual no WhatsApp</a></p>}
    </div>
  );
}
