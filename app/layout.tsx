import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alesson Imports | Produtos Apple em Mogi das Cruzes",
  description:
    "iPhones e produtos Apple com procedência, garantia, parcelamento em até 12x e avaliação do seu usado. Atendimento personalizado em Mogi das Cruzes.",
  referrer: "strict-origin-when-cross-origin",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
