import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';

const AdminProfile = () => {
  const [reload, setReload] = useState(true);
  const gracemarkCreate = useSelector((state) => state.gracemarkCreate);
  const { success, error } = gracemarkCreate;
  // useEffect(() => {

  // }, []);

  return (
    <div>
      <h3>
        <Link className='my-3' to='/admin/addGraceMarkDetails'>
          <Button variant='success'> Add Grace Mark Details</Button>
        </Link>
      </h3>
    </div>
  );
};

export default AdminProfile;
