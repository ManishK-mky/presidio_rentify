import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { toast } from 'react-toastify';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #fdfdfd',
    boxShadow: 24,
    p: 4,
};

function CreateCategory() {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);

    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");

    // handle forms
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("https://presidio-rentify.onrender.com/api/v1/category/create-category", { name });
            if (data.success) {
                toast.success(`${name} is created`);
                getAllCategory();
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in the input")
        }
    }

    // get all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("https://presidio-rentify.onrender.com/api/v1/category/get-category")
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

    //update category
    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.put(`https://presidio-rentify.onrender.com/api/v1/category/update-category/${selected._id}`, { name: updatedName });

            if (data.success) {
                toast.success(`${updatedName} is updated`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategory();
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error("Something Went wrong");
        }
    }


    // Delete Category
    const handleDelete = async (pID) => {
        try {
            const { data } = await axios.delete(`https://presidio-rentify.onrender.com/api/v1/category/delete-category/${pID}`, { name: updatedName });

            if (data.success) {
                toast.success(`Category is Deleted`);
                getAllCategory();
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error("Something Went wrong");
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
                        <h1>Manage Category</h1>
                        <div className="p-3 w-50">
                            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                        </div>
                        <div className='w-75'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map(c => (
                                        <tr key={c._id}>
                                            <td>{c.name}</td>
                                            <td>
                                                <button className='btn btn-primary m-2' onClick={() => { setVisible(true); setUpdatedName(c.name); setSelected(c) }}>Edit</button>
                                                <button className='btn btn-danger' onClick={() => handleDelete(c._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Modal open={visible} onClose={() => setVisible(false)}>
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
                                </Typography>
                            </Box>
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory;
