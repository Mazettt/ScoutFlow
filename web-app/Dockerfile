FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json .

RUN npm install

ARG REACT_APP_API_PUBLIC_BASEURL

ENV REACT_APP_API_PUBLIC_BASEURL $REACT_APP_API_PUBLIC_BASEURL

COPY . .

RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app

COPY --from=builder /app/build .

ENV NODE_ENV=production

EXPOSE 80

RUN npm install -g serve

CMD ["serve", "-s", ".", "-l", "80"]

# FROM nginx:1.27.1-alpine
# WORKDIR /usr/share/nginx/html
# RUN rm -rf ./*
# COPY --from=builder /app/build .
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
