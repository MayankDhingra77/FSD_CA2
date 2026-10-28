const mongoose = require("mongoose");
const Book = require("../models/Book");
exports.createBook = async(req, res, next)=>{
  try {
    const{title, author, category} = req.body ;
    if (!title || typeof title !== "string" || title.trim() === ""){
      return res.status(400).json({message: "Title is required"});
    }
    const book = await Book.create({title, author, category});
    return res.status(201).json({
      message: "Book added successfully",
      data: book,
    });
  } catch (err) {
    next(err);
  }
};
exports.getBooks = async (req, res, next) => {
  try{
    const page = parseInt(req.query.page) || 1;   
    const limit = parseInt(req.query.limit) || 10; 
    if(page < 1 || limit < 1){
      return res.status(400).json({ message: "page and limit must be positive numbers",});
    }
    const skip = (page - 1)*limit;
    const totalRecords = await Book.countDocuments();
    const books = await Book.find().sort({createdAt: -1}).skip(skip).limit(limit);
    return res.status(200).json({
      currentPage: page,
      limit,
      totalRecords,
      totalPages: Math.ceil(totalRecords / limit),
      data: books,
    });
  } 
  catch (err) {
    next(err);
  }
};
exports.updateAvailability = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isAvailable } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({message: "Invalid book ID"});
    }
    if (typeof isAvailable !== "boolean") {
      return res.status(400).json({ message: "isAvailable is required and must be true or false", });
    }
    const book = await Book.findByIdAndUpdate(id, { isAvailable }, { new: true });
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }
    return res.status(200).json({
      message: "Book availability updated",
      data: book,
    });
  }
  catch (err) {
    next(err);
  }
};
