import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getGenresDb, postPage } from "../../actions";
import "./styles.css";
import Swal from "sweetalert2";
import { GrFormPreviousLink } from "react-icons/gr";
//FALTARIA DECIDIR Q HACER DESPUES QUE EL JUEGO ES CREADO!! SI MUESTRA FORMULARIO O VA AL HOME A VERLO EN LA LISTA
//FALTA VER CARGA DE DATOS DE GENEROS Y PLATAFORMAS Q ESTA PROVISORIO

export default function Form() {
  const history = useHistory();
  const genres = useSelector(state => state.genres)
  const platforms = useSelector(state => state.platforms)

  const handleForm = () => setTimeout( function () {  //CON ESTO LE DOY TIEMPO AL MENSAJE DE CREACION!
    history.push("/home")
  },3100)
  // const handleForm = () => history.goBack();
   

  const dispatch = useDispatch();

  const [values, setvalues] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    platformNew:undefined,
    platforms: [],
    genreNew:undefined,
    genres: [],
    image: "",
  });
  console.log(values.genreNew)

  useEffect(() => {
    dispatch(getGenresDb()); 
  }, []);

  function handleOnChange(e) {
   
    if(e.target.name==='genres' || e.target.name==='platforms'){
      const array = values[e.target.name]
      setvalues({
        ...values,
        [e.target.name]: array.concat(e.target.value),
      })
    }else{
      setvalues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
    }
    
  }
  function handleOnSubmit(e) {
    e.preventDefault();
    dispatch(postPage(values)); //ACA TIRO EL DISPACH PARA EJECUTAR EL POST....DUDAS SI SE PUEDE SIN useEffect
    e.target.reset();
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Game Created!!",
      showConfirmButton: false,
      timer: 3000,
    });
     handleForm()
    // console.log(values);
  }
  // const gameAdded = useSelector((state) => state.addNewGame);
  // console.log(gameAdded)
  return (
    <div className='form-general'>
      <div className="header-container">
        <header className="header">
          <button className="button" onClick={() => {
            history.goBack()            
            }}> <GrFormPreviousLink/> </button>
        </header>
      </div>

      <div className='titulo-form'>
         <h1>Create your game here </h1>
      </div>
     
      <div className="form-container">
        
        <form onSubmit={handleOnSubmit}>
          <fieldset className="form-group">
            {/* <label htmlFor="name">Name </label> <br /> */}
            <input
              onChange={handleOnChange}
              value={values.name}
              name="name"
              type="text"
              placeholder="Name"
              type="text"
              tabIndex="1"
              required
              autoFocus
            />
          </fieldset>
          <fieldset className="form-group">
            {/* <label htmlFor="description">Description </label> <br /> */}
            <textarea
              onChange={handleOnChange}
              value={values.description}
              name="description"
              type="text"
              type="text"
              placeholder="Describe your game..."
              tabIndex="2"
              autoFocus
              required
            />
          </fieldset>
          <fieldset className="form-group">
            {/* <label className="label" htmlFor="released">Released </label> <br /> */}
            <input
              onChange={handleOnChange}
              value={values.released}
              name="released"
              placeholder="Released"
              type="date"
              tabIndex="3"
              required
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              onChange={handleOnChange}
              value={values.rating}
              name="rating"
              placeholder="Rating"
              type="number"
              tabIndex="4"
              required
            />
          </fieldset>         
          <fieldset className="form-group">
            <legend>Choose the platforms</legend>
            <div className="select_genres">
              {platforms?.map((p) => (
                <div className='div-checkbox' key={p.id}>
                  <label className="container_checkbox">
                    {p}
                    <input
                      tabIndex="6"
                      onChange={handleOnChange}
                      type="checkbox"
                      name="platforms"
                      value={p}
                      multiple
                    ></input>                 
                  </label>
                </div>
              ))}<br/>
              <label htmlFor="">Other:  </label>
              <input onChange={handleOnChange} value={values.platformNew}   name="platformNew" type="text" />
            </div>
          </fieldset>
           <fieldset className="form-group">          
            <legend>Select the genres for your game</legend>
            <div className="select_genres">
              {genres?.map((g) => (
                <div className='div-checkbox' key={g.id}>
                  <label className="container_checkbox">
                    {g.name}
                    <input
                      tabIndex="6"
                      onChange={handleOnChange}
                      type="checkbox"
                      name="genres"
                      value={g.name}
                      multiple
                    ></input>                  
                  </label>
                </div>
              ))}<br/>
              <label htmlFor="">Other:  </label>
              <input onChange={handleOnChange} value={values.genreNew}   name="genreNew" type="text" />
            </div>
          </fieldset>
          <fieldset className="form-group">            
            <input
              onChange={handleOnChange}
              value={values.image}
              name="image"
              type="url" 
              placeholder='Insert url image'
              required             
            />
          </fieldset>
          <button className='form-btn' type="submit">Create</button>
        </form>
      </div>
    </div>
  );
}
