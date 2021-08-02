const { Usuario } = require('./usuarios');
const { Equipo } = require('./equipos');

module.exports = (sequelize, type) => {
    return sequelize.define('partido', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fecha: {
            type: type.DATEONLY,
            defaultValue: type.NOW
        },
        usuario: {
            // Llave foránea para Usuarios
            type: type.INTEGER,
            required: true,
            allowNull: false
        },
        local: {
            // Llave foránea para Equipos
            type: type.INTEGER,
            required: true,
            allowNull: false
        },
        visitante: {
            // Llave foránea para Equipos
            type: type.INTEGER,
            required: true,
            allowNull: false
        },
        goles_local: type.INTEGER,
        goles_visitante: type.INTEGER
    },{
        timestamps: false
    });
}