const requsitionsRouter = require("./requsitions.routes");

const init = (app) => {
  app.use(requsitionsRouter);
};

module.exports = init;
