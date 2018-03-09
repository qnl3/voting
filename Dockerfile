FROM node:carbon

WORKDIR /srv/voting-server

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 8090

CMD ["npm", "start"]