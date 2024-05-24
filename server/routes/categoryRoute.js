const express = require("express")
const authMiddleware = require("../middlewares/authMiddleware")
const categoryController = require("../controllers/categoryController")

const router = express();

// routes ---> isAdmin : true (admin only) | isLogged

// create Category
router.post('/create-category' , authMiddleware.requireSignIn , authMiddleware.isAdmin , categoryController.category)

// update category
router.put("/update-category/:id" , authMiddleware.requireSignIn , authMiddleware.isAdmin , categoryController.updateCategory)

//get all categories
router.get('/get-category' , categoryController.showCategory)

//get single category
router.get('/single-category/:slug' , categoryController.singleCategoryController)

// delete catgeory
router.delete('/delete-category/:id', authMiddleware.requireSignIn , authMiddleware.isAdmin , categoryController.deleteCategory)


module.exports = router;