import { number } from "joi"
import React, { createContext, useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import axios from "../Links/Urls"



export let myProfile = createContext()



export function ProfileData({children}){
    const [loader, setLoader] = useState(false);
    const [infoDetails, setInfoDetails] = useState(null);
    const [lang, setLang] = useState(null);
    const [pw, setPW] = useState(null);
    const [newPw, setNewPw] = useState(null);
    const [confirmNewPw, setConfirmNewPw] = useState(null);
    const [settingDatas, setSettingDatas] = useState(null);

    let navigate = useNavigate()
    

    async function myinfo(){
        setLoader(true)
        let res = await axios(`/auth/api/my-info`,{
            headers : {
                Authorization : localStorage.getItem('token') == null ? `Bearer ${sessionStorage.getItem('token')}` : `Bearer ${localStorage.getItem('token')}`,
                lang : localStorage.getItem('Language')
            }
        }).then(res =>{
            setLoader(false)
            setInfoDetails(res.data.data)
            if(  localStorage.getItem('id') == null){
                if(res.data.data.company_branch== null){
                    sessionStorage.setItem('id' , res.data.data.company.id)
                }else{
                    sessionStorage.setItem('id' , res.data.data.company_branch.company.id)
                }
            }else{
                if(res.data.data.company_branch== null){
                    localStorage.setItem('id' , res.data.data.company.id)
                }else{
                    localStorage.setItem('id' , res.data.data.company_branch.company.id)
                }
               
            }
        }).catch(err=>{
            if(err.response.status == 401){
                localStorage.clear()
                sessionStorage.clear()
                navigate('/')
                toast.error('Kindly Log In Again')
            }
        })
    }


    async function Languages(){
        setLoader(true)
        let res = await axios.get(`/setting/api/languages`,{
            headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}`,
                lang : localStorage.getItem('Language')
            }  
        }).then(res =>{
            setLang(res.data)
        }).catch(err=>{
            if(err.response.status == 401){
                localStorage.clear()
                sessionStorage.clear()
                navigate('/')
                toast.error('Kindly Log In Again')
            }
        })
    }


    async function changePw(){
        if(pw != null && newPw != null && confirmNewPw != null){
            setLoader(true)
            let res = await axios.post(`/auth/api/change-password` , {
                current_password : pw ,
                password : newPw , 
                password_confirmation : confirmNewPw
            },{
                headers : {
                    Authorization : localStorage.getItem('token') == null ? `Bearer ${sessionStorage.getItem('token')}` : `Bearer ${localStorage.getItem('token')}`,
                    lang : localStorage.getItem('Language')
                } 
            }).then(res =>{
                setLoader(false)
                setPW(null)
                setNewPw(null)
                setConfirmNewPw(null)
                document.getElementById('pw').style.display = 'none'
                toast.success(res.data.message)
            }).catch(err =>{
                setLoader(false)
                setPW(null)
                setNewPw(null)
                setConfirmNewPw(null)
                toast.error(err.response.data.message)
                if(err.response.status == 401){
                    localStorage.clear()
                    sessionStorage.clear()
                    navigate('/')
                    toast.error('Kindly Log In Again')
                }
            }
            )
        }else{
            toast.error('Kinly enter the required fileds')
        }
       
    }

    async function settingData(){
        setLoader(true)
        let res = await axios(`/setting/api/settings` ,{
            headers : {
                Authorization : localStorage.getItem('token') == null ? `Bearer ${sessionStorage.getItem('token')}` : `Bearer ${localStorage.getItem('token')}`,
                lang : localStorage.getItem('Language')
            }
        }).then(res =>{
            setLoader(false)
            setSettingDatas(res.data.data[0])
        }).catch(err=>{
            if(err.response.status == 401){
                localStorage.clear()
                sessionStorage.clear()
                navigate('/')
                toast.error('Kindly Log In Again')
            }
        })
    }


    
      return(
        <myProfile.Provider value={{myinfo , infoDetails , loader , setInfoDetails , Languages , lang , setPW , setNewPw , setConfirmNewPw , changePw , settingData , settingDatas}}>
            {children}
        </myProfile.Provider>
    )

}

