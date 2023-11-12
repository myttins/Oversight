const db = require('../models');
const query = require('../query');

const peopleController = {};

peopleController.getDriversWithVehicleId = async (req, res, next) => {
  try {
    const queryStr = query.getDriversWithVehicleId(req.params.id);
    const data = await db.query(queryStr);
    res.locals.drivers = data.rows;
    return next();
  } catch (err) {
    return next({
      message: 'Error in peopleController.getDriversWithVehicleId',
      error: err
    });
  }
};

peopleController.getOwnerWithVehicleId = async (req, res, next) => {
  try {
    const queryStr = query.getOwnerWithVehicleId(req.params.id)
    const data = await db.query(queryStr);
    res.locals.owner = data.rows;
    return next();
  } catch (err) {
    return next({
      message: 'Error in peopleController.getOwnerWithVehicleId',
      error: err
    });
  }
}

module.exports = peopleController;
