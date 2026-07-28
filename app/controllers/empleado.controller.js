// importamos db los modelos en este caso si tenemos uno o mas, se puede referenciar db."nombreModelo".   
const db = require("../models");
const Empleado = db.empleados;
const Op = db.Sequelize.Op;

// Create and Save a new Employee
exports.create = (req, res) => {
    // Validamos que dentro del  request no venga vacio el nombre, de lo contrario returna error
    if (!req.body.nombre) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Employee, definiendo una variable con la estructura del reques para luego solo ser enviada como parametro mas adelante. 
    const empleado = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion, 
        correo: req.body.correo,
        telefono: req.body.telefono,
        ingreso: req.body.ingreso,
        departamento: req.body.departamento,
        sueldo: req.body.sueldo,    
        // utilizando ? nos ayuda a indicar que el paramatro puede ser opcional dado que si no viene, le podemos asignar un valor default
        status: req.body.status ? req.body.status : false
    };

    // Save a new Employee into the database
    Empleado.create(empleado)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Employee."
            });
        });
};

// Retrieve all Employee from the database.
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;// obtenemos el parametro que nos llega por query, en este caso nombre
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Empleado.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving employees."
            });
        });
};

// Find a single Employee with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Empleado.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Employee with id=" + id
            });
        });
};

// Update a Employee by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Empleado.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Employee was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Employee with id=${id}. Maybe Employee was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Employee with id=" + id
            });
        });
};

// Delete a Employee with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    // utilizamos el metodo destroy para eliminar el objeto mandamos la condicionante where id = parametro que recibimos 
    Empleado.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Employee was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Employee with id=${id}. The employee was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Employee with id=" + id
            });
        });
};

// Delete all Employees from the database.
exports.deleteAll = (req, res) => {
    Empleado.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Employees were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all employees."
            });
        });
};

// find all active Employee, basado en el atributo status vamos a buscar que solo los empleados activos
exports.findAllStatus = (req, res) => {
    Empleado.findAll({ where: { status: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Employee."
            });
        }); 
};