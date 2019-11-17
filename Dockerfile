FROM node:10.17.0-jessie

WORKDIR /opt/etcd-web
COPY server /opt/etcd-web/server
COPY dashboard /opt/etcd-web/dashboard

RUN /opt/etcd-web/server && npm install
RUN cd /opt/etcd-web/dashboard && npm install && ng build --prod

EXPOSE 80
COPY ./docker-entrypoint.sh /
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["start"]
