import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";
import { body, param } from "express-validator"
import { handleInputErrors } from "../middleware/validation";
import { validateCategoryExist } from "../middleware/category";
//# ->  Crear router
const router = Router()

//# ->  Rutas

//. -> Crear categoria
router.post("/",
    body("name").notEmpty().withMessage("El nombre de la categoria es obligatoria"),
    body("slug").notEmpty().withMessage("El slug de la categoria es obligatoria"),
    handleInputErrors,
    CategoryController.createCategory
)

//. ->  Obtener categorias
router.get("/", CategoryController.getAllCategories)

//# ->  Asignar middleware por param
router.param("categoryId", validateCategoryExist)

//. ->  Obtener categoria por su id
router.get("/:categoryId", 
    param("categoryId").isMongoId().withMessage("No valido") ,
    handleInputErrors,    
    CategoryController.getCategoryById
)

//. -> Actualizar categoria
router.put("/:categoryId", 
    param("categoryId").isMongoId().withMessage("Id no valido"),
    body("name").notEmpty().withMessage("El nombre de la categoria es obligatoria"),
    body("slug").notEmpty().withMessage("El slug de la categoria es obligatoria"),
    handleInputErrors,    
    CategoryController.updateCategoryById
)
//. ->  Eliminar categoria
router.delete("/:categoryId",
    param("categoryId").isMongoId().withMessage("Id no valido"),
    handleInputErrors,
    validateCategoryExist,
    CategoryController.deleteCategoryBiId
)
export default router