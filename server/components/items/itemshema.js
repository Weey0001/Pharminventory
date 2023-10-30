let mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
  let itemSchema = new Schema(
    {
      grossiste:String,
      facture:String,
      name:String,
      key:String,
      inPrice:Number,
      marge:Number,
      count:Number,
      tva:Boolean,
      outPrice:Number
    },{
      collection:'items',
      timestamps: true
    }
  ),
  Item = mongoose.model("Item",itemSchema);
  
  module.exports = Item