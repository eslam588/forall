import React, { useContext } from 'react'
import { Card, CardContent, CircularProgress } from '@mui/material';
import TextField from '@mui/material/TextField';
import { myProfile } from '../../Store/ProfileData/profileData';
import { useTranslation } from 'react-i18next';





export default function ChangePw(){

  let {setPW , setNewPw , setConfirmNewPw , changePw , loader} = useContext(myProfile)

let {t} = useTranslation()


    function form(){
        document.getElementById('pw').style.display = 'none'
    }

  return (
    <div>
        <Card>
            <CardContent>
            <section className='text-center'>
        {
            loader == true ? <CircularProgress color='inherit' />  : 
       <>
   <div className="form-group">
     <TextField id="outlined-basic" label={t('Password')} onChange={(e)=>setPW(e.target.value)} variant="outlined" fullWidth className='mt-2' type='password'/>
   </div>
   <div className="form-group mt-3">
     <TextField id="outlined-basic" label={t('New_Password')} onChange={(e)=>setNewPw(e.target.value)} variant="outlined" fullWidth className='mt-2' type='password'/>
   </div>  
   <div className="form-group mt-3">
     <TextField id="outlined-basic" label={t('Confirm_New_Password')} onChange={(e)=>setConfirmNewPw(e.target.value)} variant="outlined" fullWidth className='mt-2' type='password'/>
   </div>   
   <div className='mt-4 d-flex justify-content-around'>
   <button  className="btn btn-danger " onClick={form}>{t('cancel')}</button>
   <button  className="btn btn-primary ViewLink " onClick={changePw}>{t('Confirm')}</button>
   </div>
     </>
        }
         </section>
        </CardContent> 
         </Card>
      
    </div>
  )
}
