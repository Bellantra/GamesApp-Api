import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {clearPageSearch, searchByName } from '../../actions';
import './styles.css';

//CUANDO REALIZO UNA BUSQUEDA, DESPACHO AL ACTION DE searchByName, pero el reducer pisa el mismo estado con el q trae todos...asi acomoda las busquedas.
export default function SearchBar() {
    const dispatch = useDispatch()
    

    const [name, setname] = useState("")   
   
    
    function handleOnChange(e){
        setname(e.target.value)
       
    }

    function handleOnSubmit (e){
        e.preventDefault();       
        setname("");   //ESTO LIMPIA EL NOMBRE LUEGO DE SUBMITTIAR          
        dispatch(searchByName(name))  
           
    }

    return (
        <div className="search-container">          
            <form onSubmit={handleOnSubmit} className="search-bar">
                <input onChange={handleOnChange} value={name} type="text" placeholder="Search by name" />
                <button  type="submit" className="search-button">Submit</button>
            </form>
        </div>
    )
}
