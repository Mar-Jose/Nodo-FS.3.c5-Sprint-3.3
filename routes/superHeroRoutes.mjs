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
    eliminarSuperHeroexNombreController
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
                               
export default router;