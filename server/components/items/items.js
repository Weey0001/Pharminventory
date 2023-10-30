let express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  uri = "mongodb://127.0.0.1:27017",
  options={
    dbName:"Tovo",
    useUnifiedTopology: true ,
    useNewUrlParser: true
  },
  Item = require("./itemshema"),
  Commandes = require("../commandes/commandeschema");
  
  mongoose.connect(uri,options);
  
  let connection = mongoose.connection;
  
  connection.once(
    "open",
    ()=>{
      console.log("Connection to MongoDb established...")
    }
  )
  
  router.route("/")
    .get((req,res)=>{
      Item.find()
        .then(result=>{
          res.json(result);
        })
        .catch(err=>res.json(err))
    })
    
  router.route("/search")
    .post((req,res)=>{
      var {key} = req.body;
      let keymin = key.toLowerCase();
      Item.find({key:{$regex:keymin}})
        .then(results=>{
          res.json(results)
          
        })
        .catch(err=>res.json(err))
      
    })  
    
  router.route("/add")
    .post((req,res)=>{

      let {
        grossiste,
        facture,
        name,
        inPrice,
        marge,
        count,
        tva, 
      } = req.body,
      key = name.toLowerCase();
      let outPrice;
      if(tva){
        outPrice = Number(inPrice)*1.2*(1+(Number(marge)/100))
      }else{
        outPrice =  Number(inPrice)*(1+(Number(marge)/100))
      }
      let item = {
        grossiste:grossiste,
        facture:facture,
        name:name,
        key:key,
        inPrice:Number(inPrice),
        marge:Number(marge),
        count:Number(count),
        tva:tva,
        outPrice:outPrice
      };

      let newItem = new Item(item);

      newItem.save()
        .then(_=>{
          Item.find()
            .then(result=>{
              res.json(result);
            })
            .catch(err=>res.json(err))
        })
        .catch(err=>res.json(err))
        
    })

  router.route('/remove')
    .post((req,res)=>{
      let {_id}=req.body;
      Item.findByIdAndDelete({_id:_id})
        .then(_=>{
          res.json("Item deleted")
        })
        .catch(err=>res.json(err))
    })
  
  router.route("/update")
    .post((req,res)=>{
      req.body.forEach(element => {
        // Item.update({key:element.name},{count:element.count})
        //   .then(result=>{
        //     result.count -= element.count;

        //   })
        //a revoir !!!!!!
      });
    })
  
module.exports= router;