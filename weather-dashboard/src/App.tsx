// src/App.tsx

import React from 'react';
import WeatherBoard from './Components/WeatherBoard'; // Usa WeatherBoard con B mayúscula

const App: React.FC = () => {
    return (
        <div className="App">
            <WeatherBoard />
        </div>
    );
};

export default App;
