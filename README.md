# ✨ Lume Studio

> **Plataforma Premium de Agendamento para Estética Moderna**

<img width="1880" height="911" alt="Home do Lume Studio" src="https://github.com/user-attachments/assets/d3671f4a-56fb-4d94-b96b-e224b6edbd57" />

**Lume Studio** é um site institucional e plataforma de agendamento desenvolvida para o mercado de beleza e estética de luxo. Combina um catálogo editorial sofisticado com um sistema de agendamento inteligente, entregando uma experiência client-facing de alto padrão que converte visitantes em clientes através de integração estratégica com WhatsApp.

> **Status:** v1.0.0 (Stable) | **Integração:** API Beautime + WhatsApp | **Tipo:** Multi-Page App com Concierge Inteligente

---

## 🎯 Proposta de Valor

### Para Visitantes

- 📖 Catálogo visual de serviços organizados por categoria
- 👥 Conheça os artesãos que prestam cada serviço
- 📅 Agendamento simplificado com feedback em tempo real
- 🌙 Interface elegante em modo claro e escuro

### Para o Negócio

- 💻 Vitrine digital que reflete a exclusividade da marca
- ⚡ Processamento otimizado de dados com Zero Waterfall Effect
- 🔄 Integração nativa com WhatsApp para conversão
- 📊 Gestão centralizada via Admin Beautime

---

## 🌟 Funcionalidades Principais

### 1️⃣ Portal Público (Unautenticated)

**Home & Brand Experience**

- Apresentação visual imersiva da marca
- Depoimentos de clientes estrategicamente posicionados
- Call-to-action inteligente para conversão

<img width="1883" height="901" alt="Brand Experience" src="https://github.com/user-attachments/assets/8adb8862-00f2-4261-9232-c30cbfc21803" />

**Sobre Lume Studio**

- Manifesto e filosofia do estúdio
- Herança, propósito e abordagem humanizada
- Storytelling editorial de alta fidelidade

**Rituais para a Estética Moderna**

- Catálogo dinâmico alimentado via API Beautime
- Filtros interativos por categoria: Estética, Unhas, Cabelos, Maquiagem
- Busca e navegação intuitiva

<img width="1881" height="893" alt="Catálogo Editorial" src="https://github.com/user-attachments/assets/f7ae5ea4-5238-4d70-95d8-ee597d76ac0f" />

**Os Artesãos (Profissionais)**

- Perfil editorial completo de cada especialista
- Especialidades, bio e avatares dinâmicos
- Conexão direta com serviços oferecidos

<img width="1867" height="900" alt="Os Artesãos" src="https://github.com/user-attachments/assets/bbf33001-c291-44ed-822b-66f7e18b806a" />

**Conecte-se Conosco**

- Formulário de consulta sofisticado
- Alinhamento de expectativas e prazos de atendimento
- Integração suave com pipeline de vendas

<img width="1882" height="902" alt="Página de Contato" src="https://github.com/user-attachments/assets/6b8e811b-8cb1-4239-aa7b-66255c305b5b" />

### 2️⃣ Área do Cliente (Authenticated)

**Dashboard de Agendamentos**

- Visualização centralizada de todos os agendamentos
- Cards detalhados com status (Confirmado/Pendente)
- Informações do profissional, duração e dados financeiros
- Controle de pagamento: Pix, Cartão com rastreamento de status

<img width="1877" height="897" alt="Painel de Agendamentos" src="https://github.com/user-attachments/assets/dfe4fc66-a786-4984-a2b6-4cc340689e2d" />

**Fluxo de Agendamento Inteligente**

1. Cliente seleciona Serviço
2. Escolhe Profissional especializado
3. Agenda horário disponível
4. Dados são estruturados e enviados para WhatsApp do salão
5. Admin Beautime confirma e finaliza a marcação

**Central de Notificações**

- Listagem dinâmica de alertas em tempo real
- Busca textual e filtros por status
- Paginação inteligente
- Rastreamento de confirmações

<img width="1887" height="906" alt="Central de Notificações" src="https://github.com/user-attachments/assets/9243954d-3ad9-4447-88be-201a8dcd366a" />

**Gerenciamento de Perfil**

- Edição segura de informações pessoais
- Gestão de dados de contato
- Central de segurança com alteração de senha
- Histórico completo de agendamentos anteriores

<img width="1881" height="902" alt="Perfil do Usuário - Informações" src="https://github.com/user-attachments/assets/6b0167b4-06a4-4ea6-978a-cc158623b15f" />
<img width="1877" height="900" alt="Perfil do Usuário - Segurança" src="https://github.com/user-attachments/assets/9b242ae8-8a6d-4103-83b4-1736742c77de" />

---

## 🏗️ Arquitetura & Engenharia

### Escolhas Arquiteturais Estratégicas

**Performance First**

- **Promise.all Orchestration:** Requisições de históricos, serviços e profissionais executadas em paralelo no servidor
- **Zero Waterfall Effect:** Eliminação de requisições em cascata garante carregamento instantâneo de telas densas
- **Server-Side Data Enrichment:** Processamento pesado acontece no servidor Next.js, não no cliente

**Data Mapping Eficiente**

- **Estruturas O(1):** Uso de `Map()` do JavaScript para indexação de dados relacionais
- **Runtime Indexing:** Cruzamento instantâneo de IDs de profissionais/serviços/agendamentos em memória do servidor
- **Type-Safe Queries:** Zero ambiguidade na estrutura de dados com TypeScript

**React & Next.js Modernos**

- **App Router Architecture:** Roteamento moderno e performático
- **Server Components:** Segurança de dados e renderização rápida de HTML no servidor
- **Client Components Estratégicos:** Interatividade (filtros, buscas, modais) apenas onde necessário
- **React 19:** APIs modernas para melhor performance e DX

---

## 🛠️ Stack Tecnológico

| Categoria | Tecnologia | Versão | Propósito |
|-----------|-----------|--------|----------|
| **Framework** | Next.js | 16.2 | App Router, SSR, API Routes |
| **Runtime** | React | 19 | UI Components, Interatividade |
| **Linguagem** | TypeScript | 5.x | Type Safety, DX |
| **Styling** | Tailwind CSS | v4 | Variáveis CSS, Utilidades |
| **Animações** | Framer Motion | 12.x | Micro-interactions, Transitions |
| **Temas** | Next-Themes | 0.4.x | Light/Dark Mode |
| **Ícones** | Lucide React | 1.8.x | SVG Icons |
| **Notificações** | Sonner | 2.x | Toast System |
| **Linting** | ESLint | 9.x | Code Quality |

---

## 🎨 Design & UX

### Estética Editorial Minimalista

- Tipografia serifada imponente e hierárquica
- Espaços negativos cuidadosamente planejados
- Componentes de alta fidelidade
- Paleta de cores sofisticada

### Responsividade Total

- Layout fluido para smartphones, tablets e desktops
- Mobile-first approach
- Touch-friendly interactions

### Suporte a Temas Nativos

- **Light Mode:** Contraste otimizado para leitura
- **Dark Mode:** Redução de fadiga ocular à noite
- **Persistência:** Preferência do usuário armazenada
- **Transições Suaves:** Mudança de tema sem jarretões

---

## 📦 Como Executar

### Pré-requisitos

- Node.js 18+ (16.2.4+ recomendado para Next.js)
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm start

# Executar linter
npm run lint
```

O aplicativo estará disponível em `http://localhost:3000`

---

## 📄 Estrutura de Projeto

```
src/
├── app/               # Rotas Next.js App Router
│   ├── (Pages)/       # Páginas públicas e autenticadas
│   ├── (credentials)/ # Rotas de auth (login, cadastro, etc)
│   ├── api/           # API Routes
│   └── types/         # Type definitions compartilhadas
├── components/        # React Components reutilizáveis
│   ├── Home/          # Componentes da homepage
│   ├── Services/      # Catálogo de serviços
│   ├── Professionals/ # Galeria de profissionais
│   ├── Appointment/   # Fluxo de agendamento
│   ├── Profile/       # Gerenciamento de perfil
│   ├── Header/        # Navegação principal
│   └── Footer/        # Rodapé
├── lib/api/           # Integração com API Beautime
├── utils/             # Utilitários e helpers
├── providers/         # Context Providers (Theme, etc)
└── proxy.ts           # Proxy de requisições
```

---

## 🔐 Autenticação & Segurança

- **Server-Side Sessions:** Validação de autenticação no servidor
- **Protected Routes:** Client-side route guards
- **Password Hashing:** Segurança de credenciais
- **TypeScript:** Prevenção de type errors em tempo de compilação
- **API Validation:** Tipagem rigorosa de dados externos

---

## 🚀 Roadmap & Melhorias Futuras

- [ ] Sistema de avaliações e comentários de clientes
- [ ] Dashboard administrativo avançado
- [ ] Integração com payment gateways
- [ ] Progressive Web App (PWA) support
- [ ] Analytics e insights de agendamentos
- [ ] Multi-idioma (i18n)

---

## 📝 Licença

Este projeto é de uso privado e exclusivo para o ecossistema **Lume Studio** e **Beautime**.

---

## 🤝 Contribuidores

Desenvolvido com ❤️, 🧠 e ☕ por **Emerson Silva**

Powered by modern web technologies • Est. 2026