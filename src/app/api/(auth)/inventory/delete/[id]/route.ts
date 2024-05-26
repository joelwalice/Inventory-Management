import db from "../../../../../../lib/db";

export const DELETE = async (req:Request) => {
    const sku = req.url.split('delete/')[1];
    console.log(sku);
    try{
        const data = await new Promise((resolve, reject) => {
            db.query(`DELETE FROM products WHERE sku = ?`,[sku],(err : any, results : any) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve(results);
                }
            })
        })
        if(data){
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