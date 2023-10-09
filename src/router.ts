import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { handelInputErrors } from "./modules/middleware";
import { createProduct, deleteProduct, getAllProducts, getOneProduct, updateProduct } from "./handlers/products";
import { createUpdates, delteUpdates, getOneUpdate, getUpdates, updateUpdates } from "./handlers/Updates";

const router = Router();


/* Product */
router.get("/product", getAllProducts);
router.get("/product/:id", getOneProduct);
router.post("/product",body("name").isString() , handelInputErrors, createProduct);
router.put("/product/:id" , body("name").isString() ,handelInputErrors , updateProduct);
router.delete("/product/:id",deleteProduct);


/* Update */
router.get("/update",getUpdates);
router.get("/update/:id",getOneUpdate);
router.post("/update", body("title").exists().isString(), body("body").exists().isString(), handelInputErrors , createUpdates);
router.put("/update/:id", 
    body("title").optional().isString(), 
    body("body").optional().isString(),
    body("staus").optional().isIn(["IN_PROGRESS","SHIPPED","DEPRECATED"]), 
    body("version").optional().isString(), updateUpdates);
router.delete("/update/:id",delteUpdates);


/* Update Point */
router.get("/updatepoint",() => {});
router.get("/updatepoint/:id",() => {});
router.post("/updatepoint",
    body("name").isString(),
    body("description").isString(),
    body("updateId").exists().isString(),
    () => {});
router.put("/updatepoint/:id",
    body("name").optional().isString(),
    body("description").optional().isString(),
    () => {});
router.delete("/updatepoint/:id",() => {});

export default router;