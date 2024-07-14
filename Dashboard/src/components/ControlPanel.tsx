// src/components/ControlPanel.tsx
import React, { useRef, useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function ControlPanel() {
    // Datos de los elementos del Select
    const items = [
        {
            name: "Precipitación",
            description: "Cantidad de agua, en forma de lluvia, nieve o granizo, que cae sobre una superficie en un período específico."
        },
        {
            name: "Humedad",
            description: "Cantidad de vapor de agua presente en el aire, generalmente expresada como un porcentaje."
        },
        {
            name: "Nubosidad",
            description: "Grado de cobertura del cielo por nubes, afectando la visibilidad y la cantidad de luz solar recibida."
        }
    ];

    // Variable de estado y función de actualización
    const [selected, setSelected] = useState<number>(-1);

    // Ref para la descripción
    const descriptionRef = useRef<HTMLDivElement>(null);

    // Función para manejar el cambio en el select
    const handleChange = (event: SelectChangeEvent<string>) => {
        // Obtiene el índice de la variable seleccionada
        const idx = parseInt(event.target.value);
        setSelected(idx);  // Actualiza el estado con el índice seleccionado
        if (descriptionRef.current) {
            descriptionRef.current.innerHTML = (idx >= 0) ? items[idx].description : "";
        }
    };

    // Opciones del Select
    const options = items.map((item, key) => (
        <MenuItem key={key} value={key.toString()}>
            {item.name}
        </MenuItem>
    ));

    return (
        <Paper
            sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: 3,
                borderRadius: 2,
                bgcolor: '#f5f5f5',  // Fondo gris claro para el Paper
                border: '1px solid #ddd',  // Borde gris claro
            }}
        >
            <Typography mb={2} component="h3" variant="h6" color="primary">
                Variables Meteorológicas
            </Typography>

            <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth>
                    <InputLabel id="simple-select-label">Variables</InputLabel>
                    <Select
                        labelId="simple-select-label"
                        id="simple-select"
                        value={selected.toString()}  // Convierte el índice a string
                        label="Variables"
                        onChange={handleChange}
                    >
                        <MenuItem value="-1" disabled>
                            Seleccione una variable
                        </MenuItem>
                        {options}
                    </Select>
                </FormControl>
            </Box>

            {/* Muestra la descripción de la variable seleccionada */}
            <Typography mt={2} component="p" color="text.secondary">
                <div ref={descriptionRef}>
                    {/* Descripción se actualiza dinámicamente */}
                </div>
            </Typography>
        </Paper>
    );
}
