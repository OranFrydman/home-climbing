const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT=process.env.PORT || 8080;
const CRUD = require("./CRUD-Functions");
const sql = require('./db');
const connection = require('./db');
const cookieParser = require('cookie-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true
}));
// view engine setup
app.engine('html',require('pug').renderFile);
app.set('views', path.join(__dirname, 'VIEWS'));
app.set('view engine', 'pug');
//routings
app.use(express.static(path.join(__dirname, 'public')));
app.get('/',(req, res)=>{
   
   res.render('HomePage',{user: "Welcome back "+GetUser(req,res,"name")});
}); 
app.get('/Workout',(req, res)=>{
   res.render('Workout',{user: "Welcome, "+GetUser(req,res,"name")});
});
app.get('/HomePage',(req, res)=>{
   res.render('HomePage',{user: "Welcome, "+GetUser(req,res,"name")});
});
app.get('/Statistics',CRUD.PullStats);

app.post("/createNewClimber", CRUD.createNewClimber);
app.post("/Login", CRUD.Login);
app.post("/createNewRecords", CRUD.createNewRecords);
app.post("/FilterStats", CRUD.PullFilters);


    function GetUser(req,res,field){
      if (req.get("Cookie"))
      {
         var session = req.get("Cookie");
         console.log("Session is +"+session)
         var splitSession = session.split(/=|;/);
         var email = splitSession[1];
         var username = splitSession[3];
         console.log(email);
         console.log(username);
         if(field =="email") return email;
         if(field=="name") return username;
      }
      if(field =="email") return "Guest@Guest.Guest";
      if(field=="name") return "Guest";
      
     };
     

     app.listen(PORT,()=>{
      console.log("Server is running on port"+PORT)
  });

