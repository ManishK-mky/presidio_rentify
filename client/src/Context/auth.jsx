import { useState , useEffect , useContext , createContext} from "react";
import  axios  from "axios";
const AuthContext = createContext();

const AuthProvider = ({children}) =>{
    const [auth , setAuth] = useState({
        user : null , 
        token : ""
    })

    //default axios
    axios.defaults.headers.common["Authorization"] = auth?.token;

    useEffect(() => {
        const data = localStorage.getItem('auth');
        //login karne k baad humne token aut user data ko localstorage mein aad kiya hai {localStorage.getItem()}
        // se hum uss data ko nikal rhe hai

        //abb agar kuch data hai tab hi "if" k andar jayega
        if(data){
            const parseData = JSON.parse(data);//yeh jo data localStorage mein usko "parse" kar rhe hai
            setAuth({
                ...auth,
                user : parseData.user,
                token : parseData.token
            })
        }
        // eslint-disable-next-line
    } ,[])

    return (
        // children as a prop pass kar rhe hai ta ki sare components use kar sake 
        // yeh likhne k baad humlog AuthProvider se main.jsx ko wrap kar dete hai taki 
        // uske andar APP mein jitne components hai woh AuthProvider k andar likhe gye kisi bhi function ka use kar sake 
        // just by importing.

        <AuthContext.Provider value={[auth , setAuth]}>  
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext)

export {useAuth , AuthProvider}