FROM nromero125/dokku-php7.3
COPY nginx/default /etc/nginx/sites-available
COPY . /app
RUN npm install
RUN npm install -g pm2
RUN pm2 start app.js
CMD ["/run.sh"]
