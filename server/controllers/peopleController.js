const db = require('../models');
const query = require('../query');

const peopleController = {};

peopleController.getDriversWithVehicleId = async (req, res, next) => {
  try {
    const queryStr = query.select.driverInfoWithVehicleId(req.params.id);
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
    const queryStr = query.select.ownerInfoWithVehicleId(req.params.id);
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

peopleController.addPerson = async (req, res, next) => {
  const person = req.body;
  if (req.query.input === 'true') return next();
  try {
    const queryStr = query.addPerson(person);
    const data = await db.query(queryStr);
    return next();
  } catch (error) {
    return next({
      location: 'Error located in peopleController.addPerson',
      error,
    });
  }
};

peopleController.addPersonToVehicle = async (req, res, next) => {
  const personId = req.query.personid;
  const vehicleId = req.query.vehicleid;
  const type = req.query.type;
  try {
    const queryStr = query.addPersonToVehicle(type, personId, vehicleId);
    const data = await db.query(queryStr);
    return next();
  } catch (error) {
    return next({
      location: 'Error located in peopleController.addPersonToVehicle',
      error,
    });
  }
};

peopleController.deletePersonWithVehicleId = async (req, res, next) => {
  try {
    const { type, personid, vehicleid } = req.query;

    const queryStr = query.deletePersonWithVehicleId(type, personid, vehicleid);
    const data = await db.query(queryStr);
    return next();
  } catch (error) {
    return next({
      location: 'Error located in peopleController.deletePersonWithVehicleId',
      error,
    });
  }
};

peopleController.getPerson = async (req, res, next) => {
  const { id } = req.params;
  try {
    const queryStr = query.getPerson(id);
    const data = await db.query(queryStr);
    res.locals.person = data.rows;
    return next();
  } catch (error) {
    return next({
      location: 'Error located in peopleController.getPerson',
      error,
    });
  }
};

peopleController.updatePerson = async (req, res, next) => {
  const { id } = req.params;
  try {
    const queryStr = query.updatePerson(id, req.body);
    const data = await db.query(queryStr);
    return next();
  } catch (error) {
    return next({
      location: 'Error located in peopleController.updatePerson',
      error,
    });
  }
};

module.exports = peopleController;
