//Utilizamos module.export para exportar objetos para que puedan ser utilizados en otras clases
module.exports = (sequelize, Sequelize) => {
// usamos el sequelize.defina para "definir" el nombre de la entity en la BD, en este caso "cliente"
// Usamos type.Sequelize para definir el tipo de datos de cada atributo de la entidad 
    const Empleado = sequelize.define("empleado", {
        nombre: {
            type: Sequelize.STRING
        },
        apellido: {
            type: Sequelize.STRING
        },
        direccion: {
            type: Sequelize.STRING
        },
        correo: {
            type: Sequelize.STRING
        },
        
        telefono: {
            type: Sequelize.STRING
        },
        ingreso:{
            type: Sequelize.DATE
        },
        departamento: {
            type: Sequelize.STRING
        },
        sueldo: {
            type: Sequelize.FLOAT
        },
        status: {
            type: Sequelize.BOOLEAN
        }
    });
    return Empleado;
};