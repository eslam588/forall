import React, { useContext, useEffect, useLayoutEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { homedata } from '../../Store/HomeData/HomeData';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';
import { BarElement } from 'chart.js';



export default function Dashboard() {

  let {salesData , loader , sales , from ,to} = useContext(homedata)

  let {t} = useTranslation() 


  var today = new Date();
  var yyyy = today.getFullYear();

  useLayoutEffect(() => {
    if(localStorage.getItem('id') == null){  
    salesData(sessionStorage.getItem('id') , from , to)
    }else{
    salesData(localStorage.getItem('id') , from , to)
    }
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
        sales != null ? 
        [
          {
            fill: true,
            label: t('Regestrations'),
            data: [ sales.chart.January , sales.chart.February , sales.chart.March  ,sales.chart.April  , sales.chart.May  , sales.chart.June  , sales.chart.July  , sales.chart.August  , sales.chart.September  , sales.chart.October , sales.chart.November  ,sales.chart.December ],
            borderColor: '#45C0BE',
            backgroundColor: 'rgb(69, 192, 190)',
            borderRadius: Number.MAX_VALUE,
          },
        ] : '',
       };


  return (
        <div>
            <Card sx={{padding : '20px' , boxShadow : '0px 3px 6px #00000033',height : '500px'}}>
                <h2 style={{color : '#45C0BE'}}>{t('Regestrations')}</h2>
                <div className='d-flex align-items-center justify-content-center h-75 mt-3'>
                {     
                  sales != null ?   <Bar options={options} data={data} width="100%" height="100%" /> : loader == true ? <CircularProgress color='inherit'/>  : 'Error Happend' 
                } 
              </div>
            </Card>
        </div>
  )
}
