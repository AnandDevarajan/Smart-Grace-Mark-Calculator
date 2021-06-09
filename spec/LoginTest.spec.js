const chai = require("chai");
const chaiHttp = require("chai-http");
const BASE_URL = "http://127.0.0.1:5000";
chai.use(chaiHttp);

describe("Authentication Unit", () => {
  describe("boundary condition", () => {
    it("Invalid Email and Password", (done) => {
      chai
        .request(BASE_URL)
        .post("/student/login")
        .send({ email: "", password: "" })
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(400);
          expect(res.body.message).toEqual(jasmine.any(String));
          done();
        });
    });
  });
  describe("negative condition", () => {
    it("Invalid Email", (done) => {
      chai
        .request(BASE_URL)
        .post("/student/login")
        .send({ email: "student@test123.com", password: "test123" })
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(400);
          expect(res.body.message).toEqual("Invalid Email");
          done();
        });
    });
    it("Invalid Password", (done) => {
      chai
        .request(BASE_URL)
        .post("/student/login")
        .send({ email: "test2@sgmc.com", password: "test1234" })
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(400);
          expect(res.body.message).toEqual("Invalid Password");
          done();
        });
    });
  });
  describe("positive condition", () => {
    it("Auth Success", (done) => {
      chai
        .request(BASE_URL)
        .post("/faculty/login")
        .send({ email: "faculty5@sgmc.com", password: "faculty" })
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(200);
          expect(res).toEqual(jasmine.any(Object));
          expect(res.body.result).toEqual(jasmine.any(Object));
          expect(res.body.token).toEqual(jasmine.any(String));
          done();
        });
    });
  });
});
