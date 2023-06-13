import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar';
import "./Cart.css";
import { Typography } from '@mui/material';


export const Cart = () => {

    const [cart,setcart]= useState ([]);
  useEffect(() =>{
    const getcart = async() =>{
        try{
          const response = await fetch(`https://phonecart.onrender.com/Cart`,{
            method:"GET",
            headers: {
              "x-auth-token": localStorage.getItem("token"),
             "Content-Type":"application/json"
            },
           });
          const data= await response.json();
          console.log(data);
          setcart(data);
        }
        catch(error){
     console.log(error);
        }
      };
      getcart();
  },[])

const removeFromCart = async (Id)=>{
try{
  const response = await fetch(`https://phonecart.onrender.com/removeFromCart/${Id}`,{
    method:"DELETE",
    headers: {
     "Content-Type":"application/json"
    },
   });
const data = await response.json();

   const updated = cart.filter((data)=>data._id !== Id);
   setcart(updated);
}catch(error){
  console.log(error);
}
}





function total(){
  const totalPrice = cart.reduce((total, item) => {
    const productTotal = item.product.reduce((sum, product) => sum + product.price, 0);
    return total + productTotal * item.quantity;
  }, 0);
  return totalPrice;
  
}


  return (
    <div >
      <Navbar/>
<div className='c-main'>

<div classNameName="card-container"> 

<Typography sx={{ mt: 3, mb: 2,fontWeight:"Bold",fontSize:"3rem"}} component="h1" variant="h5"> Cart </Typography>
</div>         <div className="row" >
{cart.map((data)=>(
                   <div className="cart-container" key ={data._id}>
                   <div className="cart-contentArea">
                   {data.product.map((product, productIndex) => (
             <div key={productIndex}>
             <section className="title">{product.product}</section>
                   <img src={product.image} className="image" alt="Poster"/>
                   <p>Price: {product.price}</p>
                                  </div>
                                     ))}
               <p>Quantity: {data.quantity}</p>
                   </div>
                   <div className='addcart'>
                   <button onClick = {()=>removeFromCart(data._id)} >Remove from Cart</button>
                   </div>
                   </div> 
              ))}

        </div>
<div className='total'>Total : Rs . {total()}</div>

</div>
    </div>
  )
}


