import React, { useState } from 'react';
import './styles.css';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";


export default function Pagination({handlePagination, games, cardsPerPage}) {

 

  const pages = [];
  for (let i = 1; i <= Math.ceil(games.length / cardsPerPage); i++) {
    pages.push(i);
  }

  
  console.log(pages)

  
  

    return (
        <div className="container-nav">
            <ul className="pagination">
                <li className="page-number">
                    <button className="page-link"> <AiOutlineDoubleLeft/> </button>
                </li>
                {pages.map((number) => (
                    <li key={number} className="page-number">
                        <button onClick={(e) =>(handlePagination(e,number))} className="page-link">
                            {number}
                        </button>
                    </li>
                ))}
                 <li className="page-number">
                    <button className="page-link"> <AiOutlineDoubleRight/> </button>
                </li>
            </ul>
           
        </div>
    )
}

