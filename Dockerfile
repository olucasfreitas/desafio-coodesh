FROM node:latest as build
WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN npm install
RUN npm run build
FROM nginx:latest
VOLUME /var/cache/nginx
COPY --from=build /usr/local/app/dist/desafio-coodesh /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# docker build -t desafio-coodesh .
# docker run -p 8081:80 desafio-coodesh
