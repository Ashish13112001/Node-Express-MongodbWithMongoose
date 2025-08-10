const express = require('express');
const fs = require('node:fs');
const morgan = require('morgan');
const app = express();

app.use(express.json()); // frontend s data json(string) formate m aata h to ye middleware usko jsObject m convert kar deta h. Eski vajah s ham req.body m data access kar sakte h

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.use(morgan('dev'));

// This is the way to define Middleware
app.use((req, res, next) => {
    console.log("Hello First Middleware == ");
    next();
});

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const getTour = (req, res) => {
  const id = req.params.id * 1;

  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }

  res.status(201).json({
    status: 'success',
    data: {
      tour: tour,
    },
  });
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      message: 'Data updated',
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};



const getAllUsers = (req, res) => {
    res.status(501).json({
        message: 'This route is not define yet'
    });
}
const createUsers = (req, res) => {
    res.status(501).json({
        message: 'This route is not define yet'
    });
}
const getUsers = (req, res) => {
    res.status(501).json({
        message: 'This route is not define yet'
    });
}
const updateUsers = (req, res) => {
    res.status(501).json({
        message: 'This route is not define yet'
    });
}
const deleteUsers = (req, res) => {
    res.status(501).json({
        message: 'This route is not define yet'
    });
}



app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(createUsers);
app
  .route('/api/v1/users/:id')
  .get(getUsers)
  .patch(updateUsers)
  .delete(deleteUsers);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
