import { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import { Prices } from '../../components/Prices';
// <<<<<<< HEAD
import { FaHeart } from "react-icons/fa6";
import './Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
    
    const navigate = useNavigate()
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    // const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);


    //   console.log(products);
    // Get all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("http://localhost:3000/api/v1/category/get-category");
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCategory();
        getTotal();
        getAllProducts();
    }, []);

    useEffect(() => {
        if (page > 1) {
            loadMore();
        }
    }, [page]);

    // Load more products
    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`http://localhost:3000/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts((prevProducts) => [...prevProducts, ...(data?.products || [])]);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // Get all products
    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`http://localhost:3000/api/v1/product/product-list/1`);
            console.log(data.products);
            // setLikes(data)
            setLoading(false);
            if (data.success) {
                setProducts(data.products);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        if (!checked.length ) {
            getAllProducts();
        } else {
            getFilteredProducts();
        }
    }, [checked]);

    // Get total products count
    const getTotal = async () => {
        try {
            const { data } = await axios.get("http://localhost:3000/api/v1/product/product-count");
            setTotal(data?.total);
        } catch (error) {
            console.log(error);
        }
    };

    // Filter by category
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    };

    // Get filtered products
    const getFilteredProducts = async () => {
        try {
            const { data } = await axios.post('http://localhost:3000/api/v1/product/product-filters', { checked});
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <Layout>
            <div className="row p-4">
                <div className="col-md-3">
                    <h6 className="text-center">Filter By Category</h6>
                    <div className="d-flex flex-column">
                        {categories?.map((c) => (
                            <FormControlLabel
                                key={c._id}
                                onChange={(e) => handleFilter(e.target.checked, c._id)}
                                control={<Checkbox />}
                                label={c.name}
                            />
                        ))}
                    </div>
                    <div className="d-flex flex-column">
                        <button
                            className="btn btn-danger"
                            onClick={() => window.location.reload()}
                        >
                            RESET FILTERS
                        </button>
                    </div>
                </div>
                <div className="col-md-9">
                    <h1 className="text-center">All Properties</h1>
                    <div className="d-flex flex-wrap">
                        {products.length > 0 ? (
                            products.map((p) => (
                                <div key={p._id} className="product-link">
                                    <div className="card m-3" style={{ width: '18rem' }}>
                                        <img
                                            src={`http://localhost:3000/api/v1/product/product-photo/${p._id}`}
                                            className="card-img-top"
                                            alt={p.name}
                                        />
                                        <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description.substring(0, 30)}</p>
                                        <p className="card-text card-price">$ {p.price}</p>
                                        <button className="btn btn-primary" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                        <div className="like-section" >
                                            
                                            <FaHeart className="fa-heart" />
                                            
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center">No products found</p>
                        )}
                    </div>
                    <div className="m-2 p-3 text-center">
                        {products.length < total && (
                            <button
                                className="btn btn-warning"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage((prevPage) => prevPage + 1);
                                }}
                            >
                                {loading ? "Loading..." : "Load More"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Home;
