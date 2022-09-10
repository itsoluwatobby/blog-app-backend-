const express = require('express');
const router = express.Router();
const postController = require('../controller/postController')

router.route('/posts')
      .get(postController.getAllPosts)
      .post(postController.createPosts)
router.route('/posts/:id')
      .get(postController.getPost)
      .patch(postController.editPost)
      .delete(postController.deletePost)

module.exports = router