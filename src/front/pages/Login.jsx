import React, {useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Login = () => {
    // Declaramos variables
    const[email,setEmail]= useState("");
    const[password,setPassword]=useState(""); 
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();

    // Declaramos la función handleSubmit
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try { 
            const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

            const response = await fetch(`${backendUrl}/api/login`, {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({
                    email:email,
                    password:password
                })
            })

            const data = await response.json()

            if(!response.ok){
                throw new Error(data.error || "Error logging in")
            }

            dispatch({
                type: "login",
                payload: {
                    email: email,
                    token: data.access_token,
                    username: data.user.username
                }
            })

            navigate("/private")
            
        } catch (error) {
            console.log(error.message)
        }
    }

    // Devolvemos el código html para el login
    return(
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div classname="col-md-6">
                    <div className="card p-3">
                    <h3>Login</h3>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input 
                                id="email" 
                                type="email" 
                                placeholder="youremailhere@gmail.com" 
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                className="form-control"
                                required/>
                            
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input 
                                id="password" 
                                type="password" 
                                minLength="6" 
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">Login</button> 

                    </form>                    

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login