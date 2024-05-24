import React from 'react';
import { useState , useEffect } from 'react';
import { useAuth } from '../../../Context/auth'
import { Outlet } from 'react-router-dom'
import axios from 'axios';
import Spinner from '../../Spinner';

// So, in summary, your client-side code makes a request to the server-side route /api/v1/user-auth, and if the authentication is successful, the server responds with { ok: true }. If this response is received on the client-side, it sets the ok state to true; otherwise, it sets it to false.
// we are making a request to this given url  and along with the URL we are also sending the token present in auth this auth is used as an argument fro the requireSignin function when the function is verifie dthen the user ca n access th function 


// ---
// In the line auth ?.token, the ?. is the optional chaining operator, introduced in ECMAScript 2020 (ES11).
//  It's used to access properties of an object if that object is not null or undefined. If the object is null or undefined, the expression evaluates to undefined without causing an error

// ---

function AdminRoute() {

    const [ok ,setOk] = useState(false);
    const [auth , setAuth] = useAuth();

    useEffect(() => {
        const authCheck = async() => {
            const res = await axios.get('http://localhost:3000/api/v1/admin-auth')
            if(res.data.ok){
                setOk(true)
            }else{
                setOk(false)
            }
        }
        if(auth?.token) authCheck();
    } , [auth?.token])

  return ok ? <Outlet/> : <Spinner path="" />
}

export default AdminRoute
