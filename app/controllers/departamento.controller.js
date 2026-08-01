// importamos db los modelos en este caso si tenemos uno o mas, se puede referenciar db."nombreModelo".   
const db = require("../models");
const Departamento = db.departamentos;
const Op = db.Sequelize.Op;

// Create and Save a new Department
exports.create = (req, res) => {
    // Validamos que dentro del  request no venga vacio el nombre, de lo contrario returna error
    if (!req.body.nombre) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Department, definiendo una variable con la estructura del reques para luego solo ser enviada como parametro mas adelante. 
    const departamento = {
        nombre: req.body.nombre,
        Ubicacion: req.body.Ubicacion,
        status: req.body.status ? req.body.status : false,
        ingreso: req.body.ingreso,
        // utilizando ? nos ayuda a indicar que el paramatro puede ser opcional dado que si no viene, le podemos asignar un valor default
        status: req.body.status ? req.body.status : false
    };

    // Save a new Department into the database
    Departamento.create(departamento)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Department."
            });
        });
};

// Retrieve all Department from the database.
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;// obtenemos el parametro que nos llega por query, en este caso nombre
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Departamento.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving departments."
            });
        });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Departamento.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Department with id=" + id
            });
        });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Departamento.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Department was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Department with id=${id}. Maybe Department was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Department with id=" + id
            });
        });
};

// Delete a Department with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    // utilizamos el metodo destroy para eliminar el objeto mandamos la condicionante where id = parametro que recibimos 
    Departamento.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Department was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Department with id=${id}. The department was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Department with id=" + id
            });
        });
};

// Delete all Departments from the database.
exports.deleteAll = (req, res) => {
    Departamento.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Departments were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all departments."
            });
        });
};

// find all active Department, basado en el atributo status vamos a buscar que solo los departamentos activos
exports.findAllStatus = (req, res) => {
    Departamento.findAll({ where: { status: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Department."
            });
        }); 
};