# Planilha do Agricultor · funil (agricultura.bilonai.com)

Site estático (Vercel, sem base de dados):

| Página | O que faz |
|---|---|
| `index.html` | Diagnóstico rápido (7 perguntas) → animação «a cruzar os seus dados» → resultado personalizado → botão para a oferta |
| `oferta.html` | Oferta: preço de lançamento 7.997 Kz (depois 21.997 Kz), checkout Okanda em popup, cupão de 40% ao carregar em «voltar» |
| `obrigado.html` | Página para onde a Okanda redirecciona após o pagamento |
| `termos.html`, `privacidade.html` | Páginas legais |

## Configurar (`config.js`)
- `checkout`: link do checkout Okanda (7.997 Kz).
- `checkoutCupao`: link do checkout com o cupão já aplicado (se a Okanda o permitir). Se ficar vazio, o popup pede ao cliente para escrever o código.
- `cupao`: código do cupão de 40% criado na Okanda (por defeito `AGRO40`).
- `modoCheckout`: `"popup"` (abre por cima da página) ou `"pagina"` (abre o checkout normalmente). Se a Okanda bloquear a abertura dentro de outra página, use `"pagina"`.
- `pixel`: ID do Meta Pixel (só carrega com consentimento). Eventos: `IniciouDiagnostico`, `Lead`, `ViewContent`, `InitiateCheckout`, `CupaoMostrado`.

## Publicar
Vercel → Add New → Project → importar este repositório (Root = raiz) → Settings → Domains → `agricultura.bilonai.com`.
Na Okanda, a página de obrigado do produto deve ser `https://agricultura.bilonai.com/obrigado`.
