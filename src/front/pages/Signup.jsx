import React, {useState} from "react";
import { useNavigate} from "react-router-dom";

const Signup = () => {
    // Declaramos variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    // Declaramos la funcion handleSubmit
    const handleSubmit = async(e) =>{
        e.preventDefault();

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

            const response = await fetch(`${backendUrl}/api/signup`, {
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({
                    email:email,
                    password:password,
                    username:username
                })
            })

            const data = await response.json()

            if(!response.ok){
                throw new Error(data.error || "Error signing up")
            }

            navigate("/login")
            
        } catch (error) {
            console.log(error.message)
            
        }
    }

    // Devolvemos el código html para el signup
    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card p-3">

                        <h3>Create an account</h3>

                        <form onSubmit={handleSubmit}>
                            <div>
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
                                    required/>  
                                </div>
                                
                                <div className="form-group mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input 
                                        id="username" 
                                        type="text" 
                                        minLength="3" 
                                        maxLength="20" 
                                        value={username}
                                        onChange={(e)=>setUsername(e.target.value)}
                                        className="form-control"
                                        required/>                    
                                </div>

                                <button type="submit" className="btn btn-primary">Register</button> 
                            </div>
                        </form>      
                    </div>
                    
                </div>  
            </div> 
        </div>
    )

}

export default Signup