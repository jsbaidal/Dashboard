import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 
import Indicator from './Indicator';
import Summary from './Summary';
import BasicTable from './BasicTable';
import WeatherChart from './WeatherChart';
import ControlPanel from './ControlPanel';


function App() {
  const [count, setCount] = useState(0)

  return (
    <><Grid container spacing={5}>
      <Grid xs={12} sm={4} md={3} lg={2}>1</Grid>
      <Grid xs={6} sm={4} md={3} lg={2}>2</Grid>
      <Grid xs={6} sm={4} md={3} lg={2}>3</Grid>
      <Grid xs={12} sm={4} md={3} lg={2}>4</Grid>
      <Grid xs={6} sm={4} md={6} lg={2}>5</Grid>
      <Grid xs={6} sm={4} md={6} lg={2}>6</Grid>
      <ControlPanel />

      <Summary></Summary>
      <BasicTable />


      <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />

    </Grid><Grid xs={12} lg={10}>
        <WeatherChart></WeatherChart>
      </Grid></>
        
  )
}

export default App
