import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByGenre, filterByOrigin, getGenresDb, } from "../../actions";
import "./styles.css";

export default function Filter() {
  const dispatch = useDispatch();

  const genres = useSelector((state) => state.genres);

  useEffect(() => {
    dispatch(getGenresDb());
  }, []);

  console.log(genres);

  const handleOnChange = (e) => {
      if(e.target.value==='api' || e.target.value==='bd'){
          dispatch(filterByOrigin(e.target.value));
      }else{
          dispatch(filterByGenre(e.target.value))
      }
    
  };

  const refreshPage = () => {
    window.location.reload();
  };
  return (
    <div className="container-filter">
      <select className='filter-styles' name="filter" id="" onChange={handleOnChange}>
        <option onClick={refreshPage} defaultValue>
          Filter By
        </option>
        <option value="api">Existed</option>
        <option value="bd">Created</option>
        {genres.map((g, id) => (
          <option key={id} value={g.name}>
            {g.name}
          </option>
        ))}
      </select>
    </div>
  );
}
