# Water Intake Tracker (Docker Compose)

Este projeto é um clone do app de rastreamento de ingestão de água, rodando em containers Docker Compose, com frontend React, backend Node.js/Express e banco PostgreSQL.

## Como rodar

1. Certifique-se de ter Docker e Docker Compose instalados.
2. Execute:

```sh
docker-compose up --build
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:4000
- Banco: PostgreSQL na porta 5432

## Funcionalidades
- Registrar ingestão de água
- Consultar progresso diário
- Visualizar histórico

## Estrutura
- `/backend`: API Node.js/Express
- `/frontend` (raiz): React (Vite)
- `docker-compose.yml`: Orquestração dos serviços

## Customização
- Variáveis de ambiente podem ser ajustadas no `docker-compose.yml`.
