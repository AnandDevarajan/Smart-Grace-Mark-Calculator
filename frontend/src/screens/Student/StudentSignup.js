import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import FormContainer from "../../components/FormContainer";
import { studentRegister } from "../../actions/studentActions";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DatePicker from "react-date-picker";
const StudentSignup = ({ history }) => {
  const [name, setName] = useState("");

  const [rollno, setRollNo] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState(new Date());
  const [gender, setGender] = useState("select");
  const [branch, setBranch] = useState("CSE");
  const [batch, setBatch] = useState("[choose batch]");
  const [degree, setDegree] = useState("BTech");
  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const studentSignup = useSelector((state) => state.studentSignup);
  const { error, studentInfo } = studentSignup;

  const redirect = "/student/profile";
  useEffect(() => {
    if (studentInfo) {
      history.push(redirect);
    }
  }, [history, studentInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      name === "" ||
      rollno === "" ||
      phone === "" ||
      address === "" ||
      dob === "" ||
      batch === "[choose batch]" ||
      gender === "select" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setMessage("");
      setMessage("Enter all the details");
    } else if (password.length < 6) {
      setMessage("");
      setMessage("Passwords should be atleast 6 characters");
    } else if (password !== confirmPassword) {
      setMessage("");
      setMessage("Passwords do not match");
    } else if (rollno.length != 16) {
      setMessage("");
      setMessage("Invalid Roll Number");
    } else if (phone.length != 10) {
      setMessage("");
      setMessage("Invalid phone number");
    } else {
      setMessage("");
      dispatch(
        studentRegister(
          name,
          email,
          password,
          rollno,
          dob,
          branch,
          batch,
          degree,
          gender,
          phone,
          address
        )
      );
    }
  };
  console.log(dob);
  return (
    <>
      {!studentInfo && (
        <>
          <Link to="/" className="goback">
            <Button variant="light">
              <ArrowBackIcon /> Go Back
            </Button>
          </Link>
          <FormContainer>
            <div className="card ml-5 px-3 overflow my_card mb-5 signup_card">
              <h1 className="text-info">CREATE A STUDENT ACCOUNT</h1>
              {message && <Message variant="warning">{message}</Message>}
              {error && <Message variant="danger">{error}</Message>}
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                  <Form.Label style={{ color: "black", fontWeight: "bold" }}>
                    Name
                  </Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter  name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label style={{ color: "black", fontWeight: "bold" }}>
                    Email Address
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="rollno">
                  <Form.Label style={{ color: "black", fontWeight: "bold" }}>
                    Roll Number
                  </Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter  Roll Number"
                    value={rollno}
                    onChange={(e) => setRollNo(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label style={{ color: "black", fontWeight: "bold" }}>
                    password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                  <Form.Label style={{ color: "black", fontWeight: "bold" }}>
                    Confirm Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="degree">
                  <Form.Label style={{ color: "black", fontWeight: "bold" }}>
                    Degree
                  </Form.Label>
                  <Form.Control
                    as="select"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                  >
                    <option>BTech</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="branch">
                  <Form.Label style={{ color: "black", fontWeight: "bold" }}>
                    Branch
                  </Form.Label>
                  <Form.Control
                    as="select"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                  >
                    <option>CSE</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="batch">
                  <Form.Label style={{ color: "black", fontWeight: "bold" }}>
                    Select batch
                  </Form.Label>
                  <Form.Control
                    as="select"
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                  >
                    <option>[choose batch]</option>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    <option>D</option>
                    <option>E</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="dob">
                  <Form.Label style={{ color: "black", fontWeight: "bold" }}>
                    Date of Birth
                  </Form.Label>
                  {/* <Form.Control
                  type='name'
                  placeholder='dd/mm/yyyy'
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                ></Form.Control> */}{" "}
                  &nbsp;
                  <br />
                  <DatePicker onChange={setDob} value={dob} />
                </Form.Group>
                <Form.Group controlId="gender">
                  <Form.Label style={{ color: "black", fontWeight: "bold" }}>
                    Gender
                  </Form.Label>
                  <Form.Control
                    as="select"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option>select</option>
                    <option>Male</option>
                    <option>Female</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="phone">
                  <Form.Label style={{ color: "black", fontWeight: "bold" }}>
                    Phone Number
                  </Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="address">
                  <Form.Label style={{ color: "black", fontWeight: "bold" }}>
                    Address
                  </Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter  Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Button type="submit" variant="success">
                  Register
                </Button>
              </Form>
              <Row className="py-3">
                <Col>
                  Already have an account ?
                  <Link
                    to={
                      redirect
                        ? `/student/login?redirect=${redirect}`
                        : "/student/login"
                    }
                  >
                    {" "}
                    Login
                  </Link>
                </Col>
              </Row>
            </div>
          </FormContainer>
        </>
      )}
    </>
  );

};

export default StudentSignup;
