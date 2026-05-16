# Lume Studio 🌟 | Web App Institucional de Estética Moderna

> **Status do Projeto:** v1.0.0 (First Stable Release) 🚀  
> **Data Provider:** Alimentado dinamicamente pela API do **Beautime** > **Fluxo de Conversão:** Integração Direta via **WhatsApp**

O **Lume Studio** é um site institucional multipáginas (Multi-Page Website) de alto padrão e uma plataforma de agendamento focada no mercado de beleza e estética de luxo. Desenvolvido para um salão de beleza exclusivo, o projeto atua como a vitrine perfeita para o cliente final (Client-Facing), consumindo dados em tempo real de serviços e profissionais gerenciados via painel administrativo do **Beautime** e convertendo o agendamento final de forma estratégica pelo **WhatsApp**.

---

## 🎨 Experiência Visual & UI/UX

O design do Lume Studio foi concebido sob uma estética minimalista de corte editorial, utilizando tipografia serifada imponente, espaços negativos milimetricamente planejados e componentes de alta fidelidade para transmitir exclusividade.

* **Interface Totalmente Responsiva:** Layout fluido e adaptado de forma impecável para smartphones, tablets e desktops.
* **Suporte a Temas Dinâmicos:** Modo Claro (Light Mode) e Modo Escuro (Dark Mode) nativos, preservando o contraste e o refinamento estético em qualquer preferência do usuário.

---

## 📸 Tour Completo pelas Páginas

### ✦ 1. Portal Público & Catálogo Editorial
Uma imersão completa na essência do estúdio através de seções e páginas dedicadas a guiar o visitante.
* `Home & Conceito:` Apresentação visual da marca, seções de destaque e depoimentos selecionados.
* `Sobre / Filosofia:` O manifesto do estúdio, detalhando a herança, o propósito e a abordagem humanizada por trás dos atendimentos.
* `Rituais para a Estética Moderna:` Página de catálogo dinâmico alimentada via API, com filtros interativos por categoria (Estética, Unhas, Cabelos, Maquiagem).
* `Os Artesãos:` Espaço editorial dedicado a apresentar o perfil, a especialidade e os especialistas do salão com dados e avatares dinâmicos.

<img width="1880" height="911" alt="Home do Lume Studio" src="https://github.com/user-attachments/assets/d3671f4a-56fb-4d94-b96b-e224b6edbd57" />
<img width="1883" height="901" alt="Captura de tela 2026-05-15 231823" src="https://github.com/user-attachments/assets/8adb8862-00f2-4261-9232-c30cbfc21803" />
<img width="1881" height="893" alt="Catálogo Editorial" src="https://github.com/user-attachments/assets/f7ae5ea4-5238-4d70-95d8-ee597d76ac0f" />
<img width="1867" height="900" alt="Os Artesãos" src="https://github.com/user-attachments/assets/bbf33001-c291-44ed-822b-66f7e18b806a" />

### ✦ 2. Conecte-se Conosco (Consultas Customizadas)
Página de contato estruturada de forma sofisticada para iniciar consultas personalizadas, alinhando expectativas de atendimento e prazos.

<img width="1882" height="902" alt="Página de Contato" src="https://github.com/user-attachments/assets/6b8e811b-8cb1-4239-aa7b-66255c305b5b" />

### ✦ 3. Área do Cliente & Jornada de Agendamento (Concierge)
O coração operacional do sistema, onde o usuário gerencia sua jornada e monta seu atendimento sob medida.
* `Painel "Meus Agendamentos":` Cards detalhados que exibem status do atendimento (Confirmado/Pendente), dados do profissional, duração e controle financeiro avançado (Status do pagamento, valor total e forma de retenção como Pix/Cartão).
* `Fluxo Inteligente via WhatsApp:` Após o cliente selecionar o serviço, o profissional e o horário ideal no site, os dados são perfeitamente estruturados e enviados para o WhatsApp do salão, onde o administrador realiza a marcação definitiva no painel **Beautime Admin**.
* `Central de Alertas & Notificações:` Listagem dinâmica com busca textual, paginação e filtros de status de agendamentos em tempo real.
* `Perfil do Membro:` Página de gerenciamento de informações pessoais e dados de contato seguros.

<img width="1877" height="897" alt="Painel de Agendamentos" src="https://github.com/user-attachments/assets/dfe4fc66-a786-4984-a2b6-4cc340689e2d" />
<img width="1887" height="906" alt="Central de Notificações" src="https://github.com/user-attachments/assets/9243954d-3ad9-4447-88be-201a8dcd366a" />
<img width="1881" height="902" alt="Perfil do Usuário - Informações" src="https://github.com/user-attachments/assets/6b0167b4-06a4-4ea6-978a-cc158623b15f" />
<img width="1877" height="900" alt="Perfil do Usuário - Segurança" src="https://github.com/user-attachments/assets/9b242ae8-8a6d-4103-83b4-1736742c77de" />

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
