import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import "./styles.css";
import { clearPage, getById } from "../../actions";
import parse from "html-react-parser";
import { GrFormPreviousLink } from "react-icons/gr";

export default function GameCardDetails({ id }) {
  let history = useHistory();
  // console.log(id);
  //Ver como me llega el id!!
  const dispatch = useDispatch();
  const { gamesId, loading } = useSelector((state) => state.gamesId);
  console.log(gamesId);
  
  useEffect(() => {
    dispatch(getById(id)); 
    
     return () => dispatch(clearPage())
  }, []);
  // let des=gamesId.description;
  
  let description = gamesId ? (parse(`${gamesId.description}`)) : undefined;

  //Acomodar el contenedor para q entre todo bien!!!! saque L para q no tome estilo//Ver la p de donde viene...
  //RESOLVER CUANDO CAMBIA DE IMAGEN LA ANTERIOR QUE SE VE EN UNOS SEGUNDOS.....
  return (
    <div className="container">
      <div className="header-container">
        <header className="header">
          <button className="button" onClick={() => {
            history.goBack()            
            }}> <GrFormPreviousLink/> </button>
        </header>
      </div>

      {loading && gamesId? (
        <>
        <div className="p-container">
          <div className="general-container">
            <div className="detail-container">
              <div className="image">
                <img src={gamesId.image} />
              </div>
              <h3 className='nombre'>{gamesId.name}</h3>
              <div className="texto">
                <div>{description}</div>              
                <p>Genres: {
                  typeof gamesId.genres === 'string'? (gamesId.genres) : (gamesId.genres.map(g => (g.name)).join(', '))                            
                }
                </p>
                <p>Platforms: {gamesId.platforms}</p>
                <p>Rating: {gamesId.rating}</p>
                <p>Released: {gamesId.released?.replace('T00:00:00.000Z','')}</p> 
              </div>
            </div>
          </div>
        </div>
          
        </>
      ) : (
        <h1 className='loading'>Cargando...</h1>
      )}
    </div>
  );
}
