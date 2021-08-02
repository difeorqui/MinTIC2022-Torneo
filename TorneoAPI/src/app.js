const routes = require('./routes');
const express = require('express');
const validarToken = require('./middlewares/validarToken')
const cors = require('cors');
const app = express();
require('dotenv').config();
require('./bd');

app.set('port', process.env.PORT || 4000);

app.use(express.json());
app.use(cors());

// Rutas
app.use('/api/equipo', validarToken, routes.equipoRoutes);
app.use('/api/partido', validarToken, routes.partidosRoutes);
app.use('/api/usuario',routes.usuarioRoutes);
app.use('/api/login',routes.loginRoutes);

app.listen(app.get('port'), () => {
    console.log("Servidor activo en el puerto "+ app.get('port'));
})