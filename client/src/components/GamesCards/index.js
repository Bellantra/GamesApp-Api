import React from 'react';
import  GameCard  from "../GameCard/index";
import './styles.css'

export default function GamesCards({game}) {   
    return (
        <div className='cards-container'>
            <div className='cards'>
             {game?.map((data,id) => <GameCard data={data} key={id}/>)}             
            </div>                        
        </div>
    )
}
