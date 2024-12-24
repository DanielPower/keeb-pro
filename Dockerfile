FROM nginxinc/nginx-unprivileged:latest
COPY ./public /usr/share/nginx/html
