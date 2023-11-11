const db = require('../models');
const query = require('../query');

const userController = {};

userController.getDriversWithVehicleId = async (req, res, next) => {
  try {
    const queryStr = query.getDriversWithVehicleId(req.params.id);
    const data = await db.query(queryStr);
    res.locals.drivers = data.rows;
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = userController;
