FROM node:10.17.0-jessie

WORKDIR /opt/etcd-web
COPY server /opt/etcd-web/server
COPY dashboard /opt/etcd-web/dashboard

RUN cd /opt/etcd-web/server && npm install
RUN cd /opt/etcd-web/dashboard && npm install && ./node_modules/@angular/cli/bin/ng build --prod

EXPOSE 8080
COPY ./docker-entrypoint.sh /
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["start"]
