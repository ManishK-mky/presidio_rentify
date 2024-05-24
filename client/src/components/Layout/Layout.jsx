import React from 'react'
import Header from './Header'
import Footer from './Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Layout(props) {
  return (
    <div>
        <Header/>
        <main style={{minHeight : '69vh'}}>
            <ToastContainer/>
            {props.children}
        </main> 
        <Footer/>
        { /* props.children likhne se hum layout ko batate hai ki iske andar jo bhi wrap hua hai usko show akro iske children components ko */}
    </div>
  )
}

export default Layout
