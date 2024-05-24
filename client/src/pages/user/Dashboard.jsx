import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../Context/auth'

function Dashboard() {

  const [auth] = useAuth()

  return (
    <Layout>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9">
              <div className="card w-66 p-3">
                <span><h5> Name :- </h5> {auth?.user?.name}</span>
                <span><h5> Email :- </h5> {auth?.user?.email}</span>
                <span><h5> Contact :- </h5> {auth?.user?.phone}</span>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Dashboard
