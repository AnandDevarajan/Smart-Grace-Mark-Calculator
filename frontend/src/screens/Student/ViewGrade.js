import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const ViewGrade = ({ match, history }) => {
  let roll = match.params.id;

  const [status, setStatus] = useState("");

  const studentSignin = useSelector((state) => state.studentSignin);
  const { studentInfo } = studentSignin;

  useEffect(() => {
    if (!studentInfo) {
      history.push("/");
    }
    axios
      .all([
        axios.get(`/student/view/result/${roll}}`),
        axios.get(`/admin/status`),
      ])
      .then(
        axios.spread((response1, response2) => {
          setStatus(response2.data.status);
        })
      );
  }, [studentInfo, status]);

  return (
    <div className="text-center">
      <h1>Results not published</h1>
    </div>
  );
};

export default ViewGrade;
