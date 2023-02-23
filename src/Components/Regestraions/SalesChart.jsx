import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
  import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
  import { styled } from '@mui/material/styles';
import { Button, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { homedata } from '../../Store/HomeData/HomeData';
import { useContext } from 'react';
import { useLayoutEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

  

export default function SalesChart() {

    let {t} = useTranslation()

  let { loader , salesagentsData , salesDatas , from, setFrom ,to, setTo } = useContext(homedata)





  var today = new Date();
  var yyyy = today.getFullYear();

  useLayoutEffect(() => {
    salesagentsData(from , to , 7)
  }, [])

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
  );
  
   const options = {
    responsive: true,
    plugins: {
        legend: {
          display: false
        },
      },
      scales:{
        x: {
            grid: {
              display: false
            },
            beginAtZero: false,
            ticks: {
              color: "black",
            }
          },
          y: {
            grid: {
              display: false,
            },
            beginAtZero: true,
            ticks: {
              color: "black",
            }
          }
        ,
      },
      maintainAspectRatio: false ,
      
  };
  
  const labels = [ t('January'), t('February'), t('March'), t('April'), t('May'), t('June'), t('July') , t('Aug') , t('Sept') , t('Oct') , t('Nov') , t('Dec')];



   const data = 

   {
    labels,
    datasets: 
    salesDatas != null ? 
    [
      {
        fill: true,
        label: salesDatas.type,
        data: [salesDatas.chart.January , salesDatas.chart.February , salesDatas.chart.March  ,salesDatas.chart.April  , salesDatas.chart.May  , salesDatas.chart.June  , salesDatas.chart.July  , salesDatas.chart.August  , salesDatas.chart.September  , salesDatas.chart.October , salesDatas.chart.November  ,salesDatas.chart.December ],
        borderColor: '#45C0BE',
        backgroundColor: 'rgb(69, 192, 190)',
        borderRadius: Number.MAX_VALUE,
      },
    ] : '',
   };



  return (
    <div >
        <Card sx={{padding : '10px' ,height : '500px'}} >
        <h2 style={{color : '#45C0BE'}}>{t('Sales')}</h2>
            <div className='d-flex align-items-center justify-content-center h-75 mt-3'>
          {     
                salesDatas != null ?  <Bar options={options} data={data} width="100%" height="100%" /> : loader == true ? <CircularProgress color='inherit'/>  : 'Error Happend'
          } 
          </div>
         
        </Card>
    </div>
  )
}
