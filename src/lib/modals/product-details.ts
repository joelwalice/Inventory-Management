import {Schema, models, model} from "mongoose";

const Product = new Schema({
    image : String,
    name : String,
    category : String,
    sku : String,
    incoming : String,
    stock : String,
    price : String,
})

const product = models.products || model('products', Product);

export default product;