import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Login from './screens/Login';
import Home from './screens/Home';
function App() {
  return (
    <Router>
      <Navbar />
      <Container>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
      </Container>
    </Router>
  );
}

export default App;
