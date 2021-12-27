module.exports = (error, req, res, next) => {
  if (error.name === "CastError") {
    return res.status(400).send({ error: "Malformated id" });
  }
  next(error);
};
