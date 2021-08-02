module.exports = (sequelize, type) => {
    const Usuario = sequelize.define('usuario', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: type.STRING,
        correo: {
            type: type.STRING,
            allowNull: false,
            unique: true
        },
        username: {
            type: type.STRING,
            allowNull: false,
            unique: true
        },
        password: type.STRING
    },{
        timestamps: false
    });

    Usuario.associate = function(models) {
        Usuario.hasMany(models.Partido, { foreingKey: 'usuario', sourceKey: 'id' });
    };

    return Usuario;
}