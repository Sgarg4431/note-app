FROM node:18
WORKDIR /src/app
COPY . .
RUN npm install
CMD ["node","src/app.js"]

