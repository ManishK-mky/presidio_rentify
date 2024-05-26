import {React , useEffect , useState} from 'react';
import Layout from '../../components/Layout/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Style.css'
import { useAuth } from '../../Context/auth';
import { useNavigate } from 'react-router-dom';

function ProductDetails() {

    const [auth, setAuth] = useAuth();

    const navigate = useNavigate()

    const params = useParams();
    const [product , setProduct] = useState({});//single property rahega isliye object diye hai


    // console.log(params);
    // console.log(product);
    const getProduct = async () =>{
        try{
            const {data} = await axios.get(`https://presidio-rentify.onrender.com/api/v1/product/single-product/${params.slug}`)
            // console.log(data?.product);
            setProduct(data?.product)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        if(params?.slug) getProduct();
    } ,[params?.slug])


    console.log(auth)
    // const handleSeller = () =>{
    //    if(auth?.user){
    //     navigate("/profile")
    //    }else{
    //     navigate('/login')
    //    }
    // }

  return (
    <Layout>
        <center><h1>Property Details</h1></center>
        <div className="d-flex justify-content-center mt-4">
            <div className="pwrap">
                <div className="pimmg">
                    <div className="image">
                   {
                    product._id &&  <img
                        src={`https://presidio-rentify.onrender.com/api/v1/product/product-photo/${product._id}`}
                        className="card-img-top"
                        alt={product.name}
                                        /> 
                   }
                    </div>
                </div>
                <div className="pinfo px-4">
                    <div className="ptitle"><h2>{product.name}</h2></div>
                    <div className="pprice"><span className="price">Price: {product.price}</span></div>
                    <div className="pprice"><span className="price">Location: {product.location}</span></div>
                    <div className="pdesc"><span className="price">Description:</span> {product.description}</div>
                    {
                        auth?.user === "seller" ? null : (
                            <button className="btn btn-primary" onClick={() => {
                                if(auth?.user){
                                    navigate("/dashboard/admin/profile");
                                } else {
                                    navigate('/login');
                                }
                            }}>Seller Info</button>
                        )
                    }

                </div>
            </div>
        </div>  
    </Layout>
  )
}

export default ProductDetails
