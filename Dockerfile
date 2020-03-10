FROM node:10-alpine as builder
RUN mkdir central-frontend
WORKDIR /central-frontend
COPY  . .
RUN npm rebuild node-sass
RUN npm run build:prod

FROM nginx:alpine
RUN mkdir /app
COPY --from=builder /central-frontend/dist /app
CMD ["nginx", "-g", "daemon off;"]
