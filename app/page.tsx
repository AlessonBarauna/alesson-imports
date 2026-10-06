"use client";

/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from "react";

const whatsapp = "https://wa.me/5511964421841";

type Product = {
  name: string;
  storage: string;
  price: number;
  category: "Lacrado" | "CPO";
  colors: string;
  accent: string;
  image: string;
  marketPrice: number;
  marketSource: "Amazon" | "Mercado Livre";
  badge?: string;
};

const products: Product[] = [
  { name: "iPhone 13 Pro", storage: "256 GB", price: 4090, marketPrice: 4689, marketSource: "Mercado Livre", category: "CPO", colors: "Consulte as cores disponíveis", accent: "#a9b7c4", image: "./products/iphone-13-pro.webp" },
  { name: "iPhone 13 Pro Max", storage: "128 GB", price: 4190, marketPrice: 4416, marketSource: "Mercado Livre", category: "CPO", colors: "Consulte as cores disponíveis", accent: "#d7c8aa", image: "./products/iphone-13-pro-max.webp" },
  { name: "iPhone 14 Pro Max", storage: "128 GB", price: 4490, marketPrice: 5968, marketSource: "Mercado Livre", category: "CPO", colors: "Consulte as cores disponíveis", accent: "#6c6477", image: "./products/iphone-14-pro-max.webp" },
  { name: "iPhone 15", storage: "128 GB · chip físico + eSIM", price: 4190, marketPrice: 4777, marketSource: "Amazon", category: "Lacrado", colors: "Consulte as cores disponíveis", accent: "#a8bdd0", image: "./products/iphone-15.webp" },
  { name: "iPhone 16", storage: "128 GB · chip físico + eSIM", price: 4790, marketPrice: 4999, marketSource: "Mercado Livre", category: "Lacrado", colors: "Consulte as cores disponíveis", accent: "#8fa6bd", image: "./products/iphone-16.webp" },
  { name: "iPhone 16 Pro Max", storage: "512 GB", price: 7290, marketPrice: 12999, marketSource: "Mercado Livre", category: "CPO", colors: "Consulte as cores disponíveis", accent: "#b7afa4", image: "./products/iphone-16-pro-max.webp" },
  { name: "iPhone 16 Pro Max", storage: "512 GB", price: 7990, marketPrice: 12999, marketSource: "Mercado Livre", category: "Lacrado", colors: "Consulte as cores disponíveis", accent: "#d4d5d7", image: "./products/iphone-16-pro-max.webp", badge: "Anatel" },
  { name: "iPhone 17e", storage: "256 GB", price: 4690, marketPrice: 4772, marketSource: "Mercado Livre", category: "Lacrado", colors: "Consulte as cores disponíveis", accent: "#ead7dc", image: "./products/iphone-17e.webp" },
  { name: "iPhone 17", storage: "256 GB", price: 5790, marketPrice: 6220, marketSource: "Mercado Livre", category: "Lacrado", colors: "Consulte as cores disponíveis", accent: "#c8d8cc", image: "./products/iphone-17.webp", badge: "Mais procurado" },
  { name: "iPhone 17 Air", storage: "256 GB", price: 5990, marketPrice: 6399, marketSource: "Mercado Livre", category: "Lacrado", colors: "Consulte as cores disponíveis", accent: "#d9cfb4", image: "./products/iphone-17-air.webp" },
  { name: "iPhone 17 Pro", storage: "256 GB", price: 7490, marketPrice: 9359, marketSource: "Mercado Livre", category: "Lacrado", colors: "Consulte as cores disponíveis", accent: "#c78b65", image: "./products/iphone-17-pro.webp" },
  { name: "iPhone 17 Pro Max", storage: "256 GB", price: 7990, marketPrice: 9948, marketSource: "Mercado Livre", category: "Lacrado", colors: "Consulte as cores disponíveis", accent: "#6d7f9a", image: "./products/iphone-17-pro-max.webp" },
  { name: "iPhone 17 Pro Max", storage: "512 GB", price: 8990, marketPrice: 11999, marketSource: "Mercado Livre", category: "Lacrado", colors: "Consulte as cores disponíveis", accent: "#8999ad", image: "./products/iphone-17-pro-max.webp" },
  { name: "iPhone 18 Pro", storage: "256 GB", price: 8590, marketPrice: 11999, marketSource: "Mercado Livre", category: "Lacrado", colors: "Consulte as cores disponíveis", accent: "#8e2636", image: "./products/iphone-18-pro.webp", badge: "Novo" },
  { name: "iPhone 18 Pro Max", storage: "256 GB", price: 10990, marketPrice: 12999, marketSource: "Mercado Livre", category: "Lacrado", colors: "Consulte as cores disponíveis", accent: "#a9c8df", image: "./products/iphone-18-pro-max.webp", badge: "Novo" },
  { name: "iPhone 18 Pro Max", storage: "512 GB", price: 12990, marketPrice: 14499, marketSource: "Mercado Livre", category: "Lacrado", colors: "Consulte as cores disponíveis", accent: "#9ebdd4", image: "./products/iphone-18-pro-max.webp", badge: "Novo" },
  { name: "iPhone 18 Pro Max", storage: "1 TB", price: 14990, marketPrice: 17499, marketSource: "Mercado Livre", category: "Lacrado", colors: "Consulte as cores disponíveis", accent: "#c6c8ca", image: "./products/iphone-18-pro-max.webp", badge: "Novo" },
  { name: "iPhone 18 Pro Max", storage: "2 TB", price: 19490, marketPrice: 21999, marketSource: "Mercado Livre", category: "Lacrado", colors: "Consulte as cores disponíveis", accent: "#25282d", image: "./products/iphone-18-pro-max.webp", badge: "Novo" },
];

const money = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
const savingPercent = (product: Product) => Math.round((1 - product.price / product.marketPrice) * 100);
const ArrowIcon = () => <span aria-hidden="true">↗</span>;

export default function Home() {
  const [filter, setFilter] = useState("Todos");
  const [menuOpen, setMenuOpen] = useState(false);
  const filtered = useMemo(() => products.filter((product) => filter === "Todos" || product.category === filter), [filter]);
  const contactLink = (message: string) => `${whatsapp}?text=${encodeURIComponent(message)}`;
  const productLink = (product: Product) => contactLink(`Olá, Alesson! Vi o ${product.name} ${product.storage} por ${money(product.price)} no site. Pode confirmar disponibilidade, cor e condição de pagamento?`);
  const marketLink = (product: Product) => {
    const query = encodeURIComponent(`${product.name} ${product.storage.split(" · ")[0]}`);
    return product.marketSource === "Amazon" ? `https://www.amazon.com.br/s?k=${query}` : `https://lista.mercadolivre.com.br/${query}`;
  };

  return (
    <main>
      <div className="announcement"><span>Tabela atualizada em 05/10/2026</span><a href="#duvidas">Veja as condições</a></div>
      <header className="site-header">
        <nav className="shell nav" aria-label="Navegação principal">
          <a className="brand" href="#inicio" aria-label="Alesson Imports — início"><span className="brand-symbol">A</span><span>Alesson Imports</span></a>
          <button className="menu-button" type="button" aria-label="Abrir menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><span /><span /></button>
          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            <a href="#ofertas" onClick={() => setMenuOpen(false)}>Ofertas</a><a href="#experiencia" onClick={() => setMenuOpen(false)}>Experiência</a><a href="#criterio" onClick={() => setMenuOpen(false)}>Preço justo</a><a href="#duvidas" onClick={() => setMenuOpen(false)}>Dúvidas</a>
            <a className="nav-contact" href={contactLink("Olá, Alesson! Vim pelo site e quero encontrar meu próximo Apple.")} target="_blank" rel="noreferrer">Falar no WhatsApp</a>
          </div>
        </nav>
      </header>

      <section className="hero" id="inicio"><div className="shell hero-layout">
        <div className="hero-copy"><p className="kicker">Alesson Imports · Mogi das Cruzes</p><h1>Seu próximo iPhone.<br /><span>Do seu jeito.</span></h1><p className="hero-description">iPhones lacrados e CPO, com nota fiscal, frete incluso e atendimento direto em cada etapa.</p>
          <div className="hero-actions"><a className="button button-dark" href="#ofertas">Ver ofertas</a><a className="text-link" href={contactLink("Olá, Alesson! Quero ajuda para escolher meu próximo iPhone.")} target="_blank" rel="noreferrer">Quero ajuda para escolher <ArrowIcon /></a></div>
          <div className="hero-proof" aria-label="Condições de compra"><div><strong>Nota fiscal</strong><span>inclusa no pedido</span></div><div><strong>Frete incluso</strong><span>consulte sua região</span></div><div><strong>Até 12x</strong><span>consulte a condição</span></div></div>
        </div>
        <div className="hero-media">
          <img src="./hero-devices.webp" alt="Três smartphones premium em acabamento grafite e titânio" />
          <div className="hero-price-card"><span>iPhone 17 · 256 GB</span><strong>{money(5790)}</strong><small>nota fiscal e frete inclusos</small></div>
        </div>
      </div></section>

      <section className="quick-benefits" aria-label="Diferenciais"><div className="shell quick-grid"><div><span>01</span><p><strong>Lacrados e CPO</strong>Condição identificada em cada oferta.</p></div><div><span>02</span><p><strong>Seu usado vale</strong>Aceitamos seu iPhone como parte do pagamento.</p></div><div><span>03</span><p><strong>Atendimento pessoal</strong>Do primeiro contato ao pós-venda.</p></div></div></section>

      <section className="offers section" id="ofertas"><div className="shell">
        <div className="section-intro"><div><p className="kicker">Tabela completa</p><h2>Escolha o seu.</h2></div><p>Compare nosso valor final com referências atuais da Amazon e do Mercado Livre. Confirme cor e estoque antes de fechar.</p></div>
        <div className="filter-row" role="group" aria-label="Filtrar ofertas">{["Todos", "Lacrado", "CPO"].map((item) => <button key={item} type="button" className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div>
        <div className="product-grid">{filtered.map((product) => <article className="product-card" key={`${product.name}-${product.storage}-${product.category}`}>
          <div className={`product-top ${product.image === "./products/iphone-16-pro-max.webp" || product.image === "./products/iphone-18-pro.webp" ? "dark-photo" : ""}`} style={{ "--accent": product.accent } as React.CSSProperties}><div className="product-labels"><span>{product.category}</span>{product.badge && <b>{product.badge}</b>}</div><img className="product-image" src={product.image} alt={`${product.name} ${product.storage}`} loading="lazy" /></div>
          <div className="product-body"><p className="product-name">{product.name}</p><h3>{product.storage}</h3><p className="colors">{product.colors}</p><div className="price-block"><small>nosso preço final</small><strong>{money(product.price)}</strong><div className="market-comparison"><a href={marketLink(product)} target="_blank" rel="noreferrer">{product.marketSource} hoje <s>{money(product.marketPrice)}</s></a><b>Economize {money(product.marketPrice - product.price)} · {savingPercent(product)}%</b></div><span>Parcelamento em até 12x no cartão</span></div><a href={productLink(product)} target="_blank" rel="noreferrer">Consultar disponibilidade <ArrowIcon /></a></div>
        </article>)}</div>
        <p className="comparison-note">* Referências consultadas na <a href="https://www.amazon.com.br/" target="_blank" rel="noreferrer">Amazon</a> e no <a href="https://www.mercadolivre.com.br/" target="_blank" rel="noreferrer">Mercado Livre</a> em 06/10/2026, considerando anúncios comparáveis e valores parcelados quando disponíveis. Preços variam por cor, condição, vendedor, estoque e forma de pagamento.</p>
        <div className="catalog-footer"><p><strong>Procurando outro modelo?</strong> A lista completa inclui iPads, MacBooks, Apple Watch, AirPods e acessórios.</p><a className="button button-dark" href={contactLink("Olá, Alesson! Pode me enviar a lista completa e atualizada de produtos Apple?")} target="_blank" rel="noreferrer">Pedir lista completa</a></div>
      </div></section>

      <section className="experience section" id="experiencia"><div className="shell experience-card"><div className="experience-copy"><p className="kicker kicker-light">Compra acompanhada</p><h2>Tecnologia é simples.<br />A compra também deve ser.</h2><p>Você fala diretamente com a Alesson Imports para comparar modelos, avaliar seu iPhone usado e confirmar todas as condições antes de decidir.</p><a className="button button-light" href={contactLink("Olá, Alesson! Quero uma recomendação de iPhone para o meu uso e orçamento.")} target="_blank" rel="noreferrer">Receber uma recomendação</a></div><ol className="experience-steps"><li><span>1</span><div><strong>Conte o que você busca</strong><p>Modelo, orçamento, memória e cor preferida.</p></div></li><li><span>2</span><div><strong>Avalie seu usado</strong><p>Seu iPhone pode entrar como parte do pagamento.</p></div></li><li><span>3</span><div><strong>Confirme com segurança</strong><p>Preço, garantia, estoque e prazo explicados antes do pagamento.</p></div></li></ol></div></section>

      <section className="pricing section" id="criterio"><div className="shell pricing-layout"><div className="pricing-title"><p className="kicker">Preço claro, de verdade</p><h2>O valor anunciado.<br />Sem surpresa.</h2></div><div className="pricing-content"><p className="pricing-lead">A tabela apresenta os valores finais dos aparelhos, com nota fiscal e frete inclusos nas condições informadas.</p><div className="formula" aria-label="Condições do preço"><div><span>Produto</span><strong>lacrado ou CPO</strong></div><i>+</i><div><span>Compra</span><strong>nota fiscal e frete</strong></div><i>=</i><div className="formula-result"><span>Valor anunciado</span><strong>preço final</strong></div></div><p className="pricing-note">Valores e disponibilidade podem sofrer alterações sem aviso prévio. Consulte as cores, versões e condições de parcelamento antes de fechar o pedido.</p></div></div></section>

      <section className="about section"><div className="shell about-layout"><div className="about-mark">A</div><div><p className="kicker">Alesson Imports</p><h2>Atendimento humano.<br />Escolha bem informada.</h2><p>A proposta é simples: facilitar o acesso a produtos Apple com preço competitivo, comunicação clara e alguém de verdade acompanhando sua compra.</p><div className="founder"><span>AB</span><p><strong>Alesson Baraúna</strong>Fundador · Mogi das Cruzes, SP</p></div></div></div></section>

      <section className="faq section" id="duvidas"><div className="shell faq-layout"><div><p className="kicker">Antes de comprar</p><h2>Tudo claro.</h2><p>Condições importantes, sem esconder o que você precisa saber.</p></div><div className="accordion">
        <details><summary>Os produtos são originais e lacrados?<span>+</span></summary><p>Os itens anunciados como lacrados são novos e selados de fábrica. Produtos CPO são identificados separadamente e podem ter condições diferentes de garantia.</p></details>
        <details><summary>Como funciona a garantia?<span>+</span></summary><p>A situação da garantia é conferida antes da compra. O prazo pode variar por aparelho e, em alguns casos, a Apple pode solicitar documentação de origem/importação. Questões de cobertura são tratadas diretamente com a Apple.</p></details>
        <details><summary>O preço do site é final?<span>+</span></summary><p>Sim. Os valores anunciados incluem nota fiscal e frete nas condições informadas. Como estoque e mercado mudam, confirme preço, cor e disponibilidade no WhatsApp antes do pagamento.</p></details>
        <details><summary>Posso parcelar?<span>+</span></summary><p>Sim. Há parcelamento em até 12 vezes no cartão, sujeito às condições e taxas apresentadas na cotação.</p></details>
        <details><summary>Como funciona o envio?<span>+</span></summary><p>O frete está incluso nas condições anunciadas. O meio de envio, prazo, cobertura para sua região e demais detalhes são confirmados antes do pagamento.</p></details>
      </div></div></section>

      <section className="closing"><div className="shell closing-inner"><p className="kicker kicker-light">Seu próximo começa aqui</p><h2>Qual iPhone combina<br />com você?</h2><p>Conte quanto pretende investir. A gente ajuda a comparar as melhores opções.</p><a className="button button-light" href={contactLink("Olá, Alesson! Quero encontrar o melhor iPhone para o meu orçamento.")} target="_blank" rel="noreferrer">Conversar no WhatsApp</a></div></section>

      <footer><div className="shell footer-main"><div><a className="brand brand-footer" href="#inicio"><span className="brand-symbol">A</span><span>Alesson Imports</span></a><p>Produtos Apple, preço competitivo<br />e atendimento de verdade.</p></div><div><strong>Explore</strong><a href="#ofertas">Ofertas</a><a href="#criterio">Como precificamos</a><a href="#duvidas">Dúvidas</a></div><div><strong>Contato</strong><a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp</a><a href="https://www.instagram.com/alessonimports.oficial/" target="_blank" rel="noreferrer">Instagram</a><span>Mogi das Cruzes · SP</span></div></div><div className="shell footer-bottom"><span>© 2026 Alesson Imports.</span><span>Preços e disponibilidade sujeitos a confirmação.</span></div></footer>
      <a className="whatsapp-float" href={contactLink("Olá, Alesson! Vim pelo site.")} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp"><span>●</span><b>WhatsApp</b></a>
    </main>
  );
}
