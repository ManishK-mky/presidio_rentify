import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import './Register.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import {useNavigate , useLocation} from 'react-router-dom';
import { useAuth } from '../../Context/auth';

function ForgotPassword() {

    
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [answer , setAnswer] = useState('')

    const [auth , setAuth]= useAuth()

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(email, password);
        // toast.success("Login Successful")

        try{
            const res = await axios.post(
                "http://localhost:3000/api/v1/forgot-password" , 
                { email , newPassword ,
                answer}
            );
            // console.log(res);
            if(res && res.data.success){
                toast.success(res.data.message);

                navigate( location.state || '/login' ) ;
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
                        <h3 className='mt-2 mb-3'>Reset Password</h3>
                        <form className='mb-3' onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail">Email</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail" placeholder="Enter Email" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputAnswer">Answer It</label>
                                <input type="string" value={answer} onChange={(e) => setAnswer(e.target.value)} className="form-control" id="exampleInputAnswer" placeholder="Enter Your Fav. Sport" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword">New Password</label>
                                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="form-control" id="exampleInputPassword" placeholder="Enter New Password" required />
                            </div>
                            <button type="submit" className="btn btn-primary">Reset Password</button>
                        </form>
                    </div>
                </div>
            </div>
    </Layout>
  )
}

export default ForgotPassword
