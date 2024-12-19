
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
FROM node:18-alpine AS runner
EXPOSE 3000
CMD ["npm", "start"]
