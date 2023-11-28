const schedule = require('node-schedule');
const db = require('../models');

const jobs = {};

const addPayment = async (scheduleId, label) => {
  try {
    // Get all vehicles where schedule matches row.schedule_id
    const vehicles = await db.query(
      `SELECT id FROM vehicles WHERE vehicles.category = ${scheduleId}`,
    );

    // For all vehicles, add a transaction
    for (row of vehicles.rows) {
      await db.query(`INSERT INTO payments (vehicle_id, amount, description)
      VALUES (${row.id}, 100, '${label})`);
    }
  } catch (error) {
    console.log(error);
  }
};

const initializeScheduledJobs = async () => {
  try {
    // Select all rows from fee_schedules table
    const data = await db.query('SELECT * FROM schedules');

    // For each item in fee_schedule, create a new job and add it to jobs object
    data.rows.forEach((row) => {
      // Set up the cron job for each schedule
      if (row.period === 'H') {
        jobs[row.schedule_id] = schedule.scheduleJob(
          '0 * * * *',
          async () =>
            await addPayment(
              row.schedule_id,
              `${row.period} payment, schedule ${row.schedule_id}`,
            ),
        );
      } else if (row.period === 'D') {
        jobs[row.schedule_id] = schedule.scheduleJob(
          '0 5 * * *',
          async () =>
            await addPayment(
              row.schedule_id,
              `${row.period} payment, schedule ${row.schedule_id}`,
            ),
        );
      }
    });
  } catch (error) {
    console.error('Error initializing scheduled jobs:', error);
  }
};

module.exports = { initializeScheduledJobs };
