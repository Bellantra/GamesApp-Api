//Actions
export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES';
export const ADD_NEW_GAME = "ADD_NEW_GAME";
export const GET_BY_NAME = "GET_BY_NAME";
export const ORDER_ASC_NAME = "ORDER_ASC_NAME";
export const ORDER_DESC_NAME = "ORDER_DESC_NAME";
export const ORDER_ASC_RATING = "ORDER_ASC_RATING";
export const ORDER_DESC_RATING = 'ORDER_DESC_RATING';
export const FILTER_CREATED = 'FILTER_CREATED';
export const FILTER_EXISTED = 'FILTER_EXISTED';
export const GET_ALL_GENRES = 'GET_ALL_GENRES'
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE'


//Paths
export const ALL_GAMES_URL = 'http://localhost:3001/videogames' //Luego usar env para ocultar
export const GET_BY_ID = 'http://localhost:3001/videogames'
export const SEARCH_BY_NAME = 'http://localhost:3001/videogames'
export const GET_GENRES_DB = 'http://localhost:3001/genres'