const db = require('../models');
const query = require('../query');
const fs = require('fs');
const path = require('path');

const peopleController = {
  getInfo: async (req, res, next) => {
    const { type } = req.query;

    let searchKey;
    let id;
    if (req.query.id) {
      searchKey = 'id';
      id = req.query.id;
    } else if (req.query.id_no) {
      searchKey = 'id_no';
      id = `'${req.query.id_no}'`;
    } else {
      return next({
        location: 'Error located in peopleController.getInfo',
        error: 'Invalid query parameters in request'
      });
    }

    try {
      let queryStr;
      if (type === 'vehicles ') {
      } else if (type === 'main') {
        queryStr = `SELECT id, driv_lic_no, current_address, business_lic_no, service_card_no FROM people WHERE ${searchKey}=${id}`;
      } else if (type === 'header') {
        queryStr = `SELECT id, id_no, name, phone_no, photo FROM people WHERE ${searchKey}=${id} `;
      } else {
        queryStr = `SELECT * FROM people WHERE ${searchKey}=${id} `;
      }

      const data = await db.query(queryStr);
      res.locals.people = data.rows;
      return next();
    } catch (error) {
      return next({
        location: 'Error located in peopleController.getInfo',
        error,
      });
    }
  },
  updateInfo: async (req, res, next) => {
    try {
      const file = req.file;
      const { id, ...body } = req.body;

      if (file) {
        // Define the directory path
        const PROD_STATIC_PATH = '/opt/render/project/public';
        const DEV_STATIC_PATH = '/Users/kevin/git-repos/public';
        const staticPath = process.env.NODE_ENV === 'production' ? PROD_STATIC_PATH : DEV_STATIC_PATH;
        const directoryPath = path.join(staticPath, `profile/${id}`);

        // Create directory if it does not exist
        if (!fs.existsSync(directoryPath)) {
          fs.mkdirSync(directoryPath, { recursive: true });
        }
        const fileName = `${Date.now()}-${file.originalname}`;

        // Define the file path
        const filePath = path.join(directoryPath, fileName);

        // Delete old image
        const oldFilePath = path.join(directoryPath, body.photo.split('/').pop());
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }

        // Save the file
        fs.writeFileSync(filePath, file.buffer);

        // You might want to update body with the file path if needed
        body.photo = `/public/profile/${id}/${fileName}`;
      }

      const updateClauses = Object.keys(body).map((key) => `"${key}" = $${Object.keys(body).indexOf(key) + 1}`);
      const queryStr = `UPDATE people SET ${updateClauses.join(', ')} WHERE id = $${Object.keys(body).length + 1} 
      RETURNING ${Object.keys(req.body).join(', ')}`;
      const values = [...Object.values(body), id];

      const data = await db.query(queryStr, values);
      res.locals.people = data.rows;
      return next();
    } catch (error) {
      return next({
        location: 'Error located in peopleController.updateInfo',
        error,
      });
    }
  },
};

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

// Adds person to person database, not attached to vehicle.
peopleController.addPerson = async (req, res, next) => {
  const person = req.body;
  if (req.query.input === 'true') {
    res.locals.personId = person.id;
    return next();
  }
  try {
    const queryStr = query.insert.person(person);
    const data = await db.query(queryStr);
    res.locals.personId = data.rows[0].id;
    return next();
  } catch (error) {
    return next({
      location: 'Error located in peopleController.addPerson',
      error,
    });
  }
};

// Adds person to a vehicle, either as driver or owner
peopleController.addPersonToVehicle = async (req, res, next) => {
  const vehicleId = req.query.vehicleid;
  const driverOrOwner = req.query.type;
  const personId = res.locals.personId;
  try {
    // Check if person is already added to vehicle
    const data = await db.query(
      `SELECT id FROM vehicle_${driverOrOwner} WHERE vehicle_id = ${vehicleId} AND person_id = ${personId}`,
    );
    if (data.rows.length !== 0) return res.status(409).json({ message: 'Person already exists in vehicle' });

    const queryStr = query.insert.personIntoVehicle(driverOrOwner, personId, vehicleId);
    await db.query(queryStr);
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
    await db.query(queryStr);
    return next();
  } catch (error) {
    return next({
      location: 'Error located in peopleController.deletePersonWithVehicleId',
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
