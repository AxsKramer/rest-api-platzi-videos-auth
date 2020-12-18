const express = require('express');
const session = require('express-session');

const app = express();

app.use(session({
  resave: false, //No guarde la cookie por cada cambio
  saveUninitialized: false, // Por defecto si la cookie no se a inicializado no la guarde por defecto
  secret: "keyboad cat"
}));

app.get('/', (req, res) => {
  req.session.count = req.session.count ? req.session.count + 1 : 1;
  res.status(200).json({hello: 'world', counter: req.session.count});
});

app.listen(3000, () => console.log('Running on port 3000'));