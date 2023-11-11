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
  } catch (err) {
    return next(err);
  }
};

module.exports = vehicleController;
