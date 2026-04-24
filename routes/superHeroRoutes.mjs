import express from 'express';
import {
    obtenerSuperHeroePorIdController,
    obtenerTodosLosSuperHeroesController,
    buscarSuperheroesPorAtributoController,
    obtenerSuperHeroesMayoresDe30Controller,
    //Requerimientos del sprint 3. tp 1:
    crearSuperHeroeController,
    actualizarSuperHeroeController,
    eliminarSuperHeroexIdController,
    eliminarSuperHeroexNombreController,
     //¿¿¿???sprint 3. tp 3. Etapa 3. Requerimiento 2 finaliza aquí en routes. Import la función.
    rutaParaFormularioVistaAddController,
    //sprint 3. tp 3. Etapa 3. Requerimiento 3.
    AgregarSuperHeroeController,
} from '../controllers/superHeroesController.mjs';

    // sprint 3. Tp 2:
import { validate 
} 
from '../validations/validationMiddlewre.mjs';

import {
        superheroeValidations
} from '../validations/superheroesValidations.mjs';


const router = express.Router();

router.get('/heroes', obtenerTodosLosSuperHeroesController);
router.get('/heroes/:id', obtenerSuperHeroePorIdController);
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);
router.get('/heroes/mayores-30', obtenerSuperHeroesMayoresDe30Controller);
//Requerimientos del sprint 3. tp 1:
router.post('/heroes', superheroeValidations, validate, crearSuperHeroeController);
router.put('/heroes/id/:id', actualizarSuperHeroeController);
router.delete('/heroes/id/:id', eliminarSuperHeroexIdController);
router.delete('/heroes/nombre/:nombre', eliminarSuperHeroexNombreController);

//¿¿¿???sprint 3. tp 3. Etapa 3. Requerimiento 2 finaliza aquí en routes. Crea el endpoint:
router.get('/heroes/nuevo', rutaParaFormularioVistaAddController);
//sprint 3. tp 3. Etapa 3. Requerimiento 3.
router.post('/heroes/agregar', superheroeValidations, validate, AgregarSuperHeroeController); 

export default router;