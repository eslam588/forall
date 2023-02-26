import React, { useContext } from 'react'
import { Button, Card, CardContent, Grid } from '@mui/material'
import { useEffect } from 'react'
import { contractors } from '../../Store/ContractorsData/ContractorsData'
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {FiPackage} from 'react-icons/fi'
import {IconContext} from 'react-icons'
import { useTranslation } from 'react-i18next';
import { myProfile } from '../../Store/ProfileData/profileData';





export default function SingleContractor() {

  let id = useParams()

  let {singleContract , contractView ,setContractView , joiningDate , loader , errorData } = useContext(contractors)
  let {myinfo }= useContext(myProfile)


 let {t} = useTranslation()



  useEffect(() => {
    singleContract(id.id)
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
      setContractView(null)
      myinfo()
    }

  }, [])
  
  return (
    <div className='m-auto  mb-5 mx-5 mt-3'>
      {
        contractView != null ? contractView.data.company ? 
        <Card className='position-relative mt-5 h-100' sx={{overflow : 'inherit'}}>
        <CardContent>
        <div className='d-flex justify-content-between align-items-center  '>


        {/* images */}


          <div className='d-flex align-items-center images'>
          <div className='cursorr' onClick={()=>{
            document.getElementById('imgView').style.display = 'flex'
            document.getElementById('myImg').src =   document.getElementById('contracting').src 
          }}>
          {
             contractView != null ? <img id='contracting' src={contractView.data.company.logo["512px"]} className='imgOutcome'/> : <div className='text-center mt-3'> <CircularProgress /> </div>
          }
          </div>
          <div>
            <a href={contractView != null ? `https://www.google.com/maps/?q=${contractView.data.company.owner.address.latitude},${contractView.data.company.owner.address.longitude}` : ''} target='_blank'> 
            <img src='/assests/assets/icons/LocationPng.png' className='imgOutcome imgoutcom' />
            </a>
           
          </div>
          <div>
            <a href={`tel:${ contractView == null ? '' : contractView.data.company.owner.mobile}`}>
            <img src='/assests/assets/icons/CallPng.png' className='imgOutcome imgoutcom' />
            </a>
          </div>
          </div>
          <div className='ms-auto mainColor'>
            <p>
            {
             contractView != null ? `${t('Joined')} ${joiningDate.getFullYear()} / ${joiningDate.getMonth() + 1} / ${joiningDate. getDay()}`  : <CircularProgress />
            }
            </p>
          </div>

        </div>



        {/* company information */}
        <div className='mt-5 d-flex gap-2 '>
        <div className='text-center' style={{width : '300px'}}>
        <p>
        {
             contractView != null ? <p className='fw-bold fs-5'>{contractView.data.company.name.value}</p>: <CircularProgress />
        }
        </p>
        <p className='mainColor'>
        {
             contractView != null ? contractView.data.company.category != null ? contractView.data.company.category.name.value : t('confirmed') : <CircularProgress />
        }
        </p>
        {/* <p className='mainColor'>CompanyID: 
        {
             contractView != null ? contractView.data.company.id  : <CircularProgress />
        }
        </p> */}
        <p className='mainColor'>ID : 
        {
             contractView != null ? <span> {contractView.data.id}</span>  : <CircularProgress />
        }
        </p>
          </div>
          <div>
          {
             contractView != null ? contractView.data.company.description.value: <CircularProgress />
           }
          </div>
        </div>
        <div className='mt-5 d-flex justify-content-around align-items-center flex-wrap gap-2'>
          {/* Emails info*/}
          <Card className='cardView'>
            <CardContent>
              <img src='/assests/assets/icons/email.svg' />
              <p className='mt-4'>
              {t('Contact')}: 
              {
             contractView != null ? `  ${!contractView.data.company.emails.contact == true ? 'No Emails Available' : contractView.data.company.emails.contact}`  : <CircularProgress />
             }
              </p>
              <p className='mt-4'>
              {t('Recruitment')}: 
              {
             contractView != null ? ` ${!contractView.data.company.emails.recruitment == true ? 'No Emails Available' : contractView.data.company.emails.recruitment}`  : <CircularProgress />
             }
              </p>
              <p className='mt-4'>
              {t('Sales')}: 
              {
             contractView != null ? `  ${!contractView.data.company.emails.sales == true ? 'No Emails Available' : contractView.data.company.emails.sales}`  : <CircularProgress />
             }
              </p>
            </CardContent>
          </Card>
          {/* Gender info*/}
          <Card className='cardView'>
            <CardContent>
              <img src='/assests/assets/icons/Gender.svg' />
              <p className='mt-5'>
              {
             contractView != null ? contractView.data.company.owner.gender  : <CircularProgress />
             }
              </p>
            </CardContent>
          </Card>
          {/* Language info*/}
          <Card className='cardView'>
            <CardContent>
              <img src='/assests/assets/icons/Language.svg' />
              <p className='mt-5'>
              {
             contractView != null ? contractView.data.company.owner.language.name_values.value : <CircularProgress />
              }
              </p>
            </CardContent>
          </Card>
          {/* agent info*/}
          <Card className='cardView'>
            <CardContent>
              <img src='/assests/assets/icons/Agent.png' />
              <p className='mt-5'>
              {
             contractView != null ? contractView.data.company.agent.name  : <CircularProgress />
              }
              </p>
            </CardContent>
          </Card>
          <Card className='text-center'>
            <CardContent>
              <IconContext.Provider value={{color : '#45bebc' , size : '50px'}}>
              <FiPackage />
              </IconContext.Provider>
              <p>{t('Name')} : { contractView != null ? contractView.data.company.packages.name.value : <CircularProgress />}</p>
              <p>{t('Code')}  : { contractView != null ? contractView.data.company.packages.code : <CircularProgress />}</p>
              <p>{t('Subscribtion')} : { contractView != null ? contractView.data.company.packages.subscribe_days : <CircularProgress />}</p>
              <p>{t('Package')} : { contractView != null ? contractView.data.company.packages.price : <CircularProgress />}</p>
              <p>{t('Description')} : { contractView != null ? contractView.data.company.packages.description.value : <CircularProgress />}</p>

            </CardContent>
          </Card>
        </div>

      <div className={ localStorage.getItem('Language') == "ar" || sessionStorage.getItem('Language') == "ar"  ?"text-end" : 'text-start' }>
      <div className='mt-3 p-4'>
        <h2>{t('Brancehs')}</h2>
        <p className='mt-4'>
        {
             contractView != null ? contractView.data.company.branches.length == 0 ? <>{t('noBranches')}</> : 
             
             contractView.data.company.branches.map(e=>e.address.detailed_address)
             
             : <CircularProgress />
        }
        </p>
        
      </div>
      </div>
        </CardContent>
      </Card> 
        : <div className='text-center fs-5'>{t('userData')}</div> : loader == true ? <CircularProgress color='inherit' /> : <div className='text-center mt-3'>{errorData}</div>
      }
      <div className='img-display' id='imgView'>
      <img src='/assests/assets/avatar.png'  width="15%" id='myImg'/>
      <Button variant="contained"  onClick={()=>document.getElementById('imgView').style.display = "none"} className="mt-3 mainBg">{t('cancel')}</Button>
   </div>
    </div>
  )
}
