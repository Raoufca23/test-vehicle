module.exports = (sequelize, Sequelize) => {
    const Vehicle = sequelize.define("vehicle", {
        name : {
            type : Sequelize.STRING
        },
        color: {
            type: Sequelize.STRING,
            allowNull : true
        }
    }, {
        timestamps : false
    });

    return Vehicle;
};