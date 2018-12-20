FROM node:10.10.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install --silent

RUN npm install bcrypt

EXPOSE 8000

CMD ["npm", "start"]