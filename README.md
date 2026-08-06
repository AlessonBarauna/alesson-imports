# Alesson Imports

Código-fonte completo do site da Alesson Imports, preparado para abrir e editar no VS Code.

## Como abrir no VS Code

1. Instale o Node.js 22 ou superior: https://nodejs.org/
2. Extraia o arquivo ZIP.
3. Abra a pasta `alesson-imports-vscode` no VS Code.
4. No VS Code, abra o menu **Terminal > Novo Terminal**.
5. Execute:

```bash
npm install
npm run dev
```

6. Abra no navegador o endereço que aparecer no terminal, normalmente `http://localhost:5173`.

## Onde editar

- `app/page.tsx`: textos, produtos, preços, links e estrutura da página.
- `app/globals.css`: cores, tamanhos, espaçamentos e responsividade.
- `app/layout.tsx`: título, descrição e configurações gerais do site.
- `public/`: imagens e arquivos públicos.

## Comandos úteis

```bash
npm run dev
npm run build:local
npm run start
```

O projeto usa React, TypeScript, Tailwind CSS, Vite e Vinext.
