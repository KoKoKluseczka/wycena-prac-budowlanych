const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/wycena-prac-budowlanych', { useNewUrlParser: true, useUnifiedTopology: true });

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

app.post('/rooms', async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.send(room);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/activities', async (req, res) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    res.send(activity);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/rooms', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.send(rooms);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/activities', async (req, res) => {
  try {
    const activities = await Activity.find();
    res.send(activities);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/calculateCost', async (req, res) => {
  try {
    const { roomId, surfaceType, activityId } = req.body;

    const room = await Room.findById(roomId);
    const activity = await Activity.findById(activityId);

    if (!room || !activity) {
      return res.status(404).send('Room or activity not found');
    }

    let cost = 0;

    switch (surfaceType) {
      case 'floor':
        cost = room.length * room.width * activity.costPerSquareMeter;
        break;
      case 'wall':
        cost = 2 * (room.length + room.width) * room.height * activity.costPerSquareMeter;
        break;
      case 'ceiling':
        cost = room.length * room.width * activity.costPerSquareMeter;
        break;
      default:
        return res.status(400).send('Invalid surface type');
    }

    res.send({ cost });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
