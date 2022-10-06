const Posts = require('../model/Posts');
const asyncHandler = require('express-async-handler');

const getAllPosts = asyncHandler(async (req, res) => {
   const posts = await Posts.find().lean();
   if(!posts?.length) {
       res.status(400).json({ status: false, message: ' No post found' })
   }
   else {
      res.status(200).json({ status: true, posts })
   }
})

const createPosts = asyncHandler(async (req, res) => {
   const inputValue = req.body;
   if(!inputValue) return res.status(400).json({ status: false, message: `All fields are required` })

   const duplicate = await Posts.findOne({ title: inputValue.title })
   duplicate && res.status(400).json({ status: false, message: 'Duplicate title' })

   const newPost = { ...inputValue, completed: true}
   const result = await Posts.create(newPost)

   res.status(201).json({ status: true, result })
})

const editPost = asyncHandler(async (req, res) => {
   const id = req.params.id
   const inputValue = req.body;

   if(!id) return res.status(403).json({ status: false, message: `Post id required` })
   if(!inputValue) return res.status(400).json({ status: false, message: `All fields are required` })

   const currentPost = await Posts.findByIdAndUpdate(id, { $set: inputValue })
   !currentPost && res.status(404).res.json({ status: false, message: `Post with id: ${id} not found` })

   res.status(200).json({ status: true, currentPost });
})

const deletePost = asyncHandler(async (req, res) => {
   const id = req.params.id;
   if(!id) return res.status(400).json({ status: false, message: 'id required' })
   const posts = await Posts.find().lean()
   //delete post by id
   if(posts.length === 1) return res.sendStatus(204)
   
   else{
      const post = await Posts.findById(id).exec();
      if(!post) {
         return res.status(400).json({ status: false, message: `Post with id: ${id} not found` }) 
      }
         await post.deleteOne()
      res.sendStatus(204)
   }
})

const getPost = asyncHandler(async (req, res) => {
   const id = req.params.id
 
   if(!id) {
      return res.status(400).json({ status: false, message: `Post id required` })
   }
   const post = await Posts.findById(id).exec();
   !post && res.status(400).res.json({ status: false, message: `Post with id: ${id} not found` })

   res.status(200).json({ status: true, post })
})

module.exports = { getAllPosts, createPosts, editPost, deletePost, getPost }