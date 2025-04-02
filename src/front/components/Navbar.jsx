import { Link } from "react-router-dom";
import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {

	const { store, dispatch } = useGlobalReducer();
	const token = localStorage.getItem("token") || null

	const handleLogout = () => {
		dispatch({
			type:"logout"
		})
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/signup" className="me-3">
						<button className="btn btn-primary">Sign up</button>
					</Link>
					<Link to="/login" className="me-3">
						<button className="btn btn-primary">Login</button>
					</Link>
					{token &&  
						<Link to="/login">
							<button 
								type="button" 
								className ="btn btn-danger"
								onClick={handleLogout}
							>
							Logout
							</button>
						</Link>
					}
				</div>
			</div>
		</nav>
	);
};