import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import HomeIcon from '@material-ui/icons/Home';
import ClassIcon from '@material-ui/icons/Class';
import PublishIcon from '@material-ui/icons/Publish';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Container,
  Form,
} from 'react-bootstrap';
import axios from 'axios';

const FacultyProfile = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const [value, onChange] = useState(new Date());
  const facultySignin = useSelector((state) => state.facultySignin);
  const { facultyInfo } = facultySignin;

  useEffect(() => {
    if (!facultyInfo) {
      history.push('/');
    }
    axios
      .get(`/faculty/${facultyInfo.result.FacultyID}`)
      .then((response) => {
        setName(response.data.faculty.Name);
        setEmail(response.data.faculty.EmailID);
        setDepartment(response.data.faculty.Department);
        setPhone(response.data.faculty.PhoneNum);
        setAddress(response.data.faculty.Address);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [facultyInfo, name, email, address, department, phone]);

  return (
    <Container fluid='sm' className='themed-container'>
      <button className='btn btn-primary'>Welcome</button>
      <Container className='mt-5 border border-left-0 border-right-0 border-dark'>
        <hr></hr>
        <Row className='mt-5'>
          <Col md={2} sm={12}>
            <Container
              className='border border-info mt-5 mr-5'
              style={{ width: '217px' }}
            >
              <Image
                className='mt-5 '
                src='https://static.thenounproject.com/png/2011000-200.png'
                style={{
                  height: '200px',
                  width: '200px',
                  objectFit: 'contain',
                }}
              />
            </Container>
          </Col>
          <Col md={7} sm={12} style={{ marginTop: '-40px' }}>
            <ListGroup className='mt-2 mb-4 ml-5'>
              <h4 className='text-center btn btn-block btn-info'>
                Faculty Profile
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
                <p style={{ textTransform: 'lowercase' }}>
                  <EmailIcon /> {email}
                </p>
              </ListGroup.Item>
              <ListGroup.Item
                style={{ backgroundColor: '#1e212d', color: '#eeeeee' }}
              >
                {facultyInfo.result.ClassAdviser === 'Yes' ? (
                  <h4>
                    <ClassIcon /> {department}&nbsp;&nbsp;&nbsp;
                    <Button className='btn btn-sm btn-success'>
                      Adviser - {facultyInfo.result.Batch}
                    </Button>
                  </h4>
                ) : (
                  <h4>
                    <ClassIcon /> {department}
                  </h4>
                )}
              </ListGroup.Item>
              <ListGroup.Item
                style={{ backgroundColor: '#1e212d', color: '#eeeeee' }}
              >
                <h4>
                  <PhoneIcon /> {phone}
                </h4>
              </ListGroup.Item>
              <ListGroup.Item
                style={{ backgroundColor: '#1e212d', color: '#eeeeee' }}
              >
                <h4 style={{ textTransform: 'capitalize' }}>
                  <HomeIcon /> {address}
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
                  to={`/faculty/edit/profile/${facultyInfo.result.FacultyID}`}
                >
                  <h6 style={{ textTransform: 'Capitalize' }}>
                    <EditTwoToneIcon />
                    &nbsp;&nbsp;Edit Profile
                  </h6>
                </Link>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
        <hr></hr>
      </Container>
    </Container>
  );
};

export default FacultyProfile;
