# Atualização diária de preços (Alesson Imports)

Fornecedores: HYH (iPhones/Mac/iPad, games e drones), A (iPhones, Mac, Xiaomi, Watch, acessórios), Kingdom, Pro Phone e lista de seminovos.

Regra de preço (`app/pricing.ts`): custo = menor preço entre as listas do dia + 1% de NF + R$ 50 de frete; venda = custo + lucro de 8% (mínimo R$ 250, sem teto), arredondada para terminar em 90. O preço de venda nunca deve ficar acima de Mercado Livre/Amazon.
No `app/catalog.ts`, iPhones guardam o preço da lista; os demais guardam `round(lista × 1,01 + 50)`.

Toda atualização:
1. Atualizar preços, cores (`options`) e `from` de cada produto do catálogo; produtos novos entram; quem não aparece nas listas do dia fica `unavailable: true` (Em falta). Nunca remover produto.
2. Games (categoria "Games") e drones seguem a lista HYH. Garmin, Starlink e robôs só mudam quando aparecem em alguma lista.
3. Mudar `app/pricesUpdatedAt.ts` (data/hora de Brasília). Ele alimenta a loja, lacrados, seminovos, iPads e a tabela de iPhones.
4. A página `tabela-iphones` lê do catálogo (lacrados e CPO), então atualiza junto — conferir que abre e mostra o mesmo preço da página de lacrados.
5. Manter o aviso "Dólar tá subindo pessoal" em destaque enquanto o Alesson não mandar tirar.
