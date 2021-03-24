import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
const FacultyProfile = () => {
  const facultySignin = useSelector((state) => state.facultySignin);
  const { facultyInfo } = facultySignin;
  return (
    <div className='ml-5'>
      <h3>{facultyInfo.result.Name}</h3>
    </div>
  );
};

export default FacultyProfile;
