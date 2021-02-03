FROM node:12.18.1

WORKDIR /app
 
COPY package*.json /app/
#COPY package-lock.json package-lock.json

#RUN npm i npm@latest -g

RUN npm install --no-optional && npm cache clean --force
 
#RUN npm install
RUN npm install pm2

ENV PATH /app/node_modules/.bin:$PATH
ENV PATH /app/node_modules/pm2/bin:$PATH

COPY . .

#RUN npm install
#RUN npm install pm2

RUN pm2 start /app/server.js --name app

 
CMD [ "npm", "start" ]
