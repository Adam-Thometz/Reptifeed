const express = require('express');
const cors = require('cors');

const { NotFoundError } = require('./expressError')
const { authenticateJWT } = require('./middleware/auth')

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const reptileRoutes = require('./routes/reptiles');
const pantryRoutes = require('./routes/pantries')
const foodApiRoutes = require('./routes/api');

const app = express();

app.use(cors());
app.use(express.json());
app.use(authenticateJWT);

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/reptiles', reptileRoutes);
app.use('/pantries', pantryRoutes);
app.use('/api', foodApiRoutes);

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