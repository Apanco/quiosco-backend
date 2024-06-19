import type { Request, Response, NextFunction} from "express"; 
import Category, { CategoryType } from "../models/Category";

declare global{
    namespace Express {
        interface Request {
            category: CategoryType
        }
    }
}

export async function validateCategoryExist( request:Request, response:Response, next:NextFunction ){
    try {
        //. ->  Obtener id
        const { categoryId } = request.params
        const category = await Category.findById(categoryId);
        if(!category){
            const error = new Error("Categoria no encontrada")
            return response.status(404).json({error:error.message})
        }
        request.category = category
        next()
    } catch (error) {
        response.status(500).json({error:"Hubo un error al procesar la solicitud"})
    }
}