let mongoose = require('mongoose'),
Schema = mongoose.Schema;

let commandeschema = new Schema(
    {
        key: String,
        count: Number,
        price:Number,
        totalPrice:Number,
        
    },
    {
        collection: "commandes",
        timestamps: true,
    }
),
Commandes = mongoose.model("Commandes",commandeschema);

module.exports = Commandes;