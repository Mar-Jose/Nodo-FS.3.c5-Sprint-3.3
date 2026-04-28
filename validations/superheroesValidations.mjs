// Sprint 3. tp 2.

import { body, param } from 'express-validator';

//  Sprint 3. tp 2. Requerimiento 1.

export const superheroeValidations = [
  body('nombreSuperHeroe')
    .trim()
    .notEmpty()
    .withMessage('El nombre de superhéroe es requerido')
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
    .trim()
    .notEmpty()
    .withMessage('La edad del superheroe es requerida')
    .isNumeric()
    .withMessage('La edad debe ser un número')
    .isInt({ min: 0 })
    .withMessage('La edad del superheroe debe ser un número entero positivo, escribala por favor'),

    //  Sprint 3. tp 3:
    
     body('debilidad')
    .notEmpty()
    .withMessage('El sistema solicita conocer su debilidad')
    .custom(value => {
    const items = value.split(',').map(v => v.trim());
    return items.every(v => v.length >= 3 && v.length <= 60);
  })
  .withMessage('El campo debilidad debe tener entre 3 y 60 caracteres. Por favor, no se exceda'),

//  Sprint 3. tp 2. Requerimiento 3:
     body('poderes')
    .notEmpty()
    .withMessage('Debe proporcionar al menos un poder. Por favor, no se haga el humilde')
    .custom(value => {
    const items = value.split(',').map(v => v.trim());
    return items.every(v => v.length >= 3 && v.length <= 60);
  })
  .withMessage('El campo poder debe tener entre 3 y 60 caracteres'),
      
//  Sprint 3. tp 3:

    body('aliados')
    .notEmpty()
    .withMessage('Debe proporcionar al menos un aliado')
    .custom(value => {
    const items = value.split(',').map(v => v.trim());
    return items.every(v => v.length >= 3 && v.length <= 60);
  })
  .withMessage('El campo aliado debe tener entre 3 y 60 caracteres'),

  //  Sprint 3. tp 3:

     body('enemigos')
    .notEmpty()
    .withMessage('todo el mundo tiene un enemigo al menos escriba uno')
    .custom(value => {
    const items = value.split(',').map(v => v.trim());
    return items.every(v => v.length >= 3 && v.length <= 60);
  })
  .withMessage('El enemigo debe tener mucha envidia, cuidese y escriba entre 3 y 60 caracteres'),

//  Sprint 3. tp 3:

    body('creador')
        .trim()
        .notEmpty()
        .withMessage('El nombre creador siempre es requerido')
        .isLength({ min: 3, max: 60 })
        .withMessage('El nombre del creador del superheroe es necesario ya que debe ser un genio y quiero conocerlo el mismo deberá tener entre 3 y 60 caracteres'),

];