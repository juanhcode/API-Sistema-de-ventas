const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const morgan = require('morgan');

//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//Routes
app.get('/',(req, res) =>{
    res.send('<h1>Hola mundo</h1>');
})

app.use('/api/',require('./routes/productos'));
app.use('/api/',require('./routes/sedes'));

//Puerto
app.set('port',process.env.PORT);
app.listen(app.get('port'),()=>{
    console.log('Servidor corriendo en' + app.get('port'))
});
