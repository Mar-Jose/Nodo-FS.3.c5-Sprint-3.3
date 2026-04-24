import express from 'express';
import { connectDB } from './config/dbConfig.mjs';
import superHeroRoutes from './routes/superHeroRoutes.mjs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Configura EJS como el motor de vistas en Extress. Sprint 3. tp 3. Etapa 2. Requerimiento 1.
app.set('view engine', 'ejs');
// Configura EJS como el DIRECTORIO de vistas en Extress. Sprint 3. tp 3.
app.set('views', path.join(__dirname, 'views'));



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
    // las 3 líneas siguientes son nuevas
    if (req.accepts('html')) {
        return res.status(404).render('404');
    }
    res.status(404).send({ mensaje: 'Ruta no encontrada' });
});

// Iniciar el servidor:
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
