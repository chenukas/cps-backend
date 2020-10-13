const requsitionsRouter = require("./requsition.routes");
const userRouter = require("./user.routes");
const sitesRouter = require('./site.routes');
const suppliersRouter = require('./supplier.routes');

const init = (app) => {
  app.use(requsitionsRouter);
  app.use(userRouter);
  app.use(sitesRouter);
  app.use(suppliersRouter);
};

module.exports = init;
