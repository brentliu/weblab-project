const mongoose = require("mongoose");

//define a blob schema for the database
const BlobSchema = new mongoose.Schema({
    player_id: String,
    x: Number,
    y: Number,
    infected: Boolean,
});

// compile model from schema
module.exports = mongoose.model("blob", BlobSchema);
