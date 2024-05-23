import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import db from "../../../../../lib/db";
const JWT_SECRET = "jwtsupersecret";

export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        const user : any = await new Promise((resolve, reject) => {
            db.query(`SELECT * FROM users WHERE email = ?`,body.email,(err: any, results: []) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve(results);
                }
            })
        })

        const users = user[0];

        console.log('user', users)

        if (!user) {
            return new Response(JSON.stringify({ message: 'No User' }), { status: 404 });
        }

        const isMatch = await bcrypt.compare(body.password, users.passwd);
        if (!isMatch) {
            return new Response(JSON.stringify({ message: 'Invalid Credentials' }), { status: 401 });
        }

        const token = jwt.sign({ email: body.email }, JWT_SECRET);
        return new Response(JSON.stringify({data : {token, name:users.fname + ' ' + users.lname, email: users.email, password: users.passwd} }), { status: 201 });
    } catch (error) {
        console.error("Error:", error);
        return new Response(JSON.stringify({ message: 'Error' }), { status: 500 });
    }
}

