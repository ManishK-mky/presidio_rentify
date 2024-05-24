import React from 'react';
import Layout from '../../components/Layout/Layout';
import { useAuth } from '../../Context/auth';
import './ProfilePage.css'

function ProfilePage() {
  const [auth, setAuth] = useAuth();

  console.log(auth.user);

  return (
    <Layout>
      <div className="container profile-container">
        <div className="profile-header">
          <h1>{auth.user?.role === 1 ? "Seller" : "Buyer"} Profile</h1>
        </div>
        <div className="profile-details">
          <div className="profile-field">
            <span className="profile-label">First Name:</span>
            <span className="profile-value">{auth.user?.firstname}</span>
          </div>
          <div className="profile-field">
            <span className="profile-label">Last Name:</span>
            <span className="profile-value">{auth.user?.lastname}</span>
          </div>
          <div className="profile-field">
            <span className="profile-label">Email:</span>
            <span className="profile-value">{auth.user?.email}</span>
          </div>
          <div className="profile-field">
            <span className="profile-label">Phone Number:</span>
            <span className="profile-value">{auth.user?.phone}</span>
          </div>
          <div className="profile-field">
            <span className="profile-label">Role:</span>
            <span className="profile-value">{auth.user?.role === 1 ? "Seller" : "Buyer"}</span>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProfilePage;
