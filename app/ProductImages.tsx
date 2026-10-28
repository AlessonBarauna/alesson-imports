"use client";

/* eslint-disable @next/next/no-img-element */

import { useRef, useState } from "react";

type Props = { product: { name: string; specs: string; image: string; images?: string[] } };

// Foto única ou carrossel de deslizar (quando o produto tem mais de uma foto em `images`).
export function ProductImages({ product }: Props) {
  const gallery = product.images && product.images.length > 1 ? product.images : null;
  const track = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const alt = `${product.name} ${product.specs}`;
  if (!gallery) return <img src={`../${product.image.replace("./", "")}`} alt={alt} />;
  const go = (index: number) => track.current?.scrollTo({ left: index * track.current.clientWidth, behavior: "smooth" });
  return (
    <div className="sealed-gallery">
      <div className="sealed-track" ref={track} onScroll={(event) => setCurrent(Math.round(event.currentTarget.scrollLeft / event.currentTarget.clientWidth))}>
        {gallery.map((src, index) => <img key={src} src={`../${src.replace("./", "")}`} alt={`${alt} — foto ${index + 1} de ${gallery.length}`} loading={index ? "lazy" : undefined} />)}
      </div>
      <button type="button" className="sealed-arrow sealed-arrow-prev" onClick={() => go(Math.max(current - 1, 0))} disabled={current === 0} aria-label="Foto anterior">‹</button>
      <button type="button" className="sealed-arrow sealed-arrow-next" onClick={() => go(Math.min(current + 1, gallery.length - 1))} disabled={current === gallery.length - 1} aria-label="Próxima foto">›</button>
      <div className="sealed-dots">{gallery.map((src, index) => <button type="button" key={src} className={index === current ? "on" : ""} onClick={() => go(index)} aria-label={`Ver foto ${index + 1}`} />)}</div>
    </div>
  );
}
