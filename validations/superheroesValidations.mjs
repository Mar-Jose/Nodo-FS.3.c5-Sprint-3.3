// Sprint 3. tp 2.

import { body, param } from 'express-validator';

//  Sprint 3. tp 2. Requerimiento 1.

export const superheroeValidations = [
  body('nombreSuperHeroe')
    .notEmpty()
    .withMessage('El nombre de superhéroe es requerido')
    .escape()
    .trim()
    .isLength({ min: 3, max: 60 })
    .withMessage('El nombre de superhéroe debe tener entre 3 y 60 caracteres'),
   
    //  Sprint 3. tp 2. Requerimiento 2.

  body('nombreReal')
    .notEmpty()
    .escape()
    .withMessage('El nombre real del superheroe es requerido')
    .trim()
    .isLength({ min: 3, max: 60 })
    .withMessage('El nombre real del superheroe debe tener entre 3 y 60 caracteres'),

    //  Sprint 3. tp 2. Requerimiento 3:
    
  body('edad')
    .notEmpty()
    .escape()
    .isNumeric()
    .withMessage('La edad del superheroe es requerida')
    .trim()
    .isInt({ min: 0 })
    .withMessage('La edad del superheroe debe ser un número entero positivo'),

    //  Sprint 3. tp 2. Requerimiento 4:
    
  body('poderes')
    .isArray({ min: 1 }).withMessage('Debe proporcionar al menos un poder del superheroe')
    
    .custom((poderes) => {
      return poderes.every(poder => 
        typeof poder === 'string' && 
        poder.trim() && 
        poder.trim().length >= 3 && 
        poder.trim().length <= 60
      );
    }).withMessage('Cada poder del superheroe debe ser un string de 3 a 60 caracteres sin espacios en blanco')
];