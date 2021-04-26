import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import {
  deleteGracemark,
  listGracemarks,
} from '../../actions/gracemarkActions';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddBoxIcon from '@material-ui/icons/AddBox';

const GracemarkList = ({ history }) => {
  const dispatch = useDispatch();

  const gracemarkList = useSelector((state) => state.gracemarkList);
  const { error, gracemarks } = gracemarkList;

  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  useEffect(() => {
    if (adminInfo) {
      dispatch(listGracemarks());
    } else {
      history.push('/');
    }
  }, [dispatch, history, adminInfo]);

  const deleteHandler = (id) => {
    if (window.confirm('Do you want to delete this Grace Mark ?')) {
      dispatch(deleteGracemark(id));
      dispatch(listGracemarks());
    }
  };
  return (
    <div className='ml-5 alllist_div'>
      <Link to='/admin/profile' className='goback'>
        <Button variant='light'>
          <ArrowBackIcon /> Go Back
        </Button>
      </Link>
        <div className='card ml-5 px-3 overflow my_card'>
          <Row className='align-items-center'>
            <Col>
              <h1 className='text-center list_heading text-info'>
                Grace Mark List
              </h1>
            </Col>
            <Col className='text-right'>
              <Link
                to='/admin/addGraceMarkDetails'
                className='gracemark_create'
              >
                <Button className='btn btn-sm'>
                  <AddBoxIcon /> Create Grace Mark
                </Button>
              </Link>
            </Col>
          </Row>
          {error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Description</th>
                  <th>Marks Alloted</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {gracemarks.map((gracemark) => (
                  <tr key={gracemark.GraceMarkID}>
                    <td>{gracemark.GraceMarkID}</td>
                    <td>{gracemark.Description}</td>
                    <td>{gracemark.GraceMark}</td>
                    <td>
                      <LinkContainer
                        to={`/admin/gracemark/${gracemark.GraceMarkID}`}
                      >
                        <EditIcon className='icon' style={{ color: 'black' }} />
                      </LinkContainer>
                    </td>
                    <td>
                      <DeleteIcon
                        className='icon'
                        style={{ color: '#f05454' }}
                        onClick={() => deleteHandler(gracemark.GraceMarkID)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </div>

  );
};

export default GracemarkList;
