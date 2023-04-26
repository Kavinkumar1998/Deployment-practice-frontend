import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import "./Login.css";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { useState } from 'react';
import { Checkbox } from '@mui/material';



const formValidationSchema = yup.object({
  Email: yup.string().email().required("Email address is required"),
  Password: yup.string().required("password required").min(8),
});


export const Login =()=>{
    const history = useHistory();
    const [show, setShow] = useState(false);
    const   [open,setopen]=useState(false);
    const    [message,setmessage]=useState([]);

    const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
      useFormik({
        initialValues: {
          Email: "",
          Password: "",
        },
        validationSchema: formValidationSchema,
        onSubmit: async (values) => {
         const data = await fetch(`https://phonecart.onrender.com/Login`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(values),
          })
          const result = await data.json();
          console.log(result);
            if (data.status === 400) {
              setopen(!open)
               setmessage(result.message);
          console.log(result);

            } else {
              localStorage.setItem("Name", result.Name);
              localStorage.setItem("Email", result.Email);
              localStorage.setItem("token", result.token);
              localStorage.setItem("Id", result.Id);
      
              history.push("/Home");
           
            }
              

        },
      });


      const togglePassword = () => {
        setShow(!show);
      };
  
    const reDirect = () => {
      history.push("/Signup")
    };

  return (
   
    <div className="main"> 
  <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box className="main-box" >
          <Typography   component="h1" variant="h5">  Sign In your Account   </Typography>
           <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Email"
                  label="Email Address"
                  name="Email"
                  autoComplete="Email"
                  value={values.Email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.Email && errors.Email}
                  helperText={touched.Email && errors.Email ? errors.Email : null}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Password"
                  label="Password"
                  type={show ? "text" : "Password"}
                  id="password"
                  autoComplete="Password"
                  value={values.Password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.Password && errors.Password}
                  helperText={touched.Password && errors.Password ? errors.Password : null}
                />
              </Grid>
              <span className="showpassword">
                  <Checkbox
                    onClick={togglePassword}
                    aria-label="Checkbox demo"
                  />
                  <span>Show password</span>
                </span>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link  onClick={() => history.push("/Forgetpassword")} variant="body2">
                  Forget Password
                </Link>
              </Grid>
            </Grid>
            <Button
               onClick={() => reDirect()}
              type="submit"
              fullWidth
              variant="contained"
              color="success"
            
            >
              Create Account
            </Button>
            <Typography 
             sx={{color:"red",
          ...(!open && { display: 'none' })}} 
          component="h1"
           variant="h5">{message}</Typography>
            <Grid container justifyContent="flex-end">
              <Grid item>
              </Grid>
            </Grid>
          </Box>
        
          <Typography  component="h2" variant="h6">Email:kavinajith1498@gmail.com</Typography>
        <Typography  component="h2" variant="h6"> Password: 123456789 </Typography>
        </Box>
       
      </Container>
      </div>
  );
}