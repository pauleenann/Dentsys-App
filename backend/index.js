import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dentsys"
})

app.get("/submitted", (req, res) => {
    const q = "SELECT * FROM appointments";
    db.query(q, (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      return res.json(data);
    });
  });

app.post("/appoint", (req, res) => {
    const q = "INSERT INTO appointments(`fname`, `lname`,`mname`,`ename`,`email`,`phone`,`service`,`date`,`time`) VALUES (?)";
  
    const values = [
      req.body.fname,
      req.body.lname,
      req.body.mname,
      req.body.ename,
      req.body.email,
      req.body.phone,
      req.body.service,
      req.body.date,
      req.body.time,
    ];
  
    db.query(q, [values], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });


app.listen(3000, () => {
    console.log("Connected to backend.");
  });