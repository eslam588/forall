import { Card, CardContent, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import { teamData } from '../../../Store/Teams/Teams';
import { useTranslation } from 'react-i18next';


export default function Agents() {

    let { MangersAgentsData , marketing , loader , setMarketing , errorData} = useContext(teamData)

    let {t} = useTranslation()

    useEffect(() => {
        MangersAgentsData(7)

        let li =Array.from(document.querySelectorAll('li'))
        let sideBar = document.querySelector(".sideBar")
        sideBar.classList.remove('showMenu')
        li.map(e=>{
            e.classList.remove('selected')   
            e.classList.remove('selected')  
           e.classList.remove('text-white')  
        }
           
        )  
        document.getElementById("Roles").classList.add('selected')  
        document.getElementById("Roles").classList.add('text-white')  

        return () => {
            setMarketing(null)
          }

    }, [])

  return (
   <div>
        <div className='w-75 m-auto h-90 mt-5'>
      <div className='mt-5 pt-5'>
        <h2 className='mt-5 pt-5'>{t('agent')}</h2>
        <Card className='h-100'>
        <CardContent>
         <Grid container className='justify-content-around gap-5'>
         {
            marketing != null ? (
              marketing.data.length != 0 ?
                marketing.data.map(e=> 
                    {
                    return(
                        <Grid item xs={12} md={2.5} className="mt-3" key={e.id}>   
                         <Card className='cardDesign'>
                         <Link to={`/home/userView/${e.id}`} className="link"> 
                        <CardContent className='p-2'>
                       <img src={e.image["512px"]} width="50px" height="50px" className='rounded-circle'/>
                       <p className='mt-3'>{e.company_branch.company.name.value}</p>
                      <p>{e.name}</p>
                      {e.is_online == true ?  <img src='/assests/assets/icons/GreenActive.svg' /> :  <img src='/assests/assets/icons/failed-icon-7.png' width="10%" />}
                      {e.is_online == true ? <p style={{color : '#05B646'}} className='m-0 p-0'>{t('Online')}</p> :  <p className='m-0 p-0 text-danger'>{t('offline')}</p>}
                  </CardContent>
                    </Link>
                         </Card>      
                    </Grid>
                    )
                }
                ): <div className='pt-5 h1'>{t('No_Agents')}</div>  
               
                
            ) : loader == true ? <CircularProgress color='inherit'/>  : <div className='text-center mt-3'>{errorData == null ? 'Error Happend' : errorData}</div>
        }
         </Grid>
        </CardContent>
        </Card>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        </div>
      </div>
    </div>
  
  )
}
