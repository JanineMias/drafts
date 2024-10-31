require('dotenv').config();
const express = require('express');
const path = require('path'); 
const app = express();
const PORT = process.env.PORT;

// ASTRO APPLICATION
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

// ASTRO FRONTEND
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// ROUTERS
const authRouter = require('./routers/authRouter');
const userRouter = require('./routers/userRouter');
const signupRouter = require('./routers/signupRouter');

// USER ROUTER
app.use('/api/auth', authRouter);
app.use('/api/register', signupRouter);
app.use('/api/users', userRouter);

app.listen(PORT, () => {
  console.log(`Node API server running on http://localhost:${PORT}`);
});
