FROM node:20-alpine AS build

# Install dependencies and build the static site
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.27-alpine

# Copy the generated static assets into nginx's html directory
COPY --from=build /app/docs /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
