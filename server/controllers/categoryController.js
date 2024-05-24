const categoryModel = require("../models/category")
const slugify = require("slugify")

async function category(req,res){
    try{
        const {name} = req.body; //destructuring

        if(!name){
            res.status(500).send({
                message : "Name is required"
            })
        }

        const existingCategory = await categoryModel.findOne({name});

        if(existingCategory) {
            return res.status(409).send({message:"This Category already exists."});
        }

        const category =  await new categoryModel({name , slug:slugify(name)})
        await category.save()

        res.status(201).send({
            success  :true,
            message : "new category Created",
            category
        })

    }catch(error){
        console.log(error);
        res.status(400).send({
            message : false,
            error,
            message : "Error in Category"
        })
    }
}

// updating the category

async function updateCategory(req,res){
    try{
        const {name} = req.body;
        const {id} = req.params;  // req.params means jo {id} aane wali hai woh URL mein se aane wali hogi

        const category = await categoryModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true }
        );
        res.status(200).send({
            success : true,
            message : "Category updated successfully",
            category,
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success : false,
            error,
            message : "Error while updating the category"
        })
    }
}

// getting all category from database

async function showCategory(req,res){
    try{
        const category = await categoryModel.find({});

        res.status(200).send({
            success : true,
            message : "All categories List",
            category
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success : true,
            error,
            message : "Error while getting all categories"
        })
    }
}

// getting single category from database on the basis of the slug

async function singleCategoryController(req,res){
    try{

        const {slug} = req.params; 
        const category = await categoryModel.findOne({slug})

        res.status(200).send({
            success : true,
            message : "Get single category successfully",
            category
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error while getting single category",
            error
        })
    }
}


// Deleting the category
async function deleteCategory(req,res){
    try{
        const {id} = req.params;
        await categoryModel.findByIdAndDelete(id);

        res.status(200).send({
            success : true,
            message : "Category deleted successfully",
            
        })
    }catch(error){
        console.log(error);
        res.status(error).send({
            success : false,
            message : "Error while deleting the category",
            error
        })
    }
}

module.exports = {category , updateCategory , showCategory , singleCategoryController , deleteCategory}