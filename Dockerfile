FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.21

COPY --from=0 /app/dist /usr/share/nginx/html
