import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import "./Verifyotp.css";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { useState } from 'react';




const formValidationSchema = yup.object({
 OTP: yup.string().required("OTP is required"),
 
});


export const VerifyOTP =()=>{
    const history = useHistory();
    const   [open,setopen]=useState(false);
    const    [message,setmessage]=useState([]);


    const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
      useFormik({
        initialValues: {
        OTP: ""
         
        },
        validationSchema: formValidationSchema,
        onSubmit: async (values) => {
          const data = await fetch(`https://phonecart.onrender.com/verifyotp`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(values),
          })
          const result = await data.json();
          console.log(result);
          if (data.status === 400) {
            setopen(!open)
            setmessage(result.message);
            console.log(result)
          } else {
        
            history.push("/Setpassword");
          }
          
        },
      });

  return (
    <div className="main"> 
  <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box className="main-box"  >
          <Typography   component="h1" variant="h4">Account Recovery</Typography>
          <Typography   component="h1" variant="h6">Verify OTP</Typography>
           <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
            <Typography   component="h1" variant="h6">Enter the OTP that sent to your email address</Typography>
               <span ></span>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="OTP"
                  label="OTP"
                  name="OTP"
                  autoComplete="OTP"
                  value={values.OTP}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.OTP && errors.OTP}
                  helperText={touched.OTP && errors.OTP ? errors.OTP : null}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Verify OTP
            </Button>
            <Typography 
             sx={{color:"red",
          ...(!open && { display: 'none' })}} 
          component="h1"
           variant="h5">{message}</Typography>
          </Box>
        </Box>
      </Container>
      </div>
  );
}