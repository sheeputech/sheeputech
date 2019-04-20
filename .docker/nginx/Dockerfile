FROM nginx:1.15

COPY frontend.conf /etc/nginx/conf.d/default.conf

WORKDIR /var/www/frontend

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]