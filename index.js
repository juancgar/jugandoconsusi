
const express = require('express')
const hostname = '127.0.0.1';
const port = 3000;
const path = require('path');

const mongoose = require('mongoose');
const mongodb = require('mongodb')
const bodyParser = require('body-parser');
//express object
const app = express();
//body parser
app.use(bodyParser.urlencoded({limit:'10mb', extended:true}));
app.use(bodyParser.json({limit:'10mb', extended:true}));
//connect to db
// mongo evade deprecated
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost/eyap",{
    useUnifiedTopology: true,
    useNewUrlParser: true
},(err)=>{
    if(err)
        console.log("error en la conexcion: " + err);
    else
        console.log("Conexion exitosa");
});


//routes

app.get('/',function (req,res){
  res.sendFile(path.join(__dirname,'/home.html'))
})
app.get('/home',function (req,res){
  res.sendFile(path.join(__dirname,'/home.html'))
})
app.get('/calendarEncinos',function (req,res){
  res.sendFile(path.join(__dirname,'/calendarEncinos.html'))
})
app.get('/calendarCumbres',function (req,res){
  res.sendFile(path.join(__dirname,'/calendarCumbres.html'))
})
app.get('/reserva',function (req,res){
  res.sendFile(path.join(__dirname,'/reserva.html'))
})
app.get('/visual/home.css',function (req,res){
  res.sendFile(path.join(__dirname,'/visual/home.css'))
})
app.get('/script/reserva.js',function (req,res){
  res.sendFile(path.join(__dirname,'/script/reserva.js'))
})
app.get('/scripts/calendar.js',function (req,res){
  res.sendFile(path.join(__dirname,'/scripts/calendar.js'))
})

app.listen(port, () => console.log(`Server started on port ${port}`));

//mongodb models
const parkModel = require("./models/park")
const events = require("./models/events");


app.get('/calendar/:id',function(req,res){

 
  parkModel.findById(req.params.id).populate("eventKey").then(response=>{
    res.json(response)
  }).catch(err => {
    res.send(err)
  })

});

app.post('/calendar/create-park',function(req,res){
  
  let newPark = new parkModel({
    name : req.body.name,
    url : req.body.url,
    direccion: req.body.dir,
  });
  
  newPark.save((err,data)=>{
    if(err)
    {
      return res.json({message:"no jalo xd"})
    }
    else
    {
      return res.json({message:"pos si jalo xd"})
    }

    })

  })
app.put('/reserva/add-event/:id',function(req,res)
{
  console.log(req.body)
  let newEvent = new events({
    title : req.body.title,
    start: req.body.start,
    owner: req.body.owner,
    numPersonas: req.body.numPersonas,
    time: req.body.time
  });
  newEvent.save((err,data)=>{
    if(err)
    {
      return res.json({message:"no jalo xd"})
    }
    else{
      console.log("si lo encontro jaja")
    }
    
    parkModel.findByIdAndUpdate(req.params.id,{
      $push : {eventKey: data.id}
    }).then(response=>{
      return res.json({message:"si lo metio jaja"})
    }).catch(errorMemes =>{
      return res.json({message:errorMemes})
    })
      
    });
  
  
});



