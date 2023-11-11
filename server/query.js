const query = {};

query.getVehiclesAll = () => {
  return `SELECT v.id, v.plate, o.name AS owner_name, STRING_AGG(d.name, ', ') as driver_name
  FROM vehicles v
  JOIN vehicle_driver vd ON v.id = vd.vehicle_id
  JOIN users d ON vd.user_id = d.id
  JOIN users o ON v.owner_id = o.id
  GROUP BY o.name, v.id
  ORDER BY v.plate ASC`
}

query.getVehicleInfoWithId = (id) => {
  return `SELECT * from vehicles 
  WHERE id = ${id}`;
};

query.getDriversWithVehicleId = (id) => {
  return `SELECT u.name, u.id
  FROM users u
  JOIN vehicle_driver vd ON u.id = vd.user_id
  WHERE vd.vehicle_id = ${id}`;
};

query.getOwnerWithVehicleId = (id) => {
  return `SELECT u.name, u.id
  FROM vehicles v
  JOIN users u ON u.id = v.owner_id
  WHERE v.id = ${id}`;
};

module.exports = query;
