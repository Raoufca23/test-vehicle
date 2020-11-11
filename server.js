require('dotenv').config()
const express = require('express')
const bodyParser = require("body-parser");
const app = express()

const PORT = process.env.PORT

// adding middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// synchronisation des models
const models = require("./app/models");
models.sequelize.sync();

// main route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application." });
});

// adding routes
require("./app/routes/vehicle.routes")(app);

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
})