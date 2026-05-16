# Lume Studio 🌟 | Web App Institucional de Estética Moderna

> **Status do Projeto:** v1.0.0 (First Stable Release) 🚀  
> **Data Provider:** Alimentado dinamicamente pela API do **Beautime** > **Fluxo de Conversão:** Integração Direta via **WhatsApp**

O **Lume Studio** é um site institucional multipáginas (Multi-Page Website) de alto padrão e uma plataforma de agendamento focada no mercado de beleza e estética de luxo. Desenvolvido para um salão de beleza exclusivo, o projeto atua como a vitrine perfeita para o cliente final (Client-Facing), consumindo dados em tempo real de serviços e profissionais gerenciados via painel administrativo do **Beautime** e convertendo o agendamento final de forma estratégica pelo **WhatsApp**.

---

## 📸 Tour Completo pela Interface (UI/UX)

O design utiliza tipografia serifada imponente, espaços negativos milimetricamente planejados e componentes de alta fidelidade para transmitir exclusividade por todas as páginas do ecossistema.

### ✦ Caraterísticas Visuais Principais
* **Interface Totalmente Responsiva:** Layout fluido e adaptado milimetricamente para smartphones, tablets e desktops.
* **Suporte a Temas Dinâmicos:** Modo Claro (Light Mode) e Modo Escuro (Dark Mode) nativos, mantendo o contraste e o refinamento estético em qualquer ambiente.

### ✦ 1. Portal Público & Catálogo Editorial
Uma imersão completa na filosofia do estúdio através de seções e páginas dedicadas a guiar o visitante.
* `Home & Filosofia:` Apresentação da marca, conceito visual e depoimentos reais.
* `Rituais para a Estética Moderna:` Página de catálogo dinâmico alimentada via API, com filtros interativos por categoria (Estética, Unhas, Cabelos, Maquiagem).
* `Os Artesãos:` Página dedicada a apresentar o perfil editorial dos especialistas do salão com dados e avatares dinâmicos.

![Home do Lume Studio](./public/screenshots/home.png)
![Catálogo Editorial](./public/screenshots/services-catalog.png)
![Os Artesãos](./public/screenshots/professionals.png)

### ✦ 2. Conecte-se Conosco (Consultas Customizadas)
Página de contato estruturada de forma sofisticada para iniciar consultas personalizadas, alinhando expectativas de atendimento e prazos.

![Página de Contato](./public/screenshots/contact.png)

### ✦ 3. Área do Cliente & Jornada de Agendamento (Concierge)
O coração operacional do sistema, onde o usuário gerencia sua jornada e monta seu atendimento personalizado.
* `Painel "Meus Agendamentos":` Cards detalhados que exibem status do atendimento (Confirmado/Pendente), dados do profissional, duração e controle financeiro avançado (Status do pagamento, valor total e forma de retenção como Pix/Cartão).
* `Fluxo Inteligente via WhatsApp:` Após o cliente selecionar o serviço, o profissional e o horário ideal no site, os dados são estruturados e enviados diretamente para o WhatsApp do salão, onde o administrador realiza a marcação manual definitiva no painel **Beautime Admin**.
* `Central de Alertas & Notificações:` Listagem dinâmica com busca textual, paginação e filtros de status de agendamentos em tempo real.
* `Perfil do Membro:` Página de gerenciamento de informações pessoais e dados de contato seguros.

![Painel de Agendamentos](./public/screenshots/dashboard-client.png)
![Central de Notificações](./public/screenshots/notifications.png)
![Perfil do Usuário](./public/screenshots/profile.png)

---

## ⚡ Diferenciais de Engenharia de Software

Por trás da interface refinada, o Lume Studio resolve problemas complexos de arquitetura de dados no Front-end:

* **Otimização de Performance com Promise.all:** Na área do cliente, dados massivos de históricos, serviços e profissionais são requisitados em paralelo direto no servidor Next.js. Isso elimina o gargalo de requisições em cascata (waterfall effect), garantindo que telas densas carreguem instantaneamente.
* **Mapeamento de Dados Relacionais com Complexidade O(1):** Implementação de estruturas baseadas em `new Map()` do JavaScript para indexar chaves relacionais da API externa em tempo de execução. O cruzamento entre IDs de profissionais/serviços e os agendamentos do cliente ocorre instantaneamente na memória do servidor.
* **Arquitetura Next.js App Router & React 19:** Uso robusto de Server Components para segurança de dados e renderização rápida de HTML estruturado no servidor, combinado com Client Components dinâmicos onde a interatividade (filtros e buscas) é necessária.
* **Tipagem Estrita com TypeScript:** Modelagem rigorosa de todas as entidades vindas do banco de dados (API Beautime), prevenindo inconsistências e garantindo segurança em tempo de compilação.

---

## 🛠️ Tecnologias Utilizadas

O projeto utiliza o estado da arte do desenvolvimento web atual:

* **Framework Principal:** Next.js 16.2 (App Router)
* **Biblioteca Core:** React 19
* **Estilização:** Tailwind CSS v4 (Suporte nativo a variáveis CSS e performance aprimorada)
* **Gerenciamento de Temas:** Next-Themes
* **Animações de UI:** Framer Motion
* **Gerenciamento de Ícones:** Lucide React
* **Toasts/Notificações em Tela:** Sonner
* **Linguagem:** TypeScript

---

## 📝 Licença

Este projeto é de uso privado e exclusivo para o ecossistema Lume Studio / Beautime.

Developed with 💻, 📐 and 🧠 by **Emerson Silva**.
