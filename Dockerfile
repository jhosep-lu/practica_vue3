# Imagen base
FROM node:14.17-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar los archivos del proyecto
COPY . .

# Instalar dependencias
RUN npm install

# Compilar el proyecto
RUN npm run build

# Exponer el puerto del servidor web
EXPOSE 9090

# Comando para iniciar el servidor web
CMD ["npm", "run", "serve"]
