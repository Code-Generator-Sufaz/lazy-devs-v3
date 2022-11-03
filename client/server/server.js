const express = require('express');
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const tempRoutes = require("./routes/tempRoutes");
const userRoutes = require("./routes/userRoutes");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passportOauth = require('./passportOauth')

app.use(express.json());
mongoose.connect(process.env.DB_LINK, () => {
  console.log('Database connected');
});
app.use(cors({ origin: 'https://lazy-devs.onrender.com', credentials: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);
app.get('/userToRender', (req, res) => {
  res.json(req.session.user);
});
app.use('/authentication', authRoutes);
app.use('/code', tempRoutes);
app.use('/user', userRoutes);

passportOauth(app);

//if url is not specified, sending it to 404 page
app.all('*', (req, res) => {
  res.send('Page not found');
});

//error handler middleware
app.use((err, req, res, next) => {
  const { message = 'Something went wrong', status = 500 } = err;
  res.status(status).send(message);
});

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
