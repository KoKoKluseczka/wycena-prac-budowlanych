// Importuj bibliotekę mongoose
const mongoose = require('mongoose');

// Definiuj schemat dla modelu czynności
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

// Twórz model czynności na podstawie zdefiniowanego schematu
const Activity = mongoose.model('Activity', activitySchema);

// Eksportuj model, aby można go było używać w innych plikach
module.exports = Activity;
