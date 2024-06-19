import { Types } from "mongoose"
import Category from "../models/Category"
import Product from "../models/Product"
import { categories } from "./data/catgories"
import { products } from "./data/products"

import colors from "colors"

export const seedDB = async () => {
    try {
        console.log(colors.cyan.bold("Iniciando..."))
        await Category.deleteMany({})
        const insertedCategories = await Category.insertMany(categories)
        
        const categoryMap = insertedCategories.reduce( (acc, category) => {
            acc[category.name] = category.id
            return acc
        } , {} as { [key : string] : Types.ObjectId } )

        const productsWithCategoryId = products.map( product => ( {
            ...product,
            category: categoryMap[product.category]
        } ) )
        
        await Promise.allSettled([
            Product.insertMany(productsWithCategoryId),
        ]); 

        console.log(colors.green.bold("Insercion exitosa"))
    } catch (error) {
        console.log(colors.red.bold("A ocurrido un error"))
    }
}