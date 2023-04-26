import React from 'react'
import  "./Navbar.css";
import { Link, useHistory } from 'react-router-dom';



const Navbar = () => {
  
    const history = useHistory();
    const logout= ()=>{
        localStorage.clear();
        history.push("/")
    }

  return (
    <div className="navbar">
        <div className='navbar-left'>
            <div className="navbar-name">Phone Cart</div>
    
             </div>
        <div className='navbar-right'> 
        <div className="navbar-list" >
        <ul style={{listStyleType:"none"}}>
        <Link  to="/Home">   <li>Home</li> </Link>
          <Link  to="/Cart"> <li>Cart</li></Link>
           <Link  to="/About"> <li>About</li></Link>
           <li  onClick={()=>logout()}>Logout</li>
          
        </ul>
        </div>
        </div>
    </div>
  )
}

export default Navbar