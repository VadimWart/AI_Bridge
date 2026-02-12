# Basis Image with Node.js 20
FROM node:20-alpine

WORKDIR /app

# Dependencies install
COPY package.json package-lock.json ./
RUN npm ci

# Quellcode copy
COPY . .

# Next.js App build
RUN npm run build

# Port open
EXPOSE 3000

# App start
CMD ["npm", "start"]
