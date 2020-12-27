FROM mhart/alpine-node:14

WORKDIR /home

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]

