"use client";

/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from "react";
import { catalogProducts, type CatalogProduct } from "../catalog";

const whatsapp = "5511964421841";
const money = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
const normalize = (value: string) => value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const roundUpTo90 = (value: number) => {
  const whole = Math.ceil(value);
  const remainder = whole % 100;
  return remainder <= 90 ? whole - remainder + 90 : whole - remainder + 190;
};
const roundDownTo90 = (value: number) => {
  const whole = Math.floor(value);
  const candidate = Math.floor(whole / 100) * 100 + 90;
  return candidate > whole ? candidate - 100 : candidate;
};
const salePrice = (product: CatalogProduct) => {
  const maximumProfit = 1000;
  const targetPrice = roundUpTo90(product.price / 0.89);
  return Math.min(Math.max(targetPrice, roundUpTo90(product.price + 300)), roundDownTo90(product.price + maximumProfit));
};
const products = catalogProducts.filter((product) => product.category === "iPhones seminovos");

export default function SeminovosPage() {
  const [search, setSearch] = useState("");
  const visibleProducts = useMemo(() => {
    const term = normalize(search.trim());
    return term ? products.filter((product) => normalize(`${product.name} ${product.specs} ${product.options} ${product.badge}`).includes(term)) : products;
  }, [search]);

  return (
    <main className="sealed-page">
      <div className="sealed-alert">Lista atualizada em 26/10/2026 · Valores sujeitos à disponibilidade</div>
      <header className="sealed-header">
        <div className="sealed-shell sealed-nav">
          <a className="brand" href="../"><span className="brand-symbol">AI</span>Alesson Imports</a>
          <a className="sealed-instagram" href="https://www.instagram.com/alessonimports.oficial/" target="_blank" rel="noreferrer">@alessonimports.oficial</a>
        </div>
      </header>

      <section className="sealed-hero">
        <div className="sealed-shell sealed-hero-inner">
          <div><p className="sealed-kicker">Catálogo exclusivo</p><h1>iPhones<br /><span>seminovos.</span></h1><p className="sealed-lead">Aparelhos com bateria e procedência informadas, 30 dias de garantia e atendimento direto para confirmar cores, estoque e pagamento.</p></div>
          <div className="sealed-hero-card"><strong>{products.length}</strong><span>opções disponíveis</span><p>30 dias de garantia · Até 12x no cartão</p></div>
        </div>
      </section>

      <section className="sealed-catalog">
        <div className="sealed-shell">
          <div className="sealed-toolbar">
            <div><p className="sealed-kicker">Escolha o seu</p><h2>Preços atualizados</h2></div>
            <label className="sealed-search"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar modelo, memória ou cor" />{search && <button type="button" onClick={() => setSearch("")} aria-label="Limpar busca">×</button>}</label>
          </div>
          <p className="sealed-count">{visibleProducts.length} {visibleProducts.length === 1 ? "modelo encontrado" : "modelos encontrados"}</p>
          <div className="sealed-grid">
            {visibleProducts.map((product) => {
              const price = salePrice(product);
              const message = encodeURIComponent(`Oi! Tenho interesse no ${product.name} ${product.specs} por ${money(price)}. Tem disponível?`);
              return <article className="sealed-card" key={product.id}>
                <div className="sealed-image"><span>{product.badge || "Seminovo"}</span><img src={`../${product.image.replace("./", "")}`} alt={`${product.name} ${product.specs}`} /></div>
                <div className="sealed-body"><div className="sealed-title"><h3>{product.name}</h3><p>{product.specs}</p></div><p className="sealed-colors">Cores: {product.options}</p><div className="sealed-price"><small>À vista</small><strong>{money(price)}</strong><span>Parcelamento sob consulta</span></div><a href={`https://wa.me/${whatsapp}?text=${message}`} target="_blank" rel="noreferrer">Consultar disponibilidade <span>→</span></a></div>
              </article>;
            })}
          </div>
          {!visibleProducts.length && <div className="sealed-empty">Nenhum modelo encontrado. Tente buscar por “Pro Max”, “256 GB” ou uma cor.</div>}
          <div className="sealed-notes"><div><strong>30 dias de garantia</strong><span>Em todos os seminovos</span></div><div><strong>Atendimento direto</strong><span>Confirmação de estoque e cores</span></div><div><strong>Compra facilitada</strong><span>Pix ou cartão em até 12x</span></div></div>
          <p className="sealed-disclaimer">Valores e disponibilidade podem sofrer alterações sem aviso prévio. Aparelhos seminovos podem apresentar marcas de uso; a bateria e os detalhes de cada unidade são informados no atendimento. Consulte as condições antes de concluir o pedido.</p>
        </div>
      </section>

      <section className="sealed-closing"><div className="sealed-shell"><p className="sealed-kicker">Fale com a gente</p><h2>Gostou de algum?</h2><p>Confirme agora a cor, a bateria e a disponibilidade do seu próximo iPhone.</p><a href={`https://wa.me/${whatsapp}?text=${encodeURIComponent("Oi! Vi a lista de iPhones seminovos e quero consultar um modelo.")}`} target="_blank" rel="noreferrer">Chamar no WhatsApp</a></div></section>
    </main>
  );
}
