import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './components/LandingPage';
import Home from "./components/Home/index";
import GameCardDetails from './components/GameCardDetails';
import Form from './components/Form';
//Revisar Match!!!!!! del provider. algo se rompe si le saco match
function App() {
  return (
    <BrowserRouter>
    <div className="App">          
    <Route exact path='/' component={Landing}/>
    <Route exact path='/home' component={Home}/>
    <Route exact path ='/details/:id' render={({match}) => <GameCardDetails id={match.params.id}/> }/> 
    <Route exact path='/form' component={Form}/>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
