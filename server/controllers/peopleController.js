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

peopleController.addDriverWithVehicleId = async (req, res, next) => {
  const personId = req.query.personid;
  const vehicleId = req.query.vehicleid;

  try {
    const queryStr = query.addDriverToVehicle(personId, vehicleId);
    const data = await db.query(queryStr);
    return next();
  } catch (error) {
    return next({
      location: 'Error located in peopleController.addDriverWithVehicleId',
      error,
    });
  }
};

peopleController.addPersonWithVehicleId = async (req, res, next) => {
  try {
    const { type, personid, vehicleid } = req.query;
  } catch (error) {
    return next({
      location: 'Error located in peopleController.addPersonWithVehicleId',
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
      location: 'Error located in peopleController.deleteDriverWithVehicleId',
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
