let express = require("express"),
    app = express(),
    cors = require("cors"),
    port = 5000;
    
    app.use(
      '/static',
       express.static('public')
    );
    
    app.use(cors())
    app.use(express.json())
    
    let items = require("./components/items/items");
    app.use("/items",items)
    
    app.listen(port,()=>{
      console.log("Server is runnig...")
    })