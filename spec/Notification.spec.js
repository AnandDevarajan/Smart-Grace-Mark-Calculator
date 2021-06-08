const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;
const BASE_URL = "http://127.0.0.1:5000";
chai.use(chaiHttp);

describe("Notification Unit", () => {
  describe("negative condition", () => {
    it("Notification cannot be send due to invalid email", (done) => {
      chai
        .request(BASE_URL)
        .get("/admin/notify/faculty/76")
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjIzMTI3MDMwLCJleHAiOjE2MjU3MTkwMzB9.N2A2d_IoVvFAtJhXasgZ9WoDMB8rKLWIsWTu_MFGl50"
        )
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(422);
          expect(res).to.be.an("object");
          expect(res.body.message).to.equal("Invalid Email");
          done();
        });
    }).timeout(20000);
  });
  describe("positve condition", () => {
    it("Notification success", (done) => {
      chai
        .request(BASE_URL)
        .get("/admin/notify/faculty/75")
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjIzMTI3MDMwLCJleHAiOjE2MjU3MTkwMzB9.N2A2d_IoVvFAtJhXasgZ9WoDMB8rKLWIsWTu_MFGl50"
        )
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal("Notification success");
          done();
        });
    }).timeout(10000);
  });
});
