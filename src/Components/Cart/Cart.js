import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar';
import "./Cart.css";
import { Typography } from '@mui/material';
import GooglePayButton from "@google-pay/button-react";


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
  console.log(Id);
  const response = await fetch(`https://phonecart.onrender.com/removeFromCart/${Id}`,{
    method:"DELETE",
    headers: {
     "Content-Type":"application/json"
    },
   });
const data = await response.json();
console.log(data)
   const updated = cart.filter((data)=>data._id !== Id);
   setcart(updated);
}catch(error){
  console.log(error);
}
}





const  total= totalprice()

function totalprice(){
  const totalPrice = cart.reduce((total, item) => {
    const productTotal = item.product.reduce((sum, product) => sum + product.price, 0);
    return total + productTotal * item.quantity;
  }, 0);
  return totalPrice;
  
}


  return (
    <div className='c-main' >
      <Navbar/>
<div className="card-container" >

<div className="main-content"> 

<Typography sx={{ mt: 3, mb: 2,fontWeight:"Bold",fontSize:"3rem"}} component="h1" variant="h5"> Cart </Typography>
</div>     
    <div className="cart-row" >
{cart.map((data)=>(
                   <div className="cart-container" key ={data._id}>
                   <div className="cart-contentArea">
                   {data.product.map((product, productIndex) => (
             <div className='content' key={productIndex}>
             <section className="title">{product.product}</section>
                   <img src={product.image} className="cart-image" alt="Poster"/>
                   <p>Price: {product.price}</p>
                                  </div>
                                     ))}
               <p>Quantity: {data.quantity}</p>
                   </div>
                   <div className='removecart'>
                   <button onClick = {()=>removeFromCart(data._id)} >Remove from Cart</button>
                   </div>
                   </div> 
              ))}
        </div>
       
</div>
<div className='order'>
<h1>Place your order</h1>
 <br/>
<div className='total'>
        <p >Total : Rs . {total}</p>
        <br/>
        <GooglePayButton
            buttonType="plain"
            environment="TEST"
            paymentRequest={{
              apiVersion: 2,
              apiVersionMinor: 0,
              allowedPaymentMethods: [
                {
                  type: "CARD",
                  parameters: {
                    allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                    allowedCardNetworks: ["MASTERCARD", "VISA"],
                  },
                  tokenizationSpecification: {
                    type: "PAYMENT_GATEWAY",
                    parameters: {
                      gateway: "example",
                      gatewayMerchantId: "exampleGatewayMerchantId",
                    },
                  },
                },
              ],
              merchantInfo: {
                merchantId: "12345678901234567890",
                merchantName: "Demo Merchant",
              },
              transactionInfo: {
                totalPriceStatus: "FINAL",
                totalPriceLabel: "Total",
                totalPrice: `${total}`,
                currencyCode: "INR",
                countryCode: "IN",
              },
            }}
            onLoadPaymentData={(paymentRequest) => {
              console.log("load payment data", paymentRequest);
            }}
          />
                </div>
                  </div>
        </div>

  )
}


