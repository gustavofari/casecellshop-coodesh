# PROMPTS.md

Este arquivo documenta os casos em que ferramentas de inteligência artificial foram utilizadas como apoio durante o desenvolvimento deste projeto.

A IA foi usada pontualmente como ferramenta de produtividade e revisão. As decisões de arquitetura, separação de responsabilidades, lógica de negócio e implementação foram definidas e escritas manualmente.

---

## Casos de uso

### 1. Geração de dados mockados de produtos

**Ferramenta:** Gemini e Claude

**Prompt utilizado:**
> "Gere uma lista de produtos mockados de capinhas de celular em TypeScript seguindo a interface ProductEntity (id, name, price, stock, imageUrl). Inclua variedade de modelos, alguns com estoque zerado para testar o cenário de indisponibilidade."

**O que foi ajustado manualmente após a geração:**
- Revisão dos dados gerados para refletir produtos plausíveis
- Ajuste dos níveis de estoque para cobrir os cenários de teste (com estoque, esgotado, estoque baixo)
- Validação de que todos os campos respeitam a tipagem da entidade
- Imagens inseridas manualmente

---

### 2. Revisão de código (code review)

**Ferramenta:** Gemini e Claude

**Prompt utilizado:**
> "Revise este service de checkout e aponte problemas de consistência, ordem de operações e tratamento de erros. O objetivo é garantir que o estoque não fique inconsistente em caso de falha do ERP."

**O que essa revisão identificou:**
- A ordem do decremento de estoque em relação à confirmação do ERP
- O uso de exceção HTTP mais adequada para indisponibilidade de serviço
- Pontos de tipagem que poderiam ser tornados explícitos

**O que foi ajustado manualmente:**
- Toda a correção foi avaliada e implementada manualmente após entender o motivo de cada apontamento.

---

### 3. Mapeamento de cenários de teste

**Ferramenta:** Gemini e Claude

**Prompt utilizado:**
> "Dado este fluxo de checkout, liste quais cenários deveriam ser cobertos por testes automatizados, considerando sucesso, validação de entrada, estoque insuficiente e falha do ERP."

**Resultado:**
- Serviu como checklist para garantir cobertura dos casos relevantes (compra com sucesso, quantidade inválida, produto inexistente, estoque insuficiente, falha do ERP).
- A escrita dos testes em si foi feita manualmente.

