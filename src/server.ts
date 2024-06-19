import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import { corsConfig } from "./config/cors";

import { conectDB } from "./config/db";


import productRoutes from "./routes/productRoutes";
import categoryRoutes from "./routes/categoryRoutes"
import { seedDB } from "./config/seeding";
//. ->  Variables de entorno
dotenv.config()
//. ->  Conexion a la base de datos
conectDB();
//. ->  Crear servidor
const app = express();
//. ->  CORS
app.use(cors(corsConfig))


//. ->  Habilitar lectura de json
app.use(express.json())


//# ->  Routes

//. ->  Products
app.use('/api/products', productRoutes) 

// .->  Categories
app.use("/api/categories", categoryRoutes)
export default app