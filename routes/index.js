const requsitionsRouter = require("./requsition.routes");
const userRouter = require("./user.routes");

const init = (app) => {
  app.use(requsitionsRouter);
  app.use(userRouter);
};

module.exports = init;
