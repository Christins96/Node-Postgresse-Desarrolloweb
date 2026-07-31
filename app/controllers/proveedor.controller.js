// importamos db los modelos en este caso si tenemos uno o mas, se puede referenciar db."nombreModelo".   
const db = require("../models");
const Proveedor = db.proveedores;
const Op = db.Sequelize.Op;

// Create and Save a new Proveedor
exports.create = (req, res) => {
    // Validamos que dentro del  request no venga vacio el nombre, de lo contrario returna error
    if (!req.body.nombre) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Proveedor, definiendo una variable con la estructura del reques para luego solo ser enviada como parametro mas adelante. 
    const proveedor = {
        nombre: req.body.nombre,
        direccion: req.body.direccion, 
        correo: req.body.correo,
        telefono: req.body.telefono,
        ingreso: req.body.ingreso,
        contacto: req.body.contacto,
        formadepago: req.body.formadepago,
        tipoproducto: req.body.tipoproducto,
        // utilizando ? nos ayuda a indicar que el paramatro puede ser opcional dado que si no viene, le podemos asignar un valor default
        status: req.body.status ? req.body.status : false
    };

    // Save a new Proveedor into the database
    Proveedor.create(proveedor)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Proveedor."
            });
        });
};

// Retrieve all Proveedor from the database.
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;// obtenemos el parametro que nos llega por query, en este caso nombre
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Proveedor.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving proveedores."
            });
        });
};

// Find a single Proveedor with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Proveedor.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Proveedor with id=" + id
            });
        });
};

// Update a Proveedor by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Proveedor.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Proveedor was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Proveedor with id=${id}. Maybe Proveedor was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Proveedor with id=" + id
            });
        });
};

// Delete a Proveedor with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    // utilizamos el metodo destroy para eliminar el objeto mandamos la condicionante where id = parametro que recibimos 
    Proveedor.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Proveedor was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Proveedor with id=${id}. The proveedor was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Proveedor with id=" + id
            });
        });
};

// Delete all Proveedores from the database.
exports.deleteAll = (req, res) => {
    Proveedor.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Proveedores were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all proveedores."
            });
        });
};

// find all active Proveedor, basado en el atributo status vamos a buscar que solo los proveedores activos
exports.findAllStatus = (req, res) => {
    Proveedor.findAll({ where: { status: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Proveedor."
            });
        }); 
};