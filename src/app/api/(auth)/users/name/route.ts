import db from "../../../../../lib/db";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const newProduct = await new Promise((resolve, reject) => {
      const query = 'UPDATE users SET fname = ? , lname = ? WHERE email = ?';
      const values = [body.fname, body.lname, body.email];

      db.query(query, values, (err: any, results: []) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    return new Response(JSON.stringify({ message: "Data is created", data: newProduct }), { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return new Response(JSON.stringify({ message: "Error in creating product", error }), { status: 500 });
  }
}

