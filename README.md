# etcd-web
A simple, minimal, ugly, with 0 features web interface for ETCD v3. It support clusters.

# Features
* List all your keys on the left
* show the value of a key on the right
* filter keys by `includes`

That's it. 

# Run
```
docker run--rm \
    -p 8080:8080 \
    -e etc_user=root \
    -e etc_pass=XXXXXXXX \
    -e etc_srv=https://srv1:17977,https://srv2:17977 \
    hakunacloud/etcd-web
``` 

Where the variables areL
* `etc_user` and `etc_pass` are the credentials for etcd
*  `etc_srv` a comma-separated list of nodes of your cluster