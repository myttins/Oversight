const db = require('../models');
const query = require('../query');

const paymentsController = {
  getSchedules: async (_req, res, next) => {
    try {
      const queryStr = query.select.schedules();
      const data = await db.query(queryStr);
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
