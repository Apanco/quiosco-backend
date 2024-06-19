import type { Request, Response } from "express"
import Category from "../models/Category"

export class CategoryController {
    //# ->  C = Create category
    static createCategory = async ( request: Request, response : Response ) => {
        const category = new Category(request.body)
        try {
            await category.save()
            response.send("Categoria creada correctamente")
        } catch (error) {
            
        }
    }
    //# ->  R = Read category
    static getAllCategories = async ( request: Request, response : Response ) => {
        try {
            const categories = await Category.find({})
            response.json(categories)
        } catch (error) {
            
        }
    }
    //# ->  R = Read category
    static getCategoryById = async ( request: Request, response : Response ) => {
        try {
            const catgoryId = request.params.categoryId
            const category = await Category.findById(catgoryId).populate({
                path:"products"
            })
            response.json(category)
        } catch (error) {
            
        }
    }

    //# ->  U = Update category
    static updateCategoryById = async ( request: Request, response : Response ) => {
        const id = request.params.id
        try {
            const category = request.category
            category.name = request.body.name
            category.slug = request.body.slug
            await category.save()
            response.status(200).send("Categoria actualizada correctamente")
        } catch (error) {
            
        }
    }
    //# ->  D = Delete category
    static deleteCategoryBiId = async ( request: Request, response : Response ) => {
        try {
            const category = request.category
            await category.deleteOne()
            response.status(204).send("Categoria eliminado")
        } catch (error) {
            
        }
    }
}