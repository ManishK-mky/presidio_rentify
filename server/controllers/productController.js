const slugify = require("slugify");
const productModel = require("../models/productModel");
const  fs = require("fs");
const { log } = require("console");

// controller for creating the product
async function createProductController(req,res){
    try{
        const {name , slug , description , price , category , quantity , shipping} = req.fields //becz we are using formidable for uplaoding an image
        const {photo} = req.files;

        switch(true){
            case !name:
                return res.status(500).send({error : "Name is required"})
            case !description:
                return res.status(500).send({error : "Description is required"})
            case !price:
                return res.status(500).send({error : "Price is required"})
            case !category:
                return res.status(500).send({error : "Category is required"})
            case !quantity:
                return res.status(500).send({error : "Quantity is required"}) 
            case photo && photo.size>1000000:
                return res.status(500).send({error : "Photo is required and should be less than 1mb"})
            }

        const products = new productModel({...req.fields , slug:slugify(name)});
        if(photo){
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type
        }

        await products.save();
        res.status(200).send({
            success  : true,
            error : "Product Created Successfully",
            products
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success :  false,
            mmessage : "Error in creating new product",
            error
        })
    }
}

// get all products

async function getProductController(req,res) {
    try{

        const products = await productModel.find({}).select("-photo").populate("category").limit(12).sort({createdAt : -1});

        res.status(200).send({
            success : true,
            total_count : products.length,
            message : "All products",
            products,
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success :  true,
            message : "Error in getting the products...",
            error
        })
    }
}

// controller for getting a single product
async function getSingleProductController(req,res){
    try{
        const product = await productModel.findOne({slug : req.params.slug}).select("-photo").populate("category")

        res.status(200).send({
            success : true,
            message : "successfully fetched the single product",
            product
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success :  true,
            message : "Error in fteching the single product",
            error
        })
    }
}

async function productPhotoController(req,res){
    try{
        const product = await productModel.findById(req.params.pid).select("photo");

        if(product.photo.data){
            res.set("Content-type" , product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
    }catch(error){
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in fetching the photo",
            error
        })
    }
}

async function deleteProductController(req,res){
    try{
        await productModel.findByIdAndDelete(req.params.pid).select("photo");
        res.status(200).send({
            success : true,
            message :  "Product deleted successfully",
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in deleting the product",
            error
        })
    }
}

async function updateProductController(req,res){
    try{
        const {name , description , price , category , quantity , shipping} = req.fields //becz we are using formidable for uplaoding an image
        const {photo} = req.files;

        switch(true){
            case !name:
                return res.status(500).send({error : "Name is required"})
            case !description:
                return res.status(500).send({error : "Description is required"})
            case !price:
                return res.status(500).send({error : "Price is required"})
            case !category:
                return res.status(500).send({error : "Category is required"})
            case !quantity:
                return res.status(500).send({error : "Quantity is required"}) 
            case photo && photo.size>1000000:
                return res.status(500).send({error : "Photo is required and should be less than 1mb"})
            }

        const products = await  productModel.findByIdAndUpdate(req.params.pid , {...req.fields , slug:slugify(name)} , {new : true})
        
        if(photo){
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type
        }

        await products.save();
        res.status(200).send({
            success  : true,
            error : "Product Updated Successfully",
            products
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success :  false,
            mmessage : "Error in updating the product",
            error
        })
    }
}

const productFiltersController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        console.log(radio);
        let args = {};
        
        // Filter by category
        if (checked.length > 0) {
            args.category = checked;
        }
    
        // Filter by price range
        if (radio) {
            const priceRange = getPriceRangeArray(radio);
            console.log(priceRange)
            if (priceRange.length === 2) {
                args.price = { $gte: priceRange[0], $lte: priceRange[1] };
            }
        }
    
        console.log(args.price);
        // Find products matching the criteria
        const products = await productModel.find(args);
        
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Filtering Products",
        error,
      });
    }
  };

  function getPriceRangeArray(name) {
    switch (name) {
        case '$0 to 19':
            return [0, 19];
        case '$20 to 39':
            return [20, 39];
        case '$40 to 99':
            return [40, 99];
        case '$100 to 999':
            return [100, 999];
        case '$1000 to 99999':
            return [1000, 99999];
        default:
            return []; // Return empty array for unknown price range
    }
}

const productCountController = async (req, res) => {
    try {
      const total = await productModel.estimatedDocumentCount();
      console.log("yha aao",total);
      res.status(200).send({
        success: true,
        total,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: "Error in product count",
        error,
        success: false,
      });
    }
  };
  
  // product list base on page
const productListController = async (req, res) => {
    try {
      const perPage = 2;
      const page = req.params.page ? req.params.page : 1;
      const products = await productModel
        .find({})
        .select("-photo") //yeh likhne se photo select nhi hoga
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 });
      res.status(200).send({
        success: true,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "error in per page ctrl",
        error,
      });
    }
  };

module.exports = {createProductController , getProductController ,getSingleProductController , productPhotoController , deleteProductController , updateProductController , productFiltersController ,productCountController , productListController}