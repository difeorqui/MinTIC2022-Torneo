require('dotenv').config();
const jwt = require('jwt-simple');
const moment = require('moment');

const validarToken = (req, res, next) => {
    if(!req.headers['torneo-token']){
        return res.status(401).json({ error: 'No se ha enviado el token' });
    }
    const token = req.headers['torneo-token'];
    let objToken = {};

    try {
        objToken = jwt.decode(token, process.env.JWT);
    } catch (error) {
        return res.status(401).json({ error: 'El token no es válido' });
    }

    if(objToken.expira < moment().unix()){
        return res.status(401).json({ error: 'El token expiró' });
    }

    req.nombre = objToken.usuarioNombre;

    next();
}

module.exports = validarToken;