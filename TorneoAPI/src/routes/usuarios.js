const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const {Usuario} = require('../bd');

router.get('/', async (req, res) => {
    try {
        const result = await Usuario.findAll();
        res.status(200).json(result);
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('username','El usuario es obligatorio').not().isEmpty(),
    check('correo','El correo es obligatorio').not().isEmpty(),
    check('correo','El correo no es válido').isEmail(),
    check('password','La contraseña no peude ser vacía').not().isEmpty()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({errores: errors.array()});
        }
        const result = await Usuario.create(req.body);
        res.status(201).json(result);
    } catch (error) {
        return res.status(400).json(error);
    }
})

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Usuario.update(
            req.status(200).body,{
                where: {id}
            });
        res.json(1);
    } catch (error) {
        return res.status(400).json(error);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Usuario.destroy({
                where: {id}
            });
        res.status(200).json(1);        
    } catch (error) {
        return res.status(400).json(error);
    }
})

module.exports = router;