const query = {};

query.getVehiclesAll = () => {
  return `SELECT v.id, v.plate, o.name AS owner_name, STRING_AGG(d.name, ', ') as driver_name
  FROM vehicles v
  JOIN vehicle_driver vd ON v.id = vd.vehicle_id
  JOIN people d ON vd.user_id = d.id
  JOIN people o ON v.owner_id = o.id
  GROUP BY o.name, v.id
  ORDER BY v.plate ASC`;
};

query.getVehicleInfoWithId = (id) => {
  return `SELECT * from vehicles 
  WHERE id = ${id}`;
};

query.getDriversWithVehicleId = (id) => {
  return `SELECT p.id, p.name, p.id_number, p.current_address, p.phone_number, p.driver_license_number, p.business_license_number, p.service_card_number
  FROM people p
  JOIN vehicle_driver vd ON p.id = vd.user_id
  WHERE vd.vehicle_id = ${id}`;
};

query.getOwnerWithVehicleId = (id) => {
  return `SELECT p.id, p.name, p.id_number, p.current_address
  FROM vehicles v
  JOIN people p ON p.id = v.owner_id
  WHERE v.id = ${id}`;
};

module.exports = query;
