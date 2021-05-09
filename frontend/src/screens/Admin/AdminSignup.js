import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import FormContainer from "../../components/FormContainer";
import { adminRegister } from "../../actions/adminActions";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import "./Admin.css";
import DatePicker from "react-date-picker";

const AdminSignup = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState(new Date());
  const [gender, setGender] = useState("select");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const adminSignup = useSelector((state) => state.adminSignup);
  const { error, adminInfo } = adminSignup;

  const redirect = "/admin/profile";

  useEffect(() => {
    if (adminInfo) {
      history.push(redirect);
    }
  }, [history, adminInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      name === "" ||
      phone === "" ||
      address === "" ||
      dob === "" ||
      gender === "select" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setMessage("");
      setMessage("Enter all the details");
    } else if (password !== confirmPassword) {
      setMessage("");
      setMessage("Passwords do not match");
    } else if (phone.length != 10) {
      setMessage("");
      setMessage("Invalid phone number");
    } else {
      setMessage("");
      dispatch(
        adminRegister(name, email, password, dob, gender, phone, address)
      );
    }
  };

  return (
    <>
      {!adminInfo && (
        <>
          <Link to="/" className="goback">
            <Button variant="light">
              <ArrowBackIcon /> Go Back
            </Button>
          </Link>
          <FormContainer className="signup_form">
            <div className="card ml-5 px-3 overflow my_card mb-5 mt-5">
              <h1 className="text-info">CREATE AN ADMIN ACCOUNT</h1>
              {message && <Message variant="danger">{message}</Message>}
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

                <Form.Group controlId="dob">
                  <Form.Label style={{ color: "black", fontWeight: "bold" }}>
                    Date of Birth
                  </Form.Label>
                  {/* <Form.Control
                  type='name'
                  placeholder='dd/mm/yyyy'
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                ></Form.Control>{' '} */}
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
                        ? `/admin/login?redirect=${redirect}`
                        : "/admin/login"
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

export default AdminSignup;
