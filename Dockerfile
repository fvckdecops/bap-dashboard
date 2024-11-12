FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
COPY .env ./
COPY json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 1337
ENV TZ=Asia/Jakarta
CMD ["npm", "start"]