// routes/task.js
const express = require('express');
const router = express.Router();
const  { Book, Author }  = require('../models/Task');


// aggeration



// Get all tasks
router.get('/tasks', async (req, res) => {
  try {
    // const tasks = await Book.find();
    // res.json(tasks);
    
    // const result = await Book.aggregate([
    //   { $match: { year: { $gt: new Date('2019') } } },  // Filter books published after 2000
    //   { $group: { _id: '$genre', count: { $sum: 1 } } },
    //   { $sort: { count: -1 } } // Sort by count in descending order
    // ]);
    //     console.log('Books count by genre:', result);
    //     res.json(result);
    const result = await Book.aggregate([
      {
        $lookup: {
          from: 'authors',
          localField: 'authorId',
          foreignField: '_id',
          as: 'authorDetails',
        },
      },
      { $unwind: '$authorDetails' },
      {
        $group: {
          _id: '$authorId', // Group by authorId (or any unique field for the author)
          name: { $first: '$authorDetails.name' },
          age: { $first: '$authorDetails.age' },
          bookCount: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0, // Exclude _id from the final output
          name: 1, // Include name
          age: 1, // Include age
          bookCount: 1, // Include book count
        },
      },
      { $sort: { bookCount: -1 } }, // Sort by bookCount in descending order
    ]);
    
    console.log(result);
    res.send(result);
    
  } catch (err) {
   res.status(500).json({ message: err.message });
   //res.send({id:1, status:'Todo'})
  }
});  

router.get('/login', async (req, res) => {
  try {
    console.log(req.params)
   const response =  [{
    userName: req.query.username,
    password: req.query.password,
    role: 'Salesadmin'
   }];
    res.json(response);
  } catch (err) {
   res.status(500).json({ message: err.message });
   //res.send({id:1, status:'Todo'})
  }
});  

// Create a new task
router.post('/tasks', async (req, res) => {
  // const task = new Book({
  //   title: req.body.title,
  //   description: req.body.description,
  //   status: req.body.status,
  //   author: req.body.author,
  //   year: req.body.year
  // });

  // try {
  //   const newTask = await task.save();
  //   res.status(201).json(newTask);
  // } catch (err) {
  //   res.status(400).json({ message: err.message });
  // }
  const books = [
    { "title": "1984", "authorId": 101, "year": 1949 },
    { "title": "To Kill a Mockingbird", "authorId": 102, "year": 1960 },
    { "title": "The Hobbit", "authorId": 103, "year": 1937 }
  ];
  const author = [
    { "_id": 101, "name": "George Orwell", "age": 46 },
    { "_id": 102, "name": "Harper Lee", "age": 34 },
    { "_id": 103, "name": "J.R.R. Tolkien", "age": 81 }
  ]
  try {
    console.log(Author);
    const result = await Author.insertMany(author);
    // console.log('Books inserted successfully:', result);
    res.json(result);
  } catch (err) {
    console.error('Error inserting books:');
    res.send(err)
  }

});

// Update task status
router.patch('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (req.body.status != null) {
      task.status = req.body.status;
    }
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a task
router.delete('/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
