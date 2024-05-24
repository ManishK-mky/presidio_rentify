import React from 'react'
import Layout from '../../components/Layout/Layout'
import {Link} from 'react-router-dom'
import './PageNotFound.css'

function PageNotFound() {
  return (
    <Layout>
       <div className="page-not-found">
          <img src="https://i.pinimg.com/564x/24/ea/74/24ea74ca6e25174ec0a9b52795a390f3.jpg" alt="" />
          <h1>Looks Like you're lost</h1>
          <p>the page you are looking are not available!</p>
          <button><Link to="/">Go to Home</Link></button>
       </div>
    </Layout>
  )
}

export default PageNotFound
