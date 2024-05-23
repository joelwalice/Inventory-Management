import db from "../../../../lib/db";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    
    // Default empty string if image is null
    if (body.image === null) {
      body.image = "";
    }

    // Create a new promise to insert the product
    const newProduct = await new Promise((resolve, reject) => {
      const query = 'INSERT INTO products (name, category, sku, incoming, stock, price) VALUES (?, ?, ?, ?, ?, ?)';
      const values = [body.name, body.category, body.sku, body.incoming, body.stock, body.price];

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

export const GET = async () => {
  try {
    const products = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM products", (err: any, results: []) => {
        if (err) {
          reject(err);
          console.log("No")
        }
        else {
          resolve(results);
          console.log("Executed");
        }
      })
    })
    if (!products) return new Response('Error');
    if (products) {
      return new Response(JSON.stringify({ data: products }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: 'No products found' }), { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return new Response(JSON.stringify({ message: "Error in fetching products", error }), { status: 500 });
  }
}