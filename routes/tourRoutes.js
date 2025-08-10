const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();

/*
 -- Params Middleware -- 
    In Node/Express, params middleware (app.param()) is a special middleware that runs only when a specific route parameter (like :id) is present in the URL, and it’s used to validate or preprocess that parameter before the main route handler runs.
*/
/*
 -- simple example --
router.param('id', (req, res, next, val) => {
  console.log(`Tour id is : ${val}`);
  next();
});
*/

router.param('id',tourController.checkId);

router.route('/').get(tourController.getAllTours).post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;