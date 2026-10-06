"use client";

import { useMemo, useState } from "react";

const whatsapp = "https://wa.me/5511964421841";

type Product = {
  name: string;
  storage: string;
  price: number;
  reference: number;
  referenceLabel: string;
  category: "Lançamentos" | "Melhor custo";
  colors: string[];
  accent: string;
  badge?: string;
};

const products: Product[] = [
  { name: "iPhone 18 Pro Max", storage: "256 GB · eSIM", price: 9499, reference: 12999, referenceLabel: "Apple Brasil", category: "Lançamentos", colors: ["Preto", "Prateado", "Glacial", "Bordô"], accent: "#a9c8df", badge: "Novo" },
  { name: "iPhone 18 Pro", storage: "256 GB · eSIM", price: 8199, reference: 11999, referenceLabel: "Apple Brasil", category: "Lançamentos", colors: ["Preto", "Branco", "Glacial", "Bordô"], accent: "#8e2636", badge: "Oferta de lançamento" },
  { name: "iPhone 17", storage: "256 GB", price: 5199, reference: 8299, referenceLabel: "Apple Brasil", category: "Melhor custo", colors: ["Verde", "Azul", "Branco", "Preto", "Roxo"], accent: "#c8d8cc", badge: "Escolha inteligente" },
  { name: "iPhone 17e", storage: "256 GB", price: 4199, reference: 5999, referenceLabel: "Apple Brasil", category: "Melhor custo", colors: ["Preto", "Branco", "Rosa"], accent: "#e9d7dc" },
  { name: "iPhone 16", storage: "128 GB · nano-SIM + eSIM", price: 4499, reference: 4999, referenceLabel: "varejo pesquisado", category: "Melhor custo", colors: ["Verde", "Azul", "Preto", "Rosa", "Branco"], accent: "#93aac0" },
  { name: "iPhone 15", storage: "128 GB · nano-SIM + eSIM", price: 3699, reference: 3799, referenceLabel: "varejo pesquisado", category: "Melhor custo", colors: ["Preto", "Azul"], accent: "#353a40" },
];

const money = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
const ArrowIcon = () => <span aria-hidden="true">↗</span>;

export default function Home() {
  const [filter, setFilter] = useState("Todos");
  const [menuOpen, setMenuOpen] = useState(false);
  const filtered = useMemo(() => products.filter((product) => filter === "Todos" || product.category === filter), [filter]);
  const contactLink = (message: string) => `${whatsapp}?text=${encodeURIComponent(message)}`;
  const productLink = (product: Product) => contactLink(`Olá, Alesson! Vi o ${product.name} ${product.storage} por ${money(product.price)} no site. Pode confirmar disponibilidade, cor e condição de pagamento?`);

  return (
    <main>
      <div className="announcement"><span>Preços atualizados em 05 de outubro</span><a href="#criterio">Veja como precificamos</a></div>
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
        <div className="hero-copy"><p className="kicker">Alesson Imports · Mogi das Cruzes</p><h1>Seu próximo iPhone.<br /><span>Sem pagar a mais.</span></h1><p className="hero-description">Modelos lacrados, atendimento direto e preços calculados para ficar abaixo do varejo pesquisado.</p>
          <div className="hero-actions"><a className="button button-dark" href="#ofertas">Ver ofertas</a><a className="text-link" href={contactLink("Olá, Alesson! Quero ajuda para escolher meu próximo iPhone.")} target="_blank" rel="noreferrer">Quero ajuda para escolher <ArrowIcon /></a></div>
          <div className="hero-proof" aria-label="Condições de compra"><div><strong>À vista</strong><span>ofertas selecionadas</span></div><div><strong>Até 12x</strong><span>consulte a condição</span></div><div><strong>Direto</strong><span>com quem acompanha o pedido</span></div></div>
        </div>
        <div className="hero-media">
          {/* eslint-disable-next-line @next/next/no-img-element -- GitHub Pages serves this precompressed WebP directly. */}
          <img src="/hero-devices.webp" alt="Três smartphones premium em acabamento grafite e titânio" />
          <div className="hero-price-card"><span>iPhone 17 · 256 GB</span><strong>{money(5199)}</strong><small>valor à vista · consulte disponibilidade</small></div>
        </div>
      </div></section>

      <section className="quick-benefits" aria-label="Diferenciais"><div className="shell quick-grid"><div><span>01</span><p><strong>Preço abaixo do varejo</strong>Comparação com referências públicas.</p></div><div><span>02</span><p><strong>Procedência informada</strong>Condição e garantia antes da compra.</p></div><div><span>03</span><p><strong>Atendimento pessoal</strong>Do primeiro contato ao pós-venda.</p></div></div></section>

      <section className="offers section" id="ofertas"><div className="shell">
        <div className="section-intro"><div><p className="kicker">Destaques da semana</p><h2>Escolha o seu.</h2></div><p>Valores à vista. Estoque, cor e preço são confirmados no atendimento.</p></div>
        <div className="filter-row" role="group" aria-label="Filtrar ofertas">{["Todos", "Lançamentos", "Melhor custo"].map((item) => <button key={item} type="button" className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div>
        <div className="product-grid">{filtered.map((product) => { const discount = Math.round((1 - product.price / product.reference) * 100); return <article className="product-card" key={product.name}>
          <div className="product-top" style={{ "--accent": product.accent } as React.CSSProperties}><div className="product-labels"><span>{product.category}</span>{product.badge && <b>{product.badge}</b>}</div><div className="color-orbit" aria-hidden="true"><span /><span /><span /></div><div className="saving-badge">{discount}% abaixo da referência</div></div>
          <div className="product-body"><p className="product-name">{product.name}</p><h3>{product.storage}</h3><p className="colors">{product.colors.join(" · ")}</p><div className="price-block"><small>à vista por</small><strong>{money(product.price)}</strong><span>Referência: {money(product.reference)} · {product.referenceLabel}</span></div><a href={productLink(product)} target="_blank" rel="noreferrer">Consultar disponibilidade <ArrowIcon /></a></div>
        </article>; })}</div>
        <div className="catalog-footer"><p><strong>Procurando outro modelo?</strong> A lista completa inclui iPads, MacBooks, Apple Watch, AirPods e acessórios.</p><a className="button button-dark" href={contactLink("Olá, Alesson! Pode me enviar a lista completa e atualizada de produtos Apple?")} target="_blank" rel="noreferrer">Pedir lista completa</a></div>
      </div></section>

      <section className="experience section" id="experiencia"><div className="shell experience-card"><div className="experience-copy"><p className="kicker kicker-light">Compra acompanhada</p><h2>Tecnologia é simples.<br />A compra também deve ser.</h2><p>Você fala diretamente com a Alesson Imports para comparar modelos, confirmar a versão correta e receber as condições antes de decidir.</p><a className="button button-light" href={contactLink("Olá, Alesson! Quero uma recomendação de iPhone para o meu uso e orçamento.")} target="_blank" rel="noreferrer">Receber uma recomendação</a></div><ol className="experience-steps"><li><span>1</span><div><strong>Conte o que você busca</strong><p>Modelo, orçamento, memória e cor preferida.</p></div></li><li><span>2</span><div><strong>Compare com clareza</strong><p>Preço, origem, garantia e prazo explicados antes do pagamento.</p></div></li><li><span>3</span><div><strong>Confirme com segurança</strong><p>Separação do aparelho somente após a confirmação do pagamento.</p></div></li></ol></div></section>

      <section className="pricing section" id="criterio"><div className="shell pricing-layout"><div className="pricing-title"><p className="kicker">Preço justo, de verdade</p><h2>Menos margem.<br />Mais vantagem.</h2></div><div className="pricing-content"><p className="pricing-lead">A seleção publicada usa o menor custo disponível entre os fornecedores informados e recebe uma margem comercial enxuta.</p><div className="formula" aria-label="Composição do preço"><div><span>Custo</span><strong>melhor fornecedor</strong></div><i>+</i><div><span>Operação</span><strong>margem enxuta</strong></div><i>=</i><div className="formula-result"><span>Seu preço</span><strong>competitivo</strong></div></div><p className="pricing-note">As referências foram consultadas em 05/10/2026 na Apple Brasil e em grandes varejistas. Promoções-relâmpago, cupons e cashback podem alterar a comparação. Por isso, confirme o preço final no dia da compra.</p></div></div></section>

      <section className="about section"><div className="shell about-layout"><div className="about-mark">A</div><div><p className="kicker">Alesson Imports</p><h2>Atendimento humano.<br />Escolha bem informada.</h2><p>A proposta é simples: facilitar o acesso a produtos Apple com preço competitivo, comunicação clara e alguém de verdade acompanhando sua compra.</p><div className="founder"><span>AB</span><p><strong>Alesson Baraúna</strong>Fundador · Mogi das Cruzes, SP</p></div></div></div></section>

      <section className="faq section" id="duvidas"><div className="shell faq-layout"><div><p className="kicker">Antes de comprar</p><h2>Tudo claro.</h2><p>Condições importantes, sem esconder o que você precisa saber.</p></div><div className="accordion">
        <details><summary>Os produtos são originais e lacrados?<span>+</span></summary><p>Os itens anunciados como lacrados são novos e selados de fábrica. Produtos CPO são identificados separadamente e podem ter condições diferentes de garantia.</p></details>
        <details><summary>Como funciona a garantia?<span>+</span></summary><p>A situação da garantia é conferida antes da compra. O prazo pode variar por aparelho e, em alguns casos, a Apple pode solicitar documentação de origem/importação. Questões de cobertura são tratadas diretamente com a Apple.</p></details>
        <details><summary>O preço do site é final?<span>+</span></summary><p>É o valor à vista de referência. Como estoque e câmbio mudam, o valor, a cor e a disponibilidade são confirmados no WhatsApp antes do pagamento.</p></details>
        <details><summary>Posso parcelar?<span>+</span></summary><p>Sim. Há parcelamento em até 12 vezes no cartão, sujeito às condições e taxas apresentadas na cotação.</p></details>
        <details><summary>Como funciona o envio?<span>+</span></summary><p>O envio pode ser feito por transportadora, Sedex ou PAC após a confirmação do pagamento. Prazo, seguro, custos e responsabilidades são combinados por escrito antes da postagem.</p></details>
      </div></div></section>

      <section className="closing"><div className="shell closing-inner"><p className="kicker kicker-light">Seu próximo começa aqui</p><h2>Qual iPhone combina<br />com você?</h2><p>Conte quanto pretende investir. A gente ajuda a comparar as melhores opções.</p><a className="button button-light" href={contactLink("Olá, Alesson! Quero encontrar o melhor iPhone para o meu orçamento.")} target="_blank" rel="noreferrer">Conversar no WhatsApp</a></div></section>

      <footer><div className="shell footer-main"><div><a className="brand brand-footer" href="#inicio"><span className="brand-symbol">A</span><span>Alesson Imports</span></a><p>Produtos Apple, preço competitivo<br />e atendimento de verdade.</p></div><div><strong>Explore</strong><a href="#ofertas">Ofertas</a><a href="#criterio">Como precificamos</a><a href="#duvidas">Dúvidas</a></div><div><strong>Contato</strong><a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp</a><a href="https://www.instagram.com/alessonimports.oficial/" target="_blank" rel="noreferrer">Instagram</a><span>Mogi das Cruzes · SP</span></div></div><div className="shell footer-bottom"><span>© 2026 Alesson Imports.</span><span>Preços e disponibilidade sujeitos a confirmação.</span></div></footer>
      <a className="whatsapp-float" href={contactLink("Olá, Alesson! Vim pelo site.")} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp"><span>●</span><b>WhatsApp</b></a>
    </main>
  );
}
