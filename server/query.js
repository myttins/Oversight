const query = {};

query.getVehiclesAll = () => {
  return `SELECT v.id, v.plate, o.name AS owner_name, STRING_AGG(d.name, ', ') as driver_name
  FROM vehicles v
  LEFT JOIN vehicle_driver vd ON v.id = vd.vehicle_id
  LEFT JOIN people d ON vd.user_id = d.id
  LEFT JOIN people o ON v.owner_id = o.id
  GROUP BY o.name, v.id
  ORDER BY v.plate ASC`;
};

query.getVehicleInfoWithId = (id) => {
  return `SELECT * from vehicles 
  WHERE id = ${id}`;
};

query.getDriversWithVehicleId = (id) => {
  return `SELECT p.id, p.name, p.id_number, p.current_address, 
  p.phone_number, p.driver_license_number, p.business_license_number, 
  p.service_card_number, vd.id as foreign_id
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

query.createAccount = (username, password, role) => {
  return `INSERT INTO users (username, password, role)
  VALUES ('${username}', '${password}', ${role})`;
};

query.getPasswordWithUsername = (username) => {
  return `SELECT u.password FROM users u 
  WHERE u.username = '${username}'`;
};

query.updateVehicleInfoWithId = (id, vehicleInfo) => {
  const {
    vehicle_model,
    vehicle_color,
    vin,
    commercial_license_num,
    fuel_type,
    activation_date,
    registration_date,
    notes,
    category,
    engine_no,
  } = vehicleInfo;

  return `UPDATE vehicles 
  SET vehicle_model='${vehicle_model}', 
  vehicle_color='${vehicle_color}', 
  vin='${vin}',
  commercial_license_num='${commercial_license_num}',
  category='${category}',
  engine_no='${engine_no}',
  fuel_type='${fuel_type}',
  activation_date='${activation_date}',
  registration_date='${registration_date}',
  notes='${notes}'
  WHERE id=${id}`;
};

query.deletePersonWithVehicleId = (type, id) => {
  const table = type === 'driver' ? 'vehicle_driver' : 'owner_driver';
  return `DELETE FROM ${table}
  WHERE id=${id}`;
};

module.exports = query;
