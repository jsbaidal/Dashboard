// src/components/Indicator.tsx
import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

interface IndicatorProps {
    title?: string;
    subtitle?: string;
    value: number;
}

export default function Indicator({ title, subtitle, value }: IndicatorProps) {
    return (
        <Paper
            sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: 3,
                borderRadius: 2,
                bgcolor: '#ffffff',  // Fondo blanco para el Paper
                border: '1px solid #ddd',  // Borde gris claro
            }}
        >
            {/* Título del indicador */}
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                {title}
            </Typography>
            {/* Valor del indicador */}
            <Typography component="p" variant="h4" sx={{ mb: 1, fontWeight: 500 }}>
                {value.toString()}
            </Typography>
            {/* Subtítulo del indicador */}
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                {subtitle}
            </Typography>
        </Paper>
    );
}

