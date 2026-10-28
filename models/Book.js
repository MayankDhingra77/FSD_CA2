// models/Book.js -> Mongoose schema & model
const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  title:{
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  author:{
    type: String,
    trim: true
  },
  category:{
    type: String,
    trim: true 
  },
  isAvailable:{
    type: Boolean,
    default: true 
  },
  createdAt:{ type: Date,
    default: Date.now 
  },
});

module.exports = mongoose.model("Book", bookSchema);
