import { MYSQL_PASSWORD } from "../../utils/constants";

const mysql = require("mysql")

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: MYSQL_PASSWORD,
  database: "inventory"
})

db.connect((err: any) => {
  if(err){
    console.log('Error in connecting : ', err);
  }
  else{
    console.log('Connected to database');
  }
})

export default db;