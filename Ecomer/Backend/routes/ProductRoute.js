const express=require('express');
const { getAllProduct ,createProduct, updateProduct, deleteProduct, getProductDetail} = require('../Controllers/productController');
const IsAuthenticatedUser = require('../middleware/auth');


const router=express.Router();


router.route("/products").get( IsAuthenticatedUser, getAllProduct)

router.route("/products/new").post(createProduct)

router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProductDetail)


module.exports=router;