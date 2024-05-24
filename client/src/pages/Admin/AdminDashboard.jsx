import React from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { useAuth } from '../../Context/auth';
import './AdminDashboard.css'; // Import CSS file for styling

function AdminDashboard() {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="admin-card">
              <h5 className="card-title">Seller Information</h5>
              <div className="card-content">
                <p><strong>Seller Name:</strong> {auth?.user?.firstname}</p>
                <p><strong>Seller Email:</strong> {auth?.user?.email}</p>
                <p><strong>Seller Contact:</strong> {auth?.user?.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;
