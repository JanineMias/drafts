require('dotenv').config();
const User = require('../models/User');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// FUNCTION TO HANDLE USER LOGIN
const login = (req, res) => {
  const { username, password } = req.body;

  // GET USERDATA BY IT'S USERNAME
  User.findByUsername(username, (err, user) => {
    if (err) return res.status(500).json({ error: "Database query error" });

    if (!user) {
      return res.status(404).json({ error: "User doesn't exist." });
    }

    if(!bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: "Password is incorrect." });
    }else{
      // GENERATE JWT TOKEN
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ message: "Login successful", token });
    }

  });
};

module.exports = { login };