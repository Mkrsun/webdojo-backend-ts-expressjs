# Usa una imagen base oficial de Node.js
FROM node:lts-alpine

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Instala nodemon y ts-node globalmente para el hot-reloading
RUN npm install -g nodemon ts-node

# Copia el resto de los archivos de la aplicación al contenedor
COPY . .

# Expone el puerto en el que la aplicación correrá
EXPOSE 3737

# Define la variable de entorno para el puerto
ENV PORT=3737

# Comando por defecto para correr la aplicación en modo desarrollo
CMD ["nodemon", "--watch", "src", "--ext", "ts,js", "--exec", "ts-node", "src/server.ts"]
