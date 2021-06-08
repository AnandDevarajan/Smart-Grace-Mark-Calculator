const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;
chai.use(chaiHttp);

describe("Authentication Unit", () => {
  describe("boundary condition", () => {
    it("Invalid Email and Password", (done) => {
      chai
        .request("http://127.0.0.1:5000")
        .post("/student/login")
        .send({ email: "", password: "" })
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(400);
          expect(res).to.be.an("object");
          expect(res.body.message).to.be.an("String");
          done();
        });
    });
  });
  describe("negative condition", () => {
    it("Invalid Email", (done) => {
      chai
        .request("http://127.0.0.1:5000")
        .post("/student/login")
        .send({ email: "student@test123.com", password: "test123" })
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(400);
          expect(res).to.be.an("object");
          expect(res.body.message).to.equal("Invalid Email");
          done();
        });
    });
    it("Invalid Password", (done) => {
      chai
        .request("http://127.0.0.1:5000")
        .post("/student/login")
        .send({ email: "student@test.com", password: "test1234" })
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(400);
          expect(res).to.be.an("object");
          expect(res.body.message).to.equal("Invalid Password");
          done();
        });
    });
  });
  describe("positive condition", () => {
    it("Auth Success", (done) => {
      chai
        .request("http://127.0.0.1:5000")
        .post("/student/login")
        .send({ email: "student@test.com", password: "test123" })
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an("object");
          expect(res.body.result).to.be.an("object");
          expect(res.body.token).to.be.an("string");
          done();
        });
    });
  });
});
