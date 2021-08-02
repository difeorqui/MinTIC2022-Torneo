module.exports = (sequelize, type) => {
    const Equipo = sequelize.define('equipo', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: type.STRING,
            allowNull: false,
            unique: true
        }
    },{
        timestamps: false
    });

    Equipo.associate = function(models) {
        Equipo.hasMany(models.Partido, { foreingKey: 'local', sourceKey: 'id' });
        Equipo.hasMany(models.Partido, { foreingKey: 'visitante', sourceKey: 'id' });
    };

    return Equipo;
}