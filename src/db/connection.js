const mongoose = require("mongoose");

mongoose.connect("Your Mongo_URI here", {

    useNewUrlParser: true,
    useUnifiedTopology: true

}).then(()=>{

    console.log("Connection Successfull!");

}).catch((e)=>{

    console.log(e);
});
