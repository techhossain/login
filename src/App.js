import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Register from './components/Register/Register';
import Services from './components/Services/Services';
import Nav from './components/Shared/Nav';
import AuthProvider from './contexs/AuthProvider';

function App() {
  return (
    <div className="container">
      <AuthProvider>
        <Router>
          <Nav></Nav>
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>

            <Route path="/home">
              <Home></Home>
            </Route>

            <PrivateRoute path="/services">
              <Services></Services>
            </PrivateRoute>

            <Route path="/login">
              <Login></Login>
            </Route>

            <Route path="/register">
              <Register></Register>
            </Route>

          </Switch>
        </Router>
      </AuthProvider>

    </div>
  );
}

export default App;
