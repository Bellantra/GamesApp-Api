import React from 'react';
import './styles.css';
import {useHistory} from 'react-router-dom';

export default function GameCard({data}) {
    let history = useHistory();
    const handleGetById = () => history.push(`/details/${data.id}`);
    return (
       
            <div className='card'>
                <div className='image'>
                 <img src={data.image}/>   
                </div>    
                <div className='detail'>
                 <h3>{data.name}</h3>
              <p>{data.genres}</p>
              <button onClick={handleGetById}>More Info</button>   
                    </div>          
              
            </div>            
      
    )
}
