### STAGE 1:BUILD ###
FROM node:current-alpine AS build-env

WORKDIR /dist/src/app

RUN npm cache clean --force
COPY . .

RUN npm install
RUN npm run build --prod

### STAGE 2:RUN ###
FROM nginx:latest AS run-env

COPY --from=build-env /dist/src/app/dist/camera-webpage /usr/share/nginx/html
COPY  nginx.conf  /etc/nginx/nginx.conf
COPY  default.conf  /etc/nginx/conf.d/default.conf

RUN mkdir -p /etc/nginx/cache

EXPOSE 80