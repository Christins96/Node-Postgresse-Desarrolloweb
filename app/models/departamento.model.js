//Utilizamos module.export para exportar objetos para que puedan ser utilizados en otras clases
module.exports = (sequelize, Sequelize) => {
// usamos el sequelize.defina para "definir" el nombre de la entity en la BD, en este caso "departamento"
// Usamos type.Sequelize para definir el tipo de datos de cada atributo de la entidad 
    const Departamento = sequelize.define("departamento", {
        nombre: {
            type: Sequelize.STRING
        },
        Ubicacion: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.BOOLEAN
        }
    });
    return Departamento;
};