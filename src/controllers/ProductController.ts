import type { Request, Response } from "express"
import Product from "../models/Product"
import Category from "../models/Category"


export class ProductController {

    //# ->  C = Create product
    static createProduct = async ( request: Request, response : Response ) => {
        try {
            const category = request.category
            const product = new Product(request.body)
            product.category=category.id
            category.products.push(product.id)
            await Promise.allSettled([
                product.save(),
                category.save()
            ])
            response.send("Producto creado correctamente")
        } catch (error) {
            response.status(500).json({error:"Hubo un error al procesar la solicitud"})
        }
    }
    
    //# ->  R = Get all products
    static getAllProducts = async ( request: Request, response : Response ) => {
        try {
            const products = await Product.find({})
            response.json(products)
        } catch (error) {
            response.status(500).json({error:"Hubo un error al procesar la solicitud"})
        }
    }
    //# ->  R = Get products by category slug
    static getProductsBySlug = async ( request: Request, response : Response ) => {
        try {
            const slug = request.params.slug
            const category = await Category.find({slug:slug})
            if(!category.length){
                const error = new Error("Categoria no encontrada")
                return response.status(404).json({error:error.message})
            }
            const products = await Product.find({category:category[0].id})
            response.json(products)
        } catch (error) {
            response.status(500).json({error:"Hubo un error al procesar la solicitud"})
        }
    }
    //# ->  U = Update products
    static updateProduct = async ( request: Request, response : Response ) => {
        try {
            const category = request.category
            const product = request.product

            const previusCategory = await Category.findById(product.category)
            if(product.category.toString() !== category.id.toString()){
                //. ->  Eliminar de categoria previa
                previusCategory.products = previusCategory.products.filter(productC => productC._id.toString() !== product.id.toString())
                //. ->  Agregar a nueva categoria
                category.products.push(product.id)
            }
            //. ->  Actualizar datos
            product.name = request.body.name
            product.price = request.body.price
            product.image = request.body.image
            product.category = category.id
            await Promise.allSettled([
                previusCategory.save(),
                category.save(),
                product.save()
            ])
            response.send("Producto actualizado correctamente")
        } catch (error) {
            response.status(500).json({error:"Hubo un error al procesar la solicitud"})
        }
    }
    static deleteProduct =  async ( request: Request, response : Response ) => {
        try {
            const product = request.product
            const category = await Category.findById(product.category)

            category.products = category.products.filter(productC => productC.toString() !== product.id.toString())

            await Promise.allSettled([
                category.save(),
                product.deleteOne()
            ])
            response.send("Producto eliminado correctamente")

        } catch (error) {
            response.status(500).json({error:"Hubo un error al procesar la solicitud"})
        }
    }
}