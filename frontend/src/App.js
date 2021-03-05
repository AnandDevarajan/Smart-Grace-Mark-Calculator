import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminLogin from './screens/Admin/AdminLogin';
import StudentSignup from './screens/Student/StudentSignup';
import AdminSignup from './screens/Admin/AdminSignup';
import StudentLogin from './screens/Student/StudentLogin';
import Home from './screens/Home';
import StudentProfile from './screens/Student/StudentProfile';
import AdminProfile from './screens/Admin/AdminProfile';
import FacultyLogin from './screens/Faculty/FacultyLogin';
import FacultySignup from './screens/Faculty/FacultySignup';
import FacultyProfile from './screens/Faculty/FacultyProfile';
import AllStudentList from './screens/Admin/AllStudentList';
import AllFacultyList from './screens/Admin/AllFacultyList';
import GraceMarkForm from './screens/Gracemark/GraceMarkForm';
import RequestForm from './screens/Student/RequestForm';
import GracemarkList from './screens/Gracemark/Gracemarklist';
import GracemarkEdit from './screens/Gracemark/GracemarkEdit';
import BatchStudents from './screens/Faculty/BatchStudents';
import Footer from './components/Footer';

function App() {
  const studentSignin = useSelector((state) => state.studentSignin);
  const { studentInfo } = studentSignin;
  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;
  const facultySignin = useSelector((state) => state.facultySignin);
  const { facultyInfo } = facultySignin;
  return (
    <Router>
      <Navbar />
      <main className='py-3'>
        <Container>
          {studentInfo ? (
            <Route exact path='/' component={StudentProfile} />
          ) : adminInfo ? (
            <Route exact path='/' component={AdminProfile} />
          ) : facultyInfo ? (
            <Route exact path='/' component={FacultyProfile} />
          ) : (
            <Route exact path='/' component={Home} />
          )}
          <Route path='/admin/login' component={AdminLogin} />
          <Route path='/admin/signup' component={AdminSignup} />
          <Route path='/admin/profile' component={AdminProfile} />
          <Route path='/admin/students' component={AllStudentList} />
          <Route path='/admin/faculties' component={AllFacultyList} />
          <Route path='/admin/addGraceMarkDetails' component={GraceMarkForm} />
          <Route path='/admin/gracemarklist' component={GracemarkList} />
          <Route path='/admin/gracemark/:id' component={GracemarkEdit} />
          <Route path='/student/login' component={StudentLogin} />
          <Route path='/student/signup' component={StudentSignup} />
          <Route path='/student/profile' component={StudentProfile} />
          <Route path='/student/request' component={RequestForm} />
          <Route path='/faculty/login' component={FacultyLogin} />
          <Route path='/faculty/signup' component={FacultySignup} />
          <Route path='/faculty/profile' component={FacultyProfile} />
          <Route path='/faculty/adviser/:id/:id' component={BatchStudents} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
