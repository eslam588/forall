import { Card, CardContent, CircularProgress, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Totals from '../Regestraions/Totals/Totals';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useContext } from 'react';
import { teamData } from '../../Store/Teams/Teams';
import { useState } from 'react';
import { homedata } from '../../Store/HomeData/HomeData';
import { useTranslation } from 'react-i18next';
import { myProfile } from '../../Store/ProfileData/profileData';




export default function AgencyView() {



    let {loaderteam, getUserData  , setUserData , vendorLength , userError , setUserError , getAgencyData, agencyData, setAgencyData} = useContext(teamData)
    let {myinfo }= useContext(myProfile)


   let {t} = useTranslation()

    let data = useParams()


    useEffect(() => {
        getAgencyData(data.type)
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
            setUserData(null)
            setUserError(null)
            setAgencyData(null)
        }
    }, [])

    function setId(e){
      if(localStorage.getItem('id') == null){
        sessionStorage.setItem('id' , e)
      }else{
        localStorage.setItem('id' , e)
      }
    }

    
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          backgroundColor: '#44b700',
          color: '#44b700',
          boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
          '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
          },
        },
        '@keyframes ripple': {
          '0%': {
            transform: 'scale(.8)',
            opacity: 1,
          },
          '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
          },
        },
      }));
      const StyledBadge2 = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          backgroundColor: 'red',
          color: 'red',
        },

      }));






  return (
    <div className='mt-5 position-relative'>
     
      {
        userError != null ? <div className='text-center fs-5'>{userError}</div> : 
        <>

        {
          loaderteam ? <p className='text-center mx-auto'><CircularProgress color='inherit' /></p> : 
          <Grid container className=' justify-content-center gap-5 mt-5 pt-5'>
            {
              agencyData != null ? agencyData.data.manger == null && agencyData.data.employees ? '' : '' : ''  
            }
        <Grid item xs={12} md={ agencyData != null ? agencyData.data.manger == null && agencyData.data.employees == null ? 10 : 5 : ''}  className=' mt-5 pt-5'>
        <Card>
           <CardContent>  
               <div className='d-flex justify-content-between align-items-center'>
                <div className='d-flex align-items-center'>
                   <div className='mt-5 pt-4 text-center cursor'  onClick={()=>{
            document.getElementById('imgView').style.display = 'flex'
            document.getElementById('myImg').src =   document.getElementById('agency').src 
          }}>
                       {
                           agencyData != null ? <img id='agency' src={agencyData.data.logo  ? agencyData.data.logo == null ? '/assests/assets/avatar.png' : agencyData.data.logo['512px'] : '/assests/assets/avatar.png'} className={localStorage.getItem('Language') == "ar" || sessionStorage.getItem('Language')== "ar" ? 'mangerPhotoar' : 'mangerPhoto'}/> :  loaderteam == true ? <CircularProgress color='inherit' className='mangerPhoto'/>  : '' 
                       }
                       
                   </div>
                   <div>
                   <a href={agencyData != null ? `https://www.google.com/maps/?q=${agencyData.data.user.address.latitude},${agencyData.data.user.address.longitude}` : 'https://www.google.com/maps'} target='_blank'>
                   <img src='/assests/assets/icons/LocationPng.png' className={localStorage.getItem('Language')== "ar" || sessionStorage.getItem('Language')== "ar"? 'mangerLocationar' : 'mangerLocation'} />
                   </a>
                   </div>
                   <div>
                   <a href={`tel:${ agencyData != null ? agencyData.data.user.mobile : ''}`}>
                   <img src='/assests/assets/icons/CallPng.png' className={localStorage.getItem('Language')== "ar"|| sessionStorage.getItem('Language')== "ar" ? 'mangerPhonear' : 'mangerPhone'}      />
                   </a>
                   </div>
               </div>
               </div>
            <div className='d-flex justify-content-center gap-5 align-items-center'>
           <div className='text-center'>
           <h4>
           {
            agencyData != null ? agencyData.data.name.value  :  loaderteam == true ? <CircularProgress color='inherit' className='mangerPhoto'/>  : ''
           }
           </h4>
           <p className='mainColor'>
           {
            agencyData != null ? agencyData.data.description.value  :  loaderteam == true ? <CircularProgress color='inherit' className='mangerPhoto'/>  : ''
           }
           </p>
           </div>
           <Card className='mangerCard'>
           <CardContent>
             <img src='/assests/assets/icons/email.svg' width="40px"  height= "40px" />
             <p className='mt-4 mb-2'>
             {
            agencyData != null ? agencyData.data.user.email :  loaderteam == true ? <CircularProgress color='inherit' className='mangerPhoto'/>  : ''
             }
             </p>
           </CardContent>
            </Card>
            <Card className='mangerCard'>
           <CardContent>
             <img src='/assests/assets/icons/Gender.svg' width="40px"  height= "40px"/>
             <p className='mt-4 mb-2'>
             {
            agencyData != null ? agencyData.data.user.gender :  loaderteam == true ? <CircularProgress color='inherit' className='mangerPhoto'/>  : ''
             }
             </p>
           </CardContent>
            </Card>
            <Card className='mangerCard'>
           <CardContent>
             <img src='/assests/assets/icons/Language.svg' width="40px" height= "40px" />
             <p className='mt-4 mb-2'>
             {
            agencyData != null ? agencyData.data.user.language.name_values.value  :  loaderteam == true ? <CircularProgress color='inherit' className='mangerPhoto'/>  : ''
             }
             </p>
           </CardContent>
            </Card>
               </div>
               <div className='mt-3'>
               <div className='mainColor'>
               {t('branches')} :
                </div>
               {
              agencyData != null ? agencyData.data.branches.length != 0 ? 
              agencyData.data.branches.map(e=>{
                return(
                  <>
                  {e.address.detailed_address}
                  </>
                )
              })
            : '' : ''
              }
               </div>
           </CardContent>
       </Card>
       
       {
        agencyData != null ?  agencyData.data.employees != null ? 
         <div className='mt-3 d-flex align-items-center justify-content-between dataview gap-3'>
        <Card  sx={{width : 'fit-content' , paddingBottom : "0" , padding : '0'}}>
            <CardContent className='p-0 '>
                <div className='p-5 text-center'>  
                <h6 className='totalHeader'>{t("earning")}</h6>
                <h2 style={{color : '#45C0BE'}}>{agencyData != null ? agencyData.data.employees.earning :  loaderteam == true ? <CircularProgress color='inherit' className='mangerPhoto'/>  : ''}</h2>
                </div>
                <div><img src='/assests/assets/BlueChart.svg' width="100%"/></div>
            </CardContent>
        </Card>
        <Card  sx={{width : 'fit-content' , paddingBottom : "0" , padding : '0'}}>
            <CardContent className='p-0 '>
                <div className='p-5 text-center'>  
                <h6 className='totalHeader'>{t("Subscribers")}</h6>
                <h2 style={{color : '#E4D366'}}>{agencyData != null ? agencyData.data.employees.achieved_agencies :  loaderteam == true ? <CircularProgress color='inherit' className='mangerPhoto'/>  : ''}</h2>
                </div>
                <div><img src='/assests/assets/YellowChart.svg' width="100%"/></div>
            </CardContent>
        </Card>
        <Card  sx={{width : 'fit-content' , paddingBottom : "0" , padding : '0'}}>
            <CardContent className='p-0 '>
                <div className='p-5 text-center '>  
                <h6 className='totalHeader'>{t("Vendors")}</h6>
                <h2 style={{color : '#BE5252'}}>{agencyData != null ? agencyData.data.employees.achieved_contracts :  loaderteam == true ? <CircularProgress color='inherit' className='mangerPhoto'/>  : ''}</h2>
                </div>
                <div><img src='/assests/assets/RedChart.svg' width="100%"/></div>
            </CardContent>
        </Card>
    </div>
         
         : "" : ""
       }
       
         {
          agencyData != null ? vendorLength == 0 ? '' ||  agencyData.data.employees == null :  
                
                  agencyData != null ? (
                    agencyData.data.employees == null ? '' : 
                     <>
                     <Card className='mt-3'>
                      <CardContent className='text-center p-5'>
                      <div className='d-flex justify-content-between align-items-center mainColor' >
                          <h2 >{t('Agencies')}</h2>
                          <h6 className='cursor' onClick={()=>document.getElementById('agenciesView').style.display = 'flex' }>{t('view_all')}</h6>
                           </div>
                           {
                            agencyData.data.employees.agents.length > 1 ? 
                            <>
                            <div>
                            <div className='mt-4 d-flex justify-content-between align-items-center' >
                           <div>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                 >
              <Avatar alt="Company Logo" src={agencyData.data.employees.agents[0].company != null ? agencyData.data.employees.agents[0].company.logo != null ?  agencyData.data.employees.agents[0].company.logo['512px'] : '/assests/assets/avatar.png' : '/assests/assets/avatar.png' } />
              </StyledBadge>
                          </div>
                         <div className='flex-special'>
                      <span>{agencyData.data.employees.agents[0].company != null ? agencyData.data.employees.agents[0].company.name.value : agencyData.data.employees.agents[0].email}</span>
                         </div>
                         <div>
                         {
                agencyData.data.employees.agents[0].company == null ? '' :
              <Link to={`/home/Agency/${agencyData.data.employees.agents[0].id}/${agencyData.data.employees.agents[0].company.id}`} className='btn btn-warning ViewLink' onClick={()=>{
                setAgencyData(null)
                getAgencyData(agencyData.data.employees.agents[0].company.id , agencyData.data.employees.agents[0].id )
              }}>{t('view')}</Link>
                }
              </div>
                         <div>
                         </div>
              </div>
                       </div>
                       <div>
                       <div className='mt-4 d-flex justify-content-between align-items-center' >
                      <div>
           <StyledBadge
             overlap="circular"
             anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
             variant="dot"
            >
         <Avatar alt="Company Logo" src={agencyData.data.employees.agents[1].company != null ? agencyData.data.employees.agents[1].company.logo != null ?  agencyData.data.employees.agents[1].company.logo['512px'] : '/assests/assets/avatar.png' : '/assests/assets/avatar.png' } />
         </StyledBadge>
                     </div>
                    <div className='flex-special'>
                 <span>{agencyData.data.employees.agents[1].company != null ? agencyData.data.employees.agents[1].company.name.value : agencyData.data.employees.agents[1].email}</span>
                    </div>
                    <div>
                    {
           agencyData.data.employees.agents[1].company == null ? '' :
         <Link to={`/home/Agency/${agencyData.data.employees.agents[1].id}/${agencyData.data.employees.agents[1].company.id}`} className='btn btn-warning ViewLink' onClick={()=>{
          setAgencyData(null)
           getAgencyData(agencyData.data.employees.agents[1].company.id , agencyData.data.employees.agents[1].id )
          }}>{t('view')}</Link>
           }
         </div>
                    <div>
                    </div>
         </div>
                      </div>
                       </>
                       :
                       <div>
                       <div className='mt-4 d-flex justify-content-between align-items-center' >
                      <div>
           <StyledBadge
             overlap="circular"
             anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
             variant="dot"
            >
         <Avatar alt="Company Logo" src={agencyData?.data.employees.agents[0]?.company != null ? agencyData.data.employees.agents[0]?.company.logo != null ?  agencyData.data.employees.agents[0]?.company.logo['512px'] : '/assests/assets/avatar.png' : '/assests/assets/avatar.png' } />
         </StyledBadge>
                     </div>
                    <div className='flex-special'>
                 <span>{agencyData?.data.employees.agents[0]?.company != null ? agencyData?.data.employees.agents[0]?.company.name.value : agencyData?.data.employees.agents[0]?.email}</span>
                    </div>
                    <div>
                    {
           agencyData?.data.employees.agents[0]?.company == null ? '' :
         <Link to={`/home/Agency/${agencyData.data.employees.agents[0].id}/${agencyData.data.employees.agents[0].company.id}`} className='btn btn-warning ViewLink' onClick={()=>{
          setAgencyData(null)
           getAgencyData(agencyData.data.employees.agents[0].company.id , agencyData.data.employees.agents[0].id )
          }}>{t('view')}</Link>
           }
         </div>
                    <div>
                    </div>
         </div>
                  </div>
                           }
                     </CardContent>
                   </Card>  
    
                         </>
                            
                  ) : loaderteam == true ? <CircularProgress color='inherit' />  : ''   : ''
        }

       <div className='img-display' id='agenciesView'>

       {
          agencyData != null ? vendorLength == 0 ? '' ||  agencyData.data.employees == null :  
                
                  agencyData != null ? (
                    agencyData.data.employees == null ? '' : 
                     <>
                     <Card className='mt-3 specialWidth'>
                      <CardContent className='text-center p-5'>
                            {agencyData.data.employees.agents.map(e => {
                                return(
                                    <div key={e.id}>
                                    <div className='mt-4 d-flex justify-content-between align-items-center' >
                                   <div>
                        <StyledBadge
                          overlap="circular"
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                          variant="dot"
                         >
                      <Avatar alt="Company Logo" src={e.company != null ? e.company.logo != null ?  e.company.logo['512px'] : '/assests/assets/avatar.png' : '/assests/assets/avatar.png' } />
                      </StyledBadge>
                                  </div>
                                 <div className='flex-special'>
                              <span>{e.company != null ? e.company.name.value : e.email}</span>
                                 </div>
                                 <div>
                                 {
                        e.company == null ? '' :
                      <Link to={`/home/Agency/${e.id}/${e.company.id}`} className='btn btn-warning ViewLink' onClick={()=>{
                        setAgencyData(null)
                        getAgencyData(e.company.id , e.id )
                        document.getElementById('agenciesView').style.display = 'none'
                       }}>{t('view')}</Link>
                        
                        }
                      </div>
                                 <div>
                                 </div>
                      </div>
                               </div>
                                )
                            })}
                     </CardContent>
                   </Card>  
    
                         </>
                            
                  ) : loaderteam == true ? <CircularProgress color='inherit' />  : ''   : ''
        }

           <Button variant="contained" onClick={()=>document.getElementById('agenciesView').style.display = "none"} className="mt-3">{t('cancel')}</Button>



        </div>


       </Grid>
       <Grid item xs={12} md={5} className=' mt-5 pt-5'>
        {
              agencyData != null ? agencyData.data.manager != null ?  
              
              <Card>
              <CardContent className='text-center p-5'>
              <div className='d-flex justify-content-between align-items-center mainColor' >
              <h2 >{agencyData.data.manager.type.name.value}</h2>
            
              </div>
       
                {
                  agencyData != null ? (
    
                              <div key={agencyData.data.manager.id}>
                                <div className='mt-4 d-flex justify-content-between align-items-center' >
                               <div>
                  {
                      agencyData.data.manager.is_online == true ?
                      
                      <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant="dot"
                     >
                  <Avatar alt="Remy Sharp" src={agencyData.data.manager.image != null ? agencyData.data.manager.image['512px'] : '/assests/assets/avatar.png'}/>
                  </StyledBadge>
                      :
                      <StyledBadge2
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant="dot"
                     >
                  <Avatar alt="Remy Sharp" src={agencyData.data.manager.image != null ? agencyData.data.manager.image['512px'] : '/assests/assets/avatar.png'}/>
                  </StyledBadge2>
    
                    }
    
    
                  </div>
                  <div>
                      <span>{agencyData.data.manager.name}</span>
    
                      {
                      agencyData.data.manager.is_online == true ? <p style={{color : '#05B646'}} className='m-0 p-0'>{t('Online')}</p> : <p className='m-0 p-0 text-danger'>{t('offline')}</p>
    
                      }
                  </div>
                  <div>
                </div>
                  </div>
                              </div>
                  ) : loaderteam == true ? <CircularProgress color='inherit' />  : ''
                }
              
              </CardContent>
              </Card>
              
              : '' : loaderteam == true ? <CircularProgress color='inherit' className='mangerPhoto'/>  : ''
        }
      
      {
              agencyData != null ? agencyData.data.employees != null ?  
              agencyData.data.employees.employees != 0 ?
              <Card className='mt-3'>
              <CardContent className='text-center p-5'>
              <div className='d-flex justify-content-between align-items-center mainColor' >
              <h2 >{agencyData.data.employees.type.value}</h2>
              </div>
       
                {
                  agencyData != null ? (
                            agencyData.data.employees.employees.map(e => {
                                return(
                                    <div key={e.id}>
                                    <div className='mt-4 d-flex justify-content-between align-items-center' >
                                   <div>
                      {
                         e.is_online == true ? 
                         <StyledBadge
                         overlap="circular"
                         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                         variant="dot"
                        >
                     <Avatar alt="Remy Sharp" src={e.image != null ? e.image['512px'] : '/assests/assets/avatar.png' } />
                     </StyledBadge>
                         
                         : 
                         <StyledBadge2
                         overlap="circular"
                         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                         variant="dot"
                        >
                     <Avatar alt="Remy Sharp" src={e.image != null ? e.image['512px'] : '/assests/assets/avatar.png' } />
                     </StyledBadge2>
                        }
                      </div>
                      <div className='flex-special'>
                          <span>{e.name}</span>
                          {
                         e.is_online == true ? <p style={{color : '#05B646'}} className='m-0 p-0'>{t('Online')}</p> : <p className='m-0 p-0 text-danger'>{t('offline')}</p>
                        }
                      </div>
                      <div>
                          <span className='mainColor'>{e.total_achieved_contracts}</span>
                          <span> {t('Contracts')}</span>
                      </div>
                      <div>
                        {
                      e.type.name.value == "Administrator" ? '' :  <Link to={`/home/userView/${e.id}/${data.type}`} className='btn btn-warning ViewLink' onClick={()=>{
                        setId(e.id)
                        getUserData(agencyData.data.id,e.id)}}>{t('view')}</Link>
                        }
                      </div>
                      </div>
                                  </div>
                                )
                            })
                            
                  ) : loaderteam == true ? <CircularProgress color='inherit' />  : ''
                }
              
              </CardContent>
              </Card>   
              :''



              : '' : loaderteam == true ? <CircularProgress color='inherit' className='mangerPhoto'/>  : ''
        }



        {
          agencyData != null ? vendorLength == 0 ? '' ||  agencyData.data.employees == null :  
                
                  agencyData != null ? (
                    agencyData.data.employees == null ? '' : 
                     <>
                     <Card className='mt-3'>
                            <CardContent className='text-center p-5'>
                      <div className='d-flex justify-content-between align-items-center mainColor' >
                      <h2 >{t('Vendors')}</h2>
                      <h6 className='cursor' onClick={()=>document.getElementById('vendorsView').style.display = 'flex'}>{t('view_all')}</h6>
                           </div>

                           {
                            agencyData.data.employees.vendors.length < 0 ? 
                            <>
                              <div>
                                    <div className='mt-4 d-flex justify-content-between align-items-center' >
                                   <div>
                        <StyledBadge
                          overlap="circular"
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                          variant="dot"
                         >
                      <Avatar alt="Company Logo" src={agencyData.data.employees.vendors[0].company != null ? agencyData.data.employees.vendors[0].company.logo != null ?  agencyData.data.employees.vendors[0].company.logo['512px'] : '/assests/assets/avatar.png' : '/assests/assets/avatar.png' } />
                      </StyledBadge>
                                  </div>
                                 <div className='flex-special'>
                              <span>{agencyData.data.employees.vendors[0].email}</span>
                                 </div>
                                 <div>
                        {
                          agencyData.data.employees.vendors[0].state == "joined" ?    
                          <Link to={`/home/contractor/${agencyData.data.employees.vendors[0].id}`} className='btn btn-warning ViewLink' onClick={()=>{
                            if(localStorage.getItem('id' ) == null){
                              sessionStorage.setItem('id' , agencyData.data.employees.vendors[0].company.id)
                            }else{
                              localStorage.setItem('id' , agencyData.data.employees.vendors[0].company.id)
                            }
                          } 
                          }>{t('view')}</Link> : <div className='text-danger'>{agencyData.data.employees.vendors[0].state}</div>
                        }
                      </div>
                                 <div>
                                 </div>
                                </div>
                               </div>
                            </> 
                            : 
                            <>
                            <div>
                            <div className='mt-4 d-flex justify-content-between align-items-center' >
                           <div>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                 >
              <Avatar alt="Company Logo" src={agencyData?.data.employees.vendors[0]?.company != null ? agencyData?.data.employees.vendors[0].company.logo != null ?  agencyData?.data.employees.vendors[0].company.logo['512px'] : '/assests/assets/avatar.png' : '/assests/assets/avatar.png' } />
              </StyledBadge>
                          </div>
                         <div className='flex-special'>
                      <span>{agencyData?.data.employees.vendors[0]?.email}</span>
                         </div>
                         <div>
                {
                  agencyData?.data.employees.vendors[0]?.state == "joined" ?    
                  <Link to={`/home/contractor/${agencyData.data.employees.vendors[0].id}`} className='btn btn-warning ViewLink' onClick={()=>{
                    if(localStorage.getItem('id' ) == null){
                      sessionStorage.setItem('id' , agencyData.data.employees.vendors[0].company.id)
                    }else{
                      localStorage.setItem('id' , agencyData.data.employees.vendors[0].company.id)
                    }
                  } 
                  }>{t('view')}</Link> : <div className='text-danger'>{agencyData?.data.employees.vendors[0]?.state}</div>
                }
              </div>
                         <div>
                         </div>
                        </div>
                         </div>
                         <div>
                            <div className='mt-4 d-flex justify-content-between align-items-center' >
                                   <div>
                        <StyledBadge
                          overlap="circular"
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                          variant="dot"
                         >
                      <Avatar alt="Company Logo" src={agencyData.data.employees.vendors[1]  ? agencyData.data.employees.vendors[1].company != null ? agencyData.data.employees.vendors[1].company.logo != null ?  agencyData.data.employees.vendors[1].company.logo['512px'] : '/assests/assets/avatar.png' : '/assests/assets/avatar.png' : '/assests/assets/avatar.png'} />
                      </StyledBadge>
                                  </div>
                                 <div className='flex-special'>
                              <span>{agencyData.data.employees.vendors[1]  ? agencyData.data.employees.vendors[1].email : ''}</span>
                                 </div>
                                 <div>
                        {
                         agencyData.data.employees.vendors[1]  && agencyData.data.employees.vendors[1].state == "joined" ?    
                          <Link to={`/home/contractor/${agencyData.data.employees.vendors[1]  && agencyData.data.employees.vendors[1].id}`} className='btn btn-warning ViewLink' onClick={()=>{
                            if(localStorage.getItem('id' ) == null){
                              sessionStorage.setItem('id' , agencyData.data.employees.vendors[1]  && agencyData.data.employees.vendors[1].company.id)
                            }else{
                              localStorage.setItem('id' , agencyData.data.employees.vendors[1]  && agencyData.data.employees.vendors[1].company.id)
                            }
                          } 
                          }>{t('view')}</Link> : <div className='text-danger'>{agencyData.data.employees.vendors[1]  && agencyData.data.employees.vendors[1].state}</div>
                        }
                      </div>
                                 <div>
                                 </div>
                                </div>
                               </div>
                         </>
                         
                           }
                     </CardContent>
              </Card>  
    
                         </>
                            
                  ) : loaderteam == true ? <CircularProgress color='inherit' />  : ''
                
             
          : ''
        }



       <div className='img-display' id='vendorsView'>

{
          agencyData != null ? vendorLength == 0 ? '' ||  agencyData.data.employees == null :  
                
                  agencyData != null ? (
                    agencyData.data.employees == null ? '' : 
                     <>
                     <Card className='mt-3 specialWidth'>
                            <CardContent className='text-center p-5'>
                      <div className='d-flex justify-content-between align-items-center mainColor' >
                      <h2 >{t('Vendors')}</h2>
                           </div>
                            {agencyData.data.employees.vendors.map(e => {
                                return(
                                    <div key={e.id}>
                                    <div className='mt-4 d-flex justify-content-between align-items-center' >
                                   <div>
                        <StyledBadge
                          overlap="circular"
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                          variant="dot"
                         >
                      <Avatar alt="Company Logo" src={e.company != null ? e.company.logo != null ?  e.company.logo['512px'] : '/assests/assets/avatar.png' : '/assests/assets/avatar.png' } />
                      </StyledBadge>
                                  </div>
                                 <div className='flex-special'>
                              <span>{e.email}</span>
                                 </div>
                                 <div>
                        {
                          e.state == "joined" ?    
                          <Link to={`/home/contractor/${e.id}`} className='btn btn-warning ViewLink' onClick={()=>{
                            if(localStorage.getItem('id' ) == null){
                              sessionStorage.setItem('id' , e.company.id)
                            }else{
                              localStorage.setItem('id' , e.company.id)
                            }
                          } 
                          }>{t('view')}</Link> : <div className='text-danger'>{e.state}</div>
                        }
                      </div>
                                 <div>
                                 </div>
                      </div>
                               </div>
                                )
                            })}
                     </CardContent>
              </Card>  
    
                         </>
                            
                  ) : loaderteam == true ? <CircularProgress color='inherit' />  : ''
                
             
          : ''
        }

   <Button variant="contained" onClick={()=>document.getElementById('vendorsView').style.display = 'none'} className="mt-3">{t('cancel')}</Button>



            </div>
      
       </Grid>
        </Grid> 
        }
        

        
        </>
      }

      


     <div className='img-display' id='imgView'>
      <img src='/assests/assets/avatar.png'  width="15%" id='myImg'/>
      <Button variant="contained"  onClick={()=>document.getElementById('imgView').style.display = "none"} className="mt-3 mainBg">{t('cancel')}</Button>
   </div>
   
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
