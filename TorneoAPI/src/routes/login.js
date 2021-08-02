const { check, validationResult } = require('express-validator');
const {Usuario} = require('../bd');
const express = require('express');
const moment = require('moment');
const jwt = require('jwt-simple');
const router = express.Router();

const crearToken = (usuario) => {
    const obj = {
        usuarioId: usuario.id,
        usuarioNombre: usuario.nombre,
        createAt: moment().unix(),
        expiresIn: moment().add(3600,'seconds').unix()
        // expira: moment().add(1440,'minutes').unix()
    }
    return jwt.encode(obj, process.env.JWT);
}

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ where: { username } } );
        if (usuario) {
            const valido = (usuario.password == password);
            if(valido){
                res.status(200).json({ 
                    usuario: { id: usuario.id, nombre: usuario.nombre },
                    token: crearToken(usuario)
                });
            }
            else{
                res.status(401).json('La contraseña no es válida');
            }
        } else {
            res.status(401).json('Usuario y/o contraseña inválidos');
        }

    } catch (error) {
        return res.status(400).json(error);
    }
});

module.exports = router;