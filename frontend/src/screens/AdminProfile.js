import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const AdminProfile = () => {
  return (
    <div>
      <h3>
        <Link className='btn btn-success my-3' to='/admin/addGraceMarkDetails'>
          Add Grace Mark Details
        </Link>
      </h3>
    </div>
  );
};

export default AdminProfile;
