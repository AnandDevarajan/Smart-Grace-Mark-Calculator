import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import AdminLogin from './screens/AdminLogin';
import StudentSignup from './screens/StudentSignup';
import AdminSignup from './screens/AdminSignup';
import StudentLogin from './screens/StudentLogin';
import Home from './screens/Home';
import StudentProfile from './screens/StudentProfile';

import { useDispatch, useSelector } from 'react-redux';
function App() {
  const studentSignin = useSelector((state) => state.studentSignin);
  const { studentInfo } = studentSignin;
  return (
    <Router>
      <Navbar />
      <Container>
        {studentInfo ? (
          <Route exact path='/' component={StudentProfile} />
        ) : (
          <Route exact path='/' component={Home} />
        )}
        <Route path='/admin/login' component={AdminLogin} />
        <Route path='/admin/signup' component={AdminSignup} />
        <Route path='/student/login' component={StudentLogin} />
        <Route path='/student/signup' component={StudentSignup} />
        <Route path='/student/profile' component={StudentProfile} />
      </Container>
    </Router>
  );
}

export default App;
