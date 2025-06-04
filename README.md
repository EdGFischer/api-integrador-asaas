<h1 align="center">
   Api Integrador Asaas
  <br>
  Gerenciamento de clientes com integração ao Asaas
</h1>

<br>

<p align="center">
  <img
    src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"
    alt="Node.js"
  >
  <img
    src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"
    alt="TypeScript"
  >
  <img
    src="https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white"
    alt="NestJs"
  >
  <img
    src="https://img.shields.io/badge/docker-257bd6?style=for-the-badge&logo=docker&logoColor=white"
    alt="Docker"
  >
  <img
    src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white"
    alt="Prisma"
  >
  <img
    src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"
    alt="MySQL"
  />
</p>

<br>

### 📝 Descrição

Esta é uma API back-end desenvolvida com **NestJS**, fornecendo funcionalidades de gerenciamento de clientes com integração ao **Asaas**. A API permite a criação, atualização, listagem, e remoção de clientes, além de fornecer dados para o dashboard.

> 🔗 O projeto **front-end** está disponível em: [github.com/EdGFischer/front-end-integrador-asaas](https://github.com/EdGFischer/front_end_integrador_asaas)

---

### :hammer_and_wrench: Tecnologias
- [Node.js](https://nodejs.org/en)
- [TypeScript](https://www.typescriptlang.org/)
- [NestJs](https://nestjs.com/)
- [Docker](https://www.docker.com/)
- [Prisma](https://www.prisma.io/)
- [MySQL](https://www.mysql.com/)

### :fire: Execução do projeto
 1. Instalação das dependências:
     ```
     npm i 
     ```
  2. Docker:
     ```
     docker compose up -d
     ```
  3. Gerar Prisma Client:
     ```
     npx prisma generate
     ```
  4. Migrations:
     ```
     npx prisma migrate dev
     ```
  5. Execução:
     ```
     npm run start:dev
     ```

### :link: Rotas
#### Usuários
- `POST /sessions`: Cria um novo usuário.
    **Body:**
    ```json
    {
      "email": "exemplo@mail.com.br",
      "password": "123456789"
    }
    ```

#### Rotas de Cliente - Com exceção do POST, é necessário envio do Bearer Token
- `POST /client`: Cria um novo cliente.
    **Body:**
    ```json
    {
      "name": "teste",
      "email": "teste@teste.com.br",
      "phone": "(47) 00000-0000",
      "cnpj": "00.000.00/000-00",
      "address": "Rua exemplo, 123"
    }
    ```

- `GET /client?page=1`: Lista os clientes com paginação.
    **Query Params:**
    - `page`: número da página a ser retornada (padrão: 1).

- `PUT /client`: Atualiza os dados do cliente.
    **Body:**
    ```json
    {
      "name": "teste",
      "email": "teste@teste.com.br",
      "phone": "(47) 00000-0000",
      "address": "Rua exemplo, 123"
    }
    ```

- `DELETE /delete/:id`: Deleta o cliente. 
    - **Param:** `id` do cliente.

- `GET /dashboard`: Retorna os dados para o dashboard.
