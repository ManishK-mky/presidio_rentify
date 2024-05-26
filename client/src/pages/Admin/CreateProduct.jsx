import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import { toast } from 'react-toastify';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/auth';

function CreateProduct() {

    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [photo, setPhoto] = useState("");
    const [category, setCategory] = useState("");
    // const [createdBy , setCreatedBy] = useState({});

    // console.log(auth);
    // useEffect(() => {
    //     setCreatedBy(auth?.user);
    // }, [auth]);

    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("http://localhost:3000/api/v1/category/get-category");
            
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong while getting categories");
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();

        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("location", location);
            productData.append("photo", photo);
            productData.append("category", category);
            // productData.append("createdBy", createdBy._id);
            
            const { data } = await axios.post("http://localhost:3000/api/v1/product/create-product", productData);
            
            if(data?.success) {
                toast.success("Product created successfully");
                navigate('/dashboard/admin/products');
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Create Product</h1>
                        <div className="m-1 w-75">
                            <InputLabel>Select a category</InputLabel>
                            <Select
                                onChange={(e) => setCategory(e.target.value)}
                                fullWidth
                                variant="outlined"
                                value={category}
                            >
                                <MenuItem value="" disabled>Select a category</MenuItem>
                                {categories.map((c) => (
                                    <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
                                ))}
                            </Select>
                            <div className="mb-3 mt-3">
                                <label className='btn btn-outline-secondary col-md-12'>
                                    {photo ? photo.name : "Upload Photo" }
                                    <input type="file" name="photo" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} hidden />
                                </label>
                            </div>
                            <div className="mb-3">
                                {photo && (
                                    <div className="text-center">
                                        <img src={URL.createObjectURL(photo)} alt="product_photo" height={"200px"}  className='img img-responsive' />
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <input type="text" value={name} placeholder="Write a name" className='form-control' onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <input type="text" value={description} placeholder="Write a description" className='form-control'  onChange={(e) => setDescription(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <input type="text" value={price} placeholder="Enter the price" className='form-control'  onChange={(e) => setPrice(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <input type="text" value={location} placeholder="Enter the location" className='form-control' onChange={(e) => setLocation(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <button className='btn btn-primary' onClick={handleCreate}>Create Property</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateProduct;
