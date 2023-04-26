import React from 'react';
import  { useEffect, useState } from "react";
import "./Home.css";
import {  Typography } from '@mui/material';
import { useHistory } from 'react-router-dom'
import Navbar from '../Navbar/Navbar';



export const Home = () => {

    const history= useHistory();
const [data,setdata]= useState([]);
useEffect(() =>{
const getdata = async() =>{
    try{
      const response = await fetch(`https://phonecart.onrender.com/allproducts`,{
        method:"GET",
        headers: {
          "x-auth-token": localStorage.getItem("token"),
         "Content-Type":"application/json"
        },
       });
      const data= await response.json();
      setdata(data);
    }
    catch(error){
 console.log(error);
    }
  };
  getdata();
},[])
console.log(data)
  return (
<div className='h-main'>

<Navbar/>
<div classNameName="card-container"> 
<div className="main-content">
<Typography sx={{ mt: 3, mb: 2,fontWeight:"Bold",fontSize:"3rem"}} component="h1" variant="h5"> Products </Typography>
</div>         <div className="row" >
{data.map((data)=>(
                   <div className="container" key ={data._id}onClick={()=>{history.push(`/About/${data._id}`)}}>
                   <div className="contentArea">
                   <section className="title">{data.product}</section>
                   <img src={data.image} className="image" alt="Poster"/>
                   <span>Price: {data.price}</span>
                   </div>
                   </div> 
              ))}
</div>
        </div>
        </div>
 
  )
}
