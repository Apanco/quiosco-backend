import type { Request, Response, NextFunction } from "express"
import Product, { ProductInterface } from "../models/Product"

declare global{
    namespace Express {
        interface Request {
            product: ProductInterface
        }
    }
}

export async function validateProductExist( request:Request, response:Response, next:NextFunction ){
    try {
        const { productId } = request.params
        const product = await Product.findById(productId)
        if(!product){
            const error = new Error("Producto no encontrado")
            return response.status(404).json({error:error.message})
        }
        request.product = product
        next()
    } catch (error) {
        response.status(500).json({error:"Hubo un error al procesar la solicitud"})
    }
}