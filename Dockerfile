FROM node:22
WORKDIR /app
COPY . .
RUN npm ci 
RUN npm run build
RUN npx prisma generate
CMD ["npm", "run", "start:prod"]
EXPOSE 3000