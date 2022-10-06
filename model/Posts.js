const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
   {
      title: { 
         type: String, 
         required: true, 
         unique: true 
      },
      dateTime: {
         type: String
      },
      body: { 
         type: String, 
         required: true 
      },
      completed: { 
         type: Boolean, 
         default: false 
      }
   }
)

module.exports = mongoose.model('Posts', postSchema)