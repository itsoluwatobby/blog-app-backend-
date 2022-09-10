const Posts = require('../model/Posts');
const asyncHandler = require('express-async-handler');
const { format } = require('date-fns');

const getAllPosts = asyncHandler(async (req, res) => {
   const posts = await Posts.find().lean();
   if(!posts?.length) {
       res.status(400).json({ message: ' No post found' })
   }
   else {
      res.status(200).json({data: posts})
   }
})

const createPosts = asyncHandler(async (req, res) => {
   const { title, post } = req.body;

   if(!title || !post) return res.status(400).json({message: `All fields are required`})

   const duplicate = await Posts.findOne({ title })
   duplicate && res.status(400).json({message: 'Duplicate title'})

   const datetime = format(new Date(), 'MMMM dd yyyy | pp')
   const newPost = { title, datePost: datetime, post, completed: true}
   const result = await Posts.create(newPost)

   res.status(201).json(result)
})

const editPost = asyncHandler(async (req, res) => {
   const id = req.params.id
   const { title, post } = req.body;

   if(!id) return res.status(400).json({message: `Post id required`})
   if(!title || !post) return res.status(400).json({message: `All fields are required`})

   const currentPost = await Posts.findById(id).exec();
   !currentPost && res.status(400).res.json({message: `Post with id: ${id} not found`})

   const datetime = format(new Date(), 'MMMM dd yyyy | pp')

   currentPost.title = title;
   currentPost.datePost = datetime;
   currentPost.post = post;
   
   const result = await currentPost.save();

   res.status(200).json(`Post (${result.title}) updated`);
})

const deletePost = asyncHandler(async (req, res) => {
   const id = req.params.id;

   if(!id) return res.status(400).json({message: 'id required'})

   const post = await Posts.findById(id).exec();
   if(!post) {
      return res.status(400).json({message: `Post with id: ${id} not found`}) 
   }
      await post.deleteOne()
   res.sendStatus(204)
})

const getPost = asyncHandler(async (req, res) => {
   const id = req.params.id
   
   if(!id) {
      return res.status(400).json({message: `Post id required`})
   }
   const post = await Posts.findById(id).exec();
   !post && res.status(400).res.json({message: `Post with id: ${id} not found`})

   res.status(200).json(post)
})

module.exports = { getAllPosts, createPosts, editPost, deletePost, getPost }