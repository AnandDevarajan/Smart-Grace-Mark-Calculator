import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import HomeIcon from '@material-ui/icons/Home';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import ClassIcon from '@material-ui/icons/Class';
import SchoolIcon from '@material-ui/icons/School';
import SendIcon from '@material-ui/icons/Send';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import PublishIcon from '@material-ui/icons/Publish';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Container,
} from 'react-bootstrap';
import axios from 'axios';
import Message from '../../components/Message';

const StudentProfile = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [roll, setRoll] = useState('');
  const [degree, setDegree] = useState('');
  const [branch, setBranch] = useState('');
  const [batch, setBatch] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState('');
  const [result, setResult] = useState('');
  const [value, onChange] = useState(new Date());

  const studentSignin = useSelector((state) => state.studentSignin);
  const { studentInfo } = studentSignin;

  useEffect(() => {
    if (!studentInfo) {
      history.push('/');
    }

    axios
      .all([
        axios.get(`/student/${studentInfo.result.RollNum}`),
        axios.get(`/admin/status`),
      ])
      .then(
        axios.spread((response1, response2) => {
          setName(response1.data.student.Name);
          setRoll(response1.data.student.RollNum);
          setEmail(response1.data.student.EmailID);
          setDegree(response1.data.student.Degree);
          setBranch(response1.data.student.Branch);
          setBatch(response1.data.student.Batch);
          setPhone(response1.data.student.PhoneNum);
          setAddress(response1.data.student.Address);
          setStatus(response1.data.student.Requested);
          setResult(response2.data.status);
        })
      );
  }, [status]);

  return (
    <Container fluid='sm' className='themed-container'>
      <button className='btn btn-primary mb-1'>Welcome</button>
      {result === 'Published' && (
        <Message variant='success'>Results Published</Message>
      )}
      <Container className=' border border-left-0 border-right-0 border-dark'>
        <hr></hr>
        <Row className='mt-5'>
          <Col md={2}>
            <Container
              className='border border-success mt-5 mr-5'
              style={{ width: '217px' }}
            >
              {studentInfo.result.Gender === 'Male' ? (
                <Image
                  className='mt-5 mr-5'
                  src='https://www.pngitem.com/pimgs/m/235-2350916_student-netid-login-transparent-background-student-icon-hd.png'
                  style={{
                    height: '200px',
                    width: '200px',
                    objectFit: 'contain',
                  }}
                />
              ) : (
                <Image
                  className='mt-5 mr-5'
                  src='https://image.flaticon.com/icons/png/512/68/68170.png'
                  style={{
                    height: '200px',
                    width: '200px',
                    objectFit: 'contain',
                  }}
                />
              )}
            </Container>
          </Col>
          <Col md={7} sm={12}>
            <ListGroup className=' mb-5 ml-5' style={{ marginTop: '-30px' }}>
              <h4 className='text-center btn btn-block btn-success'>
                Student Profile
              </h4>
              <ListGroup.Item
                style={{ backgroundColor: '#1e212d', color: '#eeeeee' }}
              >
                <h4 style={{ textTransform: 'capitalize' }}>
                  <PersonIcon /> {name}
                </h4>
              </ListGroup.Item>
              <ListGroup.Item
                style={{ backgroundColor: '#1e212d', color: '#eeeeee' }}
              >
                <h4>
                  <FormatListNumberedIcon /> {studentInfo.result.RollNum}
                </h4>
              </ListGroup.Item>
              <ListGroup.Item
                style={{ backgroundColor: '#1e212d', color: '#eeeeee' }}
              >
                <p style={{ textTransform: 'lowercase' }}>
                  <EmailIcon /> {email}
                </p>
              </ListGroup.Item>
              <ListGroup.Item
                style={{ backgroundColor: '#1e212d', color: '#eeeeee' }}
              >
                <h4 style={{ textTransform: 'Capitalize' }}>
                  <SchoolIcon /> {degree}&nbsp;&nbsp;{branch} - {batch}
                </h4>
              </ListGroup.Item>
              <ListGroup.Item
                style={{ backgroundColor: '#1e212d', color: '#eeeeee' }}
              >
                <h4>
                  <PhoneIcon /> {phone}
                </h4>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3} sm={12}>
            <ListGroup className=' ml-2' style={{ marginTop: '75px' }}>
              <ListGroup.Item>
                <h6 className=' text-center text-white btn btn-sm btn-block btn-primary'>
                  Actions
                </h6>
              </ListGroup.Item>
              <ListGroup.Item>
                <Link
                  to={`/student/edit/profile/${studentInfo.result.RollNum}`}
                >
                  <h6 style={{ textTransform: 'Capitalize' }}>
                    <EditTwoToneIcon />
                    &nbsp;&nbsp;Edit Profile
                  </h6>
                </Link>
              </ListGroup.Item>
              <ListGroup.Item>
                {status === 'pending' ? (
                  <h4>
                    <AutorenewIcon />
                    &nbsp;&nbsp;&nbsp;
                    <Button className='btn-sm  btn-warning '> Pending</Button>
                  </h4>
                ) : status === 'accepted' ? (
                  <h4>
                    <DoneAllIcon />
                    &nbsp;&nbsp;&nbsp;
                    <Button className='btn btn-sm btn-success'>Accepted</Button>
                  </h4>
                ) : (
                  <h4>
                    <SendIcon /> &nbsp;&nbsp;&nbsp;
                    <Link className='btn btn-sm btn-info' to='/student/request'>
                      Request
                    </Link>
                  </h4>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
        <hr></hr>
      </Container>
    </Container>
  );
};

export default StudentProfile;
