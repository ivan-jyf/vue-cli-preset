# Builds a Docker to deliver dist/
FROM nginx:latest

ADD ./dist /usr/share/nginx/html
ADD start-nginx.sh /

#change nginx config file
ADD default.conf /etc/nginx/conf.d/default.conf

RUN ln -sf /dev/stdout /var/log/nginx/access.log \
	&& ln -sf /dev/stderr /var/log/nginx/error.log \
	&& chmod +x start-nginx.sh

EXPOSE 80
ENTRYPOINT ["/bin/bash", "/start-nginx.sh"]

