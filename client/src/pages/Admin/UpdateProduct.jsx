import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import { toast } from 'react-toastify';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  // const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  console.log(id);
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`https://presidio-rentify.onrender.com/api/v1/product/single-product/${params.slug}`);
      
      if (data?.success) {
        const product = data.product;
        console.log(product);
        setName(product.name);
        setId(product._id);
        setDescription(product.description);
        setPrice(product.price);
        setLocation(product.location);
        // setShipping(product.shipping);
        setCategory(product.category._id);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while fetching the product");
    }
  };

  useEffect(() => {
    getSingleProduct();
    // eslint-disable-next-line
  }, []);

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("https://presidio-rentify.onrender.com/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Update product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("location", location);
      photo && productData.append("photo", photo);
      productData.append("category", category);

      // console.log("product-data" ,productData);
      console.log("product-data", productData);
      for (let pair of productData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
      
      const { data } = await axios.put(
        `https://presidio-rentify.onrender.com/api/v1/product/update-product/${id}`,
        productData
      );

      console.log(data);
      if (data?.success) {
        toast.success(data?.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are you sure you want to delete this product?");
      if (!answer) return;
      const { data } = await axios.delete(`https://presidio-rentify.onrender.com/api/v1/product/delete-product/${id}`);
      toast.success("Product Deleted Successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <InputLabel>Select a category</InputLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                fullWidth
                variant="outlined"
              >
                <MenuItem value="" disabled>
                  Select a category
                </MenuItem>
                {categories.map((c) => (
                  <MenuItem key={c._id} value={c._id}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
              <div className="mb-3 mt-3">
                <label className='btn btn-outline-secondary col-md-12'>
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              {/* Seeing OR Previewing the image */}
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img src={URL.createObjectURL(photo)} alt="product_photo" height={"200px"} className='img img-responsive' />
                  </div>
                ):
                <div className="text-center">
                    <img src={`https://presidio-rentify.onrender.com/api/v1/product/product-photo/${id}`} alt="product_photo" height={"200px"} className='img img-responsive' />
                  </div>
                  }
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Write a name"
                  className='form-control'
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={description}
                  placeholder="Write a description"
                  className='form-control'
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={price}
                  placeholder="Write a price"
                  className='form-control'
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={location}
                  placeholder="Write the Location"
                  className='form-control'
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              {/* <div className="mb-3">
                <select
                  value={shipping}
                  onChange={(e) => setShipping(e.target.value)}
                  className='form-control'
                >
                  <option value="" disabled>Select shipping</option>
                  <option value="0">Yes</option>
                  <option value="1">No</option>
                </select>
              </div> */}
              <div className="mb-3">
                <button className='btn btn-primary' onClick={handleUpdate}>UPDATE PROPERTY</button>
              </div>
              <div className="mb-3">
                <button className='btn btn-danger' onClick={handleDelete}>DELETE PROPERTY</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
