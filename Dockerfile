# Build stage
FROM node:22 AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Bouw de Angular applicatie voor productie
RUN npm run build

# Run stage — serveer via nginx
FROM nginx:alpine

# Verwijder de standaard nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Voeg onze eigen nginx config toe
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Kopieer de Angular build output naar nginx
# Pas 'buffel-simulator' aan naar jouw project naam (staat in angular.json onder "outputPath")
COPY --from=build /app/dist/BuffelSimulatorFrontend/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
