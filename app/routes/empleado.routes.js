module.exports = app => {
    const empleados = require("../controllers/empleado.controller.js");
    var router = require("express").Router();
    // Create a new Employee
    router.post("/create/", empleados.create);
    // Retrieve all Employee    
    router.get("/", empleados.findAll);
    // Retrieve all published Employee
    router.get("/status", empleados.findAllStatus);
    // Retrieve a single Employee with id
    router.get("/:id", empleados.findOne);
    // Update a Employee with id
    router.put("/update/:id", empleados.update);
    // Delete a Employee with id
    router.delete("/delete/:id", empleados.delete);
    // Delete all Employee
    router.delete("/", empleados.deleteAll);
    // Podemos utilizar como una ocpion app.use("EndPoint",router" para simplicar el URI
    // Ej.  http://localhost:Puerto/api/empleado/
    app.use("/api/employee", router);// EndPoint para el empleado
};