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
        notes,
      } = vehicleInfo;

      return `INSERT INTO vehicles (plate, category, vehicle_model, vehicle_color, vin, operating_license_no, 
        fuel_type, activation_date, registration_date, notes, engine_no) 
        VALUES ('${plate}', '${category}', '${vehicle_model}', '${vehicle_color}', '${vin}','${operating_license_no}',
        '${fuel_type}','${activation_date}','${registration_date}','${notes}', '${engine_no}')
        RETURNING id, plate, category, vehicle_model, vehicle_color, vin, operating_license_no, fuel_type, activation_date, 
        registration_date, notes, engine_no`;
    },
    person: (person) => {
      const { id_no, name, phone_no, driv_lic_no, current_address, business_lic_no, service_card_no } = person;

      return `INSERT INTO people (id_no, name, phone_no, driv_lic_no, current_address, business_lic_no, service_card_no)
      VALUES ('${id_no}', '${name}', '${phone_no}', '${driv_lic_no}', '${current_address}', '${business_lic_no}', '${service_card_no}')
      RETURNING id, id_no, name, phone_no, driv_lic_no, current_address, business_lic_no, service_card_no`;
    },
    personIntoVehicle: (driverOrOwner, personId, vehicleId) => {
      return `INSERT INTO vehicle_${driverOrOwner} (vehicle_id, person_id)
      VALUES ('${vehicleId}', '${personId}') RETURNING id, vehicle_id, person_id`;
    },
    paymentWithVehicleId: (id, paymentInfo) => {
      const { description, amount } = paymentInfo;
      return `INSERT INTO payments (vehicle_id, description, amount)
      VALUES ('${id}', '${description}', '${amount}')`;
    },
    schedule: (schedule) => {
      const { label, amount, expression, description } = schedule;
      return `INSERT INTO schedules (label, amount, expression, description) 
      VALUES ('${label}', '${amount}', '${expression}', '${description}') 
      RETURNING schedule_id, label, amount, expression`;
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
      WHERE v.plate LIKE '%${plate}%' GROUP BY o.name, v.id ORDER BY v.plate ASC`;
    },
    vehicleTitleWithName: (name) => {
      return `SELECT v.id, v.plate, o.name AS owner_name, STRING_AGG(d.name, ', ') as driver_name FROM vehicles v
      LEFT JOIN vehicle_driver vd ON v.id = vd.vehicle_id LEFT JOIN vehicle_owner vo ON v.id = vo.vehicle_id
      JOIN people d ON vd.person_id = d.id JOIN people o ON vo.person_id = o.id GROUP BY o.name, v.id
      HAVING STRING_AGG(d.name, ', ') LIKE '%${name}%' OR o.name LIKE '%${name}%'`;
    },
    vehicleHeaderInfoWithId: (id) => {
      return `SELECT id, plate, active, activation_date FROM vehicles 
      WHERE id=${id}`;
    },
    vehicleInfoWithId: (id) => {
      return `SELECT * from vehicles WHERE id=${id}`;
    },
    vehicleInfoWithPlate: (plate) => {
      return `SELECT * from vehicles WHERE plate = '${plate}'`;
    },
    driverInfoWithVehicleId: (id) => {
      return `SELECT p.id, p.name, p.current_address, p.phone_no, p.driv_lic_no, p.business_lic_no, 
      p.service_card_no, vd.id as foreign_id
      FROM people p JOIN vehicle_driver vd ON p.id = vd.person_id WHERE vd.vehicle_id = ${id}`;
    },
    ownerInfoWithVehicleId: (id) => {
      return `SELECT p.id, p.name, p.current_address, p.phone_no, p.driv_lic_no, p.business_lic_no, p.service_card_no
      FROM people p JOIN vehicle_owner vo ON p.id = vo.person_id WHERE vo.vehicle_id = ${id}`;
    },
    personWithId: (id) => {
      return `SELECT * FROM people WHERE id_no = '${id}'`;
    },
    schedules: () => {
      return `SELECT * FROM schedules ORDER BY date_created DESC`;
    },
    schedulesWithVehicleId: (id) => {
      return `SELECT s.schedule_id, s.label, s.amount, vs.date_added FROM schedules s JOIN vehicle_schedule vs ON s.schedule_id = vs.schedule_id
      WHERE vs.vehicle_id = 1 ORDER BY vs.date_added DESC`;
    },
    payments: () => {
      return `SELECT * FROM payments ORDER BY transaction_time DESC`;
    },
    paymentsAndBalanceWithVehicleId: (id) => {
      return `SELECT p.transaction_id, p.description, p.amount, p.transaction_time, v.total_balance
      FROM payments p JOIN (SELECT vehicle_id, SUM(amount) as total_balance FROM payments 
      GROUP BY vehicle_id) v ON p.vehicle_id = v.vehicle_id WHERE p.vehicle_id = ${id}
      ORDER BY p.transaction_time DESC`;
    },
  },
};

query.getInsurerWithVehicleId = (id) => {
  return `SELECT v.id, v.plate FROM vehicles v
  JOIN vehicle_insurer vo ON v.id = vo.insurer_vehicle_id WHERE vo.vehicle_id=${id}`;
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
    operating_license_no,
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
  operating_license_no='${operating_license_no}',
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

query.updatePerson = (id, personInfo) => {
  const { name, current_address, phone_no, driv_lic_no, business_lic_no, service_card_no } = personInfo;

  return `
  UPDATE people 
  SET name='${name}', phone_no='${phone_no}', driv_lic_no='${driv_lic_no}', current_address='${current_address}', 
  business_lic_no='${business_lic_no}', service_card_no='${service_card_no}'
  WHERE id='${id}'`;
};

query.deleteInsurerWithVehicleId = (vehicleid, insurerid) => {
  return `DELETE FROM vehicle_insurer
  WHERE vehicle_id='${vehicleid}' AND insurer_vehicle_id='${insurerid}'`;
};
module.exports = query;
