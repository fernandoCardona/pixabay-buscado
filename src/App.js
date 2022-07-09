import React, { useEffect, useState } from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {
  //Definimos el State del componente App 
  const [busqueda, guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaActual, guardarPaginaActual] = useState(1);
  const [totalPaginas, guardarTotalPaginas] = useState(1);


  useEffect(() => {
    const consultarAPI = async () => {
      if(busqueda === '') return;
      //Consultar la API
        const imagenesPorPagina = 20;
        const key = '28531310-b1c15c22357ea8b23e54423ac';
        const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        guardarImagenes(resultado.hits);
      
        //Calcular el total de paginas
        const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
        guardarTotalPaginas(calcularTotalPaginas);
        //Mover la pantalla hacia arriba al cargar pagina nueva pagina del listado
        const jumbotron = document.querySelector('.jumbotron');
        jumbotron.scrollIntoView({behavior: 'smooth'});
         

    }
    consultarAPI();
  
  }, [busqueda, paginaActual]);

  //Funciones paaginacion para cambiar de pagina
  
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaActual - 1;
    if(nuevaPaginaActual === 0) return;
    guardarPaginaActual(nuevaPaginaActual);  //Actualizar el state
  }
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaActual + 1;
    if(nuevaPaginaActual > totalPaginas) return;
    guardarPaginaActual(nuevaPaginaActual);  //Actualizar el state
  }


  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        <Formulario
          busqueda={busqueda}
          guardarBusqueda={guardarBusqueda}
        />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes imagenes={imagenes}/>
        {(paginaActual === 1) ? null : (
           <button type="button" className="btn btn-info mr-1" onClick={paginaAnterior}>&laquo; Anterior </button>
        )}
        {(paginaActual === totalPaginas) ? null : (
           <button type="button" className="btn btn-info" onClick={paginaSiguiente}>Siguiente &raquo;</button> 
        )}
        
      </div>
     
    </div>
  );
}

export default App;
