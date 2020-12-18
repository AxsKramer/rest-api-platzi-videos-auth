const express = require('express');
const router = require('./routes');
const config = require('./config');
const {logErrors, errorHandler, wrapError} = require('./utils/middleware/errorHandlers');
const notFoundHandler = require('./utils/middleware/notFoundHandler');
const app = express();

const {port} = config;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/videos', router);

//Capturar error 404
app.use(notFoundHandler);

//Errors middleware
app.use(logErrors);
app.use(wrapError);
app.use(errorHandler);


app.listen(port, () => console.log(`Server running  on port: ${port}`));