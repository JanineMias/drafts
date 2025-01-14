const bcrypt = require('bcryptjs');
const User = require('../models/User');

// FUNCTION TO HANDLE USER REGISTER
const signup = async (req, res) => {
  const { username, password, email, fname, lname, role } = req.body;

  // Check if the password is defined
  if (!password) {
    return res.status(400).json({ error: 'Password is required.' });
  }

  User.findByUsername(username, async (err, user) => {
    if (err) {
      console.error('Error finding user:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (!user) {
      try {
        // HASH PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);

        // ADD USER TO THE DATABASE
        User.addUser({ username, hashedPassword, email, fname, lname, role }, (err, createdUser) => {
          if (err) {
            console.error('Error adding user:', err);
            return res.status(500).json({ error: 'Failed on creating user.' });
          }
          console.log('User added successfully:', createdUser);
          return res.status(201).json({ message: 'User created successfully.', user: createdUser });
        });
      } catch (hashError) {
        console.error('Error hashing password:', hashError);
        return res.status(500).json({ error: 'Failed to hash password.' });
      }
    } else {
      return res.status(400).json({ error: 'Username already exists.' });
    }
  });
};

module.exports = { signup };