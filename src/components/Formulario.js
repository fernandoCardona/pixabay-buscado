import React, { useState } from 'react'
import Error from './Error';


const Formulario = ({guardarBusqueda}) => {
    // State del componente
        const [termino, guardarTermino] = useState('');
        const [error, guardarError] = useState(false);

    //Funcion buscar Imagenes 
        const buscarImagenes = e => {
            e.preventDefault();
            //Validar que el termino tenga contenido
                if (termino.trim() === '') {
                    guardarError(true); //Si no hay termino, mostrar error
                    return;
                }
                guardarError(false);

            //Pasar el termino hacia el componente principal
                guardarBusqueda(termino);
        }


    return ( 
        <form onSubmit={buscarImagenes}>
            <div className="row">
                <div className="form-group col-md-8">
                    <input 
                        type="text" 
                        className="form-control form-control-lg" 
                        placeholder="Busca una imagen, ejemplo: futbol o café"
                        onChange={e => guardarTermino(e.target.value)}
                    />

                </div>

                <div className="form-group col-md-4">
                    <input 
                        type="submit" 
                        className="btn btn-lg btn-danger btn-block" 
                        value="Buscar"
                    />

                </div>
            </div>
            {error ? <Error mensaje="Ingresa un termino de busqueda"/> : null}
        </form>
     );
}
 
export default Formulario;