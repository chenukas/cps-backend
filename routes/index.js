const requsitionsRouter = require("./requisition.routes");
const userRouter = require("./user.routes");
const sitesRouter = require("./site.routes");
const suppliersRouter = require("./supplier.routes");
const orderRouter = require("./order.routes");
const itemsRouter = require("./item.routes");

const init = (app) => {
  app.use(requsitionsRouter);
  app.use(userRouter);
  app.use(sitesRouter);
  app.use(suppliersRouter);
  app.use(itemsRouter);
  app.use(orderRouter);
};

module.exports = init;
