import React, { useState } from 'react';

const StudentChangePassword = ({ history, match }) => {
  const id = match.params.id;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  return <div></div>;
};

export default StudentChangePassword;
