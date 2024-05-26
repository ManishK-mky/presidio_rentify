import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../Context/auth'
import './Dashboard.css'

function Dashboard() {

  const [auth] = useAuth();
  console.log(auth);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  

  return (
    <Layout>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9">
              <div className="card w-66 p-3">
                <span>
                  <h5>First Name :-</h5>
                  {capitalizeFirstLetter(auth?.user?.firstname)}
                </span>
                <span>
                  <h5>Last Name :-</h5>
                  {capitalizeFirstLetter(auth?.user?.lastname)}
                </span>
                <span>
                  <h5>Email :-</h5>
                  {auth?.user?.email}
                </span>
                <span>
                  <h5>Contact :-</h5>
                  {auth?.user?.phone}
                </span>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Dashboard
