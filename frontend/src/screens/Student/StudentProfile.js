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
  const [value, onChange] = useState(new Date());

  const studentSignin = useSelector((state) => state.studentSignin);
  const { studentInfo } = studentSignin;

  useEffect(() => {
    if (!studentInfo) {
      history.push('/');
    }
    axios
      .get(`/student/${studentInfo.result.RollNum}`)
      .then((response) => {
        setName(response.data.student.Name);
        setRoll(response.data.student.RollNum);
        setEmail(response.data.student.EmailID);
        setDegree(response.data.student.Degree);
        setBranch(response.data.student.Branch);
        setBatch(response.data.student.Batch);
        setPhone(response.data.student.PhoneNum);
        setAddress(response.data.student.Address);
        setStatus(response.data.student.Requested);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [status]);

  return (
    <div className='ml-5'>
      <h3 className='btn  btn-primary'>Welcome to Student Profile</h3>

      <Row className='mt-5'>
        <Col md={7} style={{ backgroundColor: '#2B2E4A' }}>
          <ListGroup variant='flush' className='mt-4 mb-4 ml-2'>
            <ListGroup.Item>
              <h4 style={{ textTransform: 'capitalize' }}>
                <PersonIcon />
                :&nbsp;&nbsp;&nbsp;
                {name}
              </h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>
                <FormatListNumberedIcon />
                :&nbsp;&nbsp;&nbsp;
                {studentInfo.result.RollNum}
              </h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4 style={{ textTransform: 'lowercase' }}>
                <EmailIcon />
                :&nbsp;&nbsp;&nbsp;{email}
              </h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4 style={{ textTransform: 'Capitalize' }}>
                <SchoolIcon />
                :&nbsp;&nbsp;&nbsp;{degree}&nbsp;&nbsp;{branch} - {batch}
              </h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>
                <PhoneIcon />
                :&nbsp;&nbsp;&nbsp;
                {phone}
              </h4>
            </ListGroup.Item>
            <ListGroup.Item>
              {status === 'pending' ? (
                <h4>
                  <AutorenewIcon />
                  :&nbsp;&nbsp;&nbsp;
                  <Button className='btn btn-sm btn-warning'>
                    Grace Mark Request Pending
                  </Button>
                </h4>
              ) : status === 'accepted' ? (
                <h4>
                  <DoneAllIcon />
                  :&nbsp;&nbsp;&nbsp;
                  <Button className='btn btn-sm btn-success'>
                    Grace Mark Request Accepted
                  </Button>
                </h4>
              ) : (
                <h4>
                  <SendIcon /> :&nbsp;&nbsp;&nbsp;
                  <Link className='btn btn-sm btn-info' to='/student/request'>
                    Request For Grace Mark
                  </Link>
                </h4>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col style={{ backgroundColor: '#343f56' }}>
          <div className='mt-4 ml-5'>
            <Calendar onChange={onChange} value={value} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default StudentProfile;
