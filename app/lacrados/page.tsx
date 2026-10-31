"use client";

import { useMemo, useState } from "react";
import { catalogProducts } from "../catalog";
import { iphoneSalePrice } from "../pricing";
import { PriceUpdate } from "../PriceUpdate";
import { ProductImages } from "../ProductImages";

const pricesUpdatedAt = "2026-10-31T10:59:00-03:00";
const whatsapp = "5511964421841";
const money = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const products = catalogProducts.filter((product) => product.category === "iPhones lacrados" && product.badge !== "CPO");

export default function LacradosPage() {
  const [search, setSearch] = useState("");
  const visibleProducts = useMemo(() => {
    const term = normalize(search.trim());
    return term ? products.filter((product) => normalize(`${product.name} ${product.specs} ${product.options}`).includes(term)) : products;
  }, [search]);

  return (
    <main className="sealed-page">
      <div className="sealed-alert">Valores sujeitos à disponibilidade</div>
      <header className="sealed-header">
        <div className="sealed-shell sealed-nav">
          <a className="brand" href="../"><span className="brand-symbol">AI</span>Alesson Imports</a>
          <a className="sealed-instagram" href="https://www.instagram.com/alessonimports.oficial/" target="_blank" rel="noreferrer">@alessonimports.oficial</a>
        </div>
      </header>

      <section className="sealed-hero">
        <div className="sealed-shell sealed-hero-inner">
          <div><p className="sealed-kicker">Catálogo exclusivo</p><h1>iPhones<br /><span>lacrados.</span></h1><p className="sealed-lead">Modelos novos, com procedência informada e atendimento direto para confirmar cores, estoque e pagamento.</p></div>
          <div className="sealed-hero-card"><strong>{products.length}</strong><span>opções disponíveis</span><p>Nota fiscal · Frete · Até 12x no cartão</p></div>
        </div>
      </section>

      <section className="sealed-catalog">
        <div className="sealed-shell">
          <div className="sealed-toolbar">
            <div><p className="sealed-kicker">Escolha o seu</p><h2>Preços atualizados</h2><PriceUpdate updatedAt={pricesUpdatedAt} whatsappLink={`https://wa.me/${whatsapp}?text=${encodeURIComponent("Oi! Quero confirmar o valor atual de um iPhone lacrado.")}`} /></div>
            <label className="sealed-search"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar modelo, memória ou cor" />{search && <button type="button" onClick={() => setSearch("")} aria-label="Limpar busca">×</button>}</label>
          </div>
          <p className="sealed-count">{visibleProducts.length} {visibleProducts.length === 1 ? "modelo encontrado" : "modelos encontrados"}</p>
          <div className="sealed-grid">
            {visibleProducts.map((product) => {
              const price = iphoneSalePrice(product);
              const message = encodeURIComponent(`Oi! Tenho interesse no ${product.name} ${product.specs} ${product.from ? "a partir de" : "por"} ${money(price)}. Tem disponível?`);
              return <article className="sealed-card" key={product.id}>
                <div className="sealed-image"><span>{product.badge === "Anatel" ? "Anatel" : "Lacrado"}</span><ProductImages product={product} /></div>
                <div className="sealed-body"><div className="sealed-title"><h3>{product.name}</h3><p>{product.specs}</p></div><p className="sealed-colors">Cores: {product.options}</p><div className="sealed-price"><small>{product.from ? "A partir de" : "À vista"}</small><strong>{money(price)}</strong><span>Parcelamento sob consulta</span></div><a href={`https://wa.me/${whatsapp}?text=${message}`} target="_blank" rel="noreferrer">Consultar disponibilidade <span>→</span></a></div>
              </article>;
            })}
          </div>
          {!visibleProducts.length && <div className="sealed-empty">Nenhum modelo encontrado. Tente buscar por “Pro Max”, “256 GB” ou uma cor.</div>}
          <div className="sealed-notes"><div><strong>Produtos novos</strong><span>Lacrados de fábrica</span></div><div><strong>Atendimento direto</strong><span>Confirmação de estoque e cores</span></div><div><strong>Compra facilitada</strong><span>Pix ou cartão em até 12x</span></div></div>
          <p className="sealed-disclaimer">Valores e disponibilidade podem sofrer alterações sem aviso prévio. Garantia conforme aparelho e lote. Consulte as condições antes de concluir o pedido.</p>
        </div>
      </section>

      <section className="sealed-closing"><div className="sealed-shell"><p className="sealed-kicker">Fale com a gente</p><h2>Gostou de algum?</h2><p>Confirme agora a cor e a disponibilidade do seu próximo iPhone.</p><a href={`https://wa.me/${whatsapp}?text=${encodeURIComponent("Oi! Vi a lista de iPhones lacrados e quero consultar um modelo.")}`} target="_blank" rel="noreferrer">Chamar no WhatsApp</a></div></section>
    </main>
  );
}
