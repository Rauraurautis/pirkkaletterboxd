FROM node:20 AS nodeapp

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8080

FROM nginx:latest

COPY --from=nodeapp app/client /var/www/pirkkaletterboxd/client

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]