import connect from "../../../../lib/db";
import product from "../../../../lib/modals/product-details";

export const POST = async (req: Request) => {

  try {
    const body = await req.json();
    await connect();
    const star = new product(body);
    await star.save();
    return new Response(
      JSON.stringify({ message: "Data is created", data: star }), { status: 201 });
  }
  catch (error) {
    return new Response(JSON.stringify({ message: "Error in creating user", error, }), { status: 500, });
  }
}

export const GET = async () => {
  try {
    await connect();
    const products = await product.find();
    if (products.length > 0) {
      return new Response(JSON.stringify({ data: products }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: 'No products found' }), { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return new Response(JSON.stringify({ message: "Error in fetching products", error }), { status: 500 });
  }
}
