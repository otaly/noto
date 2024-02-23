FROM node:20.11.0 AS base
WORKDIR /app
COPY package*.json /app
RUN npm ci

FROM node:20.11.0 AS builder
WORKDIR /app
COPY . /app
COPY --from=base /app/node_modules /app/node_modules
RUN npm run build

FROM nginx:alpine AS runner
COPY --from=builder /app/build /usr/share/nginx/html