import { Card, CardContent, CircularProgress, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useContext } from 'react';
import { teamData } from '../../Store/Teams/Teams';
import { useState } from 'react';
import { homedata } from '../../Store/HomeData/HomeData';
import Dropdown from 'react-bootstrap/Dropdown';
import {IconContext} from 'react-icons'
import {AiFillCaretRight , AiFillCaretLeft , AiOutlineMail} from "react-icons/ai"
import {FaKey , FaFileContract} from "react-icons/fa"
import { Link } from 'react-router-dom';
import {BsFillPlusSquareFill} from "react-icons/bs"
import { myProfile } from '../../Store/ProfileData/profileData';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import ChangePw from './ChangePw';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';












export default function Profile() {


      const [checked, setChecked] = React.useState(true);
      let {t} = useTranslation()

      const handleChange = () => {
        setChecked((prev) => !prev);
        document.getElementById('pw').style.display = 'flex'
      };
    


  let {myinfo , infoDetails , loader , setInfoDetails , Languages , lang , settingData , settingDatas} = useContext(myProfile)
  let {getUserData , userData , setUserData} = useContext(teamData)


    useEffect(() => {
        if(localStorage.getItem('Userid') == null){
            getUserData(sessionStorage.getItem('Userid'))
        }else{
            getUserData(localStorage.getItem('Userid'))
        }
     myinfo()
     Languages()
     settingData()
     return () => {
        setInfoDetails(null)
      }
    }, [])

    
    
  return (
    
    <div>
        <Grid container className='justify-content-center gap-5 mt-5 pt-5'>
          {
           infoDetails != null ? infoDetails.company_branch == null ? 
            <>
                    <Grid item xs={12} md={6}  >
    <Card className='position-relative overflow mt-5'>
       <CardContent>  
           <div className='d-flex justify-content-between align-items-center'>
            <div className='d-flex align-items-center'>
               <div className='mt-5 pt-4 text-center cursor' onClick={()=>{
                     document.getElementById('imgView').style.display = 'flex'
                     document.getElementById('myImg').src = document.getElementById('imgmainly').src
                   }}> 
               <img src={ infoDetails != null ? infoDetails.company.logo["512px"] : loader == true ? <CircularProgress color='inherit' /> : '/assests/assets/avatar.png'}  className='companyLogo' id="imgmainly"/>    
               </div>
               <div>
                {
                  infoDetails != null ? infoDetails.company_branch == null ? 
                  
                  <a href={infoDetails != null ? `https://www.google.com/maps/?q=${infoDetails.company.owner.address_id.latitude},${infoDetails.company.owner.address_id.longitude}` : ''} target='_blank'>
                  <img src='/assests/assets/icons/LocationPng.png' className='LocationCompany' />
                  </a>
                  : 
                  
                  <a href={infoDetails != null ? `https://www.google.com/maps/?q=${infoDetails.company_branch.company.owner.address_id.latitude},${infoDetails.company_branchcompany.owner.address_id.longitude}` : ''} target='_blank'>
                  <img src='/assests/assets/icons/LocationPng.png' className='LocationCompany' />
                  </a>
                  
                  : ''
                  
                 
                }
             
               </div>
               <div>
               <a href={`tel:${ infoDetails == null ? '' : infoDetails.company.owner.mobile}`}>
                  <img src='/assests/assets/icons/CallPng.png' className='phoneCompany' />
                  </a>
           
               </div>
           </div>
           </div>
        <div className='d-flex justify-content-center gap-3 align-items-center'>
       <div className='text-center' style={{flex: '1'}}>
       <h4>
      {
        infoDetails != null ? infoDetails.company.name.value : loader == true ? <CircularProgress color='inherit'/> : ''
      }
       </h4>
       <p className='mainColor'>
       {
        infoDetails != null ? infoDetails.company.description.value : loader == true ? <CircularProgress color='inherit'/> : ''
      }
       </p>
       </div>
       <div className='companyCover'>
       <img src={ infoDetails != null ? infoDetails.company.logo["512px"] : loader == true ? <CircularProgress color='inherit'/> : '/assests/assets/avatar.png'} width="85%" height="130px" className='rounded'/>
       </div>
           </div>
       </CardContent>
   </Card>
   <Card className='position-relative overflow'>
       <CardContent>  
           <div className='d-flex justify-content-between align-items-center'>
            <div className='d-flex align-items-center'>
               <div className='mt-5 pt-4 text-center cursor' onClick={()=>{
                     document.getElementById('imgView').style.display = 'flex'
                     document.getElementById('myImg').src = document.getElementById('imgsecondly').src
                   }}> 
               <img src={ infoDetails != null ? infoDetails.image != null ? infoDetails.image["512px"] : '/assests/assets/avatar.png' : loader == true ? <CircularProgress color='inherit'/> : '/assests/assets/avatar.png'}   className='userLogo' id="imgsecondly"/>    
               </div>
            
               <div>
               {
                  infoDetails != null ? 
                  <a href={infoDetails != null ? `https://www.google.com/maps/?q=${infoDetails.address.latitude},${infoDetails.address.longitude}` : ''} target='_blank'>
                  <img src='/assests/assets/icons/LocationPng.png' className='LocationCompany' />
                  </a>
                  
                  : ''
                  
                 
                  
                }
               </div>
               <div>
               <a href={`tel:${ infoDetails == null ? '' : infoDetails.mobile != null ? infoDetails.mobile  : ''}`}>
               <img src='/assests/assets/icons/CallPng.png' className='phoneCompany' />
               </a>
               </div>
           </div>
           </div>
        <div className='d-flex justify-content-center gap-3 align-items-center'>
       <div className='text-center'>
       <h4>
        {
            infoDetails != null ? infoDetails.name : loader == true ? <CircularProgress color='inherit'/> : ''

        }
       </h4>
       <p className='mainColor'>
       {
            infoDetails != null ? infoDetails.type.role  : loader == true ? <CircularProgress color='inherit'/> : ''

        }
       </p>
       </div>
       <Card className='mangerCard'>
       <CardContent>
         <img src='/assests/assets/icons/email.svg' width="40px"  height= "40px" />
         <p className='mt-4 mb-2'>
         {
            infoDetails != null ? infoDetails.email : loader == true ? <CircularProgress color='inherit'/> : ''

        }
         </p>
       </CardContent>
        </Card>
        <Card className='mangerCard'>
       <CardContent>
         <img src='/assests/assets/icons/Gender.svg' width="40px"  height= "40px"/>
         <p className='mt-4 mb-2'>
         {
            infoDetails != null ? infoDetails.gender  : loader == true ? <CircularProgress color='inherit'/> : ''

        }
         </p>
       </CardContent>
        </Card>
        <Card className='mangerCard'>
       <CardContent>
         <img src='/assests/assets/icons/Language.svg' width="40px" height= "40px" />
         <p className='mt-4 mb-2'>
         {
            infoDetails != null ? infoDetails.language.name_values.value : loader == true ? <CircularProgress color='inherit'/> : ''
        }
         </p>
       </CardContent>
        </Card>
           </div>
       </CardContent>
   </Card>
   <Card className='mt-5 cardOverflow'>
    <CardContent>
    <section className='d-flex justify-content-between'>
         <Grid container className='mt-2  justify-content-between align-items-center' >
        <Grid item xs={4} md={4} className='d-flex align-items-center gap-4'>
        <IconContext.Provider value={{size : '20px'}}>
        <AiOutlineMail  className='mainColor'/>
        </IconContext.Provider>
        {t('Contact')}
        </Grid>
        <Grid item xs={4} md={4} className={localStorage.getItem('Language') == 'ar' || sessionStorage.getItem('Language') == 'ar' ? 'text-start' : 'text-end'}>
            <span className='mainColor'>
            {
       infoDetails != null ? infoDetails.email == null ? <div>{t('No_Links')}</div> : infoDetails.email : loader == true ? <CircularProgress color='inherit'/> : ''

              }
            </span>
        </Grid>
        </Grid>
    </section>
    <section className='mt-3 d-flex justify-content-between'>
    <div className='d-flex align-items-center gap-4'>
    <IconContext.Provider value={{size : '25px'}}>
           <FaFileContract className='mainColor'/>
           </IconContext.Provider>
            <p className='m-0 p-0'>{t('Contracts')}</p>
    </div>
    <div>
      {       
       infoDetails != null ?  
       <a href={infoDetails != null ? localStorage.getItem('Language') == "ar" ||  sessionStorage.getItem('Language') == "ar"?  `${infoDetails.contract.ar}` : `${infoDetails.contract.en}` : ''} target='_blank'>
        {
            localStorage.getItem('Language') == "ar" ||  sessionStorage.getItem('Language') == "ar"? 
            <IconContext.Provider value={{color : '#45c0be' , size : '20px'}}>
            <AiFillCaretLeft />
           </IconContext.Provider> 
           :

             <IconContext.Provider value={{color : '#45c0be' , size : '20px'}}>
           <AiFillCaretRight />
           </IconContext.Provider>

        }
        </a>
       : ''
      }
    
    </div>
    </section>
    <section className='mt-3 d-flex justify-content-between'>
    <div className='d-flex align-items-center gap-4'>
            <img src='/assests/assets/icons/Birthdate.svg' width="20px" height="20px"/>
            <p className='m-0 p-0'>{t('Birthdate')}</p>
    </div>
    <div>
       {
            infoDetails != null ? infoDetails.birthdate : loader == true ? <CircularProgress color='inherit'/> : ''

        }
    </div>
    </section>
    <section className='mt-3 d-flex justify-content-between'>
    <div className='d-flex align-items-center gap-4'>
            <img src='/assests/assets/icons/Countrycity.svg' width="20px" height="20px"/>
            <p className='m-0 p-0'>{t('Country')}</p>
    </div>
    <div>
      {       
       infoDetails != null ?  infoDetails.company_branch == null ? <div>{t('No_Branches')}</div> : 
       <a href={infoDetails != null ? `https://www.google.com/maps/?q=${infoDetails.company_branch.address.latitude},${infoDetails.company_branch.address.longitude}` : ''} target='_blank'>
        {
            localStorage.getItem('Language') == "ar" ||  sessionStorage.getItem('Language') == "ar"? 
            <IconContext.Provider value={{color : '#45c0be' , size : '20px'}}>
            <AiFillCaretLeft />
           </IconContext.Provider> 
           :

             <IconContext.Provider value={{color : '#45c0be' , size : '20px'}}>
           <AiFillCaretRight />
           </IconContext.Provider>

        }
        </a>
       : ''
      }
    
    </div>
    </section>
    <section className='mt-3 d-flex justify-content-between'>
    <div className='d-flex align-items-center gap-4'>
            <img src='/assests/assets/icons/Countrycity.svg' width="20px" height="20px"/>
            <p className='m-0 p-0'>{t('City')}</p>
    </div>
    <div>

    {       
       infoDetails != null ?  infoDetails.company_branch == null ? <div>{t('No_Branches')}</div> : 
       <a href={infoDetails != null ? `https://www.google.com/maps/?q=${infoDetails.company_branch.address.latitude},${infoDetails.company_branch.address.longitude}` : ''} target='_blank'>

    {
            localStorage.getItem('Language') == "ar" ||  sessionStorage.getItem('Language') == "ar"? 
            <IconContext.Provider value={{color : '#45c0be' , size : '20px'}}>
            <AiFillCaretLeft />
           </IconContext.Provider> 
           :

             <IconContext.Provider value={{color : '#45c0be' , size : '20px'}}>
           <AiFillCaretRight />
           </IconContext.Provider>

        }
        </a>
       : ''
      }
  
    </div>
    </section>
    <section className='mt-3 d-flex justify-content-between'>
    <div className='d-flex align-items-center gap-4'>
            <img src='/assests/assets/icons/Phonenumber.svg' width="20px" height="20px"/>
            <p className='m-0 p-0'>{t('Phone_Number')}</p>
    </div>
    <div>
        {
            infoDetails != null ? infoDetails.mobile : loader == true ? <CircularProgress color='inherit'/> : ''

        }
    </div>
    </section>
    <section className='mt-3 d-flex justify-content-between'>
    <div className='d-flex align-items-center gap-4'>  
    <IconContext.Provider value={{color : '#45c0be' , size : '20px'}}>
        <FaKey width="20px" height="20px"/>
       </IconContext.Provider>
            <p className='m-0 p-0'>{t('Change_Password')}</p>
    </div>
    <div onClick={handleChange} style={{cursor : 'pointer'}}>
    {
            localStorage.getItem('Language') == "ar" ||  sessionStorage.getItem('Language') == "ar"? 
            <IconContext.Provider value={{color : '#45c0be' , size : '20px'}}>
            <AiFillCaretLeft />
           </IconContext.Provider> 
           :

             <IconContext.Provider value={{color : '#45c0be' , size : '20px'}}>
           <AiFillCaretRight />
           </IconContext.Provider>

        }
    </div>
    </section>
    <section className='mt-3 d-flex justify-content-between'>
    <div className='d-flex align-items-center gap-4'>
            <img src='/assests/assets/icons/Privacypolicy.svg' width="20px" height="20px"/>
            <p className='m-0 p-0'>{t('Privacy_Policy')}</p>
    </div>
    <div>
    <a href={settingDatas != null ? settingDatas.privacy_content.vendor : '#'} target="_blank" className='cursor'> 
    {
            localStorage.getItem('Language') == "ar" ||  sessionStorage.getItem('Language') == "ar"? 
            <IconContext.Provider value={{color : '#45c0be' , size : '20px'}}>
            <AiFillCaretLeft />
           </IconContext.Provider> 
           :

             <IconContext.Provider value={{color : '#45c0be' , size : '20px'}}>
           <AiFillCaretRight />
           </IconContext.Provider>

        }
    </a>
    </div>
    </section>
    <section className='mt-3 d-flex justify-content-between'>
    <div className='d-flex align-items-center gap-4'>
            <img src='/assests/assets/icons/Termsconditions.svg' width="20px" height="20px"/>
            <p className='m-0 p-0'>{t('Terms_Condtions')}</p>
    </div>
    <div>
        <a href={settingDatas != null ? settingDatas.terms_content.vendor : '#'} target="_blank" className='cursor'>
        {
            localStorage.getItem('Language') == "ar" ||  sessionStorage.getItem('Language') == "ar"? 
            <IconContext.Provider value={{color : '#45c0be' , size : '20px'}}>
            <AiFillCaretLeft />
           </IconContext.Provider> 
           :

             <IconContext.Provider value={{color : '#45c0be' , size : '20px'}}>
           <AiFillCaretRight />
           </IconContext.Provider>

        }
       </a>
    </div>
    </section>
    </CardContent>
   </Card>
  
               </Grid>
     <Grid item xs={12} md={4} className="mt-5">
        <Card className={localStorage.getItem('Language') == 'ar' || sessionStorage.getItem('Language') == 'ar' ? 'cardSizear' : 'cardSize'}>
            <CardContent className='text-center p-3'>
            <div className={localStorage.getItem('Language') == 'ar' || sessionStorage.getItem('Language') == 'ar' ? 'mainColor text-end' : 'mainColor text-start'} >
            <h2 >{t('Accounts_Locked')}</h2>
            </div>     
            <div>
                {
                    userData != null ? userData.data.employees != null ? userData.data.employees.employees.map(e=>
                        e.is_blocked == true ? 
                            <div className='mt-4 d-flex justify-content-between align-items-center' >
                            <div className='cursor' onClick={()=>{
                     document.getElementById('imgView').style.display = 'flex'
                     document.getElementById('myImg').src = document.getElementById('avatarProfile').src
                   }}>
                            <Avatar >
                             <img alt="Logo" id='avatarProfile' src={e.image != null ? e.image["512px"] : ''} />
                            </Avatar>
                            </div>
                            <div className='flex-special'>
                                <span>{e.name}</span>
                            </div>
                            <div>
                                <span className='mainColor'>{e.achieved_contracts} </span>
                                <span>{t('Contracts')}</span>
                            </div>
                            <div>
                            <p  className='btn btn-warning ViewLink m-0' onClick={()=>toast.error(t('unblock_Warning'))}>{t('unlock')}</p>
                            </div>
                            </div>      
                        : ''
                      
                    ) : '' : ''
                }
               
            </div>
            <div>
            </div>
            
              
             
            
            </CardContent>
        </Card>
        <Card className={localStorage.getItem('Language') == 'ar' || sessionStorage.getItem('Language') == 'ar' ? 'cardSizear mt-3' : 'cardSize mt-3'}>
            <CardContent className='text-center p-3'>
            <div className='mainColor d-flex justify-content-between align-items-center' >
            <h2 >{t('Commercial_info')}</h2>
            <IconContext.Provider value={{size : '30px'}}>
            <BsFillPlusSquareFill onClick={()=>toast.error(t('unblock_Warning'))}/>
            </IconContext.Provider>
            </div>    
           
            <div>
                 <Grid container className='mt-2 justify-content-between align-items-center' >
                <Grid item xs={4} md={4} className='head text-start'> 
                {t("Commercial")}
                </Grid>
                <Grid item xs={4} md={4} className='text-center'>
                    <span>
                    {
               infoDetails != null ? infoDetails.company.commercial.commercial.value   : loader == true ? <CircularProgress color='inherit'/> : ''
                      }

                    </span>
                </Grid>
                <Grid item xs={4} md={4} className="text-end cursor"   onClick={()=>{
                     document.getElementById('imgView').style.display = 'flex'
                     document.getElementById('myImg').src = document.getElementById('commercialImg').src
                   }}>
                <img id='commercialImg' src={ infoDetails != null ? infoDetails.company.commercial.commercial.file["512px"]   : loader == true ? <CircularProgress color='inherit'/> : '/assests/assets/avatar.png'} width="30px" height="30px" className='rounded-circle cursor'/>
                </Grid>
                </Grid>
            </div>
            <div>
                 <Grid container className='mt-2 justify-content-between align-items-center' >
                <Grid item xs={4} md={4} className='head text-start'> 
                {t("Entity")}
                </Grid>
                <Grid item xs={4} md={4} className='flex-special text-center'>
                    <span>
                    {
               infoDetails != null ? infoDetails.company.commercial.entity.value   : loader == true ? <CircularProgress color='inherit'/> : ''
                      }
                    </span>
                </Grid>
                <Grid item xs={4} md={4} className="text-end cursor"  onClick={()=>{
                     document.getElementById('imgView').style.display = 'flex'
                     document.getElementById('myImg').src = document.getElementById('entityInfo').src
                   }}>
                <img id='entityInfo' src={ infoDetails != null ? infoDetails.company.commercial.entity.file["512px"]   : loader == true ? <CircularProgress color='inherit'/> : '/assests/assets/avatar.png'} width="30px" height="30px" className='rounded-circle cursor'/>
                </Grid>
                </Grid>
            </div>
            <div>
                 <Grid container className='mt-2 justify-content-between align-items-center'  >
                <Grid item xs={4} md={4} className='head text-start'> 
                {t('Tax')}
                </Grid>
                <Grid item xs={4} md={4} className='flex-special text-center'>
                    <span>
                    {
                  infoDetails != null ? infoDetails.company.commercial.tax.value   : loader == true ? <CircularProgress color='inherit'/> : ''
                      }
                    </span>
                </Grid>
                <Grid item xs={4} md={4} className="text-end cursor" onClick={()=>{
                     document.getElementById('imgView').style.display = 'flex'
                     document.getElementById('myImg').src = document.getElementById('taxInfo').src
                   }}>
                <img id='taxInfo' src={ infoDetails != null ? infoDetails.company.commercial.tax.file["512px"]   : loader == true ? <CircularProgress color='inherit'/> : '/assests/assets/avatar.png'} width="30px" height="30px" className='rounded-circle cursor'/>
                </Grid>
                </Grid>
            </div>

            </CardContent>
        </Card>
        <Card className={localStorage.getItem('Language') == 'ar' || sessionStorage.getItem('Language') == 'ar' ? 'cardSizear mt-3' : 'cardSize mt-3'}>
            <CardContent className='text-center p-3'>
            <div className='mainColor d-flex justify-content-between align-items-center' >
            <h2 >{t('Social_Links')}</h2>
            <IconContext.Provider value={{size : '30px'}}>
            <BsFillPlusSquareFill onClick={()=>toast.error(t('unblock_Warning'))}/>
            </IconContext.Provider>
            </div>     
            <div>
                 <div className='mt-2 d-flex justify-content-between align-items-center' >
                <div className='head'> 
                {t('Facebook')}
                </div>
                <div>
                <a href={infoDetails != null ? infoDetails.company.social_links.facebook : "#"}  className=' m-0 mainColor cursor' target="_blank">
                {
               infoDetails != null ? !infoDetails.company.social_links.facebook == true ? <div>{t('No_Links')}</div> : infoDetails.company.social_links.facebook : loader == true ? <CircularProgress color='inherit'/> : ''
               }
                </a>
                </div>
                </div>
            </div>
            <div>
                 <div className='mt-4 d-flex justify-content-between align-items-center' >
                <div className='head'> 
                {t('instagram')}
                </div>
                <div>
                <a href={infoDetails != null ? infoDetails.company.social_links.instagram : "#"}  className=' m-0 mainColor cursor' target="_blank">
                {
               infoDetails != null ? !infoDetails.company.social_links.instagram  == true ?  <div>{t('No_Links')}</div>  : infoDetails.company.social_links.instagram : loader == true ? <CircularProgress color='inherit'/> : ''
               }
                </a>
                </div>
                </div>
            </div>
            <div>
                 <div className='mt-4 d-flex justify-content-between align-items-center' >
                <div className='head'> 
                {t('Linkedin')}
                </div>
                <div>
                <a href={ infoDetails != null ? infoDetails.company.social_links.linkedin : '#'} className=' m-0 mainColor cursor' target="_blank">
                {
               infoDetails != null ? !infoDetails.company.social_links.linkedin == true ? <div>{t('No_Links')}</div> : infoDetails.company.social_links.linkedin  : loader == true ? <CircularProgress color='inherit'/> : ''
               }
                </a>
                </div>
                
                </div>
            </div>
            <div>
                 <div className='mt-4 d-flex justify-content-between align-items-center' >
                <div className='head'> 
                {t('Twitter')}
                </div>
                <div>
                <a href={ infoDetails != null ? infoDetails.company.social_links.twitter : '#'} className=' m-0 mainColor cursor' target="_blank">
                {
               infoDetails != null ? !infoDetails.company.social_links.twitter == true ? <div>{t('No_Links')}</div> : infoDetails.company.social_links.twitter : loader == true ? <CircularProgress color='inherit'/> : ''
               }
                </a>
                </div>
                
                </div>
            </div>
            <div>
                 <div className='mt-4 d-flex justify-content-between align-items-center' >
                <div className='head'> 
                {t('Website')}
                </div>
                <div>
                <a href={ infoDetails != null ? infoDetails.company.social_links.website : '#'} className=' m-0 mainColor cursor' target="_blank">
                {
               infoDetails != null ? !infoDetails.company.social_links.website == true ? <div>{t('No_Links')}</div> : infoDetails.company.social_links.website: loader == true ? <CircularProgress color='inherit'/> : ''
               }
                </a>
                </div>
                
                </div>
            </div>

            </CardContent>
        </Card>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        </Grid>
            </>
            :   

              <>
            <Grid item xs={12} md={6}  >
<Card className='position-relative overflow mt-5'>
<CardContent>  
   <div className='d-flex justify-content-between align-items-center'>
    <div className='d-flex align-items-center'>
       <div className='mt-5 pt-4 text-center cursor' onClick={()=>{
             document.getElementById('imgView').style.display = 'flex'
             document.getElementById('myImg').src = document.getElementById('imgmainly').src
           }}> 
       <img src={ infoDetails != null ? infoDetails.company_branch.company.logo["512px"] : loader == true ? <CircularProgress color='inherit' /> : '/assests/assets/avatar.png'}  className='companyLogo' id="imgmainly"/>    
       </div>
       <div>
        {
          infoDetails != null ? infoDetails.company_branch == null ? 
          
          <a href={infoDetails != null ? `https://www.google.com/maps/?q=${infoDetails.company.owner.address_id.latitude},${infoDetails.company.owner.address_id.longitude}` : ''} target='_blank'>
          <img src='/assests/assets/icons/LocationPng.png' className='LocationCompany' />
          </a>
          : 
          
          <a href={infoDetails != null ? `https://www.google.com/maps/?q=${infoDetails.company_branch.address.latitude},${infoDetails.company_branch.address.longitude}` : ''} target='_blank'>
          <img src='/assests/assets/icons/LocationPng.png' className='LocationCompany' />
          </a>
          
          : ''
          
         
        }
     
       </div>
       <div>
       <a href={`tel:${ infoDetails == null ? '' : infoDetails.company_branch.company.owner.mobile}`}>
          <img src='/assests/assets/icons/CallPng.png' className='phoneCompany' />
          </a>
   
       </div>
   </div>
   </div>
<div className='d-flex justify-content-center gap-3 align-items-center'>
<div className='text-center' style={{flex: '1'}}>
<h4>
{
infoDetails != null ? infoDetails.company_branch.company.name.value : loader == true ? <CircularProgress color='inherit'/> : ''
}
</h4>
<p className='mainColor'>
{
infoDetails != null ? infoDetails.company_branch.company.description.value : loader == true ? <CircularProgress color='inherit'/> : ''
}
</p>
</div>
<div className='companyCover'>
<img src={ infoDetails != null ? infoDetails.company_branch.company.logo["512px"] : loader == true ? <CircularProgress color='inherit'/> : '/assests/assets/avatar.png'} width="85%" height="130px" className='rounded'/>
</div>
   </div>
</CardContent>
</Card>
<Card className='position-relative overflow'>
<CardContent>  
   <div className='d-flex justify-content-between align-items-center'>
    <div className='d-flex align-items-center'>
       <div className='mt-5 pt-4 text-center cursor' onClick={()=>{
             document.getElementById('imgView').style.display = 'flex'
             document.getElementById('myImg').src = document.getElementById('imgsecondly').src
           }}> 
       <img src={ infoDetails != null ? infoDetails.image != null ? infoDetails.image["512px"] : '/assests/assets/avatar.png' : loader == true ? <CircularProgress color='inherit'/> : '/assests/assets/avatar.png'}   className='userLogo' id="imgsecondly"/>    
       </div>
    
       <div>
       {
          infoDetails != null ? 
          <a href={infoDetails != null ? `https://www.google.com/maps/?q=${infoDetails.address.latitude},${infoDetails.address.longitude}` : ''} target='_blank'>
          <img src='/assests/assets/icons/LocationPng.png' className='LocationCompany' />
          </a>
          
          : ''
          
         
          
        }
       </div>
       <div>
       <a href={`tel:${ infoDetails == null ? '' : infoDetails.mobile != null ? infoDetails.mobile  : ''}`}>
       <img src='/assests/assets/icons/CallPng.png' className='phoneCompany' />
       </a>
       </div>
   </div>
   </div>
<div className='d-flex justify-content-center gap-3 align-items-center'>
<div className='text-center'>
<h4>
{
    infoDetails != null ? infoDetails.name : loader == true ? <CircularProgress color='inherit'/> : ''

}
</h4>
<p className='mainColor'>
{
    infoDetails != null ? infoDetails.type.role  : loader == true ? <CircularProgress color='inherit'/> : ''

}
</p>
</div>
<Card className='mangerCard'>
<CardContent>
 <img src='/assests/assets/icons/email.svg' width="40px"  height= "40px" />
 <p className='mt-4 mb-2'>
 {
    infoDetails != null ? infoDetails.email : loader == true ? <CircularProgress color='inherit'/> : ''

}
 </p>
</CardContent>
</Card>
<Card className='mangerCard'>
<CardContent>
 <img src='/assests/assets/icons/Gender.svg' width="40px"  height= "40px"/>
 <p className='mt-4 mb-2'>
 {
    infoDetails != null ? infoDetails.gender  : loader == true ? <CircularProgress color='inherit'/> : ''

}
 </p>
</CardContent>
</Card>
<Card className='mangerCard'>
<CardContent>
 <img src='/assests/assets/icons/Language.svg' width="40px" height= "40px" />
 <p className='mt-4 mb-2'>
 {
    infoDetails != null ? infoDetails.language.name_values.value : loader == true ? <CircularProgress color='inherit'/> : ''
}
 </p>
</CardContent>
</Card>
   </div>
</CardContent>
</Card>
<Card className='mt-5 cardOverflow'>
<CardContent>
<section className='d-flex justify-content-between'>
         <Grid container className='mt-2  justify-content-between align-items-center' >
        <Grid item xs={4} md={4} className=' d-flex align-items-center gap-4'>
        <IconContext.Provider value={{size : '20px'}}>
        <AiOutlineMail  className='mainColor'/>
        </IconContext.Provider>
        {t('Contact')}
        </Grid>
        <Grid item xs={4} md={4} className={localStorage.getItem('Language') == 'ar' || sessionStorage.getItem('Language') == 'ar' ? 'text-start' : 'text-end'}>
            <span className='mainColor'>
            {
       infoDetails != null ? infoDetails.email == null ? <div>{t('No_Links')}</div> : infoDetails.email : loader == true ? <CircularProgress color='inherit'/> : ''

              }
            </span>
        </Grid>
        </Grid>
</section>
<section className='mt-3 d-flex justify-content-between'>
    <div className='d-flex align-items-center gap-4'>
          <IconContext.Provider value={{size : '25px'}}>
           <FaFileContract className='mainColor'/>
           </IconContext.Provider>
            <p className='m-0 p-0'>{t('Contracts')}</p>
    </div>
    <div>
      {       
       <a href={infoDetails != null ? localStorage.getItem('Language') == "ar" ||  sessionStorage.getItem('Language') == "ar"?  `${infoDetails.contract.ar}` : `${infoDetails.contract.en}` : ''} target='_blank'>
        {
            localStorage.getItem('Language') == "ar" ||  sessionStorage.getItem('Language') == "ar"? 
            <IconContext.Provider value={{color : '#45c0be' , size : '20px'}}>
            <AiFillCaretLeft />
           </IconContext.Provider> 
           :

             <IconContext.Provider value={{color : '#45c0be' , size : '20px'}}>
           <AiFillCaretRight />
           </IconContext.Provider>

        }
        </a>
      
      }
    
    </div>
    </section>
<section className='mt-3 d-flex justify-content-between'>
<div className='d-flex align-items-center gap-4'>
    <img src='/assests/assets/icons/Birthdate.svg' width="20px" height="20px"/>
    <p className='m-0 p-0'>{t('Birthdate')}</p>
</div>
<div>
{
    infoDetails != null ? infoDetails.birthdate : loader == true ? <CircularProgress color='inherit'/> : ''

}
</div>
</section>
<section className='mt-3 d-flex justify-content-between'>
<div className='d-flex align-items-center gap-4'>
    <img src='/assests/assets/icons/Countrycity.svg' width="20px" height="20px"/>
    <p className='m-0 p-0'>{t('Country')}</p>
</div>
<div>
{       
infoDetails != null ?  infoDetails.company_branch == null ? <div>{t('No_Branches')}</div> : 
<a href={infoDetails != null ? `https://www.google.com/maps/?q=${infoDetails.company_branch.address.latitude},${infoDetails.company_branch.address.longitude}` : ''} target='_blank'>
{
    localStorage.getItem('Language') == "ar" ||  sessionStorage.getItem('Language') == "ar"? 
    <IconContext.Provider value={{color : '#45c0be' , size : '20px'}}>
    <AiFillCaretLeft />
   </IconContext.Provider> 
   :

     <IconContext.Provider value={{color : '#45c0be' , size : '20px'}}>
   <AiFillCaretRight />
   </IconContext.Provider>

}
</a>
: ''
}

</div>
</section>
<section className='mt-3 d-flex justify-content-between'>
<div className='d-flex align-items-center gap-4'>
    <img src='/assests/assets/icons/Countrycity.svg' width="20px" height="20px"/>
    <p className='m-0 p-0'>{t('City')}</p>
</div>
<div>

{       
infoDetails != null ?  infoDetails.company_branch == null ? <div>{t('No_Branches')}</div> : 
<a href={infoDetails != null ? `https://www.google.com/maps/?q=${infoDetails.company_branch.address.latitude},${infoDetails.company_branch.address.longitude}` : ''} target='_blank'>

{
    localStorage.getItem('Language') == "ar" ||  sessionStorage.getItem('Language') == "ar"? 
    <IconContext.Provider value={{color : '#45c0be' , size : '20px'}}>
    <AiFillCaretLeft />
   </IconContext.Provider> 
   :

     <IconContext.Provider value={{color : '#45c0be' , size : '20px'}}>
   <AiFillCaretRight />
   </IconContext.Provider>

}
</a>
: ''
}

</div>
</section>
<section className='mt-3 d-flex justify-content-between'>
<div className='d-flex align-items-center gap-4'>
    <img src='/assests/assets/icons/Phonenumber.svg' width="20px" height="20px"/>
    <p className='m-0 p-0'>{t('Phone_Number')}</p>
</div>
<div>
{
    infoDetails != null ? infoDetails.mobile : loader == true ? <CircularProgress color='inherit'/> : ''

}
</div>
</section>
<section className='mt-3 d-flex justify-content-between'>
<div className='d-flex align-items-center gap-4'>  
<IconContext.Provider value={{color : '#45c0be' , size : '20px'}}>
<FaKey width="20px" height="20px"/>
</IconContext.Provider>
    <p className='m-0 p-0'>{t('Change_Password')}</p>
</div>
<div onClick={handleChange} style={{cursor : 'pointer'}}>
{
    localStorage.getItem('Language') == "ar" ||  sessionStorage.getItem('Language') == "ar"? 
    <IconContext.Provider value={{color : '#45c0be' , size : '20px'}}>
    <AiFillCaretLeft />
   </IconContext.Provider> 
   :

     <IconContext.Provider value={{color : '#45c0be' , size : '20px'}}>
   <AiFillCaretRight />
   </IconContext.Provider>

}
</div>
</section>
<section className='mt-3 d-flex justify-content-between'>
<div className='d-flex align-items-center gap-4'>
    <img src='/assests/assets/icons/Privacypolicy.svg' width="20px" height="20px"/>
    <p className='m-0 p-0'>{t('Privacy_Policy')}</p>
</div>
<div>
<a href={settingDatas != null ? settingDatas.privacy_content.vendor : '#'} target="_blank" className='cursor'> 
{
    localStorage.getItem('Language') == "ar" ||  sessionStorage.getItem('Language') == "ar"? 
    <IconContext.Provider value={{color : '#45c0be' , size : '20px'}}>
    <AiFillCaretLeft />
   </IconContext.Provider> 
   :

     <IconContext.Provider value={{color : '#45c0be' , size : '20px'}}>
   <AiFillCaretRight />
   </IconContext.Provider>

}
</a>
</div>
</section>
<section className='mt-3 d-flex justify-content-between'>
<div className='d-flex align-items-center gap-4'>
    <img src='/assests/assets/icons/Termsconditions.svg' width="20px" height="20px"/>
    <p className='m-0 p-0'>{t('Terms_Condtions')}</p>
</div>
<div>
<a href={settingDatas != null ? settingDatas.terms_content.vendor : '#'} target="_blank" className='cursor'>
{
    localStorage.getItem('Language') == "ar" ||  sessionStorage.getItem('Language') == "ar"? 
    <IconContext.Provider value={{color : '#45c0be' , size : '20px'}}>
    <AiFillCaretLeft />
   </IconContext.Provider> 
   :

     <IconContext.Provider value={{color : '#45c0be' , size : '20px'}}>
   <AiFillCaretRight />
   </IconContext.Provider>

}
</a>
</div>
</section>
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
       </Grid>
<Grid item xs={12} md={4} className="mt-5">
{

}
<Card className={localStorage.getItem('Language') == 'ar' || sessionStorage.getItem('Language') == 'ar' ? 'cardSizear' : 'cardSize'}>
    <CardContent className='text-center p-3'>
    <div className={localStorage.getItem('Language') == 'ar' || sessionStorage.getItem('Language') == 'ar' ? 'mainColor text-end' : 'mainColor text-start'} >
    <h2 >{t('Accounts_Locked')}</h2>
    </div>     
    <div>
        {
            userData != null ? userData.data.employees != null ? userData.data.employees.employees.map(e=>
                e.is_blocked == true ? 
                    <div className='mt-4 d-flex justify-content-between align-items-center' >
                    <div className='cursor' onClick={()=>{
             document.getElementById('imgView').style.display = 'flex'
             document.getElementById('myImg').src = document.getElementById('avatarProfile').src
           }}>
                    <Avatar >
                     <img alt="Logo" id='avatarProfile' src={e.image != null ? e.image["512px"] : ''} />
                    </Avatar>
                    </div>
                    <div className='flex-special'>
                        <span>{e.name}</span>
                    </div>
                    <div>
                        <span className='mainColor'>{e.achieved_contracts} </span>
                        <span>{t('Contracts')}</span>
                    </div>
                    <div>
                    <p  className='btn btn-warning ViewLink m-0' onClick={()=>toast.error(t('unblock_Warning'))}>{t('unlock')}</p>
                    </div>
                    </div>      
                : ''
              
            ) : '' : ''
        }
       
    </div>
    <div>
    </div>
    
      
     
    
    </CardContent>
</Card>
<Card className={localStorage.getItem('Language') == 'ar' || sessionStorage.getItem('Language') == 'ar' ? 'cardSizear mt-3' : 'cardSize mt-3'}>
    <CardContent className='text-center p-3'>
    <div className='mainColor d-flex justify-content-between align-items-center' >
    <h2 >{t('Commercial_info')}</h2>
    <IconContext.Provider value={{size : '30px'}}>
    <BsFillPlusSquareFill onClick={()=>toast.error(t('unblock_Warning'))}/>
    </IconContext.Provider>
    </div>    
   
    <div>
         <Grid container className='mt-2 justify-content-between align-items-center' >
        <Grid item xs={4} md={4} className='head text-start'> 
        {t("Commercial")}
        </Grid>
        <Grid item xs={4} md={4} className='text-center'>
            <span>
            {
       infoDetails != null ? infoDetails.company_branch.company.commercial.commercial.value   : loader == true ? <CircularProgress color='inherit'/> : ''
              }

            </span>
        </Grid>
        <Grid item xs={4} md={4} className="text-end cursor"   onClick={()=>{
             document.getElementById('imgView').style.display = 'flex'
             document.getElementById('myImg').src = document.getElementById('commercialImg').src
           }}>
        <img id='commercialImg' src={ infoDetails != null ? infoDetails.company_branch.company.commercial.commercial.file["512px"]   : loader == true ? <CircularProgress color='inherit'/> : ''} width="30px" height="30px" className='rounded-circle cursor'/>
        </Grid>
        </Grid>
    </div>
    <div>
         <Grid container className='mt-2 justify-content-between align-items-center' >
        <Grid item xs={4} md={4} className='head text-start'> 
        {t("Entity")}
        </Grid>
        <Grid item xs={4} md={4} className='flex-special text-center'>
            <span>
            {
       infoDetails != null ? infoDetails.company_branch.company.commercial.entity.value   : loader == true ? <CircularProgress color='inherit'/> : ''
              }
            </span>
        </Grid>
        <Grid item xs={4} md={4} className="text-end cursor"  onClick={()=>{
             document.getElementById('imgView').style.display = 'flex'
             document.getElementById('myImg').src = document.getElementById('entityInfo').src
           }}>
        <img id='entityInfo' src={ infoDetails != null ? infoDetails.company_branch.company.commercial.entity.file["512px"]   : loader == true ? <CircularProgress color='inherit'/> : ''} width="30px" height="30px" className='rounded-circle cursor'/>
        </Grid>
        </Grid>
    </div>
    <div>
         <Grid container className='mt-2 justify-content-between align-items-center'  >
        <Grid item xs={4} md={4} className='head text-start'> 
        {t('Tax')}
        </Grid>
        <Grid item xs={4} md={4} className='flex-special text-center'>
            <span>
            {
          infoDetails != null ? infoDetails.company_branch.company.commercial.tax.value   : loader == true ? <CircularProgress color='inherit'/> : ''
              }
            </span>
        </Grid>
        <Grid item xs={4} md={4} className="text-end cursor" onClick={()=>{
             document.getElementById('imgView').style.display = 'flex'
             document.getElementById('myImg').src = document.getElementById('taxInfo').src
           }}>
        <img id='taxInfo' src={ infoDetails != null ? infoDetails.company_branch.company.commercial.tax.file["512px"]   : loader == true ? <CircularProgress color='inherit'/> : ''} width="30px" height="30px" className='rounded-circle cursor'/>
        </Grid>
        </Grid>
    </div>

    </CardContent>
</Card>
<Card className={localStorage.getItem('Language') == 'ar' || sessionStorage.getItem('Language') == 'ar' ? 'cardSizear mt-3' : 'cardSize mt-3'}>
    <CardContent className='text-center p-3'>
    <div className='mainColor d-flex justify-content-between align-items-center' >
    <h2 >{t('Social_Links')}</h2>
    <IconContext.Provider value={{size : '30px'}}>
    <BsFillPlusSquareFill onClick={()=>toast.error(t('unblock_Warning'))}/>
    </IconContext.Provider>
    </div>     
    <div>
         <div className='mt-2 d-flex justify-content-between align-items-center' >
        <div className='head'> 
        {t('Facebook')}
        </div>
        <div>
        <a href={infoDetails != null ? infoDetails.company_branch.company.social_links.facebook : "#"}  className=' m-0 mainColor cursor' target="_blank">
        {
       infoDetails != null ? !infoDetails.company_branch.company.social_links.facebook == true ? <div>{t('No_Links')}</div> : infoDetails.company_branch.company.social_links.facebook : loader == true ? <CircularProgress color='inherit'/> : ''
       }
        </a>
        </div>
        </div>
    </div>
    <div>
         <div className='mt-4 d-flex justify-content-between align-items-center' >
        <div className='head'> 
        {t('instagram')}
        </div>
        <div>
        <a href={infoDetails != null ? infoDetails.company_branch.company.social_links.instagram : "#"}  className=' m-0 mainColor cursor' target="_blank">
        {
       infoDetails != null ? !infoDetails.company_branch.company.social_links.instagram  == true ?  <div>{t('No_Links')}</div>  : infoDetails.company_branch.company.social_links.instagram : loader == true ? <CircularProgress color='inherit'/> : ''
       }
        </a>
        </div>
        </div>
    </div>
    <div>
         <div className='mt-4 d-flex justify-content-between align-items-center' >
        <div className='head'> 
        {t('Linkedin')}
        </div>
        <div>
        <a href={ infoDetails != null ? infoDetails.company_branch.company.social_links.linkedin : '#'} className=' m-0 mainColor cursor' target="_blank">
        {
       infoDetails != null ? !infoDetails.company_branch.company.social_links.linkedin == true ? <div>{t('No_Links')}</div> : infoDetails.company_branch.company.social_links.linkedin  : loader == true ? <CircularProgress color='inherit'/> : ''
       }
        </a>
        </div>
        
        </div>
    </div>
    <div>
         <div className='mt-4 d-flex justify-content-between align-items-center' >
        <div className='head'> 
        {t('Twitter')}
        </div>
        <div>
        <a href={ infoDetails != null ? infoDetails.company_branch.company.social_links.twitter : '#'} className=' m-0 mainColor cursor' target="_blank">
        {
       infoDetails != null ? !infoDetails.company_branch.company.social_links.twitter == true ? <div>{t('No_Links')}</div> : infoDetails.company_branch.company.social_links.twitter : loader == true ? <CircularProgress color='inherit'/> : ''
       }
        </a>
        </div>
        
        </div>
    </div>
    <div>
         <div className='mt-4 d-flex justify-content-between align-items-center' >
        <div className='head'> 
        {t('Website')}
        </div>
        <div>
        <a href={ infoDetails != null ? infoDetails.company_branch.company.social_links.website : '#'} className=' m-0 mainColor cursor' target="_blank">
        {
       infoDetails != null ? !infoDetails.company_branch.company.social_links.website == true ? <div>{t('No_Links')}</div> : infoDetails.company_branch.company.social_links.website: loader == true ? <CircularProgress color='inherit'/> : ''
       }
        </a>
        </div>
        
        </div>
    </div>

    </CardContent>
</Card>
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
</Grid>
             </>
             : <CircularProgress color='inherit'/>
          }

       </Grid> 
       <Box className='pwView' id='pw'>
      <Box sx={{width : '500px'}}>
        <ChangePw />
      </Box>
    </Box>


    <div className='img-display' id='imgView'>
      <img src='/assests/assets/avatar.png'  width="15%" id='myImg'/>
      <Button variant="contained"  onClick={()=>document.getElementById('imgView').style.display = "none"} className="mt-3 mainBg">{t('cancel')}</Button>
   </div>


    </div>
  )
}
