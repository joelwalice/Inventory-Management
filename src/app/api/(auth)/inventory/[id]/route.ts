import connect from "../../../../../lib/db";
import products from "../../../../../lib/modals/product-details";

export const PUT = async (req: Request) => {
    const body = await req.json();
    console.log(body);
    const id = req.url.split("inventory/")[1];
    await products.findByIdAndUpdate(id, {
        name : body.name,
        category : body.category,
        sku : body.sku,
        incoming : body.incoming,
        stock : body.stock,
        image : body.image,
        price : body.price
    })
        .then(data => {
            console.log(data);
            return new Response(JSON.stringify({message : "Data", data : data}), {status : 201});

        })
        .catch(err => {
            return new Response(JSON.stringify({ message: 'Data not found', data : err}), { status: 404, });
        })
}
export const GET = async (req : Request) => {
    const id = req.url.split("inventory/")[1];
    try {
        const product = await products.findById(id);
        if (!product) {
            return new Response(JSON.stringify({ message: 'Data not found'}), { status: 404, });
        }
        return new Response(JSON.stringify({ message: 'Data found', data : product }), { status: 201, });
        
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Server Error' }), { status: 500, });
    }
};