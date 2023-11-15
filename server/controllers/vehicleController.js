const db = require('../models');
const query = require('../query');

const vehicleController = {};

vehicleController.getVehicleInfoWithId = async (req, res, next) => {
  try {
    const queryStr = query.getVehicleInfoWithId(req.params.id);
    const data = await db.query(queryStr);
    if (data.rows.length === 0) {
      return res.sendStatus(404);
    }
    res.locals.vehicle = data.rows[0];
    return next();
  } catch (error) {
    return next({
      location: 'Error located in vehicleController.getVehicleInfoWithId',
      error,
    });
  }
};

vehicleController.updateVehicleInfoWithId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const queryStr = query.updateVehicleInfoWithId(id, req.body);
    const data = await db.query(queryStr);
    return next();
  } catch (error) {
    return next({
      location: 'Error located in vehicleController.updateVehicleInfoWithId',
      error,
    });
  }
};

module.exports = vehicleController;
