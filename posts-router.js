const express = require('express');

const db = require('./data/db');

const router = express.Router();

router.get('/', (req, res) => {
  db
    .find()
    .then(posts => {
      res
        .status(200)
        .json({
          success: true, posts
        })
    })
    .catch(error => {
      res
        .status(500)
        .json({
          success: false,
          error: 'The posts information could not be retrieved.'
        })
    });
})

router.get('/:id', (req, res) => {
  db
    .findById(req.params.id)
    .then(post => {
      if (post) {
        return res
          .status(200)
          .json({
            success: true,
            post
          })
      } else {
        res
          .status(404)
          .json({
            success: false,
            error: 'The post with the specified ID does not exist.'
          })
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({
          success: false,
          error: 'The posts information could not be retrieved.'
        })
    });
})

module.exports = router