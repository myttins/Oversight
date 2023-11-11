const query = {};

query.getVehicleInfoWithId = (id) => {
  return `SELECT * from vehicles 
  WHERE id = ${id}`;
};

query.getDriversWithVehicleId = (id) => {
  return `SELECT u.name
  FROM users u
  JOIN vehicle_driver vd ON u.id = vd.user_id
  WHERE vd.vehicle_id = ${id}`
}



module.exports = query;
