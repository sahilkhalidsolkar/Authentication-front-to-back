import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './components/Login';
import { useEffect, useContext } from 'react'
import Register from './components/Register';
import AuthContext from './context/auth/AuthContext'
import axios from './axios'
import setAuthHeader from './utils/setAuthHeader';
function App() {
  const { token, loadUser } = useContext(AuthContext);

  useEffect(() => {
    loadUser(token)

  }, [token]);



  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />


        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
