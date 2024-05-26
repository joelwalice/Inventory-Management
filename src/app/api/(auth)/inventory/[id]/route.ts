import db from "../../../../../lib/db";

export const PUT = async (req: Request) => {
    const sku = req.url.split("inventory/")[1]; // Assuming sku is passed as a parameter
    const body = await req.json();

    try {
        const updateProduct = await new Promise((resolve, reject) => {
            const query = `
                UPDATE products 
                SET name = ?, category = ?, incoming = ?, stock = ?, image = ?, price = ?
                WHERE sku = ?
            `;
            const values = [body.name, body.category, body.incoming, body.stock, body.image, body.price, sku];

            db.query(query, values, (err: any, results: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });

        if (updateProduct.affectedRows > 0) {
            return new Response(
                JSON.stringify({ message: "Data Updated" }),
                { status: 201 }
            );
        } else {
            return new Response(
                JSON.stringify({ message: "Product not found" }),
                { status: 404 }
            );
        }
    } catch (err) {
        return new Response(
            JSON.stringify({ message: 'Error updating product', data: err }),
            { status: 500 }
        );
    }
};

export const GET = async (req: Request) => {
    const sku = req.url.split("inventory/")[1];
    try {
        const product = await new Promise((resolve, reject) => {
            const query = `SELECT * FROM products WHERE sku = ?`;
            db.query(query, [sku], (err: any, results: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        })
        if (!product) {
            return new Response(JSON.stringify({ message: 'Data not found' }), { status: 404, });
        }
        console.log(product);
        return new Response(JSON.stringify({ message: 'Data found', data: product }), { status: 201, });

    } catch (error) {
        return new Response(JSON.stringify({ message: 'Server Error' }), { status: 500, });
    }
};