1) REACT toastify packega is used to  show notification or alerts in react app.

    React Toastify use karne k liye hume direct use packega ko {Layout} mein ya {root file} mein import karenge  

2) Axios ---> is to make request to API 


<!-- ## Context API -->

Context API me hum jo sab function likhte hai jisko hum pure website me kahi bhi use karna chahe jaise :- 

1) Login/Register ----> k liye jo ->>> token hai , kyuki login karne k baad hum kisi bhi page pe chale jaye , user loggedIn toh rahega hi aur sab jaga dikhega bhi. (from CONTEXT -> auth.jsx)

    How the working flow of auth.jsx from Context API??
     
    soln. ---> 1) DEclaration of the auth and setAuth useState like 
        in this , auth & setAuth is declared and two objects are declared "user" and "token
        const [auth , setAuth] = useState({
        user : null , 
        token : ""
    })

    2) Iske baad , this {useAuth is used in login} to set the value of "user" and "token" which is coming from backendand user successfully loggedIn. And after updating the value we also store that value of user and token in localStorage such that jab user logout na kare tab tak woh loggedIn ho.

    3) Now , in Auth.jsx there is useEffect in which , so that we can see that , any token is present in the localStorage or not we the token is already present it means the user is loggedIn 