// models/Task.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, },
  description: String,
  status: { type: String, default: "todo" }, // 'todo', 'in-progress', 'done'
  created_at: { type: Date, default: Date.now },
  author: { type: String },
  authorId: Number,
  year: Number,
  genre: { type: String },
});

const authorSchema = new mongoose.Schema({
  _id: { type: Number, required: true }, 
  name: String,
  age: Number,
});

//const Book = mongoose.model('Book', bookSchema, 'books');
exports.Author = mongoose.model('Author', authorSchema, 'authors');
exports.Book = mongoose.model('Book', bookSchema, 'books');
