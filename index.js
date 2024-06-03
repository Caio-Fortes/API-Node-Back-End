const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes);

const conectionString = `mongodb+srv://caiofortes:APIHostNode@apicluster.hbe6ocj.mongodb.net/bancoApi?retryWrites=true&w=majority&appName=APICluster`

mongoose.connect(conectionString)
.then(() =>{
    app.listen(3000);
    console.log('Banco Conectado')
}).catch((err) =>{
    console.log(err)
});




