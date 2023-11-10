const db = require('../models');

const userController = {};

userController.getDriversUsingVehicleId = async (req, res, next) => {
  const vehicleId = req.params.id;

  const queryStr = `
  SELECT 
    u.name,
    u.
  FROM users u
  JOIN vehicle_driver vd ON u.id = vd.user_id
  WHERE vd.vehicle_id = ${vehicleId}`

  const data = await db.query(queryStr)
  console.log(data)

  return next();
};

module.exports = userController;
