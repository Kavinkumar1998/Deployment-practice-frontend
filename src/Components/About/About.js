import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { useHistory, useParams } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, InputLabel } from '@mui/material';
import "./About.css"

const About = () => {
 const history = useHistory();
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

  const  addtocart = async()=>{
    try{
     const values={ "product": found,"quantity":Qty,"user":localStorage.getItem("Id")}
      const data = await fetch(`https://phonecart.onrender.com/addtocart`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      })
      const result = await data.json();
            console.log(result);
              if (data.status === 400) {
            console.log(result);
            alert(JSON.stringify(result));
              } else {
                alert(JSON.stringify(result));
                history.push("/Cart");
             
              }
    }
    catch(error){
      console.log(error);
    }
  }
 


  return (
    <div>
        <Navbar/>
    <div className='main-about'>
      {found.map((phone)=>(  
            <div className="t-container" key ={phone._id}>
                <div ClassName="left">
              <p className="t-title"> {phone.product}</p>
            <div className="t-contentArea">
                  <img src={phone.image} className="t-image" alt="Poster"/>
                  </div>
                  </div>
           <div className="right">
           <p className="t-company">Company : {phone.company}</p>
           <p className="t-model">Model : {phone.model}</p>
           <p className="t-price">Price : {phone.price}</p>

           <p className="t-Highlight">Highlight : {phone.highlight.map(function(ele,idx){
 return (<li key={idx}>{ele}</li>)
           })}</p>  
      <div className='bts'>
          <span>Quantity :<FormControl  >
  <InputLabel sx={{color:"white"}} id="demo-simple-select-label"></InputLabel>
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
</FormControl> </span> 
<button onClick = {addtocart} >Add to cart</button></div>
            </div>
            </div>
             ))}
           
    </div>
    </div>
  )
}

export default About

