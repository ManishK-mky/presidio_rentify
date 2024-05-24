import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import './Register.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import {useNavigate , useLocation} from 'react-router-dom';
import { useAuth } from '../../Context/auth';

// useNavigate is a hook from react-router-dom.
// isliye iska ek varible bana denge

function Login() {

// 1) declare states for all input fields
// 2) give [value] attribute to the all input fields like :- value={name} , value={email} etc for others fields . This will basically bind the input fields with the state
// 3) use {onChange event} to change the value of the state usinf the functions of the state 
//    like :- onChange = {(e) => setName(e.target.value)}

// 4) make a function in form {like -> handleSubmit function} to stop the default behaviour of the form 

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const [auth , setAuth]= useAuth()

    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(email, password);
        // toast.success("Login Successful")

        console.log(auth);
        try{
            const res = await axios.post(
                "http://localhost:3000/api/v1/login" , 
                { email , password }
            );
            // console.log(res);
            if(res && res.data.success){
                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    user : res.data.user,
                    token : res.data.token
                });

                console.log(res.data);
                // yeh value toh set kar de rha hai lekin refresh karne pe yeh data haat jata hai
                // isliye isko  {localStorage mein store kar lenge}

                localStorage.setItem('auth' , JSON.stringify(res.data))

                // kyuki abb localstorage main add ho gya hai isliye ab yeh refresh karne pe bhi nhi hatega

                navigate( location.state || '/dashboard/admin' ) ;
            }else{
                toast.error(res.data.message)
            }
        }
        catch(error){
            console.log(error);
            toast.error("something went wrong"); 
        }
    }

    return (
        <Layout>
            <div className="main-page">
                <div className="register-page">
                    <div style={{ maxWidth: '420px', margin: '0 auto' }}>
                        <h3 className='mt-2 mb-3'>Login Here</h3>
                        <form className='mb-3' onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail">Email</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail" placeholder="Enter Email" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword">Password</label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword" placeholder="Enter Password" required />
                            </div>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary" onClick={() => {navigate('/forgot-password')}}>Forgot Password</button>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Login;
