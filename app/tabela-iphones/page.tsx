"use client";

import { useMemo, useState } from "react";

type Item = { generation: string; name: string; price: number; condition: "Lacrado" | "CPO"; unavailable?: boolean; isNew?: boolean };
const whatsapp = "5511964421841";
const money = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const items: Item[] = [
  { generation: "iPhone 13", name: "iPhone 13 Pro 128GB", price: 3490, condition: "CPO", isNew: true },
  { generation: "iPhone 13", name: "iPhone 13 Pro 256GB", price: 3990, condition: "CPO", isNew: true },
  { generation: "iPhone 13", name: "iPhone 13 Pro Max 128GB", price: 3990, condition: "CPO" },
  { generation: "iPhone 14", name: "iPhone 14 Plus 128GB", price: 3790, condition: "CPO", isNew: true },
  { generation: "iPhone 14", name: "iPhone 14 512GB", price: 4190, condition: "CPO", isNew: true },
  { generation: "iPhone 14", name: "iPhone 14 Pro 128GB", price: 3990, condition: "CPO" },
  { generation: "iPhone 14", name: "iPhone 14 Pro 256GB", price: 4190, condition: "CPO", unavailable: true },
  { generation: "iPhone 14", name: "iPhone 14 Pro Max 128GB", price: 4390, condition: "CPO" },
  { generation: "iPhone 15", name: "iPhone 15 128GB · Nano-SIM + eSIM", price: 4090, condition: "Lacrado" },
  { generation: "iPhone 15", name: "iPhone 15 256GB · chip físico + eSIM", price: 4790, condition: "Lacrado", isNew: true },
  { generation: "iPhone 15", name: "iPhone 15 256GB", price: 4290, condition: "CPO" },
  { generation: "iPhone 15", name: "iPhone 15 Pro 128GB", price: 4300, condition: "CPO", unavailable: true },
  { generation: "iPhone 15", name: "iPhone 15 Pro 256GB", price: 4790, condition: "CPO", unavailable: true },
  { generation: "iPhone 15", name: "iPhone 15 Pro Max 256GB", price: 5490, condition: "CPO" },
  { generation: "iPhone 15", name: "iPhone 15 Pro Max 512GB", price: 5790, condition: "CPO", isNew: true },
  { generation: "iPhone 16", name: "iPhone 16e 128GB Americano eSIM", price: 3390, condition: "CPO", isNew: true },
  { generation: "iPhone 16", name: "iPhone 16 128GB · Nano-SIM + eSIM", price: 4590, condition: "Lacrado" },
  { generation: "iPhone 16", name: "iPhone 16 256GB · Nano-SIM", price: 4790, condition: "CPO", unavailable: true },
  { generation: "iPhone 16", name: "iPhone 16 256GB Americano eSIM", price: 4790, condition: "CPO", isNew: true },
  { generation: "iPhone 16", name: "iPhone 16 Plus 128GB", price: 5490, condition: "Lacrado", isNew: true },
  { generation: "iPhone 16", name: "iPhone 16 Plus 256GB", price: 5990, condition: "Lacrado", isNew: true },
  { generation: "iPhone 16", name: "iPhone 16 Pro 256GB", price: 5990, condition: "CPO", unavailable: true },
  { generation: "iPhone 16", name: "iPhone 16 Pro 512GB", price: 6290, condition: "CPO", isNew: true },
  { generation: "iPhone 16", name: "iPhone 16 Pro Max 256GB", price: 6490, condition: "CPO", isNew: true },
  { generation: "iPhone 16", name: "iPhone 16 Pro Max 256GB Americano eSIM", price: 7690, condition: "Lacrado", isNew: true },
  { generation: "iPhone 16", name: "iPhone 16 Pro Max 512GB Anatel", price: 7790, condition: "Lacrado" },
  { generation: "iPhone 17", name: "iPhone 17 256GB", price: 5490, condition: "Lacrado" },
  { generation: "iPhone 17", name: "iPhone 17e 256GB", price: 4590, condition: "Lacrado" },
  { generation: "iPhone 17", name: "iPhone 17 Air 256GB", price: 5790, condition: "Lacrado", isNew: true },
  { generation: "iPhone 17", name: "iPhone 17 Pro 256GB", price: 7290, condition: "Lacrado" },
  { generation: "iPhone 17", name: "iPhone 17 Pro 512GB", price: 8290, condition: "Lacrado", unavailable: true },
  { generation: "iPhone 17", name: "iPhone 17 Pro Max 256GB", price: 7790, condition: "Lacrado" },
  { generation: "iPhone 17", name: "iPhone 17 Pro Max 512GB", price: 8690, condition: "Lacrado", unavailable: true },
  { generation: "iPhone 17", name: "iPhone 17 Pro Max 1TB", price: 9890, condition: "Lacrado" },
];

export default function TabelaIphonesPage() {
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => items.filter((item) => normalize(`${item.name} ${item.condition}`).includes(normalize(search))), [search]);
  const groups = ["iPhone 13", "iPhone 14", "iPhone 15", "iPhone 16", "iPhone 17"];
  return <main className="quote-page">
    <div className="quote-top">Alesson Imports · Tabela compartilhável</div>
    <header className="quote-header"><div className="quote-shell quote-nav"><a className="brand" href="../"><span className="brand-symbol">AI</span>Alesson Imports</a><a href="../lacrados/">Ver somente lacrados</a></div></header>
    <section className="quote-hero"><div className="quote-shell"><p>Catálogo Apple</p><h1>iPhones lacrados<br /><span>& CPO.</span></h1><div className="quote-chips"><span>✓ Nota fiscal</span><span>✓ Até 12x</span><span>✓ Aceitamos seu usado</span></div></div></section>
    <section className="quote-content"><div className="quote-shell">
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
