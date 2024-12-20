FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci

FROM node:18-alpine AS runner
EXPOSE 3000
WORKDIR /app

# Копируем все файлы, включая node_modules
COPY --from=builder /app /app
CMD ["npm", "start"]
