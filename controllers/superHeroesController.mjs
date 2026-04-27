import { validationResult } from 'express-validator'; // permite encontrar errores y mostrar en la vista/redirect
import { obtenerSuperHeroePorId, obtenerTodosLosSuperHeroes, buscarSuperHeroePorAtributo, obtenerSuperHeroesMayoresDe30, crearSuperHeroe, actualizarSuperHeroe, eliminarSuperHeroexId, eliminarSuperHeroexNombre } from '../services/superheroesServices.mjs';
import { renderizarSuperheroe, renderizarListaSuperheroes } from '../views/responseView.mjs';                             
                                                            

export async function obtenerSuperHeroePorIdController(req, res) {
    try {
        const { id } = req.params;
        const superheroe = await obtenerSuperHeroePorId(id);
        if (!superheroe) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
        }

        const superheroeFormateado = renderizarSuperheroe(superheroe);
        return res.status(200).json(superheroeFormateado);
    } catch (error) {
        return res.status(500).send ({ mensaje: 'Error al obtener el superhéroe', error: error.message });
    }
}
/*
export async function obtenerTodosLosSuperHeroesController(req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperHeroes();
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        return res.status(200).json(superheroesFormateados);
    } catch (error) {
        return res.status(500).send({ mensaje: 'Error al obtener los superhéroes', error: error.message });
    }
}
*/
 //sprint 3 tp 3. Etapa 2. Requerimiento 3. 
export async function obtenerTodosLosSuperHeroesController(req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperHeroes();
         console.log(`Cargando dashboard con ${superheroes.length} héroes`);
        // Cambie .json X .render para cargar la vista y renderizar dashbord.
        res.render('dashboard', { heroes: superheroes }); 
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al cargar el dashboard', error: error.message });
    }
}
   

export async function buscarSuperheroesPorAtributoController(req, res) {
    try {
        const { atributo, valor } = req.params;
        const superheroes = await  buscarSuperHeroePorAtributo(atributo, valor);
        if (superheroes.length === 0) {
            return res.status(404).send({ mensaje: 'No se encontraron superhéroes con ese atributo' });
        }                          
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
            return res.status(200).json(superheroesFormateados);
    } catch (error) {
            return res.status(500).send({ mensaje: 'Error al buscar los superhéroes', error: error.message });
    }
}

export async function obtenerSuperHeroesMayoresDe30Controller(req, res) {
    try {
        const superheroes = await obtenerSuperHeroesMayoresDe30();
        if (superheroes.length === 0) {
            return res.status(404).send({ mensaje: 'No se encontraron superhéroes mayores de 30 años' });
        }
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
            return res.status(500).send({mensaje: 'Error al obtener superhéroes mayores de 30', error: error.message});
    }
}

// sprint 3. tp 1.

export async function crearSuperHeroeController(req, res) {
  try {
    console.log("estoy en el controlador crear");
    const nuevoSuperheroe = req.body;
    const superheroeCreado = await crearSuperHeroe(nuevoSuperheroe);
    
    const superheroeFormateado = renderizarSuperheroe(superheroeCreado);
    res.status(201).json(superheroeFormateado);
  } catch (error) {
    res.status(500).send({mensaje: "Error al crear el superheroe", error: error.message,
});
  }
}
 
export async function actualizarSuperHeroeController(req, res) {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;
    
    const superheroeActualizado = await actualizarSuperHeroe(id, datosActualizados);
    console.log(superheroeActualizado);
    if (!superheroeActualizado) {
      return res.status(404).send({ mensaje: "Superheroe no encontrado" });
    }
    
    const superheroeFormateado = renderizarSuperheroe(superheroeActualizado);
    res.status(200).json(superheroeFormateado);
  } catch (error) {
    res.status(500).send({ mensaje: "Error al actualizar el superhéroe", error: error.message,});
    }
}

export async function eliminarSuperHeroexIdController(req, res) {
  try {
    const { id } = req.params;
    const superheroeEliminado = await eliminarSuperHeroexId(id);
    
    if (!superheroeEliminado) {
      return res.status(404).send({ mensaje: "Superheroe no encontrado" });
    }
    
    const superheroeFormateado = renderizarSuperheroe(superheroeEliminado);
    res.status(200).json(superheroeFormateado);
  } catch (error) {
    res.status(500).send({mensaje: "Error al eliminar el superhéroe", error: error.message,});
  }
}

export async function eliminarSuperHeroexNombreController(req, res) {
  try {
    const { nombre } = req.params;
    const superheroeEliminado = await eliminarSuperHeroexNombre(nombre);
    
    if (!superheroeEliminado) {
      return res.status(404).send({ mensaje: "Superheroe no encontrado" });
    }
    
    const superheroeFormateado = renderizarSuperheroe(superheroeEliminado);
    res.status(200).json(superheroeFormateado);
  } catch (error) {
    res.status(500).send({mensaje: "Error al eliminar el superhéroe", error: error.message,});
  }
}
//¿¿¿???
//¿¿¿???sprint 3. tp 3. Etapa 3. Requerimiento 2 continua en routes.
export async function rutaParaFormularioVistaAddController(req, res) {
    try {     
        res.render('addSuperhero');        
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al crear el Super Héroe', error: error.message });
    }    
} 
//sprint 3. tp 3. Etapa 3. Requerimiento 3.
/*export async function AgregarSuperHeroeController(req, res) {
  try {
     console.log("estoy en la función controlador, agregar para crear.");
    const nuevoSuperheroe = req.body;
    const superheroeCreado = await crearSuperHeroe(nuevoSuperheroe);
     res.redirect('/heroes');
      } catch (error) {
        res.status(500).render('addSuperheroe', {error:'Error al crear el superhéroe.'});
      }
    };
*/

export async function AgregarSuperHeroeController(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).render('addSuperhero', {
            errores: errors.array()
        });
    }

    try {
        const datos = req.body;

        if (datos.poderes) {
            datos.poderes = datos.poderes.split(',').map(p => p.trim());
        }
        if (datos.aliados) {
            datos.aliados = datos.aliados.split(',').map(a => a.trim());
        }
        if (datos.enemigos) {
            datos.enemigos = datos.enemigos.split(',').map(e => e.trim());
        }

        await crearSuperHeroe(datos);

        return res.redirect('/api/heroes');

    } catch (error) {
        next(error); 
    }
}

/*
++++++++++++++++++++++++++++++++++++++++++++
*/    
    export async function editarSuperheroeController(req, res, next) {
    try {
      console.log("estoy en la capa controllers, f:editar");
        const { id } = req.params; 
        const heroe = await obtenerSuperHeroePorId(id);

        if (!heroe) {
           const error = new Error('Superhéroe no encontrado');
           error.status = 404;
           throw error;
        }
          //  res.render('editSuperhero', { heroe: heroe }); 
        // sprint 3. tp 3. Etapa &. Requerimiento 3.
            return res.render('editSuperhero', { heroe });
        
        } catch (error) {
        next(error);
        }
    }

     // Sprint 3. tp 3. Etapa 4. Requerimiento 3 formulario edit...
 export async function actualizarSuperheroeVistaController(req, res, next) {
  console.log("estoy en la capa controllers, f:actualizar-vista");
    const { id } = req.params;
    const datosSuperheroe = req.body;
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      const heroe = await obtenerSuperHeroePorId(id);
      console.log(heroe)
      return res.status(400).render('editSuperhero', {
                heroe,
                errores: errors.array(),
            });
        }

    try {
        const superheroeActualizado = await actualizarSuperHeroe(id, datosSuperheroe);
        
        if (!superheroeActualizado) {
        const error = new Error("Superhéroe no fue encontrado para su actualización");
            error.status = 404;
            throw error;
        }
        return res.redirect('/api/heroes'); 
        } catch (error) {
        next(error);
        }
    }

        // Sprint 3. tp 3. Etapa 5 Requerimiento 4
        export async function eliminarSuperheroeController(req, res) {
        try {
        console.log("estoy en la función controlador, f: delete.");
        const { id } = req.params;
        const superheroeEliminado = await eliminarSuperHeroexId(id);
        return res.redirect('/api/heroes');
        
        //const superheroeFormateado = renderizarSuperheroe(superheroeEliminado);
        //res.status(200).json(superheroeFormateado);
    } catch (error) {
        res.status(500).send({mensaje: "Error al eliminar el superhéroe", error: error.message,});
    }
    }
   