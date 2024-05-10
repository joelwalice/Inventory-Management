import products from "../../../../../../lib/modals/product-details";

export const DELETE = async (req:Request) => {
    const id = req.url.split('delete/')[1];
    console.log(id);
    try{
        if(await products.deleteOne({id})){
            return new Response(JSON.stringify({message : "Data Deleted"}), {status : 201})
        }
        else{
            return new Response(JSON.stringify({message : "Data Error"}), {status : 404})
        }
    }
    catch(err){
        console.log(err);
    }
}