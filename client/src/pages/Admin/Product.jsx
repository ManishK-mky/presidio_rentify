import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Product.css';

function Product() {
    const [products, setProduct] = useState([]);

    // get all products
    async function getAllProducts() {
        try {
            const { data } = await axios.get("http://localhost:3000/api/v1/product/get-product");
            setProduct(data.products);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    // lifecycle method
    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <Layout>
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <div className="text-center">
                        <h1>All Products List</h1>
                    </div>
                    <div className="products-container d-flex flex-column">
                        {products?.map((p) => (
                            <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className="product-link">
                                <div className="card m-3" style={{ width: '18rem' }}>
                                    <img src={`http://localhost:3000/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Product;
