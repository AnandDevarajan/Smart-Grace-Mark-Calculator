import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import HomeIcon from '@material-ui/icons/Home';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import ClassIcon from '@material-ui/icons/Class';
import SchoolIcon from '@material-ui/icons/School';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SendIcon from '@material-ui/icons/Send';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
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
    <div className='ml-5 px-3' style={{ backgroundColor: 'white' }}>
      <h1 className='text-success'>Student Profile</h1>
      <p className='lead mt-2'>
        <AccountBoxIcon style={{ color: 'black', objectFit: 'contain' }} />{' '}
        Welcome {name}
      </p>
      <Row className='mt-4'>
        <Col>
          <Link to={`/student/edit/profile/${studentInfo.result.RollNum}`}>
            <EditTwoToneIcon />{' '}
            <Button className='btn btn-sm'>Edit Profile</Button>
          </Link>
        </Col>
        <Col>
          {status === 'pending' ? (
            <>
              <AutorenewIcon />{' '}
              <Button className='btn-sm  btn-warning '> Pending</Button>
            </>
          ) : status === 'accepted' ? (
            <>
              <DoneAllIcon />{' '}
              <Button className='btn btn-sm btn-success'>Accepted</Button>
            </>
          ) : (
            <>
              <SendIcon />{' '}
              <Link className='btn btn-sm btn-info' to='/student/request'>
                Request for Grace Mark
              </Link>
            </>
          )}
        </Col>
        <Col></Col>
      </Row>
      <h2 className='mt-4' style={{ textTransform: 'Capitalize' }}>
        <PersonIcon /> Student Details
      </h2>
      <table striped bordered hover responsive className='table table-sm'>
        <thead>
          <tr>
            <th>
              <FormatListNumberedIcon /> Roll Number
            </th>
            <th className='hide-sm'>
              <SchoolIcon /> Branch
            </th>
            <th className='hide-sm'>
              <ClassIcon /> Batch
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{roll}</td>
            <td>
              {degree} {branch}
            </td>
            <td>{batch}</td>
          </tr>
        </tbody>
      </table>
      <h2 className='mt-4' style={{ textTransform: 'Capitalize' }}>
        <ContactSupportIcon /> Contact Details
      </h2>
      <table striped bordered hover responsive className='table table-sm'>
        <thead>
          <tr>
            <th>
              <PhoneIcon /> Phone Number
            </th>
            <th className='hide-sm'>
              {' '}
              <EmailIcon /> Email
            </th>
            <th className='hide-sm'>
              <HomeIcon /> Address
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>+91 {phone}</td>
            <td>{email}</td>
            <td>{address}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StudentProfile;
