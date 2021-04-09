import React, { useState, useEffect } from "react";

const ViewGrade = ({ match }) => {
  roll = match.params.id;
  useEffect(() => {
    if (!adminInfo) {
      history.push("/");
    }
    axios
      .all([axios.get(`/faculty/course/mark/}`), axios.get(`/admin/status`)])
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
  }, [adminInfo, name, email, address, phone, status]);

  return (
    <div className="text-center">
      <h1>Results not published</h1>
    </div>
  );
};

export default ViewGrade;
