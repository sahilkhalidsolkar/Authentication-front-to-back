import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './components/Login';
import { useEffect, useContext } from 'react'
import Register from './components/Register';
import AuthContext from './context/auth/AuthContext'
import axios from './axios'
import setAuthHeader from './utils/setAuthHeader';
import PrivateRoute from './components/PrivateRoute'
import Home from './components/Home';
function App() {
  const { token, loadUser, errors, removeAllError } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      loadUser(token)
    }

  }, [token]);





  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/home" component={Home} />


        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
