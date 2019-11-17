#!/bin/bash
set -e

if [[ "$1" = 'start' ]]; then
    exec node /opt/etcd-web/server/index.js
else
    exec "$@"
fi