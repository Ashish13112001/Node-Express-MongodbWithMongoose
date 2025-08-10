const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();

app.use(express.json()); // frontend s data json(string) formate m aata h to ye middleware usko jsObject m convert kar deta h. Eski vajah s ham req.body m data access kar sakte h
app.use(morgan('dev'));

//  -- Serving static files -- How? --> 127.0.0.1:3000/img/pan.png (we dont need to mention public)
app.use(express.static(`${__dirname}/public`)) // It serve all files inside the public folder directly to the browser as static files

// This is the way to define Middleware
app.use((req, res, next) => {
    console.log("Hello First Middleware == ");
    next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);


module.exports = app;
