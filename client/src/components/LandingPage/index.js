import React from "react";
import { Link } from "react-router-dom";
import videogame from "../../img/videogame.png";
import './styles.css'

export default function Landing() {
  return (
    <div className='landing-container'>
      <h1>Henry Videogames</h1>
      <div className='button-container'> 
        <Link className='link' to='/home'>
        <button>Enter to Game</button>
      </Link>
      </div>
      <div>
       <img src={videogame} alt="landing-img"></img> 
      </div>      
      
    </div>
    
  );
}
