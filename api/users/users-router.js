const express = require('express');
const User = require("./users-model")
const Post = require("../posts/posts-model")
const mw = require("../middleware/middleware")
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  User.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      console.log(err)
    })
});

router.get('/:id', mw.validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status(200).json(req.user)
});

router.post('/', mw.validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  User.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
});

router.put('/:id', mw.validateUserId, mw.validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  User.update(req.user.id, req.body)
    .then(() => {
      res.status(200).json({id: req.user.id, ...req.body})
      // User.getById(req.body.id)
      //   .then(user => {
      //     res.status(200).json(user)
      //   })
    })
});

router.delete('/:id', mw.validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  const { id } = req.params
  User.remove(id)
    .then(() => {
      res.status(200).json(req.user)
    })
});

router.get('/:id/posts', mw.validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  const { id } = req.params
  Post.get()
    .then(posts => {
      const filteredPosts = posts.filter(post => {
        return post.user_id === parseInt(id)
      })
      res.status(200).json(filteredPosts)
    })
});

router.post('/:id/posts', mw.validateUserId, mw.validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const { id } = req.params
  Post.insert({...req.body, user_id: parseInt(id)})
    .then(post => {
      res.status(200).json(post)
    })
});


// do not forget to export the router
module.exports = router