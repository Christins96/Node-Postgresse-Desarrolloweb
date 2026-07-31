module.exports = app => {
    const proveedores = require("../controllers/proveedor.controller.js");
    var router = require("express").Router();
    // Create a new Proveedor
    router.post("/create/", proveedores.create);
    // Retrieve all Proveedor    
    router.get("/", proveedores.findAll);
    // Retrieve all published Proveedor
    router.get("/status", proveedores.findAllStatus);
    // Retrieve a single Proveedor with id
    router.get("/:id", proveedores.findOne);
    // Update a Proveedor with id
    router.put("/update/:id", proveedores.update);
    // Delete a Proveedor with id
    router.delete("/delete/:id", proveedores.delete);
    // Delete all Proveedor
    router.delete("/", proveedores.deleteAll);
    // Podemos utilizar como una ocpion app.use("EndPoint",router" para simplicar el URI
    // Ej.  http://localhost:Puerto/api/proveedor/
    app.use("/api/proveedor", router);// EndPoint para el proveedor
};