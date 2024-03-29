FROM node:20 AS nodeapp

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8080

FROM nginx:latest

COPY --from=nodeapp app/client /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]