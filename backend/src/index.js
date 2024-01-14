// Importy
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Aplikacja Express
const app = express();
const PORT = process.env.PORT || 5000;

// Połączenie z MongoDB
mongoose.connect('mongodb://localhost:27017/wycena-prac-budowlanych', { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// Schemat i model dla pomieszczeń
const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  length: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
});

const Room = mongoose.model('Room', roomSchema);

// Schemat i model dla czynności
const activitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  costPerSquareMeter: {
    type: Number,
    required: true,
  },
});

const Activity = mongoose.model('Activity', activitySchema);

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Endpoint do dodawania pomieszczeń
app.post('/rooms', async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.send(room);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Endpoint do dodawania czynności
app.post('/activities', async (req, res) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    res.send(activity);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Endpoint do pobierania pomieszczeń
app.get('/rooms', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.send(rooms);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Endpoint do pobierania czynności
app.get('/activities', async (req, res) => {
  try {
    const activities = await Activity.find();
    res.send(activities);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Start serwera
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
