const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes);

const conectionString = `mongodb+srv://caiofortes:APIHostNode@apicluster.hbe6ocj.mongodb.net/bancoApi?retryWrites=true&w=majority&appName=APICluster`

app.get('/', (req, res) => {
    res.send('teste')
})

mongoose.connect(conectionString)
.then(() =>{
    app.listen(port, () => {console.info('Aplicação rodando')})
}).catch((err) =>{
    console.log(err)
});


