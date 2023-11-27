export interface Schedule {
  id: string;
  label: string;
  frequency: number;
  period: number;
  date_created: Date;
}

export interface Vehicle {
  id: string;
  plate: string;
  category: number;
  vehicle_model: string;
  vehicle_color: string;
  vin: string;
  fuel_type: 'GAS' | 'ELECTRIC';
  engine_no: string;
  activation_date: string;
  registration_date: string;
  operating_license_no: string;
  notes: string;
}
