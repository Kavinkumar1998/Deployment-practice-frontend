import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar';
import "./Cart.css";
import { TextField, Typography } from '@mui/material';
import GooglePayButton from "@google-pay/button-react";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


export const Cart = () => {
  const history = useHistory();
  const [address, setAddress] = useState("");
    const [cart,setcart]= useState ([]);
    

    //geting cart details
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


  //removing items from cart
const removeFromCart = async (Id)=>{
try{
  console.log(Id);
  const response = await fetch(`https://phonecart.onrender.com/removeFromCart/${Id}`,{
    method:"DELETE",
    headers: {
      "x-auth-token": localStorage.getItem("token"),
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

///adding order details
const orderDetails = async(cart,total,address)=>{
  try{
    const values={ "orders":cart,"total":total,"address":address}
    console.log(values)
     const data = await fetch(`https://phonecart.onrender.com/addorder`, {
       method: "POST",
       headers: {  "x-auth-token": localStorage.getItem("token"),
       "Content-Type":"application/json" },
       body: JSON.stringify(values),
     })
     const result = await data.json();
           console.log(result);
             if (data.status === 400) {
           console.log(result);
           alert(JSON.stringify(result));
           history.push("/Order");
             } else {
               alert(JSON.stringify(result));
             
             }
   }
   catch(error){
     console.log(error);
   }
  
}


//function for total price
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

<div className="cart-content"> 

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
<TextField
                  required
                  fullWidth
                  id="Address"
                  label="Address"
                  name="Address"
                  multiline
                  rows={3}
                  autoComplete="Address"
               sx={{backgroundColorcolor:"yellow",border:"2px solid yellow"}}
                 value={address} // Add this line to bind the value to the state variable
  onChange={(e) => setAddress(e.target.value)}
                />
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
            onLoadPaymentData={() => { orderDetails(cart,total,address)
            }}
          />
                </div>
                  </div>
        </div>

  )
}


