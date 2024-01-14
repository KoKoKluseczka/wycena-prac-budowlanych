// Importuj bibliotekę mongoose
const mongoose = require('mongoose');

// Definiuj schemat dla modelu pomieszczenia
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

// Twórz model pomieszczenia na podstawie zdefiniowanego schematu
const Room = mongoose.model('Room', roomSchema);

// Eksportuj model, aby można go było używać w innych plikach
module.exports = Room;
