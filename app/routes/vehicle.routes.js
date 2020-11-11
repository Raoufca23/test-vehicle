module.exports = app => {
    const Vehicle = require("../controllers/vehicle.controller.js");
  
    var router = require("express").Router();
  
    // Create a new vehicle
    router.post("/vehicle", Vehicle.create);
  
    // Retrieve all vehicles
    router.get("/vehicles", Vehicle.findAll);

    // Retrieve a single vehicle with id
    router.get("/vehicle/:id", Vehicle.findOne);
    
    // Update a vehicle with id
    router.put("/vehicle/:id", Vehicle.update);
  
    // Delete a vehicle with id
    router.delete("/vehicle/:id", Vehicle.delete);
  
    // Delete all vehicles
    router.delete("/vehicles", Vehicle.deleteAll);
  
    app.use('/api', router);
  };