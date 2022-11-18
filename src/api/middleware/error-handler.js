errorHandler = (err, req, res, next) => {
    const status = err.statusCode || 400;
    if (err.message) {
      const e = { message: err.message };
      if (err.evErrors) {
        e.errors = err.serializeEVErrors();
      }
      return res.status(status).send(e);
    }
    return res
      .status(err.statusCode || 500)
      .send({ msg: "Oops... Something went wrong!" });
  };
  
  module.exports = {
    errorHandler
  };
  