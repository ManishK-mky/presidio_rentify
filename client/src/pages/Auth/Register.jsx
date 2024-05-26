import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import './Register.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [answer, setAnswer] = useState('');
  const [role, setRole] = useState(0);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(first_name, last_name, email, password, phone, address, answer, role);
    toast.success("Registered Successfully");

    try {
      const res = await axios.post(
        "https://presidio-rentify.onrender.com/api/v1/register", 
        { first_name, last_name, email, password, phone, answer, address, role }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  }

  return (
    <Layout>
      <div className="main-page">
        <div className="register-page">
          <div style={{ maxWidth: '420px', margin: '0 auto' }}>
            <h3 className='mt-2 mb-3'>Register Here</h3>
            <form className='mb-3' onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputFirstName">First Name</label>
                <input type="text" value={first_name} onChange={(e) => setFirstName(e.target.value)} className="form-control" id="exampleInputFirstName" placeholder="Enter First Name" required />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputLastName">Last Name</label>
                <input type="text" value={last_name} onChange={(e) => setLastName(e.target.value)} className="form-control" id="exampleInputLastName" placeholder="Enter Last Name" required />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail" placeholder="Enter Email" required />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword" placeholder="Enter Password" required />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPhone">Phone</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" id="exampleInputPhone" placeholder="Enter Phone Number" required />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputAnswer">Answer</label>
                <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className="form-control" id="exampleInputAnswer" placeholder="What is your favorite sport?" required />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputAddress">Address</label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" id="exampleInputAddress" placeholder="Enter your Address" required />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputRole">Role</label>
                <select value={role} onChange={(e) => setRole(Number(e.target.value))} className="form-control" id="exampleInputRole" required>
                  <option value={0}>Buyer</option>
                  <option value={1}>Seller</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Register;
