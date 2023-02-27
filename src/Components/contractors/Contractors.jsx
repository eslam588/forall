import { Card, CardContent, Grid } from '@mui/material'
import React, { useCallback, useContext, useLayoutEffect } from 'react'
import { useEffect } from 'react'
import { contractors } from '../../Store/ContractorsData/ContractorsData'
import Button from 'react-bootstrap/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { myProfile } from '../../Store/ProfileData/profileData';
import { teamData } from '../../Store/Teams/Teams';
import {homedata} from '../../Store/HomeData/HomeData'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import usePagination from '@mui/material/usePagination';
import { styled } from '@mui/material/styles';



const List = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: '10px',
  display: 'flex',
});



export default function Contractors() {



  let { vendors,allContractors,nextContractors,errorData,setErrorData,loader,from,setFrom,to,setTo,contractorsPaginations} = useContext(contractors)
  let {getUserData , userData , setUserData , vendorLength , userError , setUserError} = useContext(teamData)
  // let {salesData , agentsData , gmData ,MMData ,spvData , tlData , salesagentsData , vendorData, from, setFrom ,to, setTo } = useContext(homedata)

  let {myinfo }= useContext(myProfile)
  let {t} = useTranslation()
  const [value, setValue] = useState(dayjs());
  const [value2, setValue2] = useState('2020');
  const [page,setPage] = useState(1)
  
  const { items } = usePagination({
    count: vendors?.pagination.meta.pages,
  });
  
  useEffect(() => {
        let li =Array.from(document.querySelectorAll('li'))
        let sideBar = document.querySelector(".sideBar")
        sideBar.classList.remove('showMenu')
        li.map(e=>{
            e.classList.remove('selected')   
            e.classList.remove('selected')  
           e.classList.remove('text-white')  
        } 
        )  
        document.getElementById("Contractors").classList.add('selected')  
        document.getElementById("Contractors").classList.add('text-white')  
        return () => {
          myinfo()
        }

    }, [])
    
    // handle pagination --------------------------------------------------------------

    const handlechange=((e,p)=>{
      setPage(p)
    })


    // useEffect(() => {
    //   return () => {
    //     setFrom('2020-01-01')
    //     setTo(`${dayjs().$y}-${dayjs().$M+1}-${dayjs().$D}`)
    //   }
    // }, [])

    // useEffect(() => {
    //   setPage(1)
    //   if(localStorage.getItem('id') == null){  
    //     allContractors(sessionStorage.getItem('id'),from,to)
    //   }else{
    //     allContractors(localStorage.getItem('id'),from,to)
    //   }
    // },[])

    useEffect(()=>{
      setErrorData(null)
      if(localStorage.getItem('id') == null){
       contractorsPaginations(sessionStorage.getItem('id'),from,to,page)
       }else{
       contractorsPaginations(localStorage.getItem('id'),from,to,page)
       }
   },[page,from,to])
  

    const handleChangeDate =(newValue) => {
      setFrom(`${newValue.$y }${newValue.$M == 10 || newValue.$M == 11 ? '-' : '-0'}${ newValue.$M + 1}${newValue.$D > 9 ? "-" : "-0"}${newValue.$D}`)
      setValue2(newValue)
      setPage(1)
    };
    
    
    const handleChangeDate2 = (newValue) => {
      setTo(`${newValue.$y }${newValue.$M == 10 || newValue.$M == 11 ? '-' : '-0'}${ newValue.$M + 1}${newValue.$D > 9 ? "-" : "-0"}${newValue.$D}`);
      setValue(newValue)
      setPage(1)

    };
    
    // function showImg(e){
    //     setImgView(e)
    //     let view = document.getElementById('seeImg')
    //     view.style.display = 'flex'
    // }


  return (
    <div className='m-auto h-90 mt-5 mb-5 mx-4'>
      <div>
        <div className='d-flex justify-content-between align-items-center mb-5'>
          <h2 className='fw-bold'>{t('Contractors')}</h2>
          <div className='d-flex gap-5' >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
            inputFormat="MM/DD/YYYY"
            label={t('from')}
            value={value2}
            onChange={handleChangeDate}
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
            onChange={handleChangeDate2}
            renderInput={(params) => <TextField {...params} helperText={null}/>}
            maxDate={dayjs()}
            minDate={from}
        />
          </LocalizationProvider>
            </div>
        </div>

        {
          errorData  != null ? <div className='text-center mt-2'>error happened</div> :
          <Card className='h-100'>
          <CardContent>
           <Grid container className='justify-content-around gap-5'>
           {
               vendors?.data != null ? (
                vendors.data?.length != 0 ?
                vendors.data.map(e=>{
                      return(
                          <Grid item xs={12} md={2.5} className={e.state == "joined" ? "mt-3" : 'd-none'} key={e.id}>  
                           <Card className={  e.state == "joined" ? 'cardDesign' : 'd-none'}>
                           <Link to={`/home/contractor/${e.id}`} className="link"> 
                          <CardContent className='p-2'>
                         <img src={e.company != null ? e.company.logo["512px"] : '/assests/assets/avatar.png'} width="50px" height="50px" className='rounded-circle'/>
                         <p className='mt-3'>{e.company != null ? e.company.name.value : ''}</p>
                        <p>{e.company != null ? e.company.description.value : ''}</p>
                        {
                          e.state == "joined" ? <img src='/assests/assets/icons/GreenActive.svg' /> : <img src='/assests/assets/icons/failed-icon-7.png' />
                        }
                       
                       <p>{e.state}</p>
                    </CardContent>
                      </Link>
                           </Card>      
                      </Grid>
                      )
                  })
                  : <div className='pt-5 h2'>{t('No_sbscribers')}</div> 
              ) :    
              loader == true ? <div className='pt-5 text-center mx-auto'><CircularProgress color='inherit'/></div> : 'Error Happend'
          }
           </Grid>
          </CardContent>
          <div className='d-flex justify-content-center gap-4 mb-5 mt-5 '>
           {
               vendors != null && vendors.data?.length != 0 ?  (
                  <>
                      <Stack spacing={3}>
                       <Pagination count={vendors?.pagination.meta.pages} shape="rounded" page={page} onChange={handlechange} />
                      </Stack>
                  </>
               ) : ''
          } 
          
         </div>
          </Card>
        }    
         {/* <div className='img-display gap-5' id="seeImg">
            <img src={imgView} width="250px" height="250px" className='rounded'/>
            <Button variant="danger" onClick={()=> document.getElementById('seeImg').style.display = 'none'}>Cancel</Button>
        </div> */}
      </div>
      </div>
  )
}
