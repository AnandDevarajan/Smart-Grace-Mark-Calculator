const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;
chai.use(chaiHttp);

describe("3) Authentication Unit", () => {
  //   describe("boundary condition", () => {
  //     it("Student Login", (done) => {
  //       chai
  //         .request("http://127.0.0.1:5000")
  //         .post("/student/login")
  //         .send({ email: "anand001@gmail.com", password: "anand1ds23" })
  //         .end((err, res) => {
  //           if (err) done(err);
  //           expect(res).to.have.status(400);
  //           expect(res).to.be.an("object");
  //           expect(res.body.message).to.equal("Invalid Email");
  //           done();
  //         });
  //     });
  //   });
  describe("negative condition", () => {
    it("login fails", (done) => {
      chai
        .request("http://127.0.0.1:5000")
        .post("/student/login")
        .send({ email: "anand001@gmail.com", password: "anand123" })
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(400);
          expect(res).to.be.an("object");
          expect(res.body.message).to.equal("Invalid Email");
          done();
        });
    });
  });
  describe("positive condition", () => {
    it("login success", (done) => {
      chai
        .request("http://127.0.0.1:5000")
        .post("/student/login")
        .send({ email: "ananddevarajan01@gmail.com", password: "anand123" })
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
