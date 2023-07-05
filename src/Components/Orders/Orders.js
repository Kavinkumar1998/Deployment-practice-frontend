import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar';
import { Typography } from '@mui/material';
import "./Orders.css";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
export const Orders = () => {
    const [Order,setOrder]= useState ([]);
    const history = useHistory();

    //geting cart details
  useEffect(() =>{
    const getOrder = async() =>{
        try{
          const response = await fetch(`https://phonecart.onrender.com/Orders`,{
            method:"GET",
            headers: {
              "x-auth-token": localStorage.getItem("token"),
             "Content-Type":"application/json"
            },
           });
          const data= await response.json();
          console.log(data);
          setOrder(data);
        }
        catch(error){
     console.log(error);
        }
      };
      getOrder();
  },[])


  ///cancellin order

  const cancelOrder = async (Id)=>{
    try{
      console.log(Id);
      const response = await fetch(`https://phonecart.onrender.com/CancelOrder/${Id}`,{
        method:"DELETE",
        headers: {
          "x-auth-token": localStorage.getItem("token"),
          "Content-Type":"application/json"
        },
       });
    const data = await response.json();
    console.log(data)
       const updated = Order.filter((data)=>data._id !== Id);
       setOrder(updated);
       alert(JSON.stringify(data));
       history.push("/Home");
    }catch(error){
      console.log(error);
    }
    }

  return (
    <div className='o-main'>
      <Navbar/>
      <div className="card-container" >

<div className="cart-content"> 

<Typography sx={{ mt: 3, mb: 2,fontWeight:"Bold",fontSize:"3rem"}} component="h1" variant="h5"> Orders </Typography>
</div>     
    <div className="order-row" >
{Order.map((data)=>(
                   <div className="order-container" key ={data._id}>
                   <div className="Orderitems">
                   {data.orders.map((product, productIndex) => (
          <div className="orders" key={productIndex}>
           {product.product.map((order,index)=>(
             <div className="orderDetails" key={index}>
              <div>
              <section className="title">{order.product}</section>
             <img src={order.image} className="cart-image" alt="Poster" />
              </div>
           
           </div>
           ))}
          </div>
        ))} </div>
        <div className='operations'>
                <p className="Address">Address : {data.address}</p>
                <p className="Amount">Amount : {data.total}</p>
                <button onClick = {()=>cancelOrder(data._id)}>Cancel Order</button>
                </div>
                  
                   </div> 
              ))}
        </div>
       
</div>
    </div>
  )
}


