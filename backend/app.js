const express = require('express');
const cors = require('cors');

const { NotFoundError } = require('./expressError')
const { authenticateJWT } = require('./middleware/auth')

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
// /reptiles
// /foods

const app = express();

app.use(cors());
app.use(express.json());
app.use(authenticateJWT);

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.use((req, res, next) => {
  return next(new NotFoundError())
});

app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== 'test') console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status }
  });
});

module.exports = app;