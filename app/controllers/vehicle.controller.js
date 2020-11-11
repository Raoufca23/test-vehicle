const db = require('../models')
const Vehicle = db.vehicles;
const Op = db.Sequelize.Op;

// Create and Save a new vehicle
exports.create = (req, res) => {
    // validate request
    if(!req.body.name) {
        res.status(400).send({
            message : "You must provide a content!"
        });
        return ;
    }

    //create vehicle
    const vehicle = {
        name : req.body.name,
        color : req.body.color
    }

    //save vehicle in db
    Vehicle.create(vehicle)
        .then(data => {
            console.log(data)
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message :
                    err.message || "Error occurred"
            });
        });
};

// Retrieve all vehicles from the database.
exports.findAll = (req, res) => {
    
    Vehicle.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error occurred"
      });
    });
};

// Find a single vehicle with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
   
    Vehicle.findByPk(id)
    .then(data => {
      if(data === null) {
        res.status(400).send({
          message: "Data does not exists !"
        })
      }
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error occurred." + id
      });
    });
};

// Update a vehicle by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Vehicle.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "vehicle was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update vehicle with id=${id}. Maybe vehicle was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating vehicle with id=" + id
        });
      });
};

// Delete a vehicle with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Vehicle.destroy({
      where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
            message: "Vehicle was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete vehicle with id=${id}. Maybe vehicle was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
          message: err.message || "Could not delete vehicle with id=" + id
        });
    });
};

// Delete all vehicles from the database.
exports.deleteAll = (req, res) => {
    Vehicle.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} vehicles were deleted successfully!` });
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while removing all vehicles."
        });
    })
};