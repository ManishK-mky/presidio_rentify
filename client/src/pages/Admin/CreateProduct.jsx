import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import { toast } from 'react-toastify';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { useNavigate } from 'react-router-dom';
// impirt {useNavigate}

function CreateProduct() {

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
    const [category, setCategory] = useState("");

    // get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("http://localhost:3000/api/v1/category/get-category")
            
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong in getting category")
        }
    };

    useEffect(() => {
        getAllCategory();
    }, [])

    // create product function

    const handleCreate = async (e) =>{
        e.preventDefault();

        try{
            const productData = new FormData();

            productData.append("name" , name);
            productData.append("description" , description);
            productData.append("price" , price);
            productData.append("quantity" , quantity);
            productData.append("photo" , photo);
            productData.append("category" , category);
            
            const {data} = axios.post("http://localhost:3000/api/v1/product/create-product" , productData);
            
            if(data?.success){
                toast.success("Product Created Successfully");
                navigate('/dashboard/admin/product')
            }else{
                toast.error(data?.message)
            }
        }catch(error){
            console.log(error);
            toast.error("something went wrong")
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
                            <Select
                                onChange={(e) => {setCategory(e.target.value)}}
                                fullWidth
                                variant="outlined"

                            >
                                <MenuItem value="" disabled>
                                    Select a category
                                </MenuItem>
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
                                {/* Seeing OR Previewing the image */}
                            <div className="mb-3">
                                {photo && (
                                    <div className="text-center">
                                        <img src={URL.createObjectURL(photo)} alt="product_photo" height={"200px"}  className='img img-responsive' />
                                    </div>
                                )}
                            </div>

                            <div className="mb-3">
                                <input type="text" bordered={false} value={name} placeholder="write a name" className='form-control' onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <input type="text" value={description} placeholder="write a description" className='form-control'  onChange={(e) => setDescription(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <input type="text" value={price} placeholder="write a Price" className='form-control'  onChange={(e) => setPrice(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <input type="text" value={quantity} placeholder="write a Quantity" className='form-control' onChange={(e) => setQuantity(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <select value={shipping} onChange={(e) => setShipping(value)} className='form-control'>
                                    <option value="" disabled>Select shipping</option>
                                    <option value="0">Yes</option>
                                    <option value="1">No</option>
                                    {/* Add more shipping options as needed */}
                                </select>
                            </div>
                            <div className="mb-3">
                                <button className='btn btn-primary' onClick={handleCreate}>CREATE PRODUCT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateProduct;
