const Sequelize = require('sequelize');
const modelUsuario = require('./models/usuarios');
const modelEquipo = require('./models/equipos');
const modelPartido = require('./models/partidos');
const modelVistaResultados = require('./models/resultados');

const sequelize = new Sequelize (process.env.BD_NAME, process.env.USER, process.env.PASS, {
    host: process.env.BD_CNN,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        require: 30000,
        idle: 10000
    },
    logging: false
})

const Usuario = modelUsuario(sequelize, Sequelize);
const Equipo = modelEquipo(sequelize, Sequelize);
const Partido = modelPartido(sequelize, Sequelize);
const VistaResultados = modelVistaResultados(sequelize, Sequelize);

sequelize.sync({ force: false})
    .then(() => {
        console.log('usuario sincronizado')
    })

module.exports = {
    Usuario,
    Equipo,
    Partido,
    VistaResultados
};