import bcrypt from "bcrypt"
import db from "../../../../lib/db";


export const GET = async (request: Request) => {
    try{
        const users = await new Promise((resolve, reject) => {
          db.query("SELECT * FROM users",(err : any, results : []) => {
            if(err){
              reject(err);
            }
            else{
              resolve(results)
            }
          })
        });
        return new Response(JSON.stringify(users), {status:200});
    }
    catch(err){
        return new Response(JSON.stringify(err), {status: 500});
    };
}

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    console.log('Request body:', body);

    // Hash the password
    const hashedPassword = await bcrypt.hash(body.password, 10); // 10 is the saltRounds
    console.log('Hashed password:', hashedPassword);

    // Insert new user into the database
    const newAdmin = await new Promise((resolve, reject) => {
      const query = `INSERT INTO users (fname, lname, email, passwd, phone, profile) VALUES (?, ?, ?, ?, ?, ?)`;
      const values = [body.fname, body.lname, body.email, hashedPassword, body.phone, ""];
      
      db.query(query, values, (err: any, results: any) => {
        if (err) {
          console.error('Database query error:', err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    return new Response(
      JSON.stringify({ message: "User is created", user: newAdmin }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in creating user:', error);
    return new Response(
      JSON.stringify({ message: "Error in creating user", error }),
      { status: 500 }
    );
  }
};
