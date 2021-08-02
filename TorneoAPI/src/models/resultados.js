module.exports = (sequelize, type) => {
    return sequelize.define('v_resultado', {
        id: {
            type: type.INTEGER,
            primaryKey: true
        },
        fecha: type.DATEONLY,
        idPartido: type.INTEGER,
        usuario: type.STRING,
        local: type.STRING,
        goles_local: type.INTEGER,
        visitante: type.STRING,
        goles_visitante: type.INTEGER
    },{
        timestamps: false
    });
}