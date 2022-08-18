const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.get('/', (req,res) => {
    res.send('hello node')
})

const port = 4000;
app.listen(port, () => {
    console.log('서버켜짐')
})