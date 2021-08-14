import { Route } from "react-router-dom";
import {
  GET_ALL_VIDEOGAMES,
  GET_BY_ID,
  ADD_NEW_GAME,
  GET_BY_NAME,
  ORDER_ASC_NAME,
  ORDER_DESC_NAME,
  ORDER_ASC_RATING,
  ORDER_DESC_RATING,
  FILTER_CREATED,
  FILTER_EXISTED,
  GET_ALL_GENRES,
  FILTER_BY_GENRE
  
} from "../utils/constants";

const initialState = {
  gamesState: {
    games: undefined,
    loading: false,
  },
  gamesId: {
    gamesId: [],
    loading: false,
  },
  addNewGame: null,
  filterGames: [],
  genres:[],
  orderBy: "Order By",
  filterBy: "Filter By",
  searchByName:'Searching',
  platforms:['Xbox 360','PlayStation 5','macOS','Android','Linux','PC','iOS','Xbox One','Nintendo Switch','PlayStation 4']
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_VIDEOGAMES:
      return {
        ...state,
        gamesState: {
          games: action.payload,
          loading: true,
        },
      };
    case GET_BY_ID:
      return {
        ...state,
        gamesId: {
          gamesId: action.payload,
          loading: true,
        },
      };
    case ADD_NEW_GAME:
      return {
        ...state,
        addNewGame: action.payload,
      };

    case GET_BY_NAME:
      return {
        ...state,
        filterGames: action.payload.gamesSearched,
        searchByName: action.payload.name,
      };
      case GET_ALL_GENRES:
        return {
          ...state,
          genres:action.payload
        };
    case ORDER_ASC_NAME:
      return {
        ...state,
        filterGames: action.payload.gamesOrder,
        orderBy: action.payload.name,
      };
      case ORDER_DESC_NAME:
      return {
        ...state,
        filterGames: action.payload.gamesOrder,
        orderBy: action.payload.name,
      };
    case ORDER_ASC_RATING:
      return {
        ...state,
        filterGames: action.payload.gamesOrder,
        orderBy: action.payload.name,
      };
      case ORDER_DESC_RATING:
      return {
        ...state,
        filterGames: action.payload.gamesOrder,
        orderBy: action.payload.name,
      };
      case FILTER_CREATED:
      return {
        ...state,
        filterGames: action.payload.gamesOrder,
        filterBy: action.payload.name,
      };
      case FILTER_EXISTED:
        return {
          ...state,
          filterGames: action.payload.gamesOrder,
          filterBy: action.payload.name,
        };
        case FILTER_BY_GENRE:
      return {
        ...state,
        filterGames: action.payload.genreGame,
        filterBy: action.payload.name,
      };


    default:
      return state;
  }
};

export default reducers;
