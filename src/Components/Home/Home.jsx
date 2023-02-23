import React, { useState,useLayoutEffect } from 'react'
import Activites from '../activites/Activites'
import Dashboard from '../dashboard/DashboardChart'
import Registrations from '../Regestraions/Registrations'
import Totals from '../Totals/Totals'
import { Grid } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import TextField from '@mui/material/TextField';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { homedata } from '../../Store/HomeData/HomeData'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import GmChart from '../Regestraions/GmChart'
import MmChart from '../Regestraions/MmChart'
import TlChart from '../Regestraions/TlChart'
import SpvChart from "../Regestraions/SpvChart"
import SalesChart from '../Regestraions/SalesChart'
import Vendor from '../Regestraions/Vendor'
import { useEffect } from 'react'


export default function Home() {

  let {salesData , agentsData , gmData ,MMData ,spvData , tlData , salesagentsData , vendorData, from, setFrom ,to, setTo } = useContext(homedata)

  let {t} = useTranslation()
  
 
  const [value, setValue] = useState(dayjs());
  const [value2, setValue2] = useState('2020');

  useEffect(() => {
    return () => {
      setFrom('2020-01-01')
      setTo(`${dayjs().$y}-${dayjs().$M+1}-${dayjs().$D}`)
    }
  }, [])


  // useLayoutEffect(() => {
  //   if(localStorage.getItem('id') == null){  
  //   salesData(sessionStorage.getItem('id') , from , to)
  //   }else{
  //   salesData(localStorage.getItem('id') , from , to)
  //   }
  // }, [])
  

const handleChange = (newValue) => {

  setFrom(`${newValue.$y }${newValue.$M == 10 || newValue.$M == 11 ? '-' : '-0'}${ newValue.$M + 1} ${newValue.$D > 9 ? "-" : "-0"}${newValue.$D}`);
  setValue2(newValue)
  if(localStorage.getItem('id') == null){  
      salesData(sessionStorage.getItem('id') , `${newValue.$y }${newValue.$M == 10 || newValue.$M == 11 ? '-' : '-0'}${ newValue.$M + 1} ${newValue.$D > 9 ? "-" : "-0"}${newValue.$D}` ,to)
    }else{
      salesData(localStorage.getItem('id') , `${newValue.$y }${newValue.$M == 10 || newValue.$M == 11 ? '-' : '-0'}${ newValue.$M + 1} ${newValue.$D > 9 ? "-" : "-0"}${newValue.$D}` , to)
    }
agentsData(`${newValue.$y }${newValue.$M == 10 || newValue.$M == 11 ? '-' : '-0'}${ newValue.$M + 1} ${newValue.$D > 9 ? "-" : "-0"}${newValue.$D}` , to , 1)
gmData(`${newValue.$y }${newValue.$M == 10 || newValue.$M == 11 ? '-' : '-0'}${ newValue.$M + 1} ${newValue.$D > 9 ? "-" : "-0"}${newValue.$D}` ,to , 3)
MMData(`${newValue.$y }${newValue.$M == 10 || newValue.$M == 11 ? '-' : '-0'}${ newValue.$M + 1} ${newValue.$D > 9 ? "-" : "-0"}${newValue.$D}` , to , 4)
spvData(`${newValue.$y }${newValue.$M == 10 || newValue.$M == 11 ? '-' : '-0'}${ newValue.$M + 1} ${newValue.$D > 9 ? "-" : "-0"}${newValue.$D}` , to , 6)
tlData(`${newValue.$y }${newValue.$M == 10 || newValue.$M == 11 ? '-' : '-0'}${ newValue.$M + 1} ${newValue.$D > 9 ? "-" : "-0"}${newValue.$D}` , to , 5)
salesagentsData(`${newValue.$y }${newValue.$M == 10 || newValue.$M == 11 ? '-' : '-0'}${ newValue.$M + 1} ${newValue.$D > 9 ? "-" : "-0"}${newValue.$D}` , to , 7)
vendorData(`${newValue.$y }${newValue.$M == 10 || newValue.$M == 11 ? '-' : '-0'}${ newValue.$M + 1} ${newValue.$D > 9 ? "-" : "-0"}${newValue.$D}` , to , 8)
};


const handleChange2 = (newValue) => {
  console.log(newValue);
  setTo(`${newValue.$y }${newValue.$M == 10 || newValue.$M == 11 ? '-' : '-0'}${ newValue.$M + 1}`);
  setValue(newValue)
  if(localStorage.getItem('id') == null){  
    salesData(sessionStorage.getItem('id') , from , `${newValue.$y }${newValue.$M == 10 || newValue.$M == 11 ? '-' : '-0'}${ newValue.$M + 1} ${newValue.$D > 9 ? "-" : "-0"}${newValue.$D}`)
    }else{
      salesData(localStorage.getItem('id') , from ,`${newValue.$y }${newValue.$M == 10 || newValue.$M == 11 ? '-' : '-0'}${ newValue.$M + 1} ${newValue.$D > 9 ? "-" : "-0"}${newValue.$D}`)
    }
agentsData(from , `${newValue.$y }${newValue.$M == 10 || newValue.$M == 11 ? '-' : '-0'}${ newValue.$M + 1} ${newValue.$D > 9 ? "-" : "-0"}${newValue.$D}`, 1)
gmData(from ,`${newValue.$y }${newValue.$M == 10 || newValue.$M == 11 ? '-' : '-0'}${ newValue.$M + 1} ${newValue.$D > 9 ? "-" : "-0"}${newValue.$D}` , 3)
MMData(from ,`${newValue.$y }${newValue.$M == 10 || newValue.$M == 11 ? '-' : '-0'}${ newValue.$M + 1} ${newValue.$D > 9 ? "-" : "-0"}${newValue.$D}` , 4)
spvData(from , `${newValue.$y }${newValue.$M == 10 || newValue.$M == 11 ? '-' : '-0'}${ newValue.$M + 1} ${newValue.$D > 9 ? "-" : "-0"}${newValue.$D}` , 6)
tlData(from , `${newValue.$y }${newValue.$M == 10 || newValue.$M == 11 ? '-' : '-0'}${ newValue.$M + 1} ${newValue.$D > 9 ? "-" : "-0"}${newValue.$D}` , 5)
salesagentsData(from , `${newValue.$y }${newValue.$M == 10 || newValue.$M == 11 ? '-' : '-0'}${ newValue.$M + 1} ${newValue.$D > 9 ? "-" : "-0"}${newValue.$D}` , 7)
vendorData(from , `${newValue.$y }${newValue.$M == 10 || newValue.$M == 11 ? '-' : '-0'}${ newValue.$M + 1} ${newValue.$D > 9 ? "-" : "-0"}${newValue.$D}` , 8)
};


  return (
    <div>
        <div className='mt-4'>
            <div className='d-flex gap-5 justify-content-between align-items-center mb-3 widthHome'>
            <h2>{t("Dashboard")}</h2>
            <div className='d-flex gap-5' >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
            inputFormat="MM/DD/YYYY"
            label={t('from')}
            value={value2}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} helperText={null}/>}
            maxDate={dayjs()}
            minDate={'2020'}
           />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
            inputFormat="MM/DD/YYYY"
            label={t('to')}
            value={value}
            onChange={handleChange2}
            renderInput={(params) => <TextField {...params} helperText={null}/>}
            maxDate={dayjs()}
            minDate={from}
        />
          </LocalizationProvider>
            </div>
            </div>
            <Grid container   className=' justify-content-between dataview' style={{width : '100%'}} >
              <Grid item  xs={12} md={12} lg={6}   style={{height : '530px'}} className="w-100" > 
                <Dashboard />
              </Grid>
              <Grid item  xs={12} md={12} lg={5.5}  style={{height : '530px'}} className="w-100" >
                <GmChart />
              </Grid>
            </Grid>
            <Grid container className='d-flex justify-content-between dataview' style={{width : '100%'}}  >
              <Grid item  xs={12} md={12} lg={6} style={{height : '550px'}} className="w-100" >
                <MmChart />
              </Grid>
              <Grid item xs={12} md={12} lg={5.5} style={{height : '550px'}} className="w-100" >
                <TlChart />
              </Grid>
            </Grid>
            <Grid container  className='d-flex justify-content-between dataview' style={{width : '100%'}} >
              <Grid item  xs={12} md={12} lg={6} style={{height : '530px'}} className="w-100" >
                 <SpvChart />
              </Grid>
              <Grid item   xs={12} md={12} lg={5.5} style={{height : '530px'}} className="w-100" >
                <SalesChart />
              </Grid>
            </Grid>
            <Grid container className='d-flex justify-content-between ' style={{width : '100%'}}>
              <Grid item  xs={12} md={12} lg={6} style={{height : '600px'}} className="w-100">
                <Vendor />
              </Grid>
              <Grid item  xs={12} md={12} lg={5.5}  className="dashbord-totals w-100">
                <Totals />
              </Grid>
            </Grid>
            
        </div>
    </div>
  )
}
