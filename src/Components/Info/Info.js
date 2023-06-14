import React from 'react'
import Navbar from '../Navbar/Navbar'
import "./Info.css";

export  const Info = () => {
  return (
    <div>
<Navbar/>  
<div className="Main">
      <h2>
        Welcome to Phonecart app, We make your shopping easy for you.you can order a variety of phones from our app.
        We can deliver the order in your Doorsteps.Payment processing is also Easy ,you can pay through Cards and Accounts without any worry.
      </h2>
      <h4>contact Us</h4>
        <h3>
          Email : <label>kavinajith412@gmail.com</label>
        </h3>
      </div>    
    </div>
  )
}


