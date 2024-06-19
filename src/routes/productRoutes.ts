import { Router } from "express";
import { ProductController } from "../controllers/ProductController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { validateCategoryExist } from "../middleware/category";
import { validateProductExist } from "../middleware/product";

//# ->  Crear router
const router = Router()

//# ->  Rutas

//. ->  Params
router.param("categoryId", validateCategoryExist)
router.param("productId", validateProductExist)
//. ->  Crear productos
router.post("/:categoryId",

    param("categoryId").isMongoId().withMessage("Categoria no valida"),
    body("name").notEmpty().withMessage("El nombre del producto es obligatorio"),
    body("price").notEmpty().withMessage("El precio del producto es obligatorio")
        .isNumeric().withMessage("Precio no valido")
        .custom( value => {
            if(value < 0) {
                throw new Error("El precio no puede ser menor a 0")
            }
            return true
        } ),
    body("image").notEmpty().withMessage("La imagen del producto es obligatorio"),
    handleInputErrors,
    ProductController.createProduct
)

//. ->  Obtener todos los productos
router.get("/", ProductController.getAllProducts)
//. ->  Obtener productos por su categoria slug
router.get("/productsSlug/:slug",
    param("slug").notEmpty().withMessage("El slug es opbligatorio"),
    handleInputErrors,
    ProductController.getProductsBySlug
)
//. ->  Update a product by id
router.put("/:categoryId/product/:productId",
    param("categoryId").isMongoId().withMessage("Categoria no valida"),
    param("productId").isMongoId().withMessage("Producto no valido"),
    body("name").notEmpty().withMessage("El nombre del producto es obligatorio"),
    body("price").notEmpty().withMessage("El precio del producto es obligatorio")
        .isNumeric().withMessage("Precio no valido")
        .custom( value => {
            if(value < 0) {
                throw new Error("El precio no puede ser menor a 0")
            }
            return true
        } ),
    body("image").notEmpty().withMessage("La imagen del producto es obligatoria"),
    handleInputErrors,
    ProductController.updateProduct
)

router.delete("/:productId",
    param("productId").isMongoId().withMessage("Producto no valido"),
    handleInputErrors,
    ProductController.deleteProduct
)

export default router