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
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
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
    <div className='ml-5'>
      <h3 className='btn  btn-primary'>Welcome to Faculty Profile</h3>

      <Row className='mt-5'>
        <Col md={7} style={{ backgroundColor: '#2B2E4A' }}>
          <ListGroup variant='flush' className='mt-4 ml-2'>
            <ListGroup.Item>
              <h4 style={{ textTransform: 'capitalize' }}>
                <PersonIcon />
                :&nbsp;&nbsp;&nbsp;
                {name}
              </h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4 style={{ textTransform: 'lowercase' }}>
                <EmailIcon />
                :&nbsp;&nbsp;&nbsp;{email}
              </h4>
            </ListGroup.Item>
            <ListGroup.Item>
              {facultyInfo.result.ClassAdviser === 'Yes' ? (
                <h4>
                  <ClassIcon />
                  :&nbsp;&nbsp;&nbsp;
                  {department}&nbsp;&nbsp;&nbsp;
                  <Button className='btn btn-sm btn-success'>
                    Adviser - {facultyInfo.result.Batch}
                  </Button>
                </h4>
              ) : (
                <h4>
                  <ClassIcon />
                  :&nbsp;&nbsp;&nbsp;
                  {department}
                </h4>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>
                <PhoneIcon />
                :&nbsp;&nbsp;&nbsp;
                {phone}
              </h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4 style={{ textTransform: 'capitalize' }}>
                <HomeIcon />
                :&nbsp;&nbsp;&nbsp;{address}
              </h4>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col style={{ backgroundColor: '#343f56' }}>
          <div className='mt-4 ml-5 mb-5'>
            <Calendar onChange={onChange} value={value} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default FacultyProfile;
