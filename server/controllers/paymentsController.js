const db = require('../models');
const query = require('../query');
const dayjs = require('dayjs');
const { scheduleJob } = require('../schedulers/paymentScheduler');

const paymentsController = {
  getPayments: async (req, res, next) => {
    try {
      const queryStr = query.select.payments();
      const data = await db.query(queryStr);

      // Format date into YYYY-MM-DD HH:MM and converts
      data.rows.forEach((item) => {
        item.amount = parseFloat(item.amount);
        item.transaction_time = dayjs(item.transaction_time).format('YYYY-MM-DD HH:mm');
      });

      res.locals.data = data.rows;
      return next();
    } catch (error) {
      return next({
        location: 'Error located in paymentsController.getPayments',
        error,
      });
    }
  },
  getPaymentsWithVehicleId: async (req, res, next) => {
    const { id } = req.params;
    try {
      const queryStr = query.select.paymentsAndBalanceWithVehicleId(id);
      const data = await db.query(queryStr);
      data.rows.forEach((item) => {
        item.amount = parseFloat(item.amount);
        item.transaction_time = dayjs(item.transaction_time).format('YYYY-MM-DD HH:mm');
      });

      res.locals.payments = data.rows;
      return next();
    } catch (error) {
      return next({
        location: 'Error located in paymentsController.getPaymentsWithVehicleId',
        error,
      });
    }
  },
  getSchedulesWithVehicleId: async (req, res, next) => {
    const { id } = req.params;

    try {
      const queryStr = query.select.schedulesWithVehicleId(id);
      const data = await db.query(queryStr);
      data.rows.forEach((item) => {
        item.date_created = dayjs(item.date_created).format('YYYY-MM-DD HH:mm');
      });
      res.locals.schedules = data.rows;
      return next();
    } catch (error) {
      return next({
        location: 'Error located in paymentsController.getSchedulesWithVehicleId',
        error,
      });
    }
  },
  getSchedules: async (_req, res, next) => {
    try {
      const queryStr = query.select.schedules();
      const data = await db.query(queryStr);

      // Format date int YYYY-MM-DD
      data.rows.forEach((item) => {
        item.amount = parseFloat(item.amount);
        item.date_created = dayjs(item.date_created).format('YYYY-MM-DD');
      });

      res.locals.data = data.rows;
      return next();
    } catch (error) {
      return next({
        location: 'Error located in paymentsController.getSchedules',
        error,
      });
    }
  },
  addSchedule: async (req, res, next) => {
    try {
      const queryStr = query.insert.schedule(req.body);
      const data = await db.query(queryStr);
      res.locals.data = data.rows[0];
      return next();
    } catch (error) {
      return next({
        location: 'Error located in paymentsController.addSchedule',
        error,
      });
    }
  },
  addScheduleToJobs: async (req, res, next) => {
    try {
      await scheduleJob(res.locals.data);
      return next();
    } catch (error) {
      return next({
        location: 'Error located in paymentsController.addScheduleToJobs',
        error,
      });
    }
  },

  updateSchedulesForVehicle: async (req, res, next) => {
    const vehicleId = req.params.id;
    const schedulesFromBody = req.body;
    try {
      // Step 1: Retrieve current schedules for the vehicle
      const currentSchedulesRes = await db.query(
        `SELECT schedule_id FROM vehicle_schedule WHERE vehicle_id = ${vehicleId}`,
      );
      const currentSchedules = currentSchedulesRes.rows.map((row) => row.schedule_id);

      // Step 2: Find schedules to add and to remove
      const schedulesToAdd = schedulesFromBody.filter((id) => !currentSchedules.includes(id));
      const schedulesToRemove = currentSchedules.filter((id) => !schedulesFromBody.includes(id));

      console.log('schedulesToAdd', schedulesToAdd)
      console.log('schedulesToRemove', schedulesToRemove)


      // Step 3: Add new schedules
      for (const scheduleId of schedulesToAdd) {
        await db.query('INSERT INTO vehicle_schedule (schedule_id, vehicle_id) VALUES ($1, $2)', [
          scheduleId,
          vehicleId,
        ]);
      }

      // Step 4: Remove schedules that are not needed
      for (const scheduleId of schedulesToRemove) {
        await db.query('DELETE FROM vehicle_schedule WHERE schedule_id = $1 AND vehicle_id = $2', [
          scheduleId,
          vehicleId,
        ]);
      }

      return next();
    } catch (error) {
      return next({
        location: 'Error located in paymentsController.updateSchedulesForVehicle',
        error,
      });
    }
  },
  addPaymentWithVehicleId: async (req, res, next) => {
    const { id } = req.params;
    try {
      const queryStr = query.insert.paymentWithVehicleId(id, req.body);
      const data = await db.query(queryStr);
      return next();
    } catch (error) {
      return next({
        location: 'Error located in paymentsController.addPaymentWithVehicleId',
        error,
      });
    }
  },
};

module.exports = paymentsController;
