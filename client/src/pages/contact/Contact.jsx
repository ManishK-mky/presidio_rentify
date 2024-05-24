import React from 'react'
import Layout from '../../components/Layout/Layout'
import './Contact.css';
import { IoMdMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { FaHeadphones } from "react-icons/fa";

function Contact() {
  return (
    <Layout>
        <div className="contact-us">
          <div className="left">
            <img src="https://i.pinimg.com/564x/77/5a/b8/775ab8f7dcb36967199e17b6a02b5a9b.jpg" alt="" />
          </div>
          <div className="right">
            <h1>Contact Us</h1>
            <p>Any Query and info about product , feel free to contact us anytime.</p>
            <p><IoMdMail /> : helpdesk@ecommerce.com</p>
            <p><FaPhoneAlt /> : 012-3456789</p>
            <p><FaHeadphones /> : 1800-6666-6666(Toll Free)</p>
          </div>
        </div>
    </Layout>
  )
}

export default Contact
