import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import "./instagram.css";

export const metadata: Metadata = {
  title: "Alesson Imports | iPhones com preço justo",
  description:
    "iPhones lacrados e produtos Apple com preço competitivo, procedência informada e atendimento direto em Mogi das Cruzes.",
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
      <body>
        {children}
        <Script
          id="cloudflare-web-analytics"
          type="module"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token":"4f3c0bd22a5641bb89ba1594c95ac4ea"}'
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
