import axios from "axios";
import {
  GET_ALL_VIDEOGAMES,
  ALL_GAMES_URL,
  GET_BY_ID,
  ADD_NEW_GAME,
  GET_BY_NAME,
  GET_GENRES_DB,
  ORDER_ASC_NAME,
  ORDER_ASC_RATING,
  ORDER_DESC_NAME,
  ORDER_DESC_RATING,
  FILTER_CREATED,
  FILTER_EXISTED,
  GET_ALL_GENRES,
  FILTER_BY_GENRE
} from "../utils/constants";

export const getAllVideogames = () => async (dispatch) => {
  return axios.get(`/videogames`).then((response) => {
    //    console.log(response.data)
    dispatch({
      type: GET_ALL_VIDEOGAMES,
      payload: response.data,
    });
  });
};

export function getById(id) {
  return (dispatch) => {
    axios.get(`/videogames/${id}`).then((response) => {
      dispatch({
        type: GET_BY_ID,
        payload: response.data,
      });
    });
  };
}

export function postPage(values) {
  return (dispatch) => {
    axios.post(`/videogames`, values).then((response) => {
      dispatch({
        type: ADD_NEW_GAME,
        payload: response.data,
      });
      dispatch(getAllVideogames());
    });
  };
}

export function searchByName(name) {
  return (dispatch) => {
    axios.get(`/videogames?name=${name}`).then((response) => {
      dispatch({
        type: GET_BY_NAME,
        payload: {
          gamesSearched:response.data,
          name:name
        }
      });
    });
  };
}

export const getGenresDb = () => async (dispatch) => {
  return axios.get(`/genres`).then((response) => {
       console.log(response.data)
    dispatch({
      type: GET_ALL_GENRES,
      payload: response.data,
    });
  });
};

export function clearPage() {
  return { type: GET_BY_ID, payload: undefined };
}

export const orderAsc = (type) => (dispatch, getState) => {
  // const games = useSelector(state => state.gamesState)
  // const orderBy = useSelector(state => state.orderBy)
  const orderBy = getState().orderBy;
  const games = getState().gamesState.games.slice();
  const filterGames = getState().filterGames.slice();

  if (orderBy === "Order By") {
    if (type === "az") {
      const gamesOrder = games.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });
      dispatch({
        type: ORDER_ASC_NAME,
        payload: {
          gamesOrder,
          name: type,
        },
      });
    }
    if (type === "highest") {
      const gamesOrder = games.sort((a, b) => a.rating - b.rating);
      dispatch({
        type: ORDER_ASC_RATING,
        payload: {
          gamesOrder,
          name: type,
        },
      });
    }
  } else {
    if (type === "az") {
      const gamesOrder = filterGames.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });
      dispatch({
        type: ORDER_ASC_NAME,
        payload: {
          gamesOrder,
          name: type,
        },
      });
    }
    if (type === "highest") {
      const gamesOrder = filterGames.sort((a, b) => a.rating - b.rating);
      dispatch({
        type: ORDER_ASC_RATING,
        payload: {
          gamesOrder: gamesOrder,
          name: type,
        },
      });
    }
  }
};

export const orderDesc = (type) => (dispatch, getState) => {
  const orderBy = getState().orderBy;
  const games = getState().gamesState.games.slice();
  const filterGames = getState().filterGames.slice();

  if (orderBy === "Order By") {
    if (type === "lowest") {
      const gamesOrder = games.sort((a, b) => b.rating - a.rating);
      dispatch({
        type: ORDER_DESC_RATING,
        payload: {
          gamesOrder: gamesOrder,
          name: type,
        },
      });
    }
    if (type === "za") {
      const gamesOrder = games.sort((a, b) => {
        if (a.name < b.name) return 1;
        if (a.name > b.name) return -1;
        return 0;
      });
      dispatch({
        type: ORDER_DESC_NAME,
        payload: {
          gamesOrder: gamesOrder,
          name: type,
        },
      });
    }
  } else {
    if (type === "lowest") {
      const gamesOrder = filterGames.sort((a, b) => b.rating - a.rating);
      dispatch({
        type: ORDER_DESC_RATING,
        payload: {
          gamesOrder: gamesOrder,
          name: type,
        },
      });
    }
    if (type === "za") {
      const gamesOrder = filterGames.sort((a, b) => {
        if (a.name < b.name) return 1;
        if (a.name > b.name) return -1;
        return 0;
      });
      dispatch({
        type: ORDER_DESC_NAME,
        payload: {
          gamesOrder: gamesOrder,
          name: type,
        },
      });
    }
  }
};

export const filterByOrigin = (type) => (dispatch, getState) => {
  const filterBy = getState().filterBy;
  const games = getState().gamesState.games.slice();
  const filterGames = getState().filterGames.slice();
  let gamesOrder;
  console.log("Holaaaaa", filterBy, games, type);

  if (filterBy === "Filter By") {
    if (type === "api") {
      gamesOrder = games.filter((g) => typeof g.id === "number");
      console.log(gamesOrder, "numerosss");
      dispatch({
        type: FILTER_CREATED,
        payload: {
          gamesOrder: gamesOrder,
          name: type,
        },
      });
    }
    if (type === "bd") {
      gamesOrder = games.filter((g) => g.id.length > 35);
      console.log(gamesOrder, "UUID");
      dispatch({
        type: FILTER_EXISTED,
        payload: {
          gamesOrder: gamesOrder,
          name: type,
        },
      });
    }
  } else {
    if (type === "api") {
      gamesOrder = games.filter((g) => typeof g.id === "number");
      console.log(gamesOrder, "numerosss");
      dispatch({
        type: FILTER_CREATED,
        payload: {
          gamesOrder: gamesOrder,
          name: type,
        },
      });
    }
    if (type === "bd") {
      gamesOrder = games.filter((g) => g.id.length > 35);
      console.log(gamesOrder, "UUID");
      dispatch({
        type: FILTER_EXISTED,
        payload: {
          gamesOrder: gamesOrder,
          name: type,
        },
      });
    }
  }
};

export const filterByGenre = (type) => (dispatch, getState) => {  //REVISAR BIEN!!!
  let filterByGenre = [];
  if (type === "Filter By") {
    filterByGenre = getState().gamesState.games;
  } else {
    filterByGenre = getState().gamesState.games.filter((game) =>
      (game.genres || []).includes(type)
    );
  }
  // console.log(filterByGenre,'aquiiiii')
  dispatch({
    type: FILTER_BY_GENRE,
    payload: {    
      genreGame: filterByGenre,
      name:type
    },
  });
  }



 



// export function clearPageSearch () {
//     return {type: GET_ALL_VIDEOGAMES, payload:null }  //NO ME SALIO LIMPIAR TRASPASO ENTRE TODOS Y BUSQUEDA POR NOMBRE PARA Q SE VEA EL CARGANDO
// }
