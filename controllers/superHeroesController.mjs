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
export async function obtenerTodosLosSuperHeroesController(req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperHeroes();
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        return res.status(200).json(superheroesFormateados);
    } catch (error) {
        return res.status(500).send({ mensaje: 'Error al obtener los superhéroes', error: error.message });
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