# Top-News

Apenas estudos

## Configuração do banco de dados 🚀

O código usa `pg` e lê a conexão através de **variáveis de ambiente**:

```bash
POSTGRES_HOST     # padrão localhost
POSTGRES_PORT     # padrão 5432
POSTGRES_USER     # padrão postgres
POSTGRES_DB       # padrão postgres
POSTGRES_PASSWORD # **necessário** – use "local_password" ou exporte a sua
```

O `infra/compose.yaml` já cria um container Postgres com a senha
"local_password". Para levantar o banco e garantir que os testes funcionem,
execute:

```bash
# traz o container em segundo plano
cd infra && docker compose up -d

# exporta a senha para o ambiente do node
export POSTGRES_PASSWORD=local_password

# em seguida rode o servidor ou execute os testes
npm run dev          # inicia o Next.js
npm test             # executa os testes de integração
```

Sem a variável de ambiente ou sem o banco rodando, as requisições a
`/api/v1/status` vão dar erro 500 e o `npm test` falhará (como você viu).

> Dica: você também pode adicionar o `export` a um arquivo `.env` e usar algo
> como `dotenv` para carregá‑lo se preferir.
