import { createStore, applyMiddleware, compose } from "redux";
import reducers from "../reducer/index";   //VER NOMBRE DEL REDUCER!! use default, puedo usar cualquier nombre
import thunk from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //SIN ESTO NO ME LEVANTA EL STORE!!!! ATENTA!!!
const store = createStore(
    reducers,
    composeEnhancer(applyMiddleware(thunk))
);
export default store;