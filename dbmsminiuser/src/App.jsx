import './app.scss';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

import Home from './pages/Home/Home'
import Login from './pages/login/Login';
import Register from './pages/regiter/Register';
import Watch from './pages/watch/Watch';
import { useContext } from 'react';
import { AuthContext } from './authcontext/AuthContext';
import Search from './pages/search/Search';


const App = () => {
  const {user} = useContext(AuthContext)
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/'>
            {user ? <Home/> : <Redirect to='/register'/>}
          </Route>
          <Route path='/register'>
          {!user ? <Register/> : <Redirect to='/'/>}
          </Route>
          <Route path='/login'>
            {!user ? <Login /> : <Redirect to='/' />}
          </Route>
          {user &&
            <>
              <Route path='/movies'>
                <Home type='movie'/>
              </Route>
              <Route path='/series'>
                <Home type='series'/>
            </Route>
            <Route path='/search'>
              <Search/>
            </Route>
              <Route path='/watch'>
                <Watch/>
              </Route>
            </>
          }
        </Switch>
      </Router>
    {/* <Home/>
      <Watch />
      <Register/>
      <Login/> */}
    </div>
  );
};

export default App;