const db = require('../models');
const query = require('../query');
const dayjs = require('dayjs');

const paymentsController = {
  getPayments: async (req, res, next) => {
    try {
      const queryStr = query.select.payments();
      const data = await db.query(queryStr);

      // Format date into YYYY-MM-DD HH:MM
      data.rows.forEach((item) => {
        item.transaction_time = dayjs(item.transaction_time).format(
          'YYYY-MM-DD HH:mm',
        );
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
        item.transaction_time = dayjs(item.transaction_time).format(
          'YYYY-MM-DD HH:mm',
        );
      });

      res.locals.data = data.rows;
      return next();
    } catch (error) {
      return next({
        location:
          'Error located in paymentsController.getPaymentsWithVehicleId',
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
};

module.exports = paymentsController;
