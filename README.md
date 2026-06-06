# Veridit Core - Monólito Modular Hexagonal

Este projeto é a implementação parcial (30% dos requisitos) para o sistema Veridit, desenvolvida como o Trabalho III da disciplina de Engenharia de Software I (UFBA).

A arquitetura adota o padrão de **Monólito Modular** com **Arquitetura Hexagonal (Ports & Adapters)**, respeitando as decisões de design registradas em `ADRs.pdf` e os princípios **SOLID**.

## Requisitos Implementados nesta Sprint (30%)

- **REQ 01 – Cadastrar Usuário (Alta)**
- **REQ 02 – Recuperar Senha (Média)**
- **REQ 03 – Logar no Sistema (Alta)**
- **REQ 04 – Sair do Sistema (Alta)**
- **REQ 12 – Listar Registros Realizados (Média/Alta)**

---

## Estrutura do Projeto (Hexagonal)

Cada módulo do sistema (`src/modules/*`) é estruturado de acordo com a Arquitetura Hexagonal:

1. **Domain (Núcleo):** Sem dependências de frameworks. Contém as entidades, value objects e exceções de negócio.
2. **Application (Casos de Uso & Portas):**
   - **Ports In (Driving Ports):** Interfaces que definem as intenções do usuário (casos de uso).
   - **Ports Out (Driven Ports):** Interfaces que representam dependências externas (bancos de dados, mailers).
   - **Use Cases:** Serviços de aplicação que implementam os casos de uso e orquestram o domínio.
3. **Infrastructure (Adaptadores & Configurações):**
   - **Adapters Inbound:** Controladores Nest.js que interceptam requisições HTTP e as encaminham para as portas de entrada.
   - **Adapters Outbound:** Implementações de banco de dados (Prisma/PostgreSQL) e integrações (serviços de email).
   - **Config:** Ligações e injeções de dependência realizadas através de módulos e provedores Nest.js.

---

## Pré-requisitos

Para executar e testar o sistema, você precisará ter instalado:

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [Docker](https://www.docker.com/) e Docker Compose
- [npm](https://www.npmjs.com/)

---

## Como Rodar o Sistema

1. **Subir a Infraestrutura Local (PostgreSQL & MinIO):**
   ```bash
   docker-compose up -d
   ```

2. **Instalar Dependências:**
   ```bash
   npm install
   ```

3. **Gerar o Cliente Prisma (ORM):**
   ```bash
   npx prisma generate
   ```

4. **Rodar as Migrações do Banco de Dados (PostgreSQL):**
   ```bash
   npx prisma migrate dev
   ```

5. **Iniciar a Aplicação em Modo de Desenvolvimento:**
   ```bash
   npm run start:dev
   ```

---

## Rodando os Testes

Para executar os testes unitários da lógica de negócio e domínio:

```bash
npm run test
```
