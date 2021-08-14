import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearPageSearch, getAllVideogames } from "../../actions/index";
import GamesCards from "../GamesCards/index";
import "./styles.css";
import logo from '../../img/logo.png';
import Pagination from "../Pagination";
import SearchBar from "../SearchBar";
import { useHistory } from "react-router-dom";
import OrderBy from "../OrderBy";
import Filter from "../Filter";

// import GameCard from "../GameCard";

export default function Home() {
  
  let history = useHistory();

  function handleCreateGame (){  //CUANDO SE APRETA BOTON DE ADD, PUSHEA A LA RUTA DEL FORM
    history.push("/form")
  }
  const dispatch = useDispatch();
  const { games, loading } = useSelector((state) => state.gamesState);
  const filterBy = useSelector(state => state.filterBy)
  const orderBy = useSelector((state) => state.orderBy);
  const filterGames = useSelector((state) => state.filterGames);
  const searchByName = useSelector(state => state.searchByName)
  let allGames;
  // const state = useSelector(state => state)
  // console.log(state);
  console.log(filterBy, orderBy);
  console.log(filterGames,'filtroooo')

  if (typeof(games) === 'undefined') dispatch(getAllVideogames())

  useEffect(() => {    
    dispatch(getAllVideogames())  //si habilito esto..no para de despachar GRAN problema
     
  }, []); 
  
    filterBy === "Filter By" && orderBy === "Order By" && searchByName==='Searching'
    ? (allGames = games?.slice())
    : (allGames = filterGames?.slice());
   
    console.log(allGames, 'ordenados')
  
  //-----Paginacion---------
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(15);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allGames?.slice(indexOfFirstItem, indexOfLastItem);
 
  const handlePagination = (e, nro) => {
    e.preventDefault();
    setcurrentPage(nro);
  };

  const refreshPage = () => {
    window.location.reload();
  }  
  
  //-----------Fin Paginacion------------------

  return (
    <div className="container">
      <div className="header-home">
        <header>
          <div className="imagen">
            <img onClick={refreshPage} src={logo} alt="" className="img" />
          </div>
        
        <div className="searchbar-container">
          <SearchBar/>
        </div>
        <div className="btn-container">
          <button onClick={handleCreateGame} >Add a Game</button>
        </div>
        <div className="order-container">
          <OrderBy games={games}/>
        </div>
        <div className = "filter-container">
          <Filter/>
        </div>
        
      </header>
      </div>
      
      {loading ?  (
        <>
        <div className="cards-container">
          <GamesCards game={currentItems} />
        </div>
        <Pagination handlePagination={handlePagination} games={games} cardsPerPage={itemsPerPage}/>
        </>
      ) : (
        <div className='loading'><h1>Estamos cargando tus juegos.....</h1></div>
      )}
      
    </div>
  );
}
