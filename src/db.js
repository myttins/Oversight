import Dexie from 'dexie';

export const db = new Dexie('myDatabase');
db.version(2).stores({
  vehicle: '++id, plate, vin, drivers', // Primary key and indexed props
});