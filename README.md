# Apsilon - Template publish service

Проект для изучения построения gRPC архитектуры.
- express_app: REST API основного приложения
- express_app/src/graphql: GraphQL API основного приложения
- express_app/src/rabbitmq: интерфейс основного приложения

## Потестировать

```bash
npm ci
npm run prepare-dev
npm start
```

0. Поднять docker-контейнеры в express_app:

```bash
docker-compose up -d
```

1. Запустить в express_app:

```bash
npm ci
npm start
npm start:ws
npm start:ui
```

2. Запустить java_gateway
3. Запустить java_client_mcs > client
4. Запустить java_client_mcs > backend
