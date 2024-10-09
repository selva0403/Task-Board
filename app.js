const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/task');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/taskboard', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

app.use(cors());
app.use(bodyParser.json());

app.use('/api', taskRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
