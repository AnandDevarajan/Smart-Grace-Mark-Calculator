import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { studentLogout } from '../../actions/studentActions';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import HomeIcon from '@material-ui/icons/Home';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import ClassIcon from '@material-ui/icons/Class';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SchoolIcon from '@material-ui/icons/School';
import CloseIcon from '@material-ui/icons/Close';
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
  const [grace, setGrace] = useState('');
  const [batch, setBatch] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState('');
  const [result, setResult] = useState('');
  const [value, onChange] = useState(new Date());

  const dispatch = useDispatch();

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
          console.log(response1);
          setName(response1.data.student.Name);
          setRoll(response1.data.student.RollNum);
          setEmail(response1.data.student.EmailID);
          setDegree(response1.data.student.Degree);
          setBranch(response1.data.student.Branch);
          setBatch(response1.data.student.Batch);
          setPhone(response1.data.student.PhoneNum);
          setAddress(response1.data.student.Address);
          setGrace(response1.data.student.GraceDesc);
          setStatus(response1.data.student.Requested);
          setResult(response2.data.status);
        })
      );
  }, [status]);

  const cancelRequest = (roll) => {
    axios.put(`/student/cancel/request/${roll}`).then((response) => {
      window.location.pathname = '/student/profile';
    });
  };

  const deleteMyAccount = (roll) => {
    if (window.confirm('Do you want to delete this account ?')) {
      axios.delete(`/student/delete/account/${roll}`);
    } else {
      return (window.location.pathname = '/student/profile');
    }
    localStorage.removeItem('studentInfo');
    window.location.pathname = '/';
  };

  return (
    <div
      className='ml-5 mt-3 align-items-center alllist_div'
      style={{ backgroundColor: 'white' }}
    >
      <div className='card ml-5 px-3 overflow my_card'>
        <div className='overflow'>
          <h1 className='text-success'>Student Profile</h1>
          <p className='lead mt-2'>
            <AccountBoxIcon style={{ color: '#2196f3' }} /> Welcome{' '}
            <span className='text-info'> {name}</span>
          </p>
          <Row className='mt-4'>
            <Col>
              <Link
                to={`/student/edit/profile/${studentInfo.result.RollNum}`}
                style={{ textDecoration: 'None' }}
              >
                <EditTwoToneIcon />{' '}
                <Button className='btn btn-sm btn-primary'>Edit Profile</Button>
              </Link>
            </Col>
            <Col>
              {status === 'N/A' && (
                <Link to='/student/request' style={{ textDecoration: 'None' }}>
                  <SendIcon />{' '}
                  <Button className='btn btn-sm btn-info'>
                    Request for Grace Mark
                  </Button>
                </Link>
              )}
            </Col>
            <Col>
              <DeleteForeverIcon
                className='icon'
                onClick={() => deleteMyAccount(roll)}
              />{' '}
              <Button
                className='btn btn-sm btn-danger'
                onClick={() => deleteMyAccount(roll)}
              >
                Delete My Account
              </Button>
            </Col>
          </Row>
          <h2 className='mt-4' style={{ textTransform: 'Capitalize' }}>
            <PersonIcon style={{ color: '#2196f3' }} /> Student Details
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
                <th>
                  <BeenhereIcon />
                  Grace Mark
                </th>
                <th>
                  <EqualizerIcon /> status
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td width='365px'>{roll}</td>
                <td width='365px'>
                  {degree} {branch}
                </td>
                <td width='365px'>{batch}</td>
                <td width='365px'>
                  {grace === 'N/A' ? (
                    <CloseIcon style={{ color: 'red' }} />
                  ) : (
                    grace
                  )}
                </td>
                {status === 'pending' && (
                  <td width='365px'>
                    <AutorenewIcon />{' '}
                    <span className='badge badge-pill badge-warning'>
                      Pending
                    </span>
                  </td>
                )}
                {status === 'pending' && (
                  <td
                    width='365px'
                    onClick={() => cancelRequest(roll)}
                    className='icon'
                  >
                    <CloseIcon style={{ color: 'red' }} />
                    Cancel
                  </td>
                )}
                {status === 'accepted' && (
                  <td width='365px'>
                    <DoneAllIcon />{' '}
                    <span className='badge badge-pill badge-success'>
                      {' '}
                      Accepted
                    </span>
                  </td>
                )}
              </tr>
            </tbody>
          </table>
          <h2 className='mt-4' style={{ textTransform: 'Capitalize' }}>
            <ContactSupportIcon style={{ color: '#2196f3' }} /> Contact Details
          </h2>
          <table striped bordered hover responsive className='table table-sm'>
            <thead>
              <tr>
                <th>
                  {' '}
                  <EmailIcon /> Email
                </th>
                <th className='hide-sm'>
                  <PhoneIcon /> Phone Number
                </th>
                <th className='hide-sm'>
                  <HomeIcon /> Address
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td width='365px'>{email}</td>
                <td width='365px'>+91 {phone}</td>
                <td width='365px'>{address}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
