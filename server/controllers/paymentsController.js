const db = require('../models');
const query = require('../query');
const dayjs = require('dayjs');

const paymentsController = {
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
