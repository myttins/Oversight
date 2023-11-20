const query = {
  insert: {
    newVehicle: (vehicleInfo) => {
      const {
        plate,
        category,
        vehicle_model,
        engine_no,
        vehicle_color,
        vin,
        fuel_type,
        registration_date,
        activation_date,
        operating_license_no,
        notes
      } = vehicleInfo;

      return `INSERT INTO vehicles (plate, category, vehicle_model, vehicle_color, vin, operating_license_no, 
        fuel_type, activation_date, registration_date, notes, engine_no) 
        VALUES ('${plate}', '${category}', '${vehicle_model}', '${vehicle_color}', '${vin}','${operating_license_no}',
        '${fuel_type}','${activation_date}','${registration_date}','${notes}', '${engine_no}')
        RETURNING id`;
    },
  },
  select: {
    allVehicleTitles: () => {
      return `SELECT v.id, v.plate, o.name AS owner_name, STRING_AGG(d.name, ', ') as driver_name FROM vehicles v
      LEFT JOIN vehicle_driver vd ON v.id = vd.vehicle_id LEFT JOIN vehicle_owner od ON v.id = od.vehicle_id
      LEFT JOIN people d ON vd.person_id = d.id LEFT JOIN people o ON od.person_id = o.id
      GROUP BY o.name, v.id ORDER BY v.plate ASC`;
    },
    vehicleTitleWithPlate: (plate) => {
      return `SELECT v.id, v.plate, o.name AS owner_name, STRING_AGG(d.name, ', ') as driver_name FROM vehicles v 
      LEFT JOIN vehicle_driver vd ON v.id = vd.vehicle_id LEFT JOIN vehicle_owner vo ON v.id = vo.vehicle_id
      JOIN people d ON vd.person_id = d.id JOIN people o ON vo.person_id = o.id
      WHERE v.plate LIKE '%${plate}%' GROUP BY o.name, v.id ORDER BY v.plate ASC`
    },
    vehicleTitleWithName: (name) => {
      return `SELECT v.id, v.plate, o.name AS owner_name, STRING_AGG(d.name, ', ') as driver_name FROM vehicles v
      LEFT JOIN vehicle_driver vd ON v.id = vd.vehicle_id LEFT JOIN vehicle_owner vo ON v.id = vo.vehicle_id
      JOIN people d ON vd.person_id = d.id JOIN people o ON vo.person_id = o.id GROUP BY o.name, v.id
      HAVING STRING_AGG(d.name, ', ') LIKE '%${query}%' OR o.name LIKE '%${query}%'`;
    },
    vehicleInfoWithPlate: (plate) => {
      return `SELECT * from vehicles WHERE plate = '${plate}'`;
    },
    driverInfoWithVehicleId: (id) => {
      return `SELECT p.id, p.name, p.current_address, p.phone_number, p.driver_license_number, p.business_license_number, 
      p.service_card_number, vd.id as foreign_id
      FROM people p JOIN vehicle_driver vd ON p.id = vd.person_id WHERE vd.vehicle_id = ${id}`;
    },
    ownerInfoWithVehicleId: (id) => {
      return `SELECT p.id, p.name, p.current_address, p.phone_number, p.driver_license_number, p.business_license_number, p.service_card_number
      FROM people p JOIN vehicle_owner vo ON p.id = vo.person_id WHERE vo.vehicle_id = ${id}`;
    },
    
  }
};

query.getInsurerWithVehicleId = (id) => {
  return `SELECT v.id, v.plate
  FROM vehicles v
  JOIN vehicle_insurer vo
  ON v.id = vo.insurer_vehicle_id
  WHERE vo.vehicle_id=${id}`;
};

query.addInsurer = (vehicleId, insurerId) => {
  return `INSERT INTO vehicle_insurer (vehicle_id, insurer_vehicle_id)
  VALUES (${vehicleId}, ${insurerId})`;
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

query.deletePersonWithVehicleId = (type, personid, vehicleid) => {
  const table = type === 'driver' ? 'vehicle_driver' : 'vehicle_owner';
  return `DELETE FROM ${table}
  WHERE person_id='${personid}' AND vehicle_id='${vehicleid}'`;
};

query.addPerson = (personInfo) => {
  const {
    id,
    name,
    current_address,
    phone_number,
    driver_license_number,
    business_license_number,
    service_card_number,
  } = personInfo;

  return `
  INSERT INTO people (id, name, current_address, phone_number, 
      driver_license_number, business_license_number, service_card_number)
  OVERRIDING SYSTEM VALUE 
  VALUES ('${id}', '${name}', '${current_address}', '${phone_number}', '${driver_license_number}',
    '${business_license_number}', '${service_card_number}')`;
};

query.getPerson = (id) => {
  return `SELECT * 
  FROM people 
  WHERE id=${id}`;
};

query.updatePerson = (id, personInfo) => {
  const {
    name,
    current_address,
    phone_number,
    driver_license_number,
    business_license_number,
    service_card_number,
  } = personInfo;

  return `
  UPDATE people 
  SET name='${name}', phone_number='${phone_number}', driver_license_number='${driver_license_number}', current_address='${current_address}', 
  business_license_number='${business_license_number}', service_card_number='${service_card_number}'
  WHERE id='${id}'`;
};

query.addPersonToVehicle = (type, personId, vehicleId) => {
  return `INSERT INTO ${
    type === 'driver' ? 'vehicle_driver' : 'vehicle_owner'
  } (vehicle_id, person_id)
  VALUES ('${vehicleId}', '${personId}')`;
};

query.deleteInsurerWithVehicleId = (vehicleid, insurerid) => {
  return `DELETE FROM vehicle_insurer
  WHERE vehicle_id='${vehicleid}' AND insurer_vehicle_id='${insurerid}'`;
};
module.exports = query;
