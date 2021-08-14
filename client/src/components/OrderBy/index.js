import React, { useEffect, useState } from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { orderAsc, orderDesc } from "../../actions";

export default function OrderBy() {

  const dispatch = useDispatch()
  
  const handleOnChange = (e) => {
  //  setvalue(options.value)
   if(e.target.value ==='az' || e.target.value === 'highest'){
    //  console.log('estoy acaaaaa')
    //  console.log(e.target.value)
      dispatch(orderAsc(e.target.value))
   }else if(e.target.value ==='za' || e.target.value === 'lowest')  {
    dispatch(orderDesc(e.target.value))
   } 
  } 

  const refreshPage = () => {
    window.location.reload();
  }  
    
  return (
    <div className="container-select">        
       <select  name="select" id="" onChange={handleOnChange}>
       <option onClick={refreshPage}  defaultValue >Order By</option>
       <option value="az">A - Z</option>
       <option value="za">Z - A</option>
       <option value="highest">Rating ⬆</option>
       <option value="lowest">Rating ⬇</option>
      </select> 
    </div>
    
  );
}
