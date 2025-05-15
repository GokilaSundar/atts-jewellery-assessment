FROM node:20-alpine AS base

FROM base AS build

WORKDIR /app

COPY ./client/package.json ./client/package-lock.json ./
RUN npm install

COPY ./client ./
RUN npm run build

FROM base AS final

WORKDIR /app

COPY ./server/package.json ./server/package-lock.json ./
RUN npm install --only=production

COPY ./server ./

COPY --from=build /app/dist ./public

CMD ["npm", "start"]