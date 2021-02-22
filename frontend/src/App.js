import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Login from './screens/Login';

function App() {
  return (
    <Router>
      <Container>
        <Route path='/login' component={Login} />
      </Container>
    </Router>
  );
}

export default App;
