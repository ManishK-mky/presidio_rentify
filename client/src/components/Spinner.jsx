import React, { useEffect , useState } from 'react';
import { useNavigate , useLocation} from 'react-router-dom' 

function Spinner({path = "login"}) {

    const [count , setCount] = useState(3);

    const Navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((prevValue) => --prevValue)
        } , 1000)
        count === 0 && Navigate(`/${path}` , {state : location.pathname});
        return () => clearInterval(interval)
    } , [count , Navigate , location , path])

  return (
    <>
        <div className="d-flex flex-column justify-content-center align-items-center" style={{height : "100vh"}}>
            <h1 className='Text-center'>Redirecting to you in {count} seconds.</h1>
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    </>
  )
}

export default Spinner
