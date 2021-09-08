const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json())
app.use(cors())

// MySQL Connection
const mysql = require('mysql');
const mydatabase = mysql.createConnection({
    host: 'localhost',
    user:  'root',
    password: '',
    database: 'career' 
});
mydatabase.connect();

// Register function
app.post("/signup", (req, res) =>{
  const name = req.body.uname;
  const email = req.body.email;
  const mobile = req.body.mobile;
  const password = req.body.password;
  const sql = "insert into signup(name, email, mobile, password) values('"+name+"', '"+email+"', '"+mobile+"', '"+password+"')";
  mydatabase.query(sql, (error, rows, fields)=>{
      if(error) throw error
      res.send("Registration Successfull");
      res.end();
  })
})

app.post("/login", (req, res)=>{
   const email   = req.body.email;
   const password = req.body.password;
   const sql = "select * from signup where email='"+email+"', and password='"+password+"'";
   mydatabase.query(sql ,(error, rows, fields)=>{
       if(error) throw error
       if(rows.length > 0){
           res.send(rows);
           res.send();
       } else{
           res.send({"id":""});
           res.end();
       }
   })
})


app.listen(4000, function(){
    console.log("Server is running on port 4000");
})