"use client";

import { useMemo, useState } from "react";
import { catalogProducts } from "../catalog";
import { salePrice } from "../pricing";
import { PriceUpdate } from "../PriceUpdate";
import { pricesUpdatedAt } from "../pricesUpdatedAt";

type Item = { generation: string; name: string; price: number; condition: "Lacrado" | "CPO"; unavailable?: boolean; isNew?: boolean };
const whatsapp = "5511964421841";
const money = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

// A tabela lê direto do catálogo (iPhones lacrados e CPO): preço, "Em falta" e produtos novos acompanham toda atualização.
const generationOf = (name: string) => (name.startsWith("iPhone Duo") ? "iPhone Duo" : `iPhone ${name.match(/^iPhone (\d+)/)?.[1] ?? ""}`.trim());
const items: Item[] = catalogProducts
  .filter((product) => product.category === "iPhones lacrados")
  .map((product) => ({
    generation: generationOf(product.name),
    name: `${product.name} ${product.specs}`,
    price: salePrice(product),
    condition: product.badge === "CPO" ? "CPO" as const : "Lacrado" as const,
    unavailable: product.unavailable,
    isNew: product.badge === "Novo",
  }));
const groups = [...new Set(items.map((item) => item.generation))].sort((a, b) => Number(a.replace(/\D/g, "") || 99) - Number(b.replace(/\D/g, "") || 99));

export default function TabelaIphonesPage() {
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => items.filter((item) => normalize(`${item.name} ${item.condition}`).includes(normalize(search))), [search]);
  return <main className="quote-page">
    <div className="quote-top">Alesson Imports · Tabela compartilhável</div>
    <header className="quote-header"><div className="quote-shell quote-nav"><a className="brand" href="../"><span className="brand-symbol">AI</span>Alesson Imports</a><a href="../lacrados/">Ver somente lacrados</a></div></header>
    <section className="quote-hero"><div className="quote-shell"><p>Catálogo Apple</p><h1>iPhones lacrados<br /><span>& CPO.</span></h1><div className="quote-chips"><span>✓ Nota fiscal</span><span>✓ Até 12x</span><span>✓ Aceitamos seu usado</span></div></div></section>
    <section className="quote-content"><div className="quote-shell">
      <PriceUpdate updatedAt={pricesUpdatedAt} whatsappLink={`https://wa.me/${whatsapp}?text=${encodeURIComponent("Oi! Quero confirmar o valor atual de um iPhone.")}`} />
      <div className="quote-toolbar"><div><small>Preços e disponibilidade</small><h2>Escolha seu iPhone</h2></div><label><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar modelo ou condição" />{search && <button onClick={() => setSearch("")} type="button">×</button>}</label></div>
      {groups.map((group) => {
        const groupItems = filtered.filter((item) => item.generation === group);
        if (!groupItems.length) return null;
        return <section className="quote-group" key={group}><h3>{group}</h3><div className="quote-list">{groupItems.map((item) => {
          const message = encodeURIComponent(`Oi! Tenho interesse no ${item.name} (${item.condition}) por ${money(item.price)}. Tem disponível?`);
          return <article className={item.unavailable ? "is-unavailable" : ""} key={`${item.name}-${item.condition}`}><div className="quote-item-main"><div className="quote-badges">{item.isNew && <b>Novo</b>}<span className={item.condition === "CPO" ? "cpo" : "sealed"}>{item.condition}</span>{item.unavailable && <strong>Em falta</strong>}</div><h4>{item.name}</h4></div><div className="quote-item-action"><div><small>À vista</small><b>{money(item.price)}</b></div>{item.unavailable ? <span>Indisponível</span> : <a href={`https://wa.me/${whatsapp}?text=${message}`} target="_blank" rel="noreferrer">Consultar →</a>}</div></article>;
        })}</div></section>;
      })}
      <div className="quote-info"><div><strong>Produtos lacrados e CPO</strong><p>Garantia conforme aparelho e lote. CPO pode possuir garantia Apple remanescente.</p></div><div><strong>Condições</strong><p>Parcelamento em até 12x e seu usado como parte do pagamento.</p></div><div><strong>Antes da compra</strong><p>Consulte disponibilidade, cores e versões. Valores sujeitos a alteração diária.</p></div></div>
    </div></section>
    <footer className="quote-footer"><div className="quote-shell"><h2>Encontrou o seu?</h2><p>Fale com a Alesson Imports e confirme a disponibilidade.</p><a href={`https://wa.me/${whatsapp}?text=${encodeURIComponent("Oi! Vi a tabela de iPhones e quero consultar um modelo.")}`} target="_blank" rel="noreferrer">Chamar no WhatsApp</a></div></footer>
  </main>;
}
