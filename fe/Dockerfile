FROM node:16.16.0-alpine3.15 AS development

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/fe

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

CMD ["sh","-c","yarn run dev"]

# @TODO 
FROM node:16.16.0-alpine3.15 as preProduction

WORKDIR /usr/src/app/client

COPY --from=development /usr/src/app/client .
# Note: `start:dev` could be changed not to emit output
# or to be more verbous or ecc..
# The `build` command is intended
# to output a production ready build. 
CMD ["sh","-c","yarn run build"]

FROM node:16.16.0-alpine3.15 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app/client

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --only=production

COPY . .

COPY --from=preProduction /usr/src/app/client/dist ./dist

CMD ["sh","-c","yarn run start:prod"]