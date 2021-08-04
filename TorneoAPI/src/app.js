const routes = require('./routes');
const express = require('express');
const validarToken = require('./middlewares/validarToken')
const cors = require('cors');
const app = express();
require('dotenv').config();
require('./bd');

app.set('port', process.env.PORT || 4000);
app.use(cors());
app.use(express.json());
app.all('*', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type,Accept, Authortization');  
    res.setHeader('Acces-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE');
    next();
});


// Rutas
app.use('/api/equipo', validarToken, routes.equipoRoutes);
app.use('/api/partido', validarToken, routes.partidosRoutes);
app.use('/api/usuario',routes.usuarioRoutes);
app.use('/api/login',routes.loginRoutes);

app.listen(app.get('port'), () => {
    console.log("Servidor activo en el puerto "+ app.get('port'));
})