FROM postgres:10.5

ADD ./init /docker-entrypoint-initdb.d/
COPY bindazboyappdb.tar /

FROM node:20 as development

WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:20 as production
ARG NODE_ENV=production
ENV NODE_ENV={NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json .
COPY tsconfig*.json .
RUN npm ci --only=production

COPY --from=development /usr/src/app/public ./public
ENV PORT 8383
# ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.8.0/wait /wait
# RUN chmod +x /wait
EXPOSE ${PORT}
# CMD [ "/wait && ", "node", "public/app.js", ]
CMD [ "node", "public/app.js", ]


