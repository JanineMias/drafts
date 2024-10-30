// models/User.js
const db = require('../db');

class User {
  // FIND USER Data by it's user
  static findByUsername(username, callback) {
    const query = 'SELECT * FROM oppa_user WHERE username = ?';
    db.query(query, [username], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  }

  static addUser({ username, hashedPassword, email, fname, lname, role }, callback) {
    const query = 'INSERT INTO oppa_user (username, password, email, firstname, lastname, role) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [username, hashedPassword, email, fname, lname, role], (err, results) => {
      if (err) return callback(err);
      callback(null, { id: results.insertId, username, hashedPassword, email, fname, lname, role });
    });
  }

  // FIND ALL USERS 
  static getAllUsers(callback) {
    const query = 'SELECT * FROM oppa_user';
    db.query(query, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }
}

module.exports = User;