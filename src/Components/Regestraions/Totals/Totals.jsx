import React, { useContext, useEffect, useLayoutEffect } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { homedata } from '../../../Store/HomeData/HomeData';
import { CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';


export default function Totals() {

  let {salesData , loader , sales} = useContext(homedata)

  let {t} = useTranslation()
  

console.log(sales);

  return (
    <div className='mt-3 d-flex align-items-center justify-content-between dataview gap-3'>
        <Card  sx={{width : 'fit-content' , paddingBottom : "0" , padding : '0'}}>
            <CardContent className='p-0 '>
                <div className='p-5 text-center'>  
                <h6 className='totalHeader'>{t("earning")}</h6>
                <h2 style={{color : '#45C0BE',height:'75px'}}>{sales != null ?Math.floor(sales.total.earning * 100) / 100 :  loader == true ? <CircularProgress color='inherit'/>  : '0.00'}<p>SAR</p></h2>
                </div>
                <div><img src='/assests/assets/BlueChart.svg' width="100%"/></div>
            </CardContent>
        </Card>
        <Card  sx={{width : 'fit-content' , paddingBottom : "0" , padding : '0'}}>
            <CardContent className='p-0 '>
                <div className='p-5 text-center'>  
                <h6 className='totalHeader'>{t("Subscribers")}</h6>
                <h2 style={{color : '#E4D366',height:'75px'}}>{sales != null ? sales.total.agencies :  loader == true ? <CircularProgress color='inherit'/>  : '0.00'}</h2>
                </div>
                <div><img src='/assests/assets/YellowChart.svg' width="100%"/></div>
            </CardContent>
        </Card>
        <Card  sx={{width : 'fit-content' , paddingBottom : "0" , padding : '0'}}>
            <CardContent className='p-0 '>
                <div className='p-5 text-center'>  
                <h6 className='totalHeader'>{t("Vendors")}</h6>
                <h2 style={{color : '#BE5252',height:'75px'}}>{sales != null ? sales.total.vendors :  loader == true ? <CircularProgress color='inherit'/>  : '0.00'}</h2>
                </div>
                <div><img src='/assests/assets/RedChart.svg' width="100%"/></div>
            </CardContent>
        </Card>
    </div>
  )
}
