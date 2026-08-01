module.exports = app => {
    const departamentos = require("../controllers/departamento.controller.js");
    var router = require("express").Router();
    // Create a new Department
    router.post("/create/", departamentos.create);
    // Retrieve all Department
    router.get("/", departamentos.findAll);
    // Retrieve all published Department
    router.get("/status", departamentos.findAllStatus);
    // Retrieve a single Department with id
    router.get("/:id", departamentos.findOne);
    // Update a Department with id
    router.put("/update/:id", departamentos.update);
    // Delete a Department with id
    router.delete("/delete/:id", departamentos.delete);
    // Delete all Department
    router.delete("/", departamentos.deleteAll);
    // Podemos utilizar como una ocpion app.use("EndPoint",router" para simplicar el URI
    // Ej.  http://localhost:Puerto/api/departamento/
    app.use("/api/departamento", router);// EndPoint para el departamento
};