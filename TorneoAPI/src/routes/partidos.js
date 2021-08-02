const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const {Partido, VistaResultados} = require('../bd');

router.get('/resultado', async (req, res) => {
    try {
        const result = await VistaResultados.findAll();
        res.status(200).json(result);
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const result = await Partido.findAll();
        res.status(200).json(result);
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Partido.findByPk(id);
        res.status(200).json(result);
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.post('/', [
    check('usuario','El usuario es obligatorio').not().isEmpty(),
    check('local','El equipo local es obligatorio').not().isEmpty(),
    check('visitante','El equipo visitante es obligatorio').not().isEmpty()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({errores: errors.array()});
        }

        const result = await Partido.create(req.body);
        res.status(201).json(result);
    } catch (error) {
        return res.status(400).json(error);
    }
})

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Partido.update(
            req.body,{
                where: {id}
            });
        res.status(200).json(1);
    } catch (error) {
        return res.status(400).json(error);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Partido.destroy({
                where: {id}
            });
        res.status(200).json(1);        
    } catch (error) {
        return res.status(400).json(error);
    }
})

module.exports = router;