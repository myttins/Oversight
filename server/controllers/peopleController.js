const db = require('../models');
const query = require('../query');

const peopleController = {};

peopleController.getDriversWithVehicleId = async (req, res, next) => {
  try {
    const queryStr = query.getDriversWithVehicleId(req.params.id);
    const data = await db.query(queryStr);
    res.locals.drivers = data.rows;
    return next();
  } catch (error) {
    return next({
      location: 'Error located in peopleController.getDriversWithVehicleId',
      error,
    });
  }
};

peopleController.getOwnerWithVehicleId = async (req, res, next) => {
  try {
    const queryStr = query.getOwnerWithVehicleId(req.params.id);
    const data = await db.query(queryStr);
    res.locals.owner = data.rows;
    return next();
  } catch (error) {
    return next({
      location: 'Error located in peopleController.getOwnerWithVehicleId',
      error,
    });
  }
};

peopleController.deletePersonWithVehicleId = async (req, res, next) => {
  try {
    const { type, id } = req.query;

    const queryStr = query.deletePersonWithVehicleId(type, id);
    const data = await db.query(queryStr);
    return next();
  } catch (error) {
    return next({
      location: 'Error located in peopleController.deleteDriverWithVehicleId',
      error,
    });
  }
};

module.exports = peopleController;
