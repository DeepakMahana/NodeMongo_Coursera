var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Dishes = require('../models/dishes');
var Verify = require('./verify');

var dishRouter = express.Router();

dishRouter.use(bodyParser.json());

/* Route '/' */

dishRouter.route('/')

  // GET Operation

  .get(Verify.verifyOrdinaryUser ,function (req, res, next) {

    Dishes.find({}, function(err,dish) {
      if (err) throw err;
      res.json(dish);
    });

  })

  // POST Operation
  .post(Verify.verifyOrdinaryUser ,function (req, res, next) {
    
    Dishes.create(req.body, function(err,dish) {
      if (err) throw err;

      console.log('Dish Created !');
      var id = dish._id;
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });

      res.end ('Added The Dish With ID: ' + id); 

    });

  })

  // DELETE Operation
  .delete(Verify.verifyOrdinaryUser ,function (req, res, next) {

    Dishes.remove({}, function(err,resp) {
      if(err) throw err;
      res.json(resp);
    });

  });


/* Route '/:dishId' */

dishRouter.route('/:dishId')

  .get(Verify.verifyOrdinaryUser ,function (req, res, next) {
    
    Dishes.findById(req.params.dishId, function (err, dish) {
      if (err) throw err;
      res.json (dish);
    });

  })

  .put(Verify.verifyOrdinaryUser ,function (req, res, next) {
    
    Dishes.findByIdAndUpdate(req.params.dishId, {
      $set : req.body
    }, function (err, dish){
      if (err) throw err;

      res.json(dish);

    });

  })

  .delete(Verify.verifyOrdinaryUser ,function (req, res, next) {
    
    Dishes.findByIdAndRemove(req.params.dishId, function (err, resp) {
      if (err) throw err;

      res.json(resp);
    });

});


/* Route '/:dishId/comments' */ 

dishRouter.route('/:dishId/comments')


.get(Verify.verifyOrdinaryUser ,function (req, res, next) {

    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        res.json(dish.comments);
    });

})

.post(Verify.verifyOrdinaryUser ,function (req, res, next) {

    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;

        dish.comments.push(req.body);

        dish.save(function (err, dish) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(dish);
        });

    });

})

.delete(Verify.verifyOrdinaryUser ,function (req, res, next) {

    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;

        for (var i = (dish.comments.length - 1); i >= 0; i--) {
            dish.comments.id(dish.comments[i]._id).remove();
        }

        dish.save(function (err, result) {
            if (err) throw err;

            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });

            res.end('Deleted all comments!');
        });
    });
});



/* Route '/:dishId/comments/:commentID' */ 


dishRouter.route('/:dishId/comments/:commentId')


.get(Verify.verifyOrdinaryUser ,function (req, res, next) {

    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        res.json(dish.comments.id(req.params.commentId));
    });

})

.put(Verify.verifyOrdinaryUser ,function (req, res, next) {

    // We delete the existing commment and insert the updated
    // comment as a new comment

    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;

        dish.comments.id(req.params.commentId).remove();

        dish.comments.push(req.body);

        dish.save(function (err, dish) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(dish);
        });

    });

})

.delete(Verify.verifyOrdinaryUser ,function (req, res, next) {

    Dishes.findById(req.params.dishId, function (err, dish) {

        dish.comments.id(req.params.commentId).remove();

        dish.save(function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
        
    });
});

  
module.exports = dishRouter