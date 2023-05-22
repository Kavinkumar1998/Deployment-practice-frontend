import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { useParams } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, InputLabel } from '@mui/material';
import "./About.css"

const About = () => {

  const [Qty, setQty] = useState('');

  const handleChange = (event) => {
    setQty(event.target.value);
  };
  const {Id} = useParams();
  console.log(Id)
  const [prod,setprod]= useState([]);
  useEffect(() =>{
  const getprod = async() =>{
      try{
        const response = await fetch(`https://phonecart.onrender.com/allproducts`,{
          method:"GET",
          headers: {
            "x-auth-token": localStorage.getItem("token"),
           "Content-Type":"application/json"
          },
         });
        const data= await response.json();
        console.log(data);
        setprod(data);
      }
      catch(error){
   console.log(error);
      }
    };
    getprod();
},[])

const found = prod.filter(obj=>obj._id === Id);
  console.log(found);


const addtocart = (found)=>{
  
}





  return (
    <div>
        <Navbar/>
    <div className='main-about'>
      {found.map((phone)=>(  
            <div className="t-container" key ={phone._id}>
              <section className="t-title">Tittle : {phone.product}</section>
            <div className="t-contentArea">
             <div ClassName="left">
                  <img src={phone.image} className="image" alt="Poster"/>
                  </div>
           <div className="right">
           <section className="t-title">Company : {phone.company}</section>
           <section className="t-title">Model : {phone.model}</section>
           <section className="t-About">Price : {phone.price}</section>
           <section className="t-released">Highlight : {phone.highlight}</section>  
           </div>
           <FormControl  >
  <InputLabel sx={{color:"white"}} id="demo-simple-select-label">Quantity</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={Qty}
    label="Quantity"
    onChange={handleChange}
    sx={{height:"2.5rem",width:"5rem",backgroundColor:"rgb(94, 219, 44)",marginRight:"10px"}}
  >
    <MenuItem value={1}>1</MenuItem>
    <MenuItem value={2}>2</MenuItem>
    <MenuItem value={3}>3</MenuItem>
  </Select>
</FormControl>
<button onSubmit={addtocart(found)} >Add to cart</button>
            </div>
            </div>  ))}
           
    </div>
    </div>
  )
}

export default About
