const uploadFile = async (req, res, next) => {
  try {
    res.json({ ok: true });
  } catch (error) {}
};

module.exports = { uploadFile };
