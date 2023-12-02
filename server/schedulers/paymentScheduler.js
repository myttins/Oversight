const schedule = require('node-schedule');
const db = require('../models');

const jobs = {};

const addPayment = async (scheduleId, label, amount) => {
  try {
    // Get all vehicles where schedule matches row.schedule_id
    const vehicles = await db.query(`SELECT vehicle_id from vehicle_schedule 
    WHERE schedule_id = ${scheduleId}
    AND active = true`);

    // For all vehicles, add a transaction
    for (let row of vehicles.rows) {
      await db.query(`INSERT INTO payments (vehicle_id, amount, description)
      VALUES (${row.id}, ${amount}, '${label}')`);
    }
  } catch (error) {
    console.log(error);
  }
};

const scheduleJob = async (job) => {
  const { schedule_id, expression, label, amount } = job;
  jobs[schedule_id] = schedule.scheduleJob(
    expression,
    async () => await addPayment(schedule_id, `${label} Schedule N`, amount),
  );
};

const initializeScheduledJobs = async () => {
  try {
    // Select all rows from fee_schedules table
    const data = await db.query('SELECT * FROM schedules WHERE active = true');
    // For each item in fee_schedule, create a new job and add it to jobs object
    data.rows.forEach((row) => scheduleJob(row));
  } catch (error) {
    console.error('Error in paymentScheduler.initializeScheduledJobs: ', error);
  }
};

module.exports = { initializeScheduledJobs, scheduleJob };
