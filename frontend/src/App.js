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
import AdminProfile from './screens/AdminProfile';
import { useSelector } from 'react-redux';

function App() {
  const studentSignin = useSelector((state) => state.studentSignin);
  const { studentInfo } = studentSignin;
  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;
  return (
    <Router>
      <Navbar />
      <Container>
        {studentInfo ? (
          <Route exact path='/' component={StudentProfile} />
        ) : adminInfo ? (
          <Route exact path='/' component={AdminProfile} />
        ) : (
          <Route exact path='/' component={Home} />
        )}
        <Route path='/admin/login' component={AdminLogin} />
        <Route path='/admin/signup' component={AdminSignup} />
        <Route path='/student/login' component={StudentLogin} />
        <Route path='/student/signup' component={StudentSignup} />
        <Route path='/student/profile' component={StudentProfile} />
        <Route exact path='/admin/profile' component={AdminProfile} />
      </Container>
    </Router>
  );
}

export default App;
