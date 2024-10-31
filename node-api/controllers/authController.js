require('dotenv').config();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// FUNCTION TO HANDLE USER LOGIN
const login = async (req, res) => {
  const { username, password } = req.body;

  if(username == '' || password == '') return res.status(400).json({ error: "Please fill out the necessary field." });

  try {
    // GET USERDATA BY IT'S USERNAME FROM THE oppa_user DATABASE
    User.findByUsername(username, async (err, user) => {
      if (err) return res.status(500).json({ error: "Database query error" });
      
      // CHECKS IF USER ENTERED HAVE A MATCHED FROM oppa_user DATABASE
      if (!user) return res.status(404).json({ error: "User doesn't exist." });

      // COMPARE PASSWORD TO THE PASSWORD FROM oppa_user DATABASE
      if (await bcrypt.compare(password, user.password)) {
          // GENERATE JWT TOKEN
          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
          res.json({ message: "Login successful", token });
      } else {
        return res.status(401).json({ error: "Password is incorrect." });
      }
    });
  }catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: "An error occurred during login." });
  }
};

module.exports = { login };