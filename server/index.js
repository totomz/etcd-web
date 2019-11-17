require('dotenv').config();
const express = require('express');
const { Etcd3 } = require('etcd3');
const path = require('path');

const cors = require('cors');

const app = express();
app.use(cors());

const port = 3000;

const etcd = new Etcd3({
    auth: {
        password: process.env.etc_pass,
        username: process.env.etc_user
    },
    hosts: process.env.etc_srv.split(',')
});

console.log(path.join(__dirname, '../dashboard/dist/dashboard'));


app.get('/etcd/keys', async (req, res) => {
    const keys = await etcd.getAll().prefix("/").keys();
    keys.sort();
    res.send(keys);
});

app.get('/etcd/value', async (req, res) => {
    const key = req.query.key;
    console.log(key);
    if(!key) {
        return res.send('[Invalid Key]');
    }

    const val = await etcd.get(key);
    res.send(val);
});

app.use('/', express.static(path.join(__dirname, '../dashboard/dist/dashboard')));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

