const express = require("express");
const authMiddleware = require('../middlewares/authMiddleware');
const productController = require("../controllers/productController")
const formidable = require("express-formidable")

const router = express();

// Routes for Product

// Routes for creating Product
router.post("/create-product" , authMiddleware.requireSignIn , authMiddleware.isAdmin , formidable()  , productController.createProductController )

// Routes for getting all products
router.get("/get-product" , productController.getProductController)

// Routes for getting single products
router.get("/single-product/:slug" , productController.getSingleProductController)

// Routes for getting the photo
router.get("/product-photo/:pid" , productController.productPhotoController)

// Routes for deleting the product
router.delete("/delete-product/:pid" , productController.deleteProductController)

// Route for updating the product
router.put("/update-product/:pid" , authMiddleware.requireSignIn , authMiddleware.isAdmin , formidable() , productController.updateProductController)

// Routes for filtering products 
router.post("/product-filters", productController.productFiltersController);

//product count
router.get("/product-count", productController.productCountController);

//product per page
router.get("/product-list/:page", productController.productListController);



module.exports = router;