require('dotenv').config();
const express = require('express');
const { Etcd3 } = require('etcd3');
const path = require('path');
const  bodyParser = require('body-parser')
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 8080;

const etcd = new Etcd3({
    auth: {
        password: process.env.etc_pass,
        username: process.env.etc_user
    },
    hosts: process.env.etc_srv.split(',')
});

const dashpat = path.join(__dirname, '../dashboard/dist/dashboard');
console.log(dashpat);


app.get('/etcd/keys', async (req, res) => {
    const keys = await etcd.getAll().prefix("/").keys();
    keys.sort();
    res.send(keys);
});

app.get('/etcd/value', async (req, res) => {
    const key = req.query.key;
    // console.log(key);
    if(!key) {
        return res.send('[Invalid Key]');
    }

    const val = await etcd.get(key);
    res.send(val);
});

app.put('/etcd/keyvalue', async (req, res) => {
    console.log(`Pushing key: [${req.body.key}] => [${req.body.value}]`);
    const boh = await etcd.put(req.body.key).value(req.body.value);
    res.send(boh);
});

app.delete('/etcd/key', async (req, res) => {
    console.log(`Deleting key: [${req.query.key}]`);
    const boh = await etcd.delete().key(req.query.key).exec();
    res.send(boh);
});

// app.get('/', (req, res) => res.end('hello'));


app.use('/', express.static(dashpat));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

process.on('SIGINT', function() {
    process.exit();
});
