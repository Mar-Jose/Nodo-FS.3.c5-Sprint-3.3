import express from 'express';
import { connectDB } from './config/dbConfig.mjs';
import superHeroRoutes from './routes/superHeroRoutes.mjs';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configura EJS como el DIRECTORIO de vistas en Extress. Sprint 3. tp 3.
app.set('views', path.join(__dirname, 'views'));
// Configura EJS como el motor de vistas en Extress. Sprint 3. tp 3. Etapa 2. Requerimiento 1.
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));

// Middleware para parsear JSON:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Conexión a MongoDB:
connectDB();

// Configuración de rutas:
app.use('/api', superHeroRoutes);

// Manejo de errores para rutas no encontradas:

 app.use((req, res) => {
   const mensaje = 'Ruta no encontrada';
    if (req.accepts('html')) {
        return res.status(404).render('error', { mensaje });
     }
     res.status(404).json({ estado: 'error', mensaje });
 });
// Manejo de errores globales:

     app.use((err, req, res, next) => {
    console.error(err.stack); // Siempre loguea el error para debug

     const status = err.status || 500;
     const mensaje = err.message || 'Error interno del servidor';

     // Si la petición viene de una herramienta como Postman o es una API
     if (req.originalUrl.startsWith('/api') || !req.accepts('html')) {
         return res.status(status).json({ estado: 'error', mensaje });
     }
 
    res.status(status).render('error', { mensaje, status }, (renderErr, html) => { // Intento renderizar la vista, si falla, envío texto plano
         if (renderErr) {
//             // Si incluso el archivo error.ejs falta, no caemos en un bucle
             return res.status(status).send(`Error: ${mensaje}`);
         }
         res.send(html);
     });
 });


// Iniciar el servidor:
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
