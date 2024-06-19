import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import { CategoryType } from "./Category";

//. ->  Type

export interface ProductInterface extends Document {
    name: string,
    price:number,
    image:string,
    category: Types.ObjectId
}

//. ->  Schema
const ProductSchema : Schema = new Schema({
    name:{
        type: String,
        required:true,
    },
    price:{
        type: Number,
        required:true,
    },
    image:{
        type: String,
        required:true,
    },
    category:{
        type: Types.ObjectId,
        ref:"Category"
    }
})
//. ->  Model
const Product = mongoose.model<ProductInterface>("Product", ProductSchema)
export default Product