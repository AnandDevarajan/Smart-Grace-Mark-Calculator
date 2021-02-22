import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Login from './screens/Login';

function App() {
  return (
    <Router>
      <Navbar />
      <Container>
        <Route path='/login' component={Login} />
      </Container>
    </Router>
  );
}

export default App;
