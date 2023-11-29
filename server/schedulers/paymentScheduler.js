const schedule = require('node-schedule');
const db = require('../models');

const jobs = {};

const addPayment = async (scheduleId, label, amount) => {
  try {
    // Get all vehicles where schedule matches row.schedule_id
    const vehicles = await db.query(
      `SELECT id FROM vehicles WHERE category = ${scheduleId} AND active = true`,
    );

    // For all vehicles, add a transaction
    for (row of vehicles.rows) {
      await db.query(`INSERT INTO payments (vehicle_id, amount, description)
      VALUES (${row.id}, ${amount}, '${label}')`);
    }
  } catch (error) {
    console.log(error);
  }
};

const addSchedule = async (job) => {
  const { schedule_id, period, label, amount } = job;

  // Set up the cron job for each schedule
  if (period === 'H') {
    jobs[schedule_id] = schedule.scheduleJob(
      '0 * * * *',
      async () => await addPayment(schedule_id, `${label} Schedule X`, amount),
    );
  } else if (period === 'D') {
    jobs[schedule_id] = schedule.scheduleJob(
      '0 5 * * *',
      async () => await addPayment(schedule_id, `${label} Schedule X`, amount),
    );
  }
};

const initializeScheduledJobs = async () => {
  try {
    // Select all rows from fee_schedules table
    const data = await db.query('SELECT * FROM schedules');

    // For each item in fee_schedule, create a new job and add it to jobs object
    data.rows.forEach((row) => addSchedule(row));
  } catch (error) {
    console.error('Error initializing scheduled jobs:', error);
  }
};

module.exports = { initializeScheduledJobs };
