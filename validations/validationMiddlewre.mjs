// Sprint 3 tp 2.

import { validationResult } from 'express-validator';

/**
 * Middleware de validación genérico
 * Detecta automáticamente si es API (JSON) o vista (HTML)
 * - Si es API: devuelve JSON
 * - Si es vista: renderiza HTML con errores
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    // Detectar si es una petición de API o de vista
    // Las vistas usan POST/PUT con formularios, las APIs usan JSON
    const esVista = req.headers['content-type']?.includes('application/x-www-form-urlencoded') 
                    && req.method === 'POST' || req.method === 'PUT';
    
    // Si es una ruta de vista (contiene '/editar' o '/agregar')
    const esRutaVista = req.originalUrl.includes('/editar') || req.originalUrl.includes('/agregar');

    if (esVista || esRutaVista) {
      // 📝 VISTA: Renderizar con errores (dejar que el controlador renderice)
      req.validationErrors = errors.array();
      return next(); // Permite que el controlador renderice
    } else {
      // 🔌 API: Devolver JSON
      return res.status(400).json({
          estado: 'error',
          mensaje: 'La validación fallo',
          errores: errors.array().map(error => ({
              campo: error.path,
              mensaje: error.msg,
          }))
      });
    }
  }
  next();
};