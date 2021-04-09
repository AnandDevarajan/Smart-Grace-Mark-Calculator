import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import EmailIcon from "@material-ui/icons/Email";
import PersonIcon from "@material-ui/icons/Person";
import PhoneIcon from "@material-ui/icons/Phone";
import HomeIcon from "@material-ui/icons/Home";
import PublishIcon from "@material-ui/icons/Publish";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { publishResults } from "../../actions/adminActions";
import axios from "axios";

const AdminProfile = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [value, onChange] = useState(new Date());

  const gracemarkCreate = useSelector((state) => state.gracemarkCreate);
  const { success, error } = gracemarkCreate;
  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!adminInfo) {
      history.push("/");
    }
    axios
      .get(`/admin/${adminInfo.result.adminID}`)
      .then((response) => {
        setName(response.data.admin.Name);
        setEmail(response.data.admin.EmailID);

        setPhone(response.data.admin.PhoneNum);
        setAddress(response.data.admin.Address);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [adminInfo, name, email, address, phone]);

  const publishResults = () => {
    dispatch(publishResults);
  };

  return (
    <div className="ml-5">
      <h3 className="btn  btn-primary">Welcome to Admin Profile</h3>

      <Row className="mt-5">
        <Col md={7} style={{ backgroundColor: "#2B2E4A" }}>
          <ListGroup variant="flush" className="mt-4 ml-2">
            <ListGroup.Item>
              <h4 style={{ textTransform: "capitalize" }}>
                <PersonIcon />
                :&nbsp;&nbsp;&nbsp;
                {name}
              </h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4 style={{ textTransform: "lowercase" }}>
                <EmailIcon />
                :&nbsp;&nbsp;&nbsp;{email}
              </h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>
                <PhoneIcon />
                :&nbsp;&nbsp;&nbsp;
                {phone}
              </h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4 style={{ textTransform: "capitalize" }}>
                <HomeIcon />
                :&nbsp;&nbsp;&nbsp;{address}
              </h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4 style={{ textTransform: "capitalize" }}>
                <PublishIcon />
                :&nbsp;&nbsp;&nbsp;
                <button
                  className="btn btn-sm btn-success "
                  onClick={publishResults}
                >
                  Publish Results
                </button>
              </h4>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col style={{ backgroundColor: "#343f56" }}>
          <div className="mt-4 ml-5 mb-5">
            <Calendar onChange={onChange} value={value} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AdminProfile;
