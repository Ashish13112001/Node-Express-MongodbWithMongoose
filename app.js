const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();

app.use(express.json()); // frontend s data json(string) formate m aata h to ye middleware usko jsObject m convert kar deta h. Eski vajah s ham req.body m data access kar sakte h



app.use(morgan('dev'));

// This is the way to define Middleware
app.use((req, res, next) => {
    console.log("Hello First Middleware == ");
    next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);


module.exports = app;
