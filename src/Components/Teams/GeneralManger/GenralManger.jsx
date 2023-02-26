import { Card, CardContent, CircularProgress, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useContext } from 'react';
import { teamData } from '../../../Store/Teams/Teams';
import { useState } from 'react';
import { homedata } from '../../../Store/HomeData/HomeData';
import { useTranslation } from 'react-i18next';
import { useLayoutEffect } from 'react';
import {CiSearch} from "react-icons/ci"
import {IconContext} from 'react-icons'
import { myProfile } from '../../../Store/ProfileData/profileData';





export default function GenralManger() {

    let {loaderteam,getUserData,userData,setUserData,vendorLength ,userError ,setUserError} = useContext(teamData)
    let {myinfo }= useContext(myProfile)

    let {t} = useTranslation()




   useLayoutEffect(() => {
       
      if(localStorage.getItem('Userid') == null && localStorage.getItem('id') == null){
        getUserData(sessionStorage.getItem('id'),sessionStorage.getItem('Userid'))
      }else{
        getUserData(sessionStorage.getItem('id'),sessionStorage.getItem('Userid'))
      }
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
            myinfo()
        }
    }, [])


    console.log(userData)
    
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



      function searchVendors(i){ 
        userData.data.employees.vendors.map(e=>{
          document.getElementById(e.id).classList.add('d-none')
          if(e.email.includes(i)){
            document.getElementById(e.id).classList.remove('d-none')
            document.getElementById(e.id).classList.add('d-flex')
          }
        })

        if(!i == true){
          userData.data.employees.vendors.map(e=>{
            document.getElementById(e.id).classList.remove('d-none')
            document.getElementById(e.id).classList.add('d-flex')
          })
        }
      }

      function searchAgencies(i){ 
        userData.data.employees.agents.map(e=>{
          document.getElementById(e.id).classList.add('d-none')
          if(e.email.includes(i)){
            document.getElementById(e.id).classList.remove('d-none')
            document.getElementById(e.id).classList.add('d-flex')
          }
        })

        if(!i == true){
          userData.data.employees.agents.map(e=>{
            document.getElementById(e.id).classList.remove('d-none')
            document.getElementById(e.id).classList.add('d-flex')
          })
        }
      }

      function searchEmployees(i){ 
        userData.data.employees.employees.map(e=>{
          document.getElementById(e.id).classList.add('d-none')
          if(e.name.includes(i)){
            document.getElementById(e.id).classList.remove('d-none')
            document.getElementById(e.id).classList.add('d-flex')
          }
        })

        if(!i == true){
          userData.data.employees.employees.map(e=>{
            document.getElementById(e.id).classList.remove('d-none')
            document.getElementById(e.id).classList.add('d-flex')
          })
        }
      }



  return (
    
    <div className='mb-5 pb-5 position-relative'>
     {
       userError != null ? <div className='text-center fs-5'>{userError}</div> : 
       <Grid container className=' justify-content-center mt-5 pt-5'>
          {
            userData != null ? userData.data.manager != null && userData.data.employees == null ? 
            <Grid item xs={12} md={10}  className=' mt-5 pt-5'>
              <Card>
              <CardContent>  
               <div className='d-flex justify-content-end align-items-center'>
                <div className='d-flex align-items-center'>
                   <div className='mt-5 pt-4 text-center' onClick={()=>{
                     document.getElementById('imgView').style.display = 'flex'
                     document.getElementById('myImg').src = document.getElementById('imgmainly').src
                   }}>
                       {
                           userData != null ? <img src={userData.data.user.image ? userData.data.user?.image == null ? '/assests/assets/avatar.png' : userData.data.user.image['512px'] : '/assests/assets/avatar.png'} className={localStorage.getItem('Language') == "ar" || sessionStorage.getItem('Language')== "ar" ? 'mangerPhotoar cursor' : 'mangerPhoto cursor'}  id='imgmainly'/> :  loaderteam == true ? <CircularProgress color='inherit' className='mangerPhoto'/>  : '' 
                       }
                       
                   </div>
                   <div>
                   <a href={userData != null ? `https://www.google.com/maps/?q=${userData?.data.user.address?.latitude},${userData?.data.user.address?.longitude}` : 'https://www.google.com/maps'} target='_blank'>
                   <img src='/assests/assets/icons/LocationPng.png' className={localStorage.getItem('Language')== "ar" || sessionStorage.getItem('Language')== "ar"? 'mangerLocationar' : 'mangerLocation'} />
                   </a>
                   </div>
                   <div>
                   <a href={`tel:${ userData != null ? userData.data.user.mobile : ''}`}>
                   <img src='/assests/assets/icons/CallPng.png' className={localStorage.getItem('Language')== "ar"|| sessionStorage.getItem('Language')== "ar" ? 'mangerPhonear' : 'mangerPhone'}      />
                   </a>
                   </div>
                   <div className='mainColor'>
                    {t('id')} : {localStorage.getItem('Userid') == null ? sessionStorage.getItem('Userid')  : localStorage.getItem('Userid') }
                   </div>
               </div>
               </div>
            <div className='d-flex justify-content-center gap-3 align-items-center'>
              <div className='text-center'>
              <h4>
              {
                userData != null ? userData.data.user.name  :  loaderteam == true ? <CircularProgress color='inherit' className='mangerPhoto'/>  : ''
              }
              </h4>
              <p className='mainColor'>
              {
                userData != null ? userData.data.user.type.name.value  :  loaderteam == true ? <CircularProgress color='inherit' className='mangerPhoto'/>  : ''
              }
              </p>
              </div>
           <Card className='mangerCard'>
           <CardContent>
             <img src='/assests/assets/icons/email.svg' width="40px"  height= "40px" />
             <p className='mt-4 mb-2'>
             {
            userData != null ? userData.data.user?.email :  loaderteam == true ? <CircularProgress color='inherit' className='mangerPhoto'/>  : ''
             }
             </p>
           </CardContent>
            </Card>
            <Card className='mangerCard'>
           <CardContent>
             <img src='/assests/assets/icons/Gender.svg' width="40px"  height= "40px"/>
             <p className='mt-4 mb-2'>
             {
            userData != null ? userData.data.user.gender :  loaderteam == true ? <CircularProgress color='inherit' className='mangerPhoto'/>  : ''
             }
             </p>
           </CardContent>
            </Card>
            <Card className='mangerCard'>
              <CardContent>
                  <img src='/assests/assets/icons/Language.svg' width="40px" height= "40px" />
                  <p className='mt-4 mb-2'>
                  {
                  userData != null ? userData.data.user.language.name_values.value  :  loaderteam == true ? <CircularProgress color='inherit' className='mangerPhoto'/>  : ''
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
              userData != null ? userData.data.branches.length != 0 ? 
              userData.data.branches.map(e=>{
                return( <p>{e?.address.detailed_address}</p>)
              })
            : <p>not branches yet</p> : <p>no user found</p> 
              }
            </div>
           </CardContent>
          </Card>
       
       
       <div className='mt-3 d-flex align-items-center justify-content-between dataview gap-3'>
        {
          userData.data.employees == null ? '' : <>
          
          <Card  sx={{width : 'fit-content' , paddingBottom : "0" , padding : '0'}}>
            <CardContent className='p-0 '>
                <div className='p-5 text-center'>  
                <h6 className='totalHeader'>{t("earning")}</h6>
                <h2 style={{color : '#45C0BE' , fontSize : "20px !important"}}>{userData != null  ? userData.data.employees != null ? userData.data.employees.earning : '' :  loaderteam == true ? <CircularProgress color='inherit' className='mangerPhoto'/>  : ''}</h2>
                </div>
                <div><img src='/assests/assets/BlueChart.svg' width="100%"/></div>
            </CardContent>
        </Card>
        <Card  sx={{width : 'fit-content' , paddingBottom : "0" , padding : '0'}}>
            <CardContent className='p-0 '>
                <div className='p-5 text-center'>  
                <h6 className='totalHeader'>{t("Vendors")}</h6>
                <h2 style={{color : '#E4D366', fontSize : "20px !important"}}>{userData != null ? userData.data.employees != null ? userData.data.employees.vendors.length : '' :  loaderteam == true ? <CircularProgress color='inherit' className='mangerPhoto'/>  : ''}</h2>
                </div>
                <div><img src='/assests/assets/YellowChart.svg' width="100%"/></div>
            </CardContent>
        </Card>
        <Card  sx={{width : 'fit-content' , paddingBottom : "0" , padding : '0'}}>
            <CardContent className='p-0 '>
                <div className='p-5 text-center '>  
                <h6 className='totalHeader'>{t("Subscribers")}</h6>
                <h2 style={{color : '#BE5252', fontSize : "20px !important"}}>{userData != null ? userData.data.employees != null ? userData.data.employees.agents.length : '' :  loaderteam == true ? <CircularProgress color='inherit' className='mangerPhoto'/>  : ''}</h2>
                </div>
                <div><img src='/assests/assets/RedChart.svg' width="100%"/></div>
            </CardContent>
        </Card>
          
          
          </>
        }
        
       </div>

         {
          userData != null ?  
                
                  userData != null ? (
                    userData.data.employees == null ? '' : 
                     <>
                     <Card className='mt-3'>
                            <CardContent className='text-center p-5'>
                              
                      <div className='d-flex justify-content-between align-items-center mainColor' >
                          <h2 >{t('Agencies')}</h2>
                          <h6 className='cursor' onClick={()=>document.getElementById('agenciesView').style.display = "flex"}>{t('view_all')}</h6>
                           </div>
                            

                            {
                              userData.data.employees.agents.length > 1 ? 
                              <>
                                  <div>
                              <div className='mt-4 d-flex justify-content-between align-items-center ' >
                             <div className='cursor' onClick={()=>{
                             document.getElementById('imgView').style.display = 'flex'
                             document.getElementById('myImg').src = document.getElementById('avatar1').src
                             }}>
                               <Avatar>
                              <img  alt="Company Logo" width="100%" id="avatar1" src={userData.data.employees.agents[0].company != null ? userData.data.employees.agents[0].company.logo != null ?  userData.data.employees.agents[0].company.logo['512px'] : '/assests/assets/avatar.png' : '/assests/assets/avatar.png' } />
                               </Avatar>
                            </div>
                           <div className='flex-special'>
                          <span>{userData.data.employees.agents[0].company != null ? userData.data.employees.agents[0].company.name.value.charAt(0).toUpperCase() + userData.data.employees.agents[0].company.name.value.slice(1) : userData.data.employees.agents[0].email.charAt(0).toUpperCase() + userData.data.employees.agents[0].email.slice(1)}</span>
                           </div>
                           <div>
                  {
                  userData.data.employees.agents[0].state != "joined" ? <div className='text-danger'>{userData.data.employees.agents[0].state}</div> :
                <Link to={`/home/Agency/${userData.data.employees.agents[0].id}/${userData.data.employees.agents[0].company != null ? userData.data.employees.agents[0].company.id : ''}`} className='btn btn-warning ViewLink' >{t('view')}</Link>
                  }
                </div>
                           <div>
                           </div>
                </div>
                                 </div>
                                 <div>
                              <div className='mt-4 d-flex justify-content-between align-items-center' >
                             <div  className="cursor" onClick={()=>{
                     document.getElementById('imgView').style.display = 'flex'
                     document.getElementById('myImg').src = document.getElementById('avatar2').src
                   }}>
               
                <Avatar alt="Company Logo" src={userData.data.employees.agents[1].company != null ? userData.data.employees.agents[1].company.logo != null ?  userData.data.employees.agents[1].company.logo['512px'] : '/assests/assets/avatar.png' : '/assests/assets/avatar.png' } >
                  <img alt="Company Logo" id="avatar2" width='100%'  src={userData.data.employees.agents[1].company != null ? userData.data.employees.agents[1].company.logo != null ?  userData.data.employees.agents[1].company.logo['512px'] : '/assests/assets/avatar.png' : '/assests/assets/avatar.png' }/>
                  </Avatar>
               
                            </div>
                           <div className='flex-special'>
                        <span>{userData.data.employees.agents[1].company != null ? userData.data.employees.agents[1].company.name.value.charAt(0).toUpperCase() + userData.data.employees.agents[1].company.name.value.slice(1) : userData.data.employees.agents[1].email.charAt(0).toUpperCase() + userData.data.employees.agents[1].email.slice(1)}</span>
                           </div>
                           <div>
                  {
                  userData.data.employees.agents[1].state != "joined" ? <div className='text-danger'>{userData.data.employees.agents[1].state}</div> :
                <Link to={`/home/Agency/${userData.data.employees.agents[1].id}/${userData.data.employees.agents[1].company != null ? userData.data.employees.agents[1].company.id : ''}`} className='btn btn-warning ViewLink'>{t('view')}</Link>
                  }
                </div>
                           <div>
                           </div>
                </div>
                         </div>
                              </>
                              : ''
                            }
                            
                     </CardContent>
              </Card>  
    
                         </>
                            
                  ) : loaderteam == true ? <CircularProgress color='inherit' />  : ''
                
             
          : ''
        }



        <div className='img-display' id='agenciesView'>

        {
          userData != null ?
                
                  userData != null ? (
                    userData.data.employees == null ? '' : 
                     <>
                     <Card className='mt-3 h-50 overflowAuto specialWidth '>
                            <CardContent className='text-center p-5'>
                              
                            <div className='inputView rounded'>
                        <IconContext.Provider value={{color : '#45C0BE', size: '30px'}}>
                       <CiSearch />
                       </IconContext.Provider>
                    <input type='text' placeholder={t('Search')} className='border-0 outline-0 ps-3 searchinIput'  onChange={(e)=>searchAgencies(e.target.value)} /> 
                               </div>
                            {userData.data.employees.agents.map(e => {
                                return(
                                    <div key={e.id}>
                                    <div className='mt-4 d-flex justify-content-between align-items-center' id={e.id}>
                                   <div className='cursor' >
                     
                      <Avatar >
                        <img  alt="Company Logo" width="100%" src={e.company != null ? e.company.logo != null ?  e.company.logo['512px'] : '/assests/assets/avatar.png' : '/assests/assets/avatar.png' }  
                        onClick={(e)=>{
                          document.getElementById('imgView').style.display = 'flex'
                          document.getElementById('myImg').src = e.target.src
                        }}
                        />
                        </Avatar>
                                  </div>
                                 <div className='flex-special'>
                              <span>{e.company  != null ? e.company.name.value.charAt(0).toUpperCase() + e.company.name.value.slice(1) : ''}</span>

                           
                                 </div>
                                 <div>
                        {
                        e.state != "joined" ? <div className='text-danger'>{e.state}</div> :
                      <Link to={`/home/Agency/${e.id}/${e.company != null ? e.company.id : ''}`} className='btn btn-warning ViewLink' onClick={()=>{
                        document.getElementById('agenciesView').style.display = "none"
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
                            
                  ) : loaderteam == true ? <CircularProgress color='inherit' />  : ''
                
             
          : ''
        }

           <Button variant="contained" onClick={()=>document.getElementById('agenciesView').style.display = "none"} className="mt-3">{t('cancel')}</Button>



        </div>
       </Grid>

       : 
       <Grid item xs={12} md={5}  className=' mt-5 pt-5 m-auto'>

        {/* personal details GM card -------------------------------------------------------------------------- */}

       <Card>
          <CardContent>  
              <div className='d-flex justify-content-end align-items-center'>
               <div className='d-flex align-items-center'>
                  <div className='mt-5 pt-4 text-center' onClick={()=>{
                    document.getElementById('imgView').style.display = 'flex'
                    document.getElementById('myImg').src = document.getElementById('imgmainly').src
                  }}>
                      {
                          userData != null ? <img src={userData.data.user?.image ? userData.data.user?.image == null ? '/assests/assets/avatar.png' : userData.data.user?.image['512px'] : '/assests/assets/avatar.png'} className={localStorage.getItem('Language') == "ar" || sessionStorage.getItem('Language')== "ar" ? 'mangerPhotoar cursor' : 'mangerPhoto cursor'}  id='imgmainly'/> :  loaderteam == true ? <CircularProgress color='inherit' className='mangerPhoto'/>  : '' 
                      }
                      
                  </div>
                  <div>
                  <a href={userData != null ? `https://www.google.com/maps/?q=${userData?.data.user.address?.latitude},${userData?.data.user.address?.longitude}` : 'https://www.google.com/maps'} target='_blank'>
                  <img src='/assests/assets/icons/LocationPng.png' className={localStorage.getItem('Language')== "ar" || sessionStorage.getItem('Language')== "ar"? 'mangerLocationar' : 'mangerLocation'} />
                  </a>
                  </div>
                  <div>
                  <a href={`tel:${ userData != null ? userData.data.user.mobile : ''}`}>
                  <img src='/assests/assets/icons/CallPng.png' className={localStorage.getItem('Language')== "ar"|| sessionStorage.getItem('Language')== "ar" ? 'mangerPhonear' : 'mangerPhone'}      />
                  </a>
                  </div>
                  <div className='mainColor'>
                   {t('id')} : {localStorage.getItem('Userid') == null ? sessionStorage.getItem('Userid')  : localStorage.getItem('Userid') }
                  </div>
              </div>
              </div>
           <div className='d-flex justify-content-center gap-3 align-items-center'>
          <div className='text-center'>
          <h4>
          {
           userData != null ? userData.data.user?.name  :  loaderteam == true ? <CircularProgress color='inherit' className='mangerPhoto'/>  : ''
          }
          </h4>
          <p className='mainColor'>
          {
           userData != null ? userData.data.user.type.name.value  :  loaderteam == true ? <CircularProgress color='inherit' className='mangerPhoto'/>  : ''
          }
          </p>
          </div>
          <Card className='mangerCard'>
          <CardContent>
            <img src='/assests/assets/icons/email.svg' width="40px"  height= "40px" />
            <p className='mt-4 mb-2'>
            {
           userData != null ? userData.data.user.email :  loaderteam == true ? <CircularProgress color='inherit' className='mangerPhoto'/>  : ''
            }
            </p>
          </CardContent>
           </Card>
           <Card className='mangerCard'>
          <CardContent>
            <img src='/assests/assets/icons/Gender.svg' width="40px"  height= "40px"/>
            <p className='mt-4 mb-2'>
            {
           userData != null ? userData.data.user.gender :  loaderteam == true ? <CircularProgress color='inherit' className='mangerPhoto'/>  : ''
            }
            </p>
          </CardContent>
           </Card>
           <Card className='mangerCard'>
          <CardContent>
            <img src='/assests/assets/icons/Language.svg' width="40px" height= "40px" />
            <p className='mt-4 mb-2'>
            {
           userData != null ? userData.data.user.language.name_values.value  :  loaderteam == true ? <CircularProgress color='inherit' className='mangerPhoto'/>  : ''
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
             userData != null ? userData.data.branches.length != 0 ? 
             userData.data.branches.map(e=>{
               return(
                 <>
                 {e.address.detailed_address}
                 </>
               )
             })
           : <div className='text-center mt-3 h3'>{t('No_Branches')}</div> : ''             }
              </div>
          </CardContent>
      </Card>
      
       {/* TOTAL VENDOR AGENCIES ------------------------------------------------------------------------------------------------------ */}

      <div className='mt-3 d-flex align-items-center justify-content-between dataview gap-3'>

       {
          userData.data.employees == null ? '' : <>
          
          <Card  sx={{width : 'fit-content' , paddingBottom : "0" , padding : '0'}}>
            <CardContent className='p-0 '>
                <div className='p-4 text-center'>  
                <h6 className='totalHeader'>{t("earning")}</h6>
                <h2 style={{color : '#45C0BE'}}>{userData != null  ? userData.data.employees != null ? userData.data.employees.earning : '' :  loaderteam == true ? <CircularProgress color='inherit' className='mangerPhoto'/>  : ''}</h2>
                </div>
                <div><img src='/assests/assets/BlueChart.svg' width="100%"/></div>
            </CardContent>
        </Card>
        <Card  sx={{width : 'fit-content' , paddingBottom : "0" , padding : '0'}}>
            <CardContent className='p-0 '>
                <div className='p-4 text-center'>  
                <h6 className='totalHeader'>{t("Vendors")}</h6>
                <h2 style={{color : '#E4D366'}}>{userData != null ? userData.data.employees != null ?userData.data.employees.vendors.length : '' :  loaderteam == true ? <CircularProgress color='inherit' className='mangerPhoto'/>  : ''}</h2>
                </div>
                <div><img src='/assests/assets/YellowChart.svg' width="100%"/></div>
            </CardContent>
        </Card>
        <Card  sx={{width : 'fit-content' , paddingBottom : "0" , padding : '0'}}>
            <CardContent className='p-0 '>
                <div className='p-4 text-center '>  
                <h6 className='totalHeader'>{t("Subscribers")}</h6>
                <h2 style={{color : '#BE5252'}}>{userData != null ? userData.data.employees != null ? userData.data.employees.agents.length : '' :  loaderteam == true ? <CircularProgress color='inherit' className='mangerPhoto'/>  : ''}</h2>
                </div>
                <div><img src='/assests/assets/RedChart.svg' width="100%"/></div>
            </CardContent>
        </Card>
          
          
          </>
        }
      </div>


        {/* AGENCIES DETAILS  --------------------------------------------------------------------------------------------------------------------- */}

        {
         userData != null ?
               
                 userData != null ? (
                   userData.data.employees == null ? '' : 
                    <>
                    <Card className='mt-3'>
                           <CardContent className='text-center p-5'>
                             
                     <div className='d-flex justify-content-between align-items-center mainColor' >
                         <h2 >{t('Agencies')}</h2>
                         <h6 className='cursor' onClick={()=>document.getElementById('agenciesView').style.display = "flex"}>{t('view_all')}</h6>
                          </div>
                           

                           {
                             userData.data.employees.agents.length > 1 ? 
                             <>
                                 <div>
                             <div className='mt-4 d-flex justify-content-between align-items-center ' >
                            <div className='cursor' onClick={()=>{
                    document.getElementById('imgView').style.display = 'flex'
                    document.getElementById('myImg').src = document.getElementById('avatar1').src
                  }}>
                              <Avatar>
                             <img  alt="Company Logo" width="100%" id="avatar1" src={userData.data.employees.agents[0].company != null ? userData.data.employees.agents[0].company.logo != null ?  userData.data.employees.agents[0].company.logo['512px'] : '/assests/assets/avatar.png' : '/assests/assets/avatar.png' } />
                              </Avatar>
                           </div>
                          <div className='flex-special'>
                         <span>{userData.data.employees.agents[0].company != null ? userData.data.employees.agents[0].company.name.value : userData.data.employees.agents[0].email}</span>
                          </div>
                          <div>
                 {
                 userData.data.employees.agents[0].state != "joined" ? <div className='text-danger'>{userData.data.employees.agents[0].state}</div> :
               <Link to={`/home/Agency/${userData.data.employees.agents[0].id}/${userData.data.employees.agents[0].company != null ? userData.data.employees.agents[0].company.id : ''}`} className='btn btn-warning ViewLink' >{t('view')}</Link>
                 }
               </div>
                          <div>
                          </div>
               </div>
                                </div>
                                <div>
                             <div className='mt-4 d-flex justify-content-between align-items-center' >
                            <div  className="cursor" onClick={()=>{
                    document.getElementById('imgView').style.display = 'flex'
                    document.getElementById('myImg').src = document.getElementById('avatar2').src
                  }}>
              
               <Avatar alt="Company Logo" src={userData.data.employees.agents[1].company != null ? userData.data.employees.agents[1].company.logo != null ?  userData.data.employees.agents[1].company.logo['512px'] : '/assests/assets/avatar.png' : '/assests/assets/avatar.png' } >
                 <img alt="Company Logo" id="avatar2" width='100%'  src={userData.data.employees.agents[1].company != null ? userData.data.employees.agents[1].company.logo != null ?  userData.data.employees.agents[1].company.logo['512px'] : '/assests/assets/avatar.png' : '/assests/assets/avatar.png' }/>
                 </Avatar>
              
                           </div>
                          <div className='flex-special'>
                       <span>{userData.data.employees.agents[1].company != null ? userData.data.employees.agents[1].company.name.value : userData.data.employees.agents[1].email}</span>
                          </div>
                          <div>
                 {
                 userData.data.employees.agents[1].state != "joined" ? <div className='text-danger'>{userData.data.employees.agents[1].state}</div> :
               <Link to={`/home/Agency/${userData.data.employees.agents[1].id}/${userData.data.employees.agents[1].company != null ? userData.data.employees.agents[1].company.id : ''}`} className='btn btn-warning ViewLink' >{t('view')}</Link>
                 }
               </div>
                          <div>
                          </div>
               </div>
                        </div>
                             </>
                             : ''
                           }
                           
                    </CardContent>
             </Card>  
   
                        </>
                           
                 ) : loaderteam == true ? <CircularProgress color='inherit' />  : ''
               
            
         : ''
       }

        {/* AGENCIES VIEW ALL ---------------------------------------------------------------------------------------------------------------------- */}

       <div className='img-display' id='agenciesView'>

       {
         userData != null ?
               
                 userData != null ? (
                   userData.data.employees == null ? '' : 
                    <>
                    <Card className='mt-3 h-50 overflowAuto specialWidth '>
                           <CardContent className='text-center p-5'>
                             
                           <div className='inputView rounded'>
                       <IconContext.Provider value={{color : '#45C0BE', size: '30px'}}>
                      <CiSearch />
                      </IconContext.Provider>
                   <input type='text' placeholder={t('Search')} className='border-0 outline-0 ps-3 searchinIput'  onChange={(e)=>searchAgencies(e.target.value)} /> 
                              </div>
                           {userData.data.employees.agents.map(e => {
                               return(
                                   <div key={e.id}>
                                   <div className='mt-4 d-flex justify-content-between align-items-center' id={e.id}>
                                  <div className='cursor'>
                    
                     <Avatar >
                       <img  alt="Company Logo" width="100%" src={e.company != null ? e.company.logo != null ?  e.company.logo['512px'] : '/assests/assets/avatar.png' : '/assests/assets/avatar.png' }  
                       onClick={(e)=>{
                        document.getElementById('imgView').style.display = 'flex'
                        document.getElementById('myImg').src = e.target.src
                      }}
                       />
                       </Avatar>
                                 </div>
                                <div className='flex-special'>
                             <span>{e.company != null ? e.company.name.value.charAt(0).toUpperCase() + e.company.name.value.slice(1) : e.email.charAt(0).toUpperCase() + e.email.slice(1)}</span>
                                </div>
                                <div>
                       {
                       e.state != "joined" ? <div className='text-danger'>{e.state}</div> :
                     <Link to={`/home/Agency/${e.id}/${e.company != null ? e.company.id : ''}`} className='btn btn-warning ViewLink' onClick={()=>getUserData(e.id , e.company.id)}>{t('view')}</Link>
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

          <Button variant="contained" onClick={()=>document.getElementById('agenciesView').style.display = "none"} className="mt-3">{t('cancel')}</Button>



       </div>

            </Grid>
             
             : ''
          }
       <Grid item xs={12} md={5.5} className=' mt-5 pt-5 mb-5 m-auto'>
        {
              userData != null ? userData.data.manager != null ?  
              
              <Card>
              <CardContent className='text-center p-5'>
              <div className='d-flex justify-content-between align-items-center mainColor' >
              <h2 >{userData.data.manager.type.name.value}</h2>
              </div>
       
                {
                  userData != null ? (
    
                              <div key={userData.data.manager.id}>
                                <div className='mt-4 d-flex justify-content-between align-items-center' >
                               <div>
                  {
                      userData.data.manager.is_online == true ?
                      
                      <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant="dot"
                      className='cursor' 
                      onClick={()=>{
                        document.getElementById('imgView').style.display = 'flex'
                        document.getElementById('myImg').src = document.getElementById('avatar4').src
                      }}
                     >
                  <Avatar >
                    <img  id="avatar4"alt="Logo" width="100%" src={userData.data.manager.image != null ? userData.data.manager.image['512px'] : '/assests/assets/avatar.png'} />
                    </Avatar>
                  </StyledBadge>
                      :
                      <StyledBadge2
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant="dot"
                      className='cursor' 
                      onClick={()=>{
                        document.getElementById('imgView').style.display = 'flex'
                        document.getElementById('myImg').src = document.getElementById('avatar5').src
                      }}
                     >
                  <Avatar >
                    <img alt="Logo" id="avatar5" width="100%" src={userData.data.manager.image != null ? userData.data.manager.image['512px'] : '/assests/assets/avatar.png'} />
                    </Avatar>
                  </StyledBadge2>
    
                    }
    
    
                  </div>
                  <div>
                      <span>{userData.data.manager.name}</span>
    
                      {
                      userData.data.manager.is_online == true ? <p style={{color : '#05B646'}} className='m-0 p-0'>{t('Online')}</p> : <p className='m-0 p-0 text-danger'>{t('offline')}</p>
    
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
              userData != null ? userData.data.employees != null ?  

              userData.data.employees.employees.length != 0 ?
              
              <Card className='mt-3'>
              <CardContent className='text-center p-5'>
              <div className='d-flex justify-content-between align-items-center mainColor' >
              <h2 >{userData.data.employees.type.value}</h2>
              <h6 onClick={()=>document.getElementById('employeesView').style.display = 'flex'} className="cursor">{t('view_all')}</h6>
              </div>
       
                {
                  userData != null ? (userData.data.employees.employees.length != 0 ?

                    userData.data.employees.employees.length > 1 ? 
                    <>
                     <div>
                    <div className='mt-4 d-flex justify-content-between align-items-center' >
                   <div>
      {
         userData.data.employees.employees[0].is_online == true ? 
         <StyledBadge
         overlap="circular"
         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
         variant="dot"
         className='cursor'
    
        >
     <Avatar >
        <img  alt="Logo" width="100%"  src={userData.data.employees.employees[0].image != null ? userData.data.employees.employees[0].image['512px'] : '/assests/assets/avatar.png' } 
        
        onClick={(e)=>{
          document.getElementById('imgView').style.display = 'flex'
          document.getElementById('myImg').src = e.target.src
        }}

        />
      </Avatar>
     </StyledBadge>
         
         : 
         <StyledBadge2
         overlap="circular"
         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
         variant="dot"
         className='cursor'
         
        >
     <Avatar>
      <img  id="avatar7" alt="Logo" width="100%"  src={userData.data.employees.employees[0].image != null ? userData.data.employees.employees[0].image['512px'] : '/assests/assets/avatar.png' } 
      onClick={(e)=>{
        document.getElementById('imgView').style.display = 'flex'
        document.getElementById('myImg').src = e.target.src
      }}
      />
      </Avatar>
     </StyledBadge2>
        }
      </div>
      <div className='flex-special'>
          <span>{userData.data.employees.employees[0].name.charAt(0).toUpperCase() + userData.data.employees.employees[0].name.slice(1)}</span>
          {
         userData.data.employees.employees[0].is_online == true ? <p style={{color : '#05B646'}} className='m-0 p-0'>{t('Online')}</p> : <p className='m-0 p-0 text-danger'>{t('offline')}</p>
        }
      </div>
      <div>
          <span className='mainColor'>{userData.data.employees.employees[0].total_achieved_contracts}</span>
          <span> {t('Contracts')}</span>
      </div>
      <div>
        {
      userData.data.employees.employees[0].type.name.value == "Administrator" ? '' :  <Link to={`/home/userView/${userData.data.employees.employees[0].id}/${localStorage.getItem('Userid') == null && localStorage.getItem('id') == null ?  sessionStorage.getItem('id') :  localStorage.getItem('id')}`} className='btn btn-warning ViewLink' onClick={()=>{
       }}>{t('view')}</Link>
        }
      </div>
      </div>
                  </div>
                  <div>
                    <div className='mt-4 d-flex justify-content-between align-items-center' >
                   <div>
      {
         userData.data.employees.employees[1].is_online == true ? 
         <StyledBadge
         overlap="circular"
         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
         variant="dot"
         className='cursor'
        
        >
     <Avatar  >
        <img alt="Logo" width="100%" src={userData.data.employees.employees[1].image != null ? userData.data.employees.employees[1].image['512px'] : '/assests/assets/avatar.png' }
         onClick={(e)=>{
          document.getElementById('imgView').style.display = 'flex'
          document.getElementById('myImg').src =  e.target.src
        }}
        
        />
      </Avatar>
     </StyledBadge>
         
         : 
         <StyledBadge2
         overlap="circular"
         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
         variant="dot"
         className='cursor'

        >
     <Avatar  >
      <img alt="Logo" width="100%"  src={userData.data.employees.employees[1].image != null ? userData.data.employees.employees[1].image['512px'] : '/assests/assets/avatar.png' }
               onClick={(e)=>{
                document.getElementById('imgView').style.display = 'flex'
                document.getElementById('myImg').src = e.target.src
              }}
      />
      </Avatar>
     </StyledBadge2>
        }
      </div>
      <div className='flex-special'>
          <span>{userData.data.employees.employees[1].name.charAt(0).toUpperCase() + userData.data.employees.employees[1].name.slice(1)}</span>
          {
         userData.data.employees.employees[1].is_online == true ? <p style={{color : '#05B646'}} className='m-0 p-0'>{t('Online')}</p> : <p className='m-0 p-0 text-danger'>{t('offline')}</p>
        }
      </div>
      <div>
          <span className='mainColor'>{userData.data.employees.employees[1].total_achieved_contracts}</span>
          <span> {t('Contracts')}</span>
      </div>
      <div>
        {
      userData.data.employees.employees[1].type.name.value == "Administrator" ? '' :  <Link to={`/home/userView/${userData.data.employees.employees[1].id}/${localStorage.getItem('Userid') == null && localStorage.getItem('id') == null ?  sessionStorage.getItem('id') :  localStorage.getItem('id')}`} className='btn btn-warning ViewLink' onClick={()=>{
       }}>{t('view')}</Link>
        }
      </div>
                      </div>
                  </div>
                    </>
                   
                    : <div>
                    <div className='mt-4 d-flex justify-content-between align-items-center' >
                   <div>
      {
         userData.data.employees.employees[0].is_online == true ? 
         <StyledBadge
         overlap="circular"
         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
         variant="dot"
         className='cursor'
         
        >
     <Avatar >
      <img alt="Logo" width="100%" src={userData.data.employees.employees[0].image != null ? userData.data.employees.employees[0].image['512px'] : '/assests/assets/avatar.png' }
      onClick={(e)=>{
        document.getElementById('imgView').style.display = 'flex'
        document.getElementById('myImg').src = e.target.src
      }}
      
      
      />
     </Avatar>
     </StyledBadge>
         
         : 
         <StyledBadge2
         overlap="circular"
         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
         variant="dot"
         className='cursor'
         onClick={()=>{
          document.getElementById('imgView').style.display = 'flex'
          document.getElementById('myImg').src = document.getElementById('avatar10').src
        }}
        >
     <Avatar  >
      <img alt="Logo" id="avatar11" width="100%" src={userData.data.employees.employees[0].image != null ? userData.data.employees.employees[0].image['512px'] : '/assests/assets/avatar.png' }/>
      </Avatar>
     </StyledBadge2>
        }
      </div>
      <div className='flex-special'>
          <span>{userData.data.employees.employees[0].name.charAt(0).toUpperCase() + userData.data.employees.employees[0].name.slice(1)}</span>
          {
         userData.data.employees.employees[0].is_online == true ? <p style={{color : '#05B646'}} className='m-0 p-0'>{t('Online')}</p> : <p className='m-0 p-0 text-danger'>{t('offline')}</p>
        }
      </div>
      <div>
          <span className='mainColor'>{userData.data.employees.employees[0].total_achieved_contracts}</span>
          <span> {t('Contracts')}</span>
      </div>
      <div>
        {
      userData.data.employees.employees[0].type.name.value == "Administrator" ? '' :  <Link to={`/home/userView/${userData.data.employees.employees[0].id}/${localStorage.getItem('Userid') == null && localStorage.getItem('id') == null ?  sessionStorage.getItem('id') :  localStorage.getItem('id')}`} className='btn btn-warning ViewLink' onClick={()=>{
       }}>{t('view')}</Link>
        }
      </div>
      </div>
                  </div>


                       
                            
                  : '') : loaderteam == true ? <CircularProgress color='inherit' />  : ''
                }
              
              </CardContent>
              </Card>   
              : ''
              : '' : loaderteam == true ? <CircularProgress color='inherit' className='mangerPhoto'/>  : ''
        }



        <div className='img-display' id='employeesView'>
            {
               userData != null ? 
               userData != null ? (
                userData.data.employees == null ? '' : 
                 <>
                 <Card className='mt-3  h-50 overflowAuto specialWidth'>
                        <CardContent className='text-center p-5'>
                          
                        <div className='inputView rounded'>
                        <IconContext.Provider value={{color : '#45C0BE', size: '30px'}}>
                       <CiSearch />
                       </IconContext.Provider>
                       <input type='text' placeholder={t('Search')} className='border-0 outline-0 ps-3 searchinIput'  onChange={(e)=>searchEmployees(e.target.value)} /> 
                          </div>
                       {
                      userData != null ? (
                                userData.data.employees.employees.map(e => {
                                    return(
                                        <div key={e.id}>
                                        <div className='mt-4 d-flex justify-content-between align-items-center' id={e.id}>
                                       <div>
                          {
                             e.is_online == true ? 
                             <StyledBadge
                             overlap="circular"
                             anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                             variant="dot"
                             className='cursor'
                            
                            >
                         <Avatar  >
                         <img alt="Logo" width="100%" id='avatar12' src={e.image != null ? e.image['512px'] : '/assests/assets/avatar.png' } 
                          onClick={(e)=>{
                            document.getElementById('imgView').style.display = 'flex'
                            document.getElementById('myImg').src = e.target.src
                          }} 
                         />
                         </Avatar>
                         </StyledBadge>
                             
                             : 
                             <StyledBadge2
                             overlap="circular"
                             anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                             variant="dot"
                             className='cursor'
                             onClick={()=>{
                              document.getElementById('imgView').style.display = 'flex'
                              document.getElementById('myImg').src = document.getElementById('avatar13').src
                            }}
                            >
                         <Avatar  >
                          <img  alt="Logo" width="100%" id='avatar13' src={e.image != null ? e.image['512px'] : '/assests/assets/avatar.png' } />
                          </Avatar>
                         </StyledBadge2>
                            }
                          </div>
                          <div className='flex-special'>
                              <span>{e.name.charAt(0).toUpperCase() + e.name.slice(1)}</span>
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
                          e.type.name.value == "Administrator" ? '' :  <Link to={`/home/userView/${e.id}/${localStorage.getItem('Userid') == null && localStorage.getItem('id') == null ?  sessionStorage.getItem('id') :  localStorage.getItem('id')}`} className='btn btn-warning ViewLink' onClick={()=>{{
                            document.getElementById('employeesView').style.display = 'none'
                          }}}>{t('view')}</Link>
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
    
                     </>
                        
              ) : loaderteam == true ? <CircularProgress color='inherit' />  : '' 
               
               : ''
            }
   <Button variant="contained" onClick={()=>document.getElementById('employeesView').style.display = 'none'} className="mt-3">{t('cancel')}</Button>
            </div>


        {
          userData != null ? vendorLength == 0 ? '' ||  userData.data.employees == null :  
                
                  userData != null ? (
                    userData.data.employees == null ? '' : 
                     <>
                     <Card className='mt-3'>
                            <CardContent className='text-center p-5'>
                      <div className='d-flex justify-content-between align-items-center mainColor' >
                      <h2 >{t('Vendors')}</h2>
                      <h6 onClick={()=>document.getElementById('vendorsView').style.display = 'flex'} className="cursor">{t('view_all')}</h6>
                           </div>
                            {
                              userData.data.employees.vendors.length > 1 ? 
                              <>
                              <div>

                              <Grid container className='mt-4 d-flex justify-content-between align-items-center' >
                             <Grid item xs={4} md={4}>
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                    className='cursor'
                    onClick={()=>{
                     document.getElementById('imgView').style.display = 'flex'
                     document.getElementById('myImg').src = document.getElementById('avatar14').src
                   }}
                    >
                <Avatar  >
                  <img alt="Company Logo" width="100%" id='avatar14'  src={ userData.data.employees.vendors[0].company != null ?  userData.data.employees.vendors[0].company.logo != null ?   userData.data.employees.vendors[0].company.logo['512px'] : '/assests/assets/avatar.png' : '/assests/assets/avatar.png' } />
                  </Avatar>
                </StyledBadge>
                            </Grid>
                           <Grid item xs={4} md={4}>
                        <span>{userData.data.employees.vendors[0].company != null ? userData.data.employees.vendors[0].company.name.value :  userData.data.employees.vendors[0].email}</span>
                           </Grid>
                           <Grid item xs={4} md={4}>
                  {
                    <Link to={`/home/contractor/${ userData.data.employees.vendors[0].id}`} className='btn btn-warning ViewLink'>{t('view')}</Link>
                  }
                </Grid>
                               
                           <div>
                           </div>
                                </Grid>
                              </div>
                              <div>

                              <Grid container className='mt-4 d-flex justify-content-between align-items-center' >
                             <Grid item xs={4} md={4}>
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                    className='cursor'
                    onClick={()=>{
                     document.getElementById('imgView').style.display = 'flex'
                     document.getElementById('myImg').src = document.getElementById('avatar15').src
                   }}
                    >
                <Avatar >
                  <img alt="Company Logo" id='avatar15' src={ userData.data.employees.vendors[1].company != null ?  userData.data.employees.vendors[1].company.logo != null ?   userData.data.employees.vendors[1].company.logo['512px'] : '/assests/assets/avatar.png' : '/assests/assets/avatar.png' }/>
                  </Avatar>
                </StyledBadge>
                            </Grid>
                           <Grid item xs={4} md={4}>
                        <span>{ userData.data.employees.vendors[1].company != null ? userData.data.employees.vendors[1].company.name.value :  userData.data.employees.vendors[1].email}</span>
                           </Grid>
                           <Grid item xs={4} md={4}>
                  {
                    <Link to={`/home/contractor/${ userData.data.employees.vendors[1].id}`} className='btn btn-warning ViewLink'>{t('view')}</Link>
                  }
                </Grid>
                               
                           <div>
                           </div>
                                </Grid>
                              </div>
                              </>
                              
                              : 
                              
                              <div>

                              <div container className='mt-4 d-flex justify-content-between align-items-center' >
                             <div>
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                    className='cursor'
                    onClick={()=>{
                     document.getElementById('imgView').style.display = 'flex'
                     document.getElementById('myImg').src = document.getElementById('avatar16').src
                   }}
                    >
                <Avatar >
                  <img id='avatar16' width="100%"  alt="Company Logo" src={ userData.data.employees.vendors[0].company != null ?  userData.data.employees.vendors[0].company.logo != null ?   userData.data.employees.vendors[0].company.logo['512px'] : '/assests/assets/avatar.png' : '/assests/assets/avatar.png' }/>
                  </Avatar>
                </StyledBadge>
                            </div>
                           <div className='flex-special'>
                        <span>{userData.data.employees.vendors[0].company != null ? userData.data.employees.vendors[0].company.name.value :  userData.data.employees.vendors[0].email}</span>
                           </div>
                           <div>
                  {
                    <Link to={`/home/contractor/${ userData.data.employees.vendors[0].id}`} className='btn btn-warning ViewLink'>{t('view')}</Link>
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
                            
                  ) : loaderteam == true ? <CircularProgress color='inherit' />  : ''
                
             
          : loaderteam == true ? <CircularProgress color='inherit' />  : ''
        }

        <div className='img-display' id='vendorsView'>

{
  userData != null ? vendorLength == 0 ? '' ||  userData.data.employees == null :  
        
          userData != null ? (
            userData.data.employees == null ? '' : 
                     <>
                     <Card className='mt-3 specialWidth h-50 overflowAuto '>
                            <CardContent className='text-center p-3'>
                      <div className='d-flex justify-content-between align-items-center mainColor' >
                           </div>
                           <div className='inputView rounded'>
                        <IconContext.Provider value={{color : '#45C0BE', size: '30px'}}>
                       <CiSearch />
                       </IconContext.Provider>
                    <input type='text' placeholder={t('Search')} className='border-0 outline-0 ps-3 searchinIput'  onChange={(e)=>searchVendors(e.target.value)} /> 
                               </div>
                            {userData.data.employees.vendors.map(e => {
                                return(
                                    <div key={e.id}>
                                    <Grid container className='mt-4 d-flex justify-content-between align-items-center' id={e.id}>
                                   <Grid item xs={4} md={4}>
                        <StyledBadge
                          overlap="circular"
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                          variant="dot"
                          className='cursor'
                          >
                      <Avatar >
                        <img width="100%" alt="Company Logo" src={e.company != null ? e.company.logo != null ?  e.company.logo['512px'] : '/assests/assets/avatar.png' : '/assests/assets/avatar.png' }                           
                        onClick={(e)=>{
                           document.getElementById('imgView').style.display = 'flex'
                           document.getElementById('myImg').src = e.target.src
                         }}/>
                        </Avatar>
                      </StyledBadge>
                                  </Grid>
                                 <Grid item xs={4} md={4} className='flex-special'>
                              <span>{e.company != null ? e.company.name.value : e.email}</span>
                                 </Grid>
                                 <Grid item xs={4} md={4}>
                        {
                        e.state != "joined" ? <div className='text-danger'>{e.state} </div> : <Link to={`/home/contractor/${e.id}`} className='btn btn-warning ViewLink' onClick={()=>document.getElementById('vendorsView').style.display = 'none'}>{t('view')}</Link>
                        }
                      </Grid>
                                      </Grid>
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
    <div className='img-display' id='imgView'>
        <img src='/assests/assets/avatar.png'  width="15%" id='myImg'/>
        <Button variant="contained"  onClick={()=>document.getElementById('imgView').style.display = "none"} className="mt-3 mainBg">{t('cancel')}</Button>
    </div>
   </div>
  )
}
