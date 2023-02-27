import { number } from "joi"
import React, { createContext, useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import axios from "../Links/Urls"




export let teamData = createContext()


export function TeamsData({children}){
    const [loaderteam, setloaderteam] = useState(false);
    const [allDetails, setAllDetails] = useState(null);
    const [marketing, setMarketing] = useState(null);
    const [userData, setUserData] = useState(null);
    const [vendorLength, setVendorLength] = useState(null);
    const [userError, setUserError] = useState(null);
    const [errorData, setErrorData] = useState(null);
    const [agencyData, setAgencyData] = useState(null);

    let {t} = useTranslation()

    let navigate = useNavigate()
    
    
    //  mangers and agents data

    async function MangersAgentsData(e){
        setloaderteam(true)
        let res = await axios.get(`/operation/users?company_id=${localStorage.getItem('id') == null ? sessionStorage.getItem('id') : localStorage.getItem('id')}&type_id=${e}`,{
            headers : {
                Authorization : localStorage.getItem('token') == null ? `Bearer ${sessionStorage.getItem('token')}` : `Bearer ${localStorage.getItem('token')}`,
                lang : localStorage.getItem('Language')
            }
        }).then(res =>{
            setloaderteam(false)
            setMarketing(res.data)
        }).catch(err=>{
            setloaderteam(false)
            if(err.response.status != 201 && err.response.status == 500){
                setloaderteam(false)
                setErrorData(t('updates'))
                setUserError(t('updates'))
            }else  if(err.response.status == 401){
                localStorage.clear()
                sessionStorage.clear()
                navigate('/')
                toast.error('Kindly Log In Again')
            }else{
                setUserError(t('userAvail'))
            }  
           })
    }


    // get specifec user 

    async function getUserData(vendorId,userrId){
        console.log(vendorId);
        console.log(userrId);
        setUserError(null)
        setErrorData(null)
        setloaderteam(true)
        setUserData(null)
        let res = await axios.get(`/operation/subscribe?id=${vendorId}&user_id=${userrId}`,{
            headers : {
                Authorization : localStorage.getItem('token') == null ? `Bearer ${sessionStorage.getItem('token')}` : `Bearer ${localStorage.getItem('token')}`,
                lang : localStorage.getItem('Language')
            }
        }).then(res =>{
           setUserData(res.data)
           setloaderteam(false)
           setVendorLength(res.data.data.employees.vendors.length)
        }).catch(err =>{ 
            setloaderteam(false)
                if(err.response?.status != 201 && err.response?.status == 500){
                    setloaderteam(false)
                    setErrorData(t('updates'))
                    setUserError(t('updates'))
                }else if(err.response?.status == 401){
                    localStorage.clear()
                    sessionStorage.clear()
                    navigate('/')
                    toast.error('Kindly Log In Again')
                }else{
                    setUserError(t('userAvail'))
                }
            })
    }

    // agency data
    async function getAgencyData(e ){
        setloaderteam(true)
        setUserData(null)
        let res = await axios.get(`/operation/subscribe?id=${e}`,{
            headers : {
                Authorization : localStorage.getItem('token') == null ? `Bearer ${sessionStorage.getItem('token')}` : `Bearer ${localStorage.getItem('token')}`,
                lang : localStorage.getItem('Language')
            }
        }).then(res =>{
           setloaderteam(false)
           setAgencyData(res.data)
        }).catch(err =>{ 
            setloaderteam(false)
                if(err.response.status != 201 && err.response.status == 500){
                    setloaderteam(false)
                    setErrorData(t('updates'))
                    setUserError(t('updates'))
                }else  if(err.response.status == 401){
                    localStorage.clear()
                    sessionStorage.clear()
                    navigate('/')
                    toast.error('Kindly Log In Again')
                }else{
                    setUserError(t('userAvail'))
                }
            })
    }

    
      return(
        <teamData.Provider value={{agencyData,setAgencyData,errorData,allDetails,loaderteam,MangersAgentsData,marketing , setMarketing , getUserData , userData , setUserData , setUserError ,vendorLength , userError , getAgencyData,setloaderteam}}>
            {children}
        </teamData.Provider>
    )

}

