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
   const sql = "select * from signup where email='"+email+"' and password='"+password+"'";
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

app.post('/postapplication', (req,res) =>{
    const name          = req.body.name;
    const dob           = req.body.dob;
    const gender        = req.body.gender;
    const status        = req.body.status;
    const mobile        = req.body.mobile;
    const email         = req.body.email;
    const sslc          = req.body.sslc;
    const puc           = req.body.puc;
    const graduation    = req.body.graduation;
    const pg            = req.body.pg;
    const certone       = req.body.certone;
    const certtwo       = req.body.certtwo;
    const certthree     = req.body.certthree;
    const workeone      = req.body.workone;  
    const worketwo      = req.body.worktwo;  
    const workethree    = req.body.workthree; 
    const achone        = req.body.achone; 
    const achtwo        = req.body.achtwo; 
    const achthree      = req.body.achthree; 
    const address       = req.body.address; 
    const position      = req.body.position;
    const cid           = req.body.cid
    const sql = "insert into application(code, name, dob, gender, status, mobile, email, sslc, puc, graduation, pg, certone, certtwo, certthree, workone, worktwo, workthree, achone, achtwo, achthree, address, position) values('"+cid+"', '"+name+"', '"+dob+"', '"+gender+"', '"+status+"', '"+mobile+"', '"+email+"', '"+sslc+"', '"+puc+"', '"+graduation+"', '"+pg+"', '"+certone+"', '"+certtwo+"', '"+certthree+"', '"+workeone+"', '"+worketwo+"', '"+workethree+"', '"+achone+"', '"+achtwo+"', '"+achthree+"', '"+address+"', '"+position+"')";
    mydatabase.query(sql, (error , rows, fields)=>{
        if(error) throw error
        res.send("Data saved successfully...!");
        res.end();
    })
})

app.post('/userdetails', (req, res)=>{
    const cid  = req.body.cid;
    const sql = "select * from application where code='"+cid+"' order by id desc";
    mydatabase.query(sql, (error, rows, fields)=>{
        if(error) throw error
          res.send(rows);
          res.end();
    })
})


app.listen(4000, function(){
    console.log("Server is running on port 4000");
})