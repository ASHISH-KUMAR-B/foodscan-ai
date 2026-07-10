const protect = (req, res) => {
  return res.status(501).json({ message: 'Auth middleware not implemented yet.' });
};

module.exports = {
  protect,
};
