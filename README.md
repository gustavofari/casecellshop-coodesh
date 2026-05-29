# CaseCellShop

Sistema de checkout para e-commerce de capinhas de celular, construído para lidar com performance da vitrine, consistência de estoque e latência de APIs legadas.

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Frontend | Next.js 14, TypeScript, Tailwind CSS |
| Backend | NestJS, TypeScript |
| Testes E2E | Cypress |
| Gerenciador de pacotes | pnpm |

## Estrutura do repositório

```text
case-cell-shop/
├── README.md
├── PROMPTS.md
├── package.json
├── .gitignore
├── backend/
│   ├── .env.example
│   ├── package.json
│   └── src/
│       ├── main.ts
│       ├── app.module.ts
│       └── checkout/
│           ├── checkout.controller.ts
│           ├── checkout.module.ts
│           ├── checkout.service.ts
│           ├── checkout.controller.spec.ts
│           ├── checkout.service.spec.ts
│           ├── data/
│           │   └── products.mock.ts
│           ├── dto/
│           │   ├── create-checkout.dto.ts
│           │   └── checkout-response.dto.ts
│           └── entities/
│               └── product.entity.ts
└── frontend/
    ├── .env.example
    ├── next.config.ts
    ├── package.json
    ├── src/
    │   ├── app/
    │   │   ├── globals.css
    │   │   ├── layout.tsx
    │   │   └── page.tsx
    │   ├── components/
    │   │   ├── layout/
    │   │   │   ├── Header.tsx
    │   │   │   └── ProductGrid.tsx
    │   │   ├── product/
    │   │   │   └── ProductCard.tsx
    │   │   └── ui/
    │   │       ├── FeedbackAlert.tsx
    │   │       ├── Input.tsx
    │   │       ├── Pagination.tsx
    │   │       ├── PurchaseModal.tsx
    │   │       └── SkeletonCard.tsx
    │   ├── constants/
    │   │   └── api.constants.ts
    │   ├── hooks/
    │   │   ├── useCheckout.ts
    │   │   ├── useDebounce.ts
    │   │   └── useScrollToTop.tsx
    │   ├── services/
    │   │   └── checkout.service.ts
    │   ├── types/
    │   │   └── checkout.types.ts
    │   └── utils/
    │       └── formatCurrency.ts
    └── cypress/
        ├── e2e/
        │   ├── checkout.cy.ts
        │   └── quantity.cy.ts
        ├── fixtures/
        │   ├── checkout-success.json
        │   ├── checkout-success-qty.json
        │   └── products.json
        ├── pages/
        │   └── checkout.page.ts
        └── support/
            ├── commands.ts
            └── e2e.ts
```

## Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- [pnpm](https://pnpm.io/) v8 ou superior

Caso não tenha o pnpm instalado:

```bash
npm install -g pnpm
```

## Instalação

Clone o repositório:

```bash
git clone <url-do-repositorio>
cd case-cell-shop
```

Instale todas as dependências de uma vez a partir da raiz:

```bash
pnpm install
pnpm install:all
```

O primeiro comando instala as dependências da raiz (orquestrador). O segundo instala `backend/` e `frontend/` em sequência.

<details>
<summary>Instalação manual (opcional)</summary>

```bash
cd backend && pnpm install
cd ../frontend && pnpm install
```

</details>

## Variáveis de ambiente

### Backend

```bash
cd backend
cp .env.example .env
```

| Variável | Padrão | Descrição |
|---|---|---|
| `PORT` | `3001` | Porta do servidor. Em produção, em plataformas como render, é injetada automaticamente. |
| `ALLOWED_ORIGINS` | `http://localhost:3000` | Origens CORS permitidas. Em produção, use a URL do frontend no Render. |
| `ERP_DELAY_MS` | Delay fixo em ms para simular o ERP. Se omitido, usa entre 1000ms e 3000ms. |

### Frontend

```bash
cd frontend
cp .env.example .env.local
```

| Variável | Padrão | Descrição |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:3001` | URL base da API. Em produção, use a URL do backend no Render. |

## Rodando o projeto

A partir da raiz (recomendado — sobe backend e frontend simultaneamente):

```bash
pnpm dev
```

| Serviço | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend (API) | http://localhost:3001 |

<details>
<summary>Processos separados (opcional)</summary>

Terminal 1 — Backend:

```bash
cd backend
pnpm start:dev
```

Terminal 2 — Frontend:

```bash
cd frontend
pnpm dev
```

</details>

## Funcionalidades

- Vitrine de produtos com busca por modelo e paginação
- Seleção de quantidade por produto, limitada ao estoque disponível
- Fluxo de checkout com tratamento de sucesso, validação e indisponibilidade do ERP
- Feedback visual de carregamento e bloqueio contra cliques duplos

## Testes automatizados

Os testes E2E ficam em `frontend/cypress/` e seguem o padrão **Page Object Model**.

Cobertura atual:
- `checkout.cy.ts` — listagem, busca, produto sem estoque, compra com sucesso e erro
- `quantity.cy.ts` — incremento/decremento, limite de estoque e envio da quantidade no payload

> **Atenção:** backend e frontend precisam estar em execução antes de rodar os testes. Use `pnpm dev` na raiz.

Interface gráfica (modo interativo):

```bash
cd frontend
pnpm cypress:open
```

Modo headless (CI/CD):

```bash
cd frontend
pnpm cypress:run
```

## Deploy no Render

O projeto está preparado para deploy no [Render](https://render.com) sem alterações de código.

**Backend — Web Service:**

| Campo | Valor |
|---|---|
| Build Command | `pnpm install && pnpm build` |
| Start Command | `pnpm start:prod` |
| Variável de ambiente | `ALLOWED_ORIGINS` → URL do frontend no Render |

**Frontend — Web Service:**

| Campo | Valor |
|---|---|
| Build Command | `pnpm install && pnpm build` |
| Start Command | `pnpm start` |
| Variável de ambiente | `NEXT_PUBLIC_API_URL` → URL do backend no Render |

## Decisões técnicas

### Performance da vitrine (Problema 01)

A vitrine foi otimizada para carregar e responder rápido mesmo com muitos produtos:

- **Busca com debounce** — a filtragem aguarda o usuário parar de digitar, evitando reprocessamento a cada tecla
- **Paginação no cliente** — apenas um lote de produtos é renderizado por vez
- **Imagens otimizadas** — uso de `next/image`, com `priority` nos primeiros itens visíveis para acelerar o maior elemento de conteúdo (LCP)
- **Memoização** — os cartões de produto usam `React.memo` para evitar re-renderizações desnecessárias

### Consistência de estoque (Problema 02)

O decremento de estoque ocorre **somente após a confirmação do ERP**. Isso evita que falhas no ERP gerem vendas sem cobertura de inventário. A verificação de disponibilidade acontece antes da chamada ao ERP, e a atualização do estoque só é efetivada se a resposta for bem-sucedida.

### Resiliência do checkout (Problema 03)

O backend simula a latência e instabilidade de um ERP legado via `simulateErpConfirmation()`, controlada por `ERP_DELAY_MS`. O frontend responde a isso com:

- **Bloqueio de botão imediato** — previne cliques duplos e race conditions no lado do cliente
- **Feedback visual de loading** — o botão exibe "Processando..." durante a espera
- **Tratamento de erro explícito** — falhas do ERP são capturadas e exibidas em modal com mensagem clara
- **Atualização de estoque em tela** — após sucesso confirmado, o inventário exibido reflete o estado real

---

> This is a challenge by Coodesh
