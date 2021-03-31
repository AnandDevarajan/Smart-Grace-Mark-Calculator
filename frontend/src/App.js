import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './screens/Home';
import Navbar from './components/Navbar';
import AdminLogin from './screens/Admin/AdminLogin';
import StudentSignup from './screens/Student/StudentSignup';
import AdminSignup from './screens/Admin/AdminSignup';
import StudentLogin from './screens/Student/StudentLogin';
import StudentForgotPassword from './screens/Student/StudentForgotPassword';
import StudentResetPassword from './screens/Student/StudentResetPassword';
import StudentProfile from './screens/Student/StudentProfile';
import StudentProfileEdit from './screens/Student/StudentProfileEdit';
import AdminProfile from './screens/Admin/AdminProfile';
import FacultyLogin from './screens/Faculty/FacultyLogin';
import FacultySignup from './screens/Faculty/FacultySignup';
import FacultyProfile from './screens/Faculty/FacultyProfile';
import CourseMarkEdit from './screens/Faculty/CourseMarkEdit';
import AllStudentList from './screens/Admin/AllStudentList';
import AllFacultyList from './screens/Admin/AllFacultyList';
import FacultyForgotPassword from './screens/Faculty/FacultyForgotPassword';
import FacultyResetPassword from './screens/Faculty/FacultyResetPassword';
import GraceMarkForm from './screens/Gracemark/GraceMarkForm';
import RequestForm from './screens/Student/RequestForm';
import GracemarkList from './screens/Gracemark/Gracemarklist';
import GracemarkEdit from './screens/Gracemark/GracemarkEdit';
import BatchStudents from './screens/Faculty/BatchStudents';
import AdminForgotPassword from './screens/Admin/AdminForgotPassword';
import AdminResetPassword from './screens/Admin/AdminResetPassword';
import Footer from './components/Footer';
import CourseStudents from './screens/Faculty/CourseStudents';
import ViewCourseMarks from './screens/Student/ViewCourseMarks';

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
          {facultyInfo ? (
            <Route exact path='/' component={FacultyProfile} />
          ) : adminInfo ? (
            <Route exact path='/' component={AdminProfile} />
          ) : studentInfo ? (
            <Route exact path='/' component={StudentProfile} />
          ) : (
            <Route exact path='/' component={Home} />
          )}

          <Route path='/admin/login' component={AdminLogin} />
          <Route path='/admin/signup' component={AdminSignup} />
          <Route path='/admin/profile' component={AdminProfile} />
          <Route path='/admin/forgotpassword' component={AdminForgotPassword} />
          <Route path='/admin/reset/:token' component={AdminResetPassword} />
          <Route path='/admin/students' component={AllStudentList} />
          <Route path='/admin/faculties' component={AllFacultyList} />
          <Route path='/admin/addGraceMarkDetails' component={GraceMarkForm} />
          <Route path='/admin/gracemarklist' component={GracemarkList} />
          <Route path='/admin/gracemark/:id' component={GracemarkEdit} />
          <Route path='/student/login' component={StudentLogin} />
          <Route path='/student/signup' component={StudentSignup} />
          <Route path='/student/profile' component={StudentProfile} />
          <Route
            path='/student/forgotpassword'
            component={StudentForgotPassword}
          />
          <Route
            path='/student/reset/:token'
            component={StudentResetPassword}
          />
          <Route path='/student/request' component={RequestForm} />
          <Route
            path='/student/view/marklist/:id'
            component={ViewCourseMarks}
          />
          <Route path='/student/edit/profile' component={StudentProfileEdit} />
          <Route path='/faculty/login' component={FacultyLogin} />
          <Route path='/faculty/signup' component={FacultySignup} />
          <Route path='/faculty/profile' component={FacultyProfile} />
          <Route path='/faculty/students/:id' component={CourseStudents} />
          <Route
            path='/faculty/course/mark/edit/:id'
            component={CourseMarkEdit}
          />
          <Route
            path='/faculty/adviser/students/:id'
            component={BatchStudents}
          />
          <Route
            path='/faculty/forgotpassword'
            component={FacultyForgotPassword}
          />
          <Route
            path='/faculty/reset/:token'
            component={FacultyResetPassword}
          />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
