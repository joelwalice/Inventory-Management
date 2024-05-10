import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import connect from "../../../../../lib/db";
import Admin from "../../../../../lib/modals/user-details"

const JWT_SECRET = "jwtsupersecret";

export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        await connect();
        const user = await Admin.findOne({ email: body.email });
        console.log(user);

        if (!user) {
            return new Response(JSON.stringify({ message: 'No User' }), { status: 404 });
        }

        const isMatch = await bcrypt.compare(body.password, user.password);
        if (!isMatch) {
            return new Response(JSON.stringify({ message: 'Invalid Credentials' }), { status: 401 });
        }

        const token = jwt.sign({ email: body.email }, JWT_SECRET);
        return new Response(JSON.stringify({data : {token, name:user.name, email: user.email, password: user.password} }), { status: 201 });
    } catch (error) {
        console.error("Error:", error);
        return new Response(JSON.stringify({ message: 'Error' }), { status: 500 });
    }
}

