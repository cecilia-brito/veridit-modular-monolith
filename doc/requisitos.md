# Requisitos e Princípios SOLID (Trabalho III)

Este documento documenta os requisitos implementados nesta sprint e a aplicação dos princípios **SOLID** na estrutura modular hexagonal adotada.

---

## 1. Requisitos Selecionados (30% da Sprint)

Dentre os 16 requisitos mapeados na especificação do Veridit, foram selecionados os 5 a seguir para representar a primeira sprint da entrega:

| Código | Requisito | Prioridade | Escopo |
|---|---|---|---|
| **REQ 01** | Cadastrar Usuário | Alta | Implementado (Esqueleto & Regras de Domínio) |
| **REQ 02** | Recuperar Senha | Média | Implementado (Esqueleto & Regras de Domínio) |
| **REQ 03** | Logar no Sistema | Alta | Implementado (Esqueleto & Regras de Domínio) |
| **REQ 04** | Sair do Sistema | Alta | Implementado (Esqueleto & Regras de Domínio) |
| **REQ 12** | Listar Registros Realizados | Alta | Implementado (Esqueleto & Regras de Domínio) |

---

## 2. Mapeamento de Princípios SOLID

A estrutura hexagonal e o uso do Nest.js facilitam a aderência estrita aos princípios SOLID. Abaixo descrevemos onde cada princípio foi aplicado e as justificativas técnicas:

### **S - Single Responsibility Principle (Princípio da Responsabilidade Única)**
- **Onde foi aplicado:** Nas entidades de domínio (ex: `User`, `Record`) e nos casos de uso individuais (ex: `RegisterUserService`, `LoginService`).
- **Razão:** Cada classe possui apenas um motivo para mudar. As entidades tratam unicamente das regras e invariantes de negócio daquele objeto (como validação de e-mail e CPF), enquanto cada serviço de caso de uso executa apenas uma funcionalidade de fluxo (ex: a classe de cadastro de usuário não se preocupa com login ou redefinição de senha).

### **O - Open/Closed Principle (Princípio do Aberto/Fechado)**
- **Onde foi aplicado:** Na definição de portas de saída (ex: `UserRepositoryPort`, `MailerPort`) e no uso do Nest.js para injeção de dependência.
- **Razão:** O núcleo da aplicação está fechado para modificação direta quando um detalhe externo muda, mas aberto para extensão. Por exemplo, se decidirmos trocar o envio de e-mails do *NodeMailer* para o *Amazon SES*, estendemos o sistema criando uma nova classe que implementa `MailerPort` na camada de infraestrutura, sem precisar tocar nos serviços da camada de aplicação.

### **L - Liskov Substitution Principle (Princípio da Substituição de Liskov)**
- **Onde foi aplicado:** Nos adaptadores de persistência e interfaces de repositório (ex: `PrismaUserRepository` substitui a interface `UserRepositoryPort`).
- **Razão:** A aplicação depende apenas da abstração de portas de saída. Qualquer classe que implemente a porta (`UserRepositoryPort`) pode ser substituída sem quebrar o comportamento dos casos de uso, garantindo que as implementações respeitem o contrato estabelecido.

### **I - Interface Segregation Principle (Princípio da Segregação de Interfaces)**
- **Onde foi aplicado:** Divisão clara entre portas de entrada e portas de saída de propósitos específicos (ex: `RegisterUserUseCase` e `LoginUseCase` são interfaces separadas ao invés de uma única interface gigante de usuários).
- **Razão:** As classes clientes (como controladores ou serviços) não devem ser forçadas a depender de métodos que não utilizam. Ao segmentar as portas por caso de uso, mantemos as dependências enxutas e focadas.

### **D - Dependency Inversion Principle (Princípio da Inversão de Dependência)**
- **Onde foi aplicado:** A camada de aplicação (`application`) não depende da camada de infraestrutura (`infrastructure`). Em vez disso, a infraestrutura depende da aplicação através da implementação das portas de saída (inversão de controle).
- **Razão:** Detalhes de baixo nível (como qual ORM ou framework HTTP é usado) dependem de abstrações de alto nível (regras de negócio do domínio e casos de uso). Isso desacopla totalmente a regra de negócio da tecnologia de entrega.
