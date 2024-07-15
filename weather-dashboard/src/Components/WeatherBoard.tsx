// src/Components/WeatherBoard.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title } from 'chart.js';
import './weatherDashboard.css';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title);

interface WeatherData {
    from: string;
    to: string;
    symbol: {
        name: string;
    };
    temperature: {
        value: number;
    };
    feels_like: {
        value: number;
    };
    humidity: {
        value: number;
    };
}

const WeatherBoard: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
    const [city, setCity] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [timezone, setTimezone] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast?q=London&mode=xml&appid=85c4645ccacee638962f8b43bacfb38f');
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(response.data, 'application/xml');

                const cityName = xmlDoc.getElementsByTagName('city')[0]?.getAttribute('name') || '';
                const countryName = xmlDoc.getElementsByTagName('country')[0]?.textContent || '';
                const timeZone = xmlDoc.getElementsByTagName('city')[0]?.getElementsByTagName('timezone')[0]?.getAttribute('name') || '';

                setCity(cityName);
                setCountry(countryName);
                setTimezone(timeZone);

                const times = xmlDoc.getElementsByTagName('time');
                const data: WeatherData[] = Array.from(times).map(time => ({
                    from: time.getAttribute('from') || '',
                    to: time.getAttribute('to') || '',
                    symbol: { name: time.getElementsByTagName('symbol')[0]?.getAttribute('name') || '' },
                    temperature: { value: parseFloat(time.getElementsByTagName('temperature')[0]?.getAttribute('value') || '0') },
                    feels_like: { value: parseFloat(time.getElementsByTagName('feels_like')[0]?.getAttribute('value') || '0') },
                    humidity: { value: parseFloat(time.getElementsByTagName('humidity')[0]?.getAttribute('value') || '0') }
                }));
                setWeatherData(data);
            } catch (error) {
                setError('Error al obtener los datos del clima');
            }
        };

        fetchWeatherData();
    }, []);

    const temperatures = weatherData.map(data => data.temperature.value - 273.15);
    const feelsLike = weatherData.map(data => data.feels_like.value - 273.15);
    const humidity = weatherData.map(data => data.humidity.value);
    const labels = weatherData.map(data => data.from);
    const maxTemperature = Math.max(...temperatures);
    const averageTemperature = temperatures.reduce((acc, temp) => acc + temp, 0) / temperatures.length;

    const data = {
        labels,
        datasets: [
            {
                label: 'Temperatura (°C)',
                data: temperatures,
                borderColor: 'rgba(255, 99, 132, 0.5)',
                backgroundColor: 'rgba(255, 99, 132, 0.1)',
                borderWidth: 2,
            },
            {
                label: 'Sensación Térmica (°C)',
                data: feelsLike,
                borderColor: 'rgba(54, 162, 235, 0.5)',
                backgroundColor: 'rgba(54, 162, 235, 0.1)',
                borderWidth: 2,
            }
        ]
    };

    return (
        <div className="weather-board">
            <header className="header">
                <h1>Dashboard del Clima</h1>
                {error && <p className="error">{error}</p>}
            </header>

            <section className="city-info">
                <h2>Información de la Ciudad</h2>
                <div className="info-container">
                    <div className="info-item">Ciudad: <strong>{city}</strong></div>
                    <div className="info-item">País: <strong>{country}</strong></div>
                    <div className="info-item">Zona Horaria: <strong>{timezone}</strong></div>
                </div>
            </section>

            <section className="temperature-info">
                <h2>Datos de Temperatura</h2>
                <div className="temperature-values">
                    <div className="temperature-item">
                        Temperatura Actual: <strong>{weatherData[0] ? (weatherData[0].temperature.value - 273.15).toFixed(2) + ' °C' : '-'}</strong>
                    </div>
                    <div className="temperature-item">
                        Temperatura Promedio: <strong>{averageTemperature.toFixed(2)} °C</strong>
                    </div>
                </div>
                <div className="max-temperature">
                    <strong>Temperatura Máxima: {maxTemperature.toFixed(2)} °C</strong>
                </div>
            </section>

            <section className="chart-container">
                <h2>Gráfico de Temperaturas</h2>
                <Line data={data} options={{
                    responsive: true,
                    plugins: {
                        legend: { position: 'top' },
                        title: { display: true, text: 'Variación de Temperatura' }
                    }
                }} />
            </section>

            <section className="table-container">
                <h2>Detalles del Clima</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Hora</th>
                            <th>Símbolo</th>
                            <th>Temperatura (°C)</th>
                            <th>Sensación Térmica (°C)</th>
                            <th>Humedad (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {weatherData.map((data, index) => (
                            <tr key={index}>
                                <td>{data.from} - {data.to}</td>
                                <td>{data.symbol.name}</td>
                                <td>{(data.temperature.value - 273.15).toFixed(2)}</td>
                                <td>{(data.feels_like.value - 273.15).toFixed(2)}</td>
                                <td>{data.humidity.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default WeatherBoard;
