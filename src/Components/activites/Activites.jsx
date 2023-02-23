import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useTranslation } from 'react-i18next';





export default function Activites() {


  let {t} = useTranslation()


  return (
    <div className='mt-3 mb-5'>
    <Card className='p-4'>
    <h2 style={{color : '#45C0BE'}}>{t("Activites")}</h2>
    <div>
        <div className='d-flex align-items-center justify-content-between'>
            <div>
            <h4>{t('subscription')}</h4>
            <p>{t('newSubs')}</p>
            </div>
            <div style={{color : '#45C0BE' , fontWeight : 'bold'}}>9:45 am</div>
        </div>
        <div className='d-flex align-items-center justify-content-between'>
            <div>
            <h4>{t('subscription')}</h4>
            <p>{t('newSubs')}</p>
            </div>
            <div style={{color : '#45C0BE' , fontWeight : 'bold'}}>9:45 am</div>
        </div>
        <div className='d-flex align-items-center justify-content-between'>
            <div>
            <h4>{t('subscription')}</h4>
            <p>{t('newSubs')}</p>
            </div>
            <div style={{color : '#45C0BE' , fontWeight : 'bold'}}>9:45 am</div>
        </div>
    </div>
    
    </Card>  
    <br />
    <br />  
    <br />  
    <br />  
    <br />  
    <br />  
    <br />  
    <br />  

    </div>
  )
}
