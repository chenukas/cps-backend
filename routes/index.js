const requsitionsRouter = require("./requsition.routes");
const userRouter = require("./user.routes");
const sitesRouter = require('./site.routes');

const init = (app) => {
  app.use(requsitionsRouter);
  app.use(userRouter);
  app.use(sitesRouter);
};

module.exports = init;
