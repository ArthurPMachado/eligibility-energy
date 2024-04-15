# Serviço de Elegibilidade

## Serviço construido em NodeJs para verificar se um cliente é elegivel ou não

A ideia do projeto é verificar se uma pessoa ou empresa estaria apto a ser cliente
baseado nas suas informações de: consumo de energia, tipo de conexão e modalidade tarifaria

O projeto foi desenvolvido usando conceitos de Clean Code, Arquitetura Limpa e SOLID. O deploy
com pulumi não foi feito devido as dificuldades para expor a aplicação no Fargate na nuvem AWS

Caso queira fazer os testes em um API Client, deixo separado a collection do postman,
explicando cada endpoint, formato da requisição e respostas esperadas

## Tecnologias usadas

* NodeJS
* Typescript
* Fastify
* Zod
* Docker
* Pulumi
* Vitest + Supertest
* CI com Github Actions

## Iniciando
### Pré-requisitos

Para iniciar o projeto, é necessário preparar o ambiente, o que significa

1. Instalar versão LTS do Node - https://nodejs.org/en

### Instalando
**Clonando o repositório**
```
$ git clone git@github.com:ArthurPMachado/eligibility-energy.git

$ cd eligibility-energy
```
**Instalando dependências**
Caso não use o gerenciador **pnpm**, pode-se substituir pelo npm que o funcionamento
permanecerá o mesmo

```
$ pnpm i
```

### Rodando o projeto

**Iniciando a aplicação**
```
$ pnpm run dev
```
### Rodando Testes
**Testes unitários**
```
$ pnpm run test
```
**Testes end-to-end**
```
$ pnpm run test:e2e
```
⚠️ **NÃO ESQUEÇA DE CRIAR UM ARQUIVO .ENV, CASO CONTRÁRIO O PROJETO NÃO IRÁ FUNCIONAR**

# Autor

👤 **Arthur Machado**

- Github: [@Arthur Machado](https://github.com/ArthurPMachado)
- LinkedIn: [@Arthur Machado](https://linkedin.com/in/arthurpmachado)
