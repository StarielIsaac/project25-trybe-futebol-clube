# Trybe Futebol Clube (TFC) - Backend

[Descrição](#trybe-futebol-clube-tfc---backend) |
[Tecnologias Utilizadas](#tecnologias-utilizadas) |
[Detalhes da aplicação fullstack](#detalhes-da-aplicação-fullstack) |
[Pré-requisitos](#pré-requisitos) |
[Instalação e Execução](#instalação-e-execução) |
[Instruções completas para Instalação e Execução do Projeto](#instruções-completas-para-instalação-e-execução-do-projeto) |
[Endpoints da API](#endpoints-da-api) |
[Testes Locais](#testes-locais) |
[Requisitos do projeto](#requisitos-do-projeto)

O Trybe Futebol Clube (TFC) é um site informativo sobre partidas e classificações de futebol. Este projeto consiste no desenvolvimento de um backend dockerizado utilizando modelagem de dados através do Sequelize. O backend fornece uma API que permite a integração com um frontend já fornecido no projeto, permitindo o consumo de um banco de dados.
<br></br>
## Tecnologias Utilizadas

- _Node.js_
- _Express.js_
- _Sequelize_
- _MySQL_
- _Docker_
- _Docker Compose_
<br></br>
## Detalhes da aplicação fullstack
### Banco de Dados
O banco de dados utilizado será um container Docker MySQL, já configurado no Docker Compose por meio de um serviço chamado `db`. Ele tem o papel de fornecer dados para o serviço de backend. <br><br>Durante a execução dos testes, o banco de dados será acessado pelo Sequelize através da porta 3306 do localhost. Você também pode conectar-se ao banco de dados utilizando um Cliente MySQL, como o Workbench, Beekeeper, DBeaver, etc., utilizando as credenciais configuradas no Docker Compose para o serviço `db`.
<br></br>
### Backend

O backend será o ambiente onde você realizará a maior parte das implementações exigidas. Ele deve rodar na porta 3001, pois o frontend faz requisições para essa porta por padrão. Sua aplicação deve ser inicializada a partir do arquivo `app/backend/src/server.ts`. <br> Certifique-se de que o Express esteja sendo executado e que a aplicação esteja ouvindo a porta especificada nas variáveis de ambiente. Todas as dependências extras, como Joi, Boom, express-async-errors, etc., devem ser listadas no arquivo `app/backend/packages.npm`.
<br></br>
### Frontend

O frontend já está concluído, portanto não é necessário realizar modificações nele. A única exceção será o Dockerfile, que precisará ser configurado. Todos os testes a partir do requisito de login utilizam o Puppeteer para simular uma pessoa acessando o site http://localhost:3000/. <br><br>O frontend se comunica com o serviço de backend por meio da URL http://localhost:3001, utilizando os endpoints que você deve construir nos requisitos. Recomenda-se que, sempre que implementar um requisito no backend, acesse a página no frontend que consome a implementação para validar se está funcionando conforme o esperado.
<br></br>
### Docker

O Docker Compose tem a responsabilidade de unir todos os serviços conteinerizados (backend, frontend e db) e subir o projeto completo com o comando `npm run compose:up`.
<br></br>
## Pré-requisitos

Antes de executar o projeto, verifique se sua máquina atende aos seguintes requisitos:

- Sistema Operacional: Distribuição Unix
- Node.js 16.x
- Docker
- Docker Compose (versão >= 1.29.2)
<br></br>

## Instalação e Execução

Siga as etapas abaixo para executar o projeto:

1. Clone o repositório do projeto:

```
git clone https://github.com/seu-usuario/trybe-futebol-clube.git
```

2. Acesse o diretório raiz do projeto:

```
cd trybe-futebol-clube
```

3. Instale as dependências do backend:

```
npm install --prefix app/backend
```

4. Inicie os containers do Docker:

```
npm run compose:up
```

5. O backend estará acessível na porta 3001.

<br></br>
## Instruções completas para Instalação e Execução do Projeto


Siga as etapas abaixo para instalar e executar o projeto:

1. Certifique-se de possuir o Node.js versão 16 ou superior instalado em sua máquina.
2. Instale o Docker e o Docker Compose em sua máquina.
3. Clone o repositório do projeto do Trybe Futebol Clube.
4. Acesse a pasta raiz do projeto através do terminal.
5. Execute o comando `npm install` para instalar as dependências do projeto.
6. Execute o comando `npm run install:apps` para instalar as aplicações frontend e backend.
7. Execute o comando `npm run compose:up` para iniciar o projeto completo com o Docker Compose.
8. Após a inicialização, o frontend estará acessível em http://localhost:3000 e o backend em http://localhost:3001.

<br></br>
## Endpoints da API

A API fornece os seguintes endpoints:

- `/teams`: Retorna todos os times cadastrados.
- `/teams/:id`: Retorna os dados de um time específico.
- `/login`: Realiza o login do usuário.
- `/matches`: Retorna as partidas cadastradas.
- `/matches/:id`: Retorna os dados de uma partida específica.
- `/matches/:id/finish`: Finaliza uma partida.
- `/leaderboard/home`: Retorna as informações de desempenho dos times da casa.
- `/leaderboard/away`: Retorna as informações de desempenho dos times visitantes.
<br></br>
## Banco de Dados

### Sequelize

Para o desenvolvimento, o time de produto disponibilizou um Diagrama de Entidade-Relacionamento (DER) para auxiliar na modelagem do banco de dados. Com esse diagrama, é possível obter as informações necessárias
Para nomear as tabelas e colunas, definir os tipos de dados e estabelecer as relações entre as tabelas.
O banco de dados utilizado no projeto é o **MySQL**. Um container Docker já está configurado para fornecer o banco de dados. Durante a execução dos testes, o banco de dados é acessado através da porta 3306 do localhost.
<br></br>
### Biblioteca de Criptografia

A biblioteca utilizada para criptografar as senhas no banco de dados é a `bcryptjs`, que já vem instalada no projeto e não deve ser alterada ou substituída. Recomenda-se explorar os recursos da biblioteca na documentação para implementar o cadastro de um usuário e o login.

<br></br>
## Testes Locais

Para executar os testes do projeto, execute o seguinte comando na raiz do projeto:

```
npm test
```
para executar apenas um arquivo específico de testes, e seus respectivos requisitos, adicione o nome do arquivo de teste no final do comando anterior. Os arquivos de teste podem ser encontrados no diretório `./__tests__/E2E/`.

Ao iniciar um novo Workspace dentro do diretório backend no Visual Studio Code, pode haver alguns erros relacionados ao Typescript. Para corrigir isso, verifique se está usando o Workspace correto e certifique-se de que as configurações do `tsconfig.json` estejam sendo sincronizadas corretamente.

Ao executar o comando `npm install` na pasta raiz do projeto, somente as dependências necessárias para rodar os requisitos do projeto serão instaladas. Você pode instalar suas aplicações (frontend e backend) executando o comando `npm run install:apps` na pasta raiz do projeto. Para executar o avaliador e visualizar as operações que o navegador fará no frontend durante os testes E2E, utilize o comando `npm run test:browser`.
<br></br>
## Requisitos do projeto

1. Desenvolva, em `/app/backend/src/database`, nas pastas correspondentes, uma migration e um model para a tabela de times.
2. (TDD) Desenvolva testes que cubram no mínimo 5% dos arquivos em `/app/backend/src`, com um mínimo de 7 linhas cobertas.
3. Desenvolva o endpoint `/teams` no back-end de forma que ele possa retornar todos os times corretamente.
4. (TDD) Desenvolva testes que cubram no mínimo 10% dos arquivos em `/app/backend/src`, com um mínimo de 19 linhas cobertas.
5. Desenvolva o endpoint `/teams/:id` no back-end de forma que ele possa retornar dados de um time específico.
6. Desenvolva, em `/app/backend/src/database`, nas pastas correspondentes, uma migration e um model para a tabela de pessoas usuárias.
7. (TDD) Desenvolva testes que cubram no mínimo 15% dos arquivos em `/app/backend/src`, com um mínimo de 25 linhas cobertas.
8. Desenvolva o endpoint `/login` no back-end de maneira que ele permita o acesso com dados válidos no front-end.
9. (TDD) Desenvolva testes que cubram no mínimo 20% dos arquivos em `/app/backend/src`, com um mínimo de 35 linhas cobertas.
10. Desenvolva o endpoint `/login` no back-end de maneira que ele não permita o acesso com um email não cadastrado ou senha incorreta no front-end.
11. (TDD) Desenvolva testes que cubram no mínimo 30% dos arquivos em `/app/backend/src`, com um mínimo de 45 linhas cobertas.
12. Desenvolva um middleware de validação para o token, verificando se ele é válido, e desenvolva o endpoint `/login/role` no back-end de maneira que ele retorne os dados corretamente no front-end.
13. Desenvolva, em `/app/backend/src/database`, nas pastas correspondentes, uma migration e um model para a tabela de partidas.
14. (TDD) Desenvolva testes que cubram no mínimo 45% dos arquivos em `/app/backend/src`, com um mínimo de 70 linhas cobertas.
15. Desenvolva o endpoint `/matches` de forma que os dados apareçam corretamente na tela de partidas no front-end.
16. Desenvolva o endpoint `/matches` de forma que seja possível filtrar somente as partidas em andamento e também filtrar somente as partidas finalizadas na tela de partidas do front-end.
17. Desenvolva o endpoint `/matches/:id/finish` de modo que seja possível finalizar uma partida no banco de dados.
18. Desenvolva o endpoint `/matches/:id` de forma que seja possível atualizar partidas em andamento.
19. (TDD) Desenvolva testes que cubram no mínimo 60% dos arquivos em `/app/backend/src`, com um mínimo de 80 linhas cobertas.
20. Desenvolva o endpoint `/matches` de modo que seja possível cadastrar uma nova partida em andamento no banco de dados.
21. Desenvolva o endpoint `/matches` de forma que não seja possível inserir
<br></br>
## Contribuição

Contribuições são sempre bem-vindas! Sinta-se à vontade para abrir issues e pull requests para melhorar este projeto.
<br></br>
## Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).

<h5><p align="center">
  📌 Desenvolvido por <em><strong>Stariel Isaac</em></strong>
</p></h5>
