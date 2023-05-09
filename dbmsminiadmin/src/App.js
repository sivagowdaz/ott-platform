import React from "react";
import "./App.css"
import {BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from "./pages/login/login";
import Home from "./pages/home/Home";
import Topbar from "./components/topbar/Topbar";
import UserList from "./pages/userlist/UserList";
import User from "./pages/user/User";
import { useContext } from 'react';
import {AuthContext} from "./context/authcontext/AuthContext"
import Sidebar from "./components/sidebar/Sidebar";
import CreateUser from "./pages/createuser/CreateUser";
import MovieList from "./pages/movieList/MovieList";
import SeriesList from "./pages/serieslist/SeriesList"
import SerialList from "./pages/seriallist/SerialList";
import Content from "./pages/movie/Movie"
import CreateContent from './pages/createcontent/CreateContent'
import Video from "./components/video/Video";


function App() {
  const {user} = useContext(AuthContext)
  
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route path='/login'>
          {user ? <Redirect to='/'/> : <Login/>}
        </Route>
          {user ? 
            <div>
              <Topbar />
              <div className="container">
                <Sidebar/>
                <Route exact path='/' component={Home}></Route>
                <Route path='/userlist' component={UserList} />
                <Route path='/user/:email' component={User} />
                <Route path='/createuser' component={CreateUser} />
                <Route path='/movielist' component={MovieList} />
                <Route path='/serieslist' component={SeriesList} />
                <Route path='/seriallist' component={SerialList} />
                <Route path='/content/:cont_id' component={Content} />
                <Route path='/createcontent' component={CreateContent} />
                <Route path='/video/:video_url' component={Video}/>
              </div>
           </div>
          :
          <Redirect to='/login'/>
        }
        </Switch>
      </Router>
    </div>
  );
}

export default App;
