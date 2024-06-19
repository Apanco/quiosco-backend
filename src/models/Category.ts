import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import { ProductInterface } from "./Product";

export type CategoryType = Document & {
    name: string,
    slug:string,
    products: PopulatedDoc< ProductInterface & Document >[]
}

const CategorySchema : Schema = new Schema({
    name:{
        type: String,
        required:true,
    },
    slug:{
        type: String,
        required:true,
    },
    products:[
        {
            type: Types.ObjectId,
            ref: "Product"
        }
    ]
})

const Category = mongoose.model<CategoryType>('Category',CategorySchema)

export default Category