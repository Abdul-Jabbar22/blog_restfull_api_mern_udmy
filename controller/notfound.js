const notFound = (req, res, nex) => {
  res.status(404).json({ code: 404, status: false, message: "Api not found" });
};

module.exports = notFound;
