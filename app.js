const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/task');

const app = express();
const port = 4200;

// mongodn atlas
//152.58.243.51
//p8PLyF9cL8bwXK6C // pwd 
//rselvakkumar91 // username
//mongodb+srv://rselvakkumar91:p8PLyF9cL8bwXK6C@mongolearn.z5onm.mongodb.net/
//mongodb+srv://rselvakkumar91:p8PLyF9cL8bwXK6C@mongolearn.z5onm.mongodb.net/?retryWrites=true&w=majority&appName=MongoLearn
//mongoose.connect('mongodb://localhost/taskboard', { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connect('mongodb+srv://rselvakkumar91:p8PLyF9cL8bwXK6C@mongolearn.z5onm.mongodb.net/library?retryWrites=true&w=majority&appName=MongoLearn', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

app.use(cors());
app.use(bodyParser.json());

app.use('/api', taskRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));



// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://rselvakkumar91:<db_password>@mongolearn.z5onm.mongodb.net/?retryWrites=true&w=majority&appName=MongoLearn";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
