import React, { useContext, useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import {AiFillEye , AiFillEyeInvisible} from 'react-icons/ai'
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import axios from '../../Store/Links/Urls';
import { toast } from 'react-hot-toast';
import Joi from 'joi';
import { siginInStore } from '../../Store/signInData/SigninStore';
import { useNavigate } from 'react-router-dom';






export default function SignIn() {


  let {handleSubmit , loader , setrember} = useContext(siginInStore)


  let navigate = useNavigate()

  useEffect(() => {
   if(localStorage.getItem('token') != null || sessionStorage.getItem('token') != null){
    navigate('/home/dashboard')
   }
  }, [])


    const theme = createTheme();

  
      
      const handleClickShowPassword = () => setShowPassword((show) => !show);

      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
      const [showPassword, setShowPassword] = useState(false);
   


  return (
    <>
    <div className='signInBg'>
         <Card className="cardSign">
            
         <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: '30px',
              marginBottom: '30px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5" className='headerSign'>
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField id="standard-basic" label="Email" variant="standard" fullWidth  sx={{marginTop : '30px'}}  name="email" required type='email'/>
  
          <FormControl id="standard-basic" label="Standard" variant="standard" fullWidth sx={{marginTop : '30px'}}>
  
            <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
  
            <FilledInput
              id="filled-adornment-password"
              type={showPassword ? 'text' : 'password'}
              className="inputPw"
              name='password'
              required
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Grid container sx={{textAlign : 'end' , marginTop : '20px' }}>
                {/* <Grid item xs>
                  <Link href="#" variant="body2" sx={{color : '#7BDBDA'}}>
                    Forgot password?
                  </Link>
                </Grid> */}
              </Grid>
              <FormControlLabel
                control={<Checkbox value="remember" sx={{color : '#7BDBDA'}} onClick={(e)=> setrember(e.target.checked)}/>}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className='signInBtn'
                sx={{ mt: 3, mb: 2 , background : '#45C0BE'}}
              >
                {
                    loader == true ? (
                    <Box sx={{color : 'white'}}>
                    <CircularProgress color='inherit'/>
                    </Box>
                    ) : ('Sign In')
                } 
              </Button>
            </Box>
          </Box>
        </Container>
            </ThemeProvider>
         
        </Card>
    </div>
    </>
  )
}
