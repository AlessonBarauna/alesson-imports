"use client";

import { useMemo, useState } from "react";

const whatsapp = "https://wa.me/5511964421841";

const products = [
  { name: "iPhone 12", storage: "128 GB", price: 1590, type: "Seminovo", color: "Azul", tone: "#94b9cc" },
  { name: "iPhone 13", storage: "128 GB", price: 2090, type: "Seminovo", color: "Meia-noite", tone: "#24272c" },
  { name: "iPhone 14", storage: "128 GB", price: 2290, type: "Seminovo", color: "Estelar", tone: "#e7e2d8" },
  { name: "iPhone 14 Pro", storage: "256 GB", price: 3190, type: "Seminovo", color: "Roxo-profundo", tone: "#5d5567" },
  { name: "iPhone 15", storage: "128 GB", price: 2890, type: "Seminovo", color: "Preto", tone: "#333638" },
  { name: "iPhone 15 Pro", storage: "256 GB", price: 3890, type: "Seminovo", color: "Titânio", tone: "#8a8278" },
];

function Icon({ children }: { children: React.ReactNode }) {
  return <span className="icon" aria-hidden="true">{children}</span>;
}

export default function Home() {
  const [filter, setFilter] = useState("Todos");
  const [menu, setMenu] = useState(false);
  const filtered = useMemo(
    () => products.filter((p) => filter === "Todos" || p.type === filter),
    [filter],
  );

  const productLink = (name: string) =>
    `${whatsapp}?text=${encodeURIComponent(`Olá, Alesson! Vi o ${name} no site e gostaria de consultar disponibilidade, cores e formas de pagamento.`)}`;

  return (
    <main>
      <header className="nav-wrap">
        <nav className="nav shell" aria-label="Navegação principal">
          <a href="#inicio" className="brand" aria-label="Alesson Imports — início">
            <span className="brand-mark">A</span><span>Alesson <b>Imports</b></span>
          </a>
          <button className="menu-button" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label="Abrir menu">
            <span /><span />
          </button>
          <div className={`nav-links ${menu ? "open" : ""}`}>
            <a href="#catalogo" onClick={() => setMenu(false)}>Catálogo</a>
            <a href="#vantagens" onClick={() => setMenu(false)}>Por que comprar</a>
            <a href="#sobre" onClick={() => setMenu(false)}>Sobre</a>
            <a href="#faq" onClick={() => setMenu(false)}>Dúvidas</a>
            <a className="nav-cta" href={`${whatsapp}?text=Olá%2C%20Alesson!%20Vim%20pelo%20site%20da%20Alesson%20Imports.`} target="_blank" rel="noreferrer">Falar no WhatsApp</a>
          </div>
        </nav>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-glow" />
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Apple do seu jeito</p>
            <h1>Seu próximo iPhone.<br /><em>Mais perto do que parece.</em></h1>
            <p className="hero-lead">Produtos Apple com procedência, atendimento de verdade e condições que cabem na sua escolha.</p>
            <div className="hero-actions">
              <a href="#catalogo" className="button primary">Ver ofertas <span>↓</span></a>
              <a href={`${whatsapp}?text=Olá%2C%20Alesson!%20Quero%20ajuda%20para%20escolher%20meu%20próximo%20iPhone.`} className="button secondary" target="_blank" rel="noreferrer">Quero ajuda para escolher</a>
            </div>
            <div className="hero-notes">
              <span>✓ Até 12x no cartão</span><span>✓ Aceitamos seu usado</span><span>✓ Atendimento personalizado</span>
            </div>
          </div>
          <div className="device-stage" aria-label="Representação de um iPhone premium">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <div className="phone phone-back"><div className="camera"><i /><i /><i /></div><div className="phone-logo">◆</div></div>
            <div className="phone phone-front"><div className="dynamic-island" /><div className="screen-light" /><div className="screen-copy"><small>Alesson Imports</small><strong>Escolha.<br />Confie.<br />Aproveite.</strong></div></div>
            <div className="floating-card"><span className="pulse" /><div><small>Atendimento rápido</small><b>Direto no WhatsApp</b></div></div>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="shell trust-grid">
          <div><b>1 ano</b><span>Garantia Apple nos lacrados</span></div>
          <div><b>30 dias</b><span>Garantia da loja nos seminovos</span></div>
          <div><b>12x</b><span>Parcelamento no cartão</span></div>
          <div><b>Trade-in</b><span>Seu aparelho pode valer na troca</span></div>
        </div>
      </section>

      <section className="catalog section" id="catalogo">
        <div className="shell">
          <div className="section-heading">
            <div><p className="eyebrow dark"><span /> Seleção da semana</p><h2>Encontre o seu.</h2><p>Modelos escolhidos para diferentes momentos e bolsos.</p></div>
            <div className="filters" aria-label="Filtrar produtos">
              {["Todos", "Seminovo", "Lacrado"].map((item) => <button key={item} onClick={() => setFilter(item)} className={filter === item ? "active" : ""}>{item}</button>)}
            </div>
          </div>

          {filtered.length ? <div className="product-grid">
            {filtered.map((p, i) => (
              <article className="product-card" key={p.name}>
                <div className="product-visual" style={{ "--tone": p.tone } as React.CSSProperties}>
                  {i === 0 && <span className="tag">Melhor entrada</span>}
                  {i === 4 && <span className="tag highlight">Mais procurado</span>}
                  <div className="mini-phone"><div className="mini-camera"><i/><i/><i/></div><span>◆</span></div>
                </div>
                <div className="product-info">
                  <div className="product-meta"><span>{p.type}</span><span className="stock">● Consulte cores</span></div>
                  <h3>{p.name}</h3><p>{p.storage} · {p.color}</p>
                  <div className="price"><small>a partir de</small><strong>{p.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong><span>ou em até 12x no cartão</span></div>
                  <a href={productLink(p.name)} target="_blank" rel="noreferrer">Consultar no WhatsApp <span>↗</span></a>
                </div>
              </article>
            ))}
          </div> : <div className="empty-state"><b>Os lacrados mudam todos os dias.</b><p>Consulte agora os modelos disponíveis e receba a lista atualizada.</p><a className="button primary" href={`${whatsapp}?text=Olá%2C%20Alesson!%20Pode%20me%20enviar%20a%20lista%20atualizada%20de%20iPhones%20lacrados%3F`} target="_blank" rel="noreferrer">Pedir lista atualizada</a></div>}

          <div className="catalog-note"><span>ⓘ</span><p><b>Estoque atualizado diariamente.</b> Valores e disponibilidade podem mudar. Confirme tudo com a gente antes de fechar.</p></div>
        </div>
      </section>

      <section className="trade section">
        <div className="shell trade-card">
          <div className="trade-copy"><p className="eyebrow light"><span /> Troca inteligente</p><h2>Seu iPhone usado<br />vale dinheiro.</h2><p>Envie os dados do seu aparelho, receba uma avaliação e use o valor como parte do pagamento do seu próximo iPhone.</p><a className="button white" href={`${whatsapp}?text=Olá%2C%20Alesson!%20Quero%20avaliar%20meu%20iPhone%20usado%20para%20dar%20na%20troca.`} target="_blank" rel="noreferrer">Avaliar meu aparelho <span>↗</span></a></div>
          <div className="trade-steps">
            <div><b>01</b><span><strong>Conte qual é o modelo</strong>Memória, cor e estado do aparelho.</span></div>
            <div><b>02</b><span><strong>Receba uma avaliação</strong>Análise rápida e transparente.</span></div>
            <div><b>03</b><span><strong>Escolha seu próximo Apple</strong>Use o valor para facilitar a troca.</span></div>
          </div>
        </div>
      </section>

      <section className="benefits section" id="vantagens">
        <div className="shell">
          <div className="center-heading"><p className="eyebrow dark"><span /> Compra tranquila</p><h2>Confiança do primeiro<br />“oi” ao pós-venda.</h2></div>
          <div className="benefit-grid">
            <article><Icon>◎</Icon><h3>Procedência sempre</h3><p>Informações claras sobre cada produto para você comprar com segurança.</p></article>
            <article><Icon>♢</Icon><h3>Escolha sem pressão</h3><p>Ajudamos você a encontrar o modelo que realmente combina com sua necessidade.</p></article>
            <article><Icon>↗</Icon><h3>Condição flexível</h3><p>Pix, cartão em até 12x e avaliação do seu usado para facilitar a compra.</p></article>
            <article><Icon>♡</Icon><h3>Pós-venda de verdade</h3><p>O atendimento continua depois da entrega. Se precisar, você sabe com quem falar.</p></article>
          </div>
        </div>
      </section>

      <section className="story section" id="sobre">
        <div className="shell story-grid">
          <div className="story-visual"><div className="story-a">A</div><p>De Mogi das Cruzes<br />para o seu dia a dia.</p></div>
          <div className="story-copy"><p className="eyebrow dark"><span /> Quem está por trás</p><h2>Atendimento humano.<br />Tecnologia que aproxima.</h2><p>A Alesson Imports nasceu para tornar a compra de produtos Apple mais simples, segura e pessoal. Aqui você fala diretamente com quem acompanha o pedido, tira suas dúvidas e continua disponível depois da venda.</p><p>Sem respostas automáticas frias e sem empurrar o modelo mais caro. A ideia é entender o que você precisa e construir uma compra boa de verdade.</p><div className="signature"><div className="avatar">AB</div><div><b>Alesson Baraúna</b><span>Fundador · Alesson Imports</span></div></div></div>
        </div>
      </section>

      <section className="faq section" id="faq">
        <div className="shell faq-grid">
          <div><p className="eyebrow dark"><span /> Sem letras miúdas</p><h2>Dúvidas<br />frequentes.</h2><p>Não encontrou sua resposta? Chame no WhatsApp e fale diretamente com a gente.</p></div>
          <div className="accordion">
            {[
              ["Os produtos são originais?", "Sim. Trabalhamos com produtos Apple originais e informamos claramente a condição de cada aparelho antes da compra."],
              ["Qual é a garantia?", "Produtos lacrados contam com 1 ano de garantia Apple. Seminovos possuem 30 dias de garantia da Alesson Imports."],
              ["Posso parcelar?", "Sim. Você pode parcelar em até 12 vezes no cartão. O valor das parcelas é informado na cotação."],
              ["Vocês aceitam meu celular usado?", "Sim. Envie modelo, memória, fotos e informações sobre o estado do aparelho para receber uma avaliação."],
              ["Os preços do catálogo são finais?", "Os valores são atualizados com frequência e podem variar conforme estoque, cor e fornecedor. Sempre confirme a cotação pelo WhatsApp."],
            ].map(([q, a]) => <details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      <section className="final-cta"><div className="final-glow"/><div className="shell"><p className="eyebrow light"><span /> Seu próximo começa aqui</p><h2>Qual Apple combina<br />com você?</h2><p>Conte o que procura. A gente ajuda você a fazer a melhor escolha.</p><a className="button white" href={`${whatsapp}?text=Olá%2C%20Alesson!%20Quero%20encontrar%20o%20Apple%20ideal%20para%20mim.`} target="_blank" rel="noreferrer">Conversar no WhatsApp <span>↗</span></a></div></section>

      <footer><div className="shell footer-grid"><div><a href="#inicio" className="brand"><span className="brand-mark">A</span><span>Alesson <b>Imports</b></span></a><p>Produtos Apple com procedência,<br />segurança e atendimento de verdade.</p></div><div><b>Navegue</b><a href="#catalogo">Catálogo</a><a href="#vantagens">Por que comprar</a><a href="#sobre">Sobre nós</a><a href="#faq">Dúvidas</a></div><div><b>Fale com a gente</b><a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp</a><a href="https://www.instagram.com/alessonimports.oficial/" target="_blank" rel="noreferrer">Instagram</a><span>Mogi das Cruzes · SP</span></div></div><div className="shell copyright"><span>© 2026 Alesson Imports.</span><span>Feito para aproximar você do seu próximo Apple.</span></div></footer>

      <a className="whatsapp-float" href={`${whatsapp}?text=Olá%2C%20Alesson!%20Vim%20pelo%20site.`} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp"><span>◔</span><b>Fale com a gente</b></a>
    </main>
  );
}
