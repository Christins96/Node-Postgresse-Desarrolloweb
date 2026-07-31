//Utilizamos module.export para exportar objetos para que puedan ser utilizados en otras clases
module.exports = (sequelize, Sequelize) => {
// usamos el sequelize.defina para "definir" el nombre de la entity en la BD, en este caso "proveedor"
// Usamos type.Sequelize para definir el tipo de datos de cada atributo de la entidad 
    const Proveedor = sequelize.define("proveedor", {
        nombre: {
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
        contacto: {
            type: Sequelize.STRING
        },
        formadepago: {
            type: Sequelize.STRING
        },
        tipoproducto: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.BOOLEAN
        }
    });
    return Proveedor;
};