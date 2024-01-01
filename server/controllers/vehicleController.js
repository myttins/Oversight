const db = require('../models');
const query = require('../query');

const vehicleController = {
  getVehicleHeader: async (req, res, next) => {
    const { id } = req.params;
    try {
      const queryStr = query.select.vehicleHeaderInfoWithId(id);
      const data = await db.query(queryStr);
      if (data.rows.length === 0) {
        return res.status(404).json({ message: 'Vehicle not found.' });
      }
      res.locals.data = data.rows[0];
      return next();
    } catch (error) {
      return next({
        location: 'Error located in vehicleController.getVehicleHeader',
        error,
      });
    }
  },
  addVehicle: async (req, res, next) => {
    try {
      // check if plate exists already
      let queryStr = query.select.vehicleInfoWithPlate(req.body.plate);
      let data = await db.query(queryStr);
      if (data.rows.length > 0) {
        return res.status(500).json({ message: 'Vehicle already exists' });
      }
      queryStr = query.insert.newVehicle(req.body);
      data = await db.query(queryStr);
      res.locals.vehicleId = data.rows[0].id;
      return next();
    } catch (error) {
      return next({
        location: 'Error located in vehicleController.addVehicle',
        error,
      });
    }
  },
  addFileToVehicle: async (req, res, next) => {
    const { id } = req.params;
    const { label, category } = req.body;
    const { filePath, fileName } = res.locals;

    try {
      const queryStr = `INSERT INTO files (vehicle_id, label, category, file_name, file_path) 
      VALUES (${id}, '${label}', '${category}', '${fileName}', '${filePath}') RETURNING id, vehicle_id, label, file_name, file_path`;

      const data = await db.query(queryStr);
      res.locals.data = data.rows[0];
      return next();
    } catch (error) {
      return next({
        location: 'Error located in vehicleController.addFileToVehicle',
        error,
      });
    }
  },

  getFiles: async (req, res, next) => {
    const { id } = req.params;

    try {
      const queryStr = `SELECT * FROM files WHERE vehicle_id = ${id}`;
      const data = await db.query(queryStr);
      res.locals.data = data.rows;
      return next()
    } catch (error) {
      return next({
        location: 'Error located in vehicleController.getFiles',
        error,
      });
    }
  },
};

vehicleController.getVehicleInfoWithId = async (req, res, next) => {
  try {
    const queryStr = query.select.vehicleInfoWithId(req.params.id);
    const data = await db.query(queryStr);
    if (data.rows.length === 0) {
      return res.status(404).json({ message: 'Vehicle not found.' });
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

vehicleController.getVehicleWithPlate = async (req, res, next) => {
  try {
    const { plate } = req.params;
    const queryStr = query.select.vehicleInfoWithPlate(plate);
    const data = await db.query(queryStr);
    res.locals.data = data.rows;
    return next();
  } catch (error) {
    return next({
      location: 'Error located in vehicleController.getVehicleWithPlate',
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

vehicleController.getInsurerWithVehicleId = async (req, res, next) => {
  try {
    const queryStr = query.getInsurerWithVehicleId(req.params.id);
    const data = await db.query(queryStr);
    res.locals.insurer = data.rows;
    return next();
  } catch (error) {
    return next({
      location: 'Error located in vehicleController.getInsurerWithVehicleId',
      error,
    });
  }
};

vehicleController.deleteInsurerWithVehicleId = async (req, res, next) => {
  const { vehicleid, insurerid } = req.query;

  try {
    const queryStr = query.deleteInsurerWithVehicleId(vehicleid, insurerid);
    const data = await db.query(queryStr);
    return next();
  } catch (error) {
    return next({
      location: 'Error located in vehicleController.deleteInsurerWithVehicleId',
      error,
    });
  }
};

vehicleController.addInsurer = async (req, res, next) => {
  const { vehicleid, insurerid } = req.query;
  try {
    const queryStr = query.addInsurer(vehicleid, insurerid);
    const data = await db.query(queryStr);
    return next();
  } catch (error) {
    return next({
      location: 'Error located in vehicleController.addInsurer',
      error,
    });
  }
};

module.exports = vehicleController;
