import React, {useEffect} from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

const Private = () => {
    //Declaramos variables
    const { store, dispatch } = useGlobalReducer(); 
    const navigate=useNavigate();

    // Queremos que cuando se cargue la pagina compruebe el token
    useEffect( ()=>{
        fetchUser()
    }, [])

    const fetchUser = async () => { 
        try {
         const backendUrl = import.meta.env.VITE_BACKEND_URL || "";
         const response= await fetch(`${backendUrl}/api/private`, {
             method: 'GET',
             headers: {
                 "Content-Type": "application/json",
                 // Enviamos el token a BD en el header.
                 "Authorization": `Bearer ${store.token}`
             }
         })
 
         const data = await response.json();
 
         if(!response.ok){
             throw new Error (data.error || "Error in your credentials")
         }
 
        } catch (error) {
             console.log(error.message)
             navigate("/login")
        } 
     }

     return (
        <>
            <div className="private-alert">
                <div className="alert alert-info mb-0" role="alert" >
                    <h1 className="text-center mb-0">Welcome to your private page {store.username}</h1>
                </div>                
            </div>

        </>
    )

}

export default Private