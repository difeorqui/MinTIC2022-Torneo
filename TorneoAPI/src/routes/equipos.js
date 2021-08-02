const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const {Equipo} = require('../bd');

router.get('/', async (req, res) => {
    try {
        const result = await Equipo.findAll({
            order: [['nombre','ASC']]
        });
        res.status(200).json(result);
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({errores: errors.array()});
        }

        const result = await Equipo.create(req.body);
        res.status(201).json(result);
    } catch (error) {
        return res.status(400).json(error);
    }
})

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Equipo.update(
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
        await Equipo.destroy({
                where: {id}
            });
        res.status(200).json(1);        
    } catch (error) {
        return res.status(400).json(error);
    }
})

module.exports = router;