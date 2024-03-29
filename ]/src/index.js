require('dotenv').config(); // Carga las variables de entorno al inicio
const express = require('express');
const pingRoute = require('./routes/pingRoute');
const authRoutes = require('./routes/authRoutes');
const doorDesignRoutes = require('./routes/doorDesignRoutes');
const designRoutes = require('./routes/designRoutes');
const connectToDatabase = require('./services/database'); // Corrección de la ruta

const app = express();
const PORT = process.env.PORT || 3000; // Uso de PORT desde .env con fallback a 3000

app.use(express.json());

// Inicializar la conexión a la base de datos
connectToDatabase().then(() => {
    console.log('Database connection established');
}).catch(error => {
    console.error('Database connection error:', error.message, error.stack);
});

// Rutas
app.use('/api', pingRoute);
app.use('/api/auth', authRoutes);
app.use('/api/designs', doorDesignRoutes);
app.use('/api/designs/recommendations', designRoutes);

// Escuchar en el puerto especificado
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Manejo de errores para rutas no encontradas
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

// Manejador de errores
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    console.error(`Error: ${error.message}, Stack: ${error.stack}`);
    res.json({
        error: {
            message: error.message
        }
    });
});
