import React, { useContext, useEffect } from 'react'
import {MdOutlineSpaceDashboard} from "react-icons/md"
import {HiOutlineUserGroup} from "react-icons/hi"
import {ImUsers} from "react-icons/im"
import {IconContext} from 'react-icons'
import { useState } from 'react'
import {CiSearch} from "react-icons/ci"
import {MdLogout} from "react-icons/md"
import {AiFillSetting , AiFillCaretRight,AiFillCaretDown} from "react-icons/ai"
import {FaUserAlt} from "react-icons/fa"
import {BiLogOut} from "react-icons/bi"
import {FaLanguage} from "react-icons/fa"
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { siginInStore } from '../../Store/signInData/SigninStore'
import CircularProgress from '@mui/material/CircularProgress';
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import { teamData } from '../../Store/Teams/Teams'
import { myProfile } from '../../Store/ProfileData/profileData'



export default function Home() {

  let navigate = useNavigate()

  let {logout , loader , searchByUser , singleUser , setSingleUser,setUserError} = useContext(siginInStore)
  let {setloaderteam} = useContext(teamData);
  let { Languages , lang } = useContext(myProfile)
  let {getUserData,setUserData,setErrorData} = useContext(teamData)


  let {t} = useTranslation()
  let body = document.getElementById('body')


    useEffect(() => {
      Languages()
      body.addEventListener('click' , ()=>{
        setSingleUser(null)
      })
      if(localStorage.getItem('Language') == null){
      i18next.changeLanguage(sessionStorage.getItem('Language'))
      }else{
        i18next.changeLanguage(localStorage.getItem('Language'))
      }
      if(localStorage.getItem('Language') == 'ar' || localStorage.getItem('Language') == 'fa' || sessionStorage.getItem('Language') == 'ar' || sessionStorage.getItem('Language') == 'fa'  ){
        document.getElementById('body').style.direction = "rtl"
      }else{
        document.getElementById('body').style.direction = "ltr"
      }
     if(sessionStorage.getItem('token') == null && localStorage.getItem('token') == null){
      navigate('/')
     }
    }, [])
    
   let [down , setDown] = useState(false)
   
   let handelloadingornotfound = async () => {
    setUserData(null)
    setloaderteam(true)
    await setTimeout(() => {
      setloaderteam(false)
    },1000)
   }
   
  

  return (
    <div>
    <div className="menu-wrapper">
        <div className="sidebar-header">
            <div className="sideBar">
                <div className='d-flex justify-content-center align-items-center gap-3 bg-header'><img src="/assests/assets/Logo.svg" /></div>
                <ul
                onClick={(e)=>{
                    
                    let li =Array.from(document.querySelectorAll('li'))
                    let sideBar = document.querySelector(".sideBar")
                    sideBar.classList.remove('showMenu')
                    li.map(e=>{
                        e.classList.remove('selected')   
                        e.classList.remove('selected')  
                       e.classList.remove('text-white')  
                    }
                    )  
                    e.target.classList.add('selected')  
                    e.target.classList.add('text-white')   
                }}
                className='mt-5'
                >
                  <Link to='/home/dashboard' className='link'  onClick={()=>{
                    setDown(false)}} >
                  <li className="selected d-flex justify-content-center align-items-center gap-3" id="Dashboard"   >
                        <IconContext.Provider value={{ size: '20px'}}>
                        <MdOutlineSpaceDashboard />
                        </IconContext.Provider>
                        {t('Dashboard')}</li>
                  </Link>
                  <Link to='/home/contractors' className='link' onClick={()=>setDown(false)}>
                    <li className='d-flex justify-content-center align-items-center gap-3' id="Contractors"><ImUsers />{t('Contractors')}</li>
                  </Link>
                  <Link to='/home/GM' className='link'>
                  <li className='d-flex justify-content-center align-items-center gap-4 link' id="Roles" ><HiOutlineUserGroup />{t('manger')}</li> 
                  </Link>
                    {/* <li className='d-flex justify-content-center align-items-center gap-4 link' id="Roles" onClick={()=>setDown(true)}><HiOutlineUserGroup />{t('Roles')} {down == false ? <AiFillCaretRight /> : <AiFillCaretDown /> }</li> */}
                </ul>  
                {/* <div className={down == true ? 'd-flex flex-column ps-5 text-start' : 'd-none'} >
                <Link to='/home/GM' className='link' onClick={()=>setDown(false)}>{t('manger')}</Link>
                </div> */}

                <span className="cross-icon" 
                onClick={()=>{
                    let sideBar = document.querySelector(".sideBar")
                    let backdrop = document.querySelector(".backdrop")
                    sideBar.classList.remove("showMenu")
                    backdrop.classList.remove("showBackdrop")
                }}
                ><i className="fas fa-times"></i></span>
            </div>
            <div className="backdrop" onClick={()=>{
                  let sideBar = document.querySelector(".sideBar")
                  let backdrop = document.querySelector(".backdrop")
                  sideBar.classList.remove("showMenu")
                  backdrop.classList.remove("showBackdrop")
            }}></div>
            <div className="content">
                <header className={localStorage.getItem('Language') == "ar" || sessionStorage.getItem('Language') == "ar" ? 'headerbgar' : 'headerbg'}>
                    <div className="menu-button" id='desktop' onClick={()=>{
                        let sideBar = document.querySelector(".sideBar")
                        sideBar.classList.toggle('widthChange')
                    }}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className="menu-button" id='mobile' onClick={()=>{
                        let sideBar = document.querySelector(".sideBar")
                        sideBar.classList.add("showMenu")
                        sideBar.classList.remove("widthChange")

                    }}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    {/* <div className='bg-white p-2 rounded searchBar' >
                    <IconContext.Provider value={{color : '#45C0BE', size: '30px'}}>
                       <CiSearch/>
                    </IconContext.Provider>
                    <input type='number' min="1" placeholder={t('Search')} className='border-0 outline-0 ps-3 searching' onChange={(e)=>{
                      searchByUser(e.target.value)
                      
                      }} /> 
                    {
                      singleUser != null ?
                      singleUser == 'loading' ?<div className='searchResult d-flex justify-content-center align-items-center p-3'><CircularProgress color='inherit'/> </div> :
                      singleUser.status == "success" ? 
                    <div className='searchResult d-flex justify-content-center align-items-center  cursor' id='searchbar'>
                      {
                        singleUser.data.name == undefined ? <div className='p-3 text-center'>No Result Founds</div> : 
                    <Link to={`/home/userView/${singleUser?.data.id}/${singleUser?.data.company != null ? singleUser.data.company?.id : singleUser?.data.company_branch != null ? singleUser?.data.company_branch.company.id : 111}`} className='d-flex justify-content-center align-items-center gap-5 p-4 cursor link w-100' onClick={()=>
                    { 
                        (singleUser?.data.company?.id == (localStorage.getItem('id') || sessionStorage.getItem('id')) || singleUser?.data?.company_branch?.company?.id== (localStorage.getItem('id') || sessionStorage.getItem('id')))  ? getUserData(singleUser?.data?.company?.id || singleUser?.data?.company_branch?.company?.id,singleUser.data?.id) : handelloadingornotfound()
                        
                    }}>
                    <h6 className='m-0'>{singleUser.data.name}</h6>
                    <img src={singleUser.data.image == null ? '/assests/assets/avatar.png' : singleUser.data.image["512px"]} className='imgSearchView'/>
                    </Link>
                      }
                    
                    </div>  : <div className='searchResult p-3 text-center'>No Result Found</div>
                      : ''
                    }
                    
                    </div> */}

                    <div className='text-white gap-3 desktopHeader'>
                    <h3>{t('Welcome')} {localStorage.getItem('Name') == null ? sessionStorage.getItem('Name') : localStorage.getItem('Name')}</h3>
                    <div className='d-flex gap-1 align-items-center'>
                    <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic" className='setting'> 
                    <IconContext.Provider value={{ size: '35px'}}>
                      <AiFillSetting />
                    </IconContext.Provider>
                    </Dropdown.Toggle>
                     <Dropdown.Menu className='dropshowme'>
                      <Link to="/home/profile" className='link d-flex justify-content-around p-1'>
                        <IconContext.Provider value={{color : '#45c0be' , size : '20px'}}>
                        <FaUserAlt /> 
                        </IconContext.Provider>
                       <div>{t('profile')}</div>
                      </Link>
                  </Dropdown.Menu>
                 </Dropdown>
                 <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic" className='setting'> 
                    <IconContext.Provider value={{ size: '35px' , color : 'white'}}>
                      <FaLanguage />
                    </IconContext.Provider>
                      </Dropdown.Toggle>
                      <Dropdown.Menu className='dropshowme'>
                        {
                            lang != null ? 
                            lang.data.map(e=>{
                                return(
                        <Dropdown.Item  key={e.id} onClick={()=>{
                          i18next.changeLanguage(e.symbols)
                          localStorage.setItem('Language' , e.symbols)
                          sessionStorage.setItem('Language' , e.symbols)
                          Languages()
                          if(e.symbols == "ar"){
                            document.getElementById('body').style.direction = "rtl"
                          }else{
                            document.getElementById('body').style.direction = "ltr"
                          }
                        }}>{e. name_values.value}</Dropdown.Item>
                                )
                            })
                            : ''
                        }
                  </Dropdown.Menu>
                 </Dropdown>
                    </div>
                    <div style={{cursor : 'pointer'}} onClick={logout}>
                      {
                        loader == false ? (
                          localStorage.getItem('Language') == "ar" ? 
                          <IconContext.Provider value={{ size: '35px'}} > 
                          <BiLogOut />
                         </IconContext.Provider>
                          :
                          <IconContext.Provider value={{ size: '35px'}} > 
                          <MdLogout />
                         </IconContext.Provider>
                        ) : (
                          <CircularProgress color='inherit'/>
                        )
                      }
                   
                    </div>
                    </div>
                    <div className='mobileHeader'>
                    <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic" className='setting'> 
                    <IconContext.Provider value={{ size: '35px' , color : 'white'}}>
                      <FaLanguage />
                    </IconContext.Provider>
                      </Dropdown.Toggle>
                      <Dropdown.Menu className='dropshowme'>
                        {
                            lang != null ? 
                            lang.data.map(e=>{
                                return(
                        <Dropdown.Item  key={e.id} onClick={()=>{
                          i18next.changeLanguage(e.symbols)
                          localStorage.setItem('Language' , e.symbols)
                          sessionStorage.setItem('Language' , e.symbols)
                          Languages()
                          if(e.symbols == "ar"){
                            document.getElementById('body').style.direction = "rtl"
                          }else{
                            document.getElementById('body').style.direction = "ltr"
                          }
                        }}>{e. name_values.value}</Dropdown.Item>
                                )
                            })
                            : ''
                        }
                  </Dropdown.Menu>
                 </Dropdown>
                    <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic" className='setting'> 
                    <IconContext.Provider value={{ size: '35px'}}>
                      <FaUserAlt />
                    </IconContext.Provider>
                      </Dropdown.Toggle>
                     <Dropdown.Menu className='mobile'>
                    <h6>{t('Welcome')} {localStorage.getItem('Name') == null ? sessionStorage.getItem('Name') : localStorage.getItem('Name')}</h6>
                    <Link to="/home/profile" className='link d-flex justify-content-center gap-2 p-1'>
                        <IconContext.Provider value={{color : '#45c0be' , size : '20px'}}>
                        <FaUserAlt /> 
                        </IconContext.Provider>
                       <div>{t('profile')}</div>
                      </Link>
                      <div to="/home/profile" className='link d-flex justify-content-center gap-2 p-1' onClick={logout}>
                      {
                        loader == false ? (
                          localStorage.getItem('Language') == "ar" ? 
                          <IconContext.Provider value={{ size: '20px' , color : '#45c0be' }} >
                          <BiLogOut />
                         </IconContext.Provider>
                          :
                          <IconContext.Provider value={{ size: '20px' , color : '#45c0be' }} > 
                          <MdLogout />
                         </IconContext.Provider>
                        ) : (
                          <CircularProgress color='inherit'/>
                        )
                      }
                       <div>{t('Logout')}</div>
                      </div>
                     </Dropdown.Menu>
                  </Dropdown>
                    </div>
                </header>
                <div className="content-data" onClick={()=>{
                   let sideBar = document.querySelector(".sideBar")
                   sideBar.classList.remove('showMenu')
                }}>
                    <Outlet />
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}
