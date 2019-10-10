FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . . 
EXPOSE 8000
# RUN pm2 start app.js
CMD ["npm", "run", "dev"]
