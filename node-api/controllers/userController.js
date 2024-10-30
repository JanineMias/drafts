const User = require('../models/User');

const getAllUsers = (req, res) => {
  // GET ALL THE USER DATA BY ALL THE USERS
  User.getAllUsers((err, users) => {
    if (err) return res.status(500).json({ error: "Database query error" });
    res.json(users);
  });
};

module.exports = { getAllUsers };