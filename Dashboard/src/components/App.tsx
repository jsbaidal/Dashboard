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
import { useEffect } from 'react';


function App() {
  const [count, setCount] = useState(0)

  const [indicators, setIndicators] = useState<JSX.Element[]>([]);

  useEffect(() => {
    // Función asíncrona para obtener datos de la API
    const fetchWeatherData = async () => {
      try {
        const API_KEY = "AQUÍ VA SU API KEY DE OPENWEATHERMAP";
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`);
        const savedTextXML = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(savedTextXML, "application/xml");

        let dataToIndicators: [string, string, string][] = [];

        // Análisis, extracción y almacenamiento del contenido del XML en el arreglo de resultados
        const location = xml.getElementsByTagName("location")[0];

        const geobaseid = location.getAttribute("geobaseid") || "";
        dataToIndicators.push(["Location", "geobaseid", geobaseid]);

        const latitude = location.getAttribute("latitude") || "";
        dataToIndicators.push(["Location", "Latitude", latitude]);

        const longitude = location.getAttribute("longitude") || "";
        dataToIndicators.push(["Location", "Longitude", longitude]);

        // Crear los elementos de Indicator a partir de los datos
        const indicatorsElements = dataToIndicators.map((element, index) => (
          <Indicator key={index} title={element[0]} subtitle={element[1]} value={Number(element[2])} />
        ));

        setIndicators(indicatorsElements);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, []);


  return (
    <><Grid container spacing={5}>
      <Grid xs={12} sm={4} md={3} lg={2}>1
      {indicators[0]}
      </Grid>
      <Grid xs={6} sm={4} md={3} lg={2}>2
      {indicators[1]}

      </Grid>
      <Grid xs={6} sm={4} md={3} lg={2}>3
      {indicators[2]}

      </Grid>
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
