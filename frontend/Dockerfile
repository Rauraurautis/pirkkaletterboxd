FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=5173

ENV NODE_ENV=development

EXPOSE 5000

CMD ["npm", "run", "dev"]