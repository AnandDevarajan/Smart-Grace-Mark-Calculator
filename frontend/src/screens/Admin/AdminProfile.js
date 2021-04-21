import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import PhoneIcon from '@material-ui/icons/Phone';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import HomeIcon from '@material-ui/icons/Home';
import PublishIcon from '@material-ui/icons/Publish';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import CloseIcon from '@material-ui/icons/Close';
import Message from '../../components/Message';
import { Row, Col, ListGroup, Image, Container, Button } from 'react-bootstrap';
import axios from 'axios';
import './Admin.css';

const AdminProfile = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState('');

  const gracemarkCreate = useSelector((state) => state.gracemarkCreate);
  const { success, error } = gracemarkCreate;

  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  useEffect(() => {
    if (!adminInfo) {
      history.push('/');
    }
    axios
      .all([
        axios.get(`/admin/${adminInfo.result.adminID}`),
        axios.get(`/admin/status`),
      ])
      .then(
        axios.spread((response1, response2) => {
          console.log(response2.data.status);
          setName(response1.data.admin.Name);
          setEmail(response1.data.admin.EmailID);
          setPhone(response1.data.admin.PhoneNum);
          setAddress(response1.data.admin.Address);
          setStatus(response2.data.status);
        })
      );
  }, [adminInfo, name, email, address, phone.replace, status, message]);

  const publishResult = () => {
    const config = {
      headers: { Authorization: `Bearer ${adminInfo.token}` },
    };
    axios
      .get('/admin/publish/result', config)
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const resetPublish = () => {
    const config = {
      headers: { Authorization: `Bearer ${adminInfo.token}` },
    };
    axios
      .get('/admin/reset/publish', config)
      .then((response) => {
        setMessage(response.data.status);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log('stat', status);
  console.log('msg', message);

  const deleteMyAccount = (id) => {};

  return (
    <div
      className='ml-5 px-3 alllist_div'
      style={{ backgroundColor: 'white', marginLeft: '140px' }}
    >
      <h1 className='text-success'>Admin Profile</h1>
      <p className='lead mt-2'>
        <AccountBoxIcon style={{ color: 'black', objectFit: 'contain' }} />{' '}
        Welcome {name}
      </p>
      <Row className='mt-4'>
        <Col>
          <Link
            to={`/admin/edit/profile/${adminInfo.result.adminID}`}
            style={{ textDecoration: 'None' }}
          >
            <EditTwoToneIcon />{' '}
            <Button className='btn btn-sm'>Edit Profile</Button>
          </Link>
        </Col>
        <Col>
          {status === 'Not Published' && (
            <>
              <PublishIcon className='mr-2' />
              <button
                className='btn btn-sm btn-info'
                onClick={publishResult}
                style={{ width: '120px' }}
              >
                Publish Results
              </button>
            </>
          )}

          {status === 'Published' && (
            <>
              <PublishIcon className='mr-2' />
              <button
                className='btn btn-sm btn-warning mr-5'
                onClick={publishResult}
                style={{ width: '86px' }}
              >
                Published
              </button>
              <CloseIcon
                className='icon'
                style={{ color: 'red' }}
                onClick={resetPublish}
              />
            </>
          )}
        </Col>
        <Col>
          <DeleteForeverIcon
            className='icon'
            onClick={() => deleteMyAccount(adminInfo.result.adminID)}
          />{' '}
          <Button
            className='btn btn-sm btn-danger'
            onClick={() => deleteMyAccount(adminInfo.result.adminID)}
          >
            Delete My Account
          </Button>
        </Col>
      </Row>
      <h2 className='mt-4' style={{ textTransform: 'Capitalize' }}>
        <PersonIcon /> Admin Details
      </h2>
      <table striped bordered hover responsive className='table table-sm'>
        <thead>
          <tr>
            <th>
              <FormatListNumberedIcon /> Admin ID
            </th>

            <th />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td width='365px'>ID {adminInfo.result.adminID}</td>
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
  );
};

export default AdminProfile;
