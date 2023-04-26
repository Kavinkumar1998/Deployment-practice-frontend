import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import "./Setpassword.css";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { Checkbox } from '@mui/material';
import { useState } from 'react';




const formValidationSchema = yup.object({
  Email: yup.string().email().required("Email address is required"),
  Password: yup.string().required("password required").min(8),
});


export const Setpassword =()=>{
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
          const data = await fetch(`https://phonecart.onrender.com/Setpassword`, {
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
            history.push("/");
            console.log(result)
          }
           
        },
      });


      const togglePassword = () => {
        setShow(!show);
      };
  

  return (
    <div className="main"> 
  <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box className="main-box"  >
        <Typography   component="h1" variant="h4">Account Recovery</Typography>
        <Typography  component="h1" variant="h6">Set Password</Typography>
           <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
            <Typography  component="h1" variant="h6">Enter new password to Your Account</Typography>
              </Grid>
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
              <span  className="showpassword">
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
              sx={{ mt: 3, mb: 2 }}
            >
              Set New Password
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